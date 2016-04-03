var OnlinePlayer = require('./public/online-player');
var GamePackager = require('./lib/game-packager');
var FoodGenerator = require('./lib/food-generator');
var gamePackager = new GamePackager();
var foodGen = new FoodGenerator(3000, 3000);

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

APP.use(EXPRESS.static('public'));
APP.get('/', function(req, res) {
  res.sendFile(__dirname + '/public/index.html');
});

IO.on('connection', socketHandshake);

function gameLoop() {
  foodGen.replaceFood(food, boosts);
  for(var i = 0; i < playersToDelete.length; i++){
    deletePlayer(playersToDelete[i]);
  }
  playersToDelete = [];
  var gameState = gamePackager.buildGameState(players, food, boosts);
  IO.sockets.emit('gameState', gameState);
}

setInterval(gameLoop, 10);


function findPlayer(socketID) {
  for(var i = 0; i < players.length; i++) {
    if (players[i].id === socketID) {
      return players[i];
    }
  }
}

function socketHandshake(socket) {
  var numOfPlayers = players.length;
  if(numOfPlayers === 0) {
    food = foodGen.seedFood();
    boosts = foodGen.seedSpeedBoosts();
  }
  var player_name = ("Player " + (numOfPlayers + 1));
  players.push(new OnlinePlayer(socket.id, player_name, (numOfPlayers * 5), (numOfPlayers * 5)));

  console.log('A user has connected.', IO.engine.clientsCount);
  IO.sockets.emit('usersConnected', IO.engine.clientsCount);
  socket.emit('status', 'You are connected!');


  socket.on('message', function(channel, message){
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
}

function deletePlayer(socketID) {
  for(var i = 0; i < players.length; i++) {
    if (players[i].id === socketID) {
      players = players.splice(i, 1);
    }
  }
}
