var OnlinePlayer = require('./public/online-player');
var GamePackager = require('./lib/game-packager');
const EXPRESS = require('express');
const APP = EXPRESS();
const PORT = process.env.PORT || 8181;
const HTTP = require('http').Server(APP).listen(PORT, function() {
  console.log('Listening on port ' + PORT + '.');
});
const IO = require('socket.io')(HTTP);

var players = [];

APP.use(EXPRESS.static('public'));

APP.get('/', function(req, res) {
  res.sendFile(__dirname + '/public/index.html');
});

IO.on('connection', function(socket) {
  var numOfPlayers = Object.keys(players).length;
  var player_name = ("Player " + (numOfPlayers + 1));
  players.push(new OnlinePlayer(socket.id, player_name, (numOfPlayers * 5), (numOfPlayers * 5)));

  console.log('A user has connected.', IO.engine.clientsCount);
  IO.sockets.emit('usersConnected', IO.engine.clientsCount);
  socket.emit('status', 'You are connected!');


  socket.on('message', function(channel, message){
    if (channel === 'keysPressed') {
      var player = findPlayer(socket.id);
      player.move(message);
    }
  });

  socket.on('disconnect', function(socket) {
    console.log('A user has disconnected.', IO.engine.clientsCount);
  });
});


function findPlayer(socketID) {
  for(var i = 0; i < Object.keys(players).length; i++) {
    if (players[i].id === socketID) {
      return players[i];
    }
  }
}

function gameLoop() {
  var gameState = new GamePackager(players);
  console.log(gameState);
  IO.sockets.emit('gameState', gameState);
}

setInterval(gameLoop, 16);
