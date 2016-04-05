var CANVAS_WIDTH = 2000;
var CANVAS_HEIGHT = 2000;

var OnlinePlayer = require('./public/online-player');
var GamePackager = require('./lib/game-packager');
var FoodGenerator = require('./lib/food-generator');
var gamePackager = new GamePackager();

var foodGen = new FoodGenerator(CANVAS_WIDTH, CANVAS_HEIGHT);

const EXPRESS = require('express');
const APP = EXPRESS();
const PORT = process.env.PORT || 8181;
const HTTP = require('http').Server(APP).listen(PORT, function() {
  console.log('Listening on port ' + PORT + '.');
});
const IO = require('socket.io')(HTTP);

var players = [];
var food    = [];
var boosts  = [];
var playersToDelete = [];
var gameState = null;

APP.use(EXPRESS.static('public'));
APP.get('/', function(req, res) {
  res.sendFile(__dirname + '/public/index.html');
});

IO.on('connection', socketHandshake);

function gameLoop() {
  foodGen.replaceFood(food, boosts, players);
  for(var i = 0; i < playersToDelete.length; i++){
    deletePlayer(playersToDelete[i]);
  }
  playersToDelete = [];
  gameState = gamePackager.buildGameState(players, food, boosts);
  IO.sockets.emit('gameState', gameState);
}

setInterval(gameLoop, 45);

function findPlayer(socketID) {
  for(var i = 0; i < players.length; i++) {
    if (players[i].id === socketID) {
      return players[i];
    }
  }
}

function socketHandshake(socket) {
  if(IO.engine.clientsCount === 1) {
    food = foodGen.seedFood(players);
    boosts = foodGen.seedSpeedBoosts(players);
  }
  var player_name = ("Player " + (players.length + 1));
  players.push(new OnlinePlayer(socket.id, player_name, (players.length * 5), (players.length * 5)));

  socket.on('message', function(channel, message){
    if (channel === 'userInfo') {
      var playerToUpdate = findPlayer(socket.id);
      playerToUpdate.name = message[0];
      playerToUpdate.color = '#' + message[1];
    }

    if (channel === 'keysPressed') {
      var player = findPlayer(socket.id);
      if(typeof player !== "undefined"){
        player.resetBoosts();
        player.move(message);
        player.eatFood.call(player, food);
        player.eatBoosts.call(player, boosts);
        if(players.length > 0){
          player.eatPlayer(players);
        }
      }
    }
  });

  socket.on('disconnect', function() {
    playersToDelete.push(socket.id);
    console.log('A user has disconnected.', IO.engine.clientsCount);
  });

  console.log('A user has connected.', IO.engine.clientsCount);
  IO.sockets.emit('usersConnected', IO.engine.clientsCount);
  socket.emit('status', 'You are connected!');

  gameState = gameState || gamePackager.buildGameState(players, food, boosts);

  socket.emit("gameState", gameState);
  socket.emit('playerInitialized');
}

function deletePlayer(socketID) {
  for(var i = 0; i < players.length; i++) {
    if (players[i].id === socketID) {
      console.log('Disconnected player: ' + players[i].name);
      players = players.splice(i, 1);
    }
  }
}
