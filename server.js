var OnlinePlayer = require('./public/online-player');
var GamePackager = require('./lib/game-packager');
var FoodGenerator = require('./lib/food-generator');

var CANVAS_WIDTH = 2400;
var CANVAS_HEIGHT = 2400;
var gamePackager = new GamePackager();
var foodGen = new FoodGenerator(CANVAS_WIDTH, CANVAS_HEIGHT);
var players = [];
var food    = [];
var boosts  = [];
var viruses = [];
var playersToDelete = [];
var gameState = null;

const EXPRESS = require('express');
const APP = EXPRESS();
const PORT = process.env.PORT || 8181;
const HTTP = require('http').Server(APP).listen(PORT, function() {
  console.log('Listening on port ' + PORT + '.');
});
const IO = require('socket.io')(HTTP);

APP.use(EXPRESS.static('public'));
APP.get('/', function(req, res) {
  res.sendFile(__dirname + '/public/index.html');
});

//Initializes new player and start game
IO.on('connection', playerInitialization);
setInterval(gameLoop, 45);
////////////////////////////////////////////////////////////


function gameLoop() {
  foodGen.shuffleViruses(viruses, players);
  foodGen.replaceFood(food, boosts, players, viruses);
  for(var i = 0; i < playersToDelete.length; i++){
    deletePlayer(playersToDelete[i]);
  }
  playersToDelete = [];

  if(players.length > 0){
    viruses[0].moveVirus(players[0]);
  }

  gameState = gamePackager.buildGameState(players, food, boosts, viruses);
  IO.sockets.emit('gameState', gameState);
}

function findPlayer(socketID) {
  for(var i = 0; i < players.length; i++) {
    if (players[i].id === socketID) {
      return players[i];
    }
  }
}

//Initializes new player and opens the connection for communicating
function playerInitialization(socket) {
  addPlayer(socket);
  seedBoard();

  socket.on('message', function(channel, message){
    checkForAndUpdateUserInfo(channel, message, socket);
    updatePlayerActions(channel, message, socket);
  });

  socket.on('disconnect', function() {
    playersToDelete.push(socket.id);
    console.log('A user has disconnected.', IO.engine.clientsCount);
  });

  console.log('A user has connected.', IO.engine.clientsCount);
  IO.sockets.emit('usersConnected', IO.engine.clientsCount);
  socket.emit('status', 'You are connected!');

  gameState = gameState || gamePackager.buildGameState(players, food, boosts, viruses);

  socket.emit("gameState", gameState);
  socket.emit('playerInitialized');
}
////////////////////////////////////////////////////////////


function checkForAndUpdateUserInfo(channel, message, socket){
  if (channel === 'userInfo') {
    var playerToUpdate = findPlayer(socket.id);
    playerToUpdate.name = message[0];
    playerToUpdate.color = '#' + message[1];
  }
}

function addPlayer(socket){
  var player_name = ("Player " + (players.length + 1));
  var startingX = Math.floor((Math.random() * CANVAS_WIDTH) + 5);
  var startingY = Math.floor((Math.random() * CANVAS_HEIGHT) + 5);
  players.push(new OnlinePlayer(socket.id, player_name, startingX, startingY));
}

//Takes input form client and send over updated player actions
function updatePlayerActions(channel, message, socket){
  if (channel === 'keysPressed') {
    var player = findPlayer(socket.id);
    if(typeof player !== "undefined"){
      player.updateSpeed();
      player.resetBoosts();
      player.move(message);
      player.eatFood.call(player, food);
      player.eatBoosts.call(player, boosts);
      player.eatViruses.call(player, viruses);
      if(players.length > 0){
        player.eatPlayer(players);
      }
    }
  }
}

function seedBoard(){
  if(IO.engine.clientsCount === 1) {
    food = foodGen.seedFood(players);
    boosts = foodGen.seedSpeedBoosts(players);
    viruses = foodGen.seedViruses(players);
  }
}

function deletePlayer(socketID) {
  for(var i = 0; i < players.length; i++) {
    if (players[i].id === socketID) {
      console.log('Disconnected player: ' + players[i].name);
      players.splice(i, 1);
    }
  }
}
