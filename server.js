var OnlinePlayer = require('./public/online-player');
const express = require('express');
const app = express();
const port = process.env.PORT || 8181;
const http = require('http').Server(app).listen(port, function() {
  console.log('Listening on port ' + port + '.');
});
const io = require('socket.io')(http);

var players = {};

app.use(express.static('public'));

app.get('/', function(req, res) {
  res.sendFile(__dirname + '/public/index.html');
});

io.on('connection', function(socket) {
  var numOfPlayers = Object.keys(players).length;
  var player_name = ("Player " + (numOfPlayers + 1));
  players[socket.id] = new OnlinePlayer(player_name, (numOfPlayers * 5), (numOfPlayers * 5));
  console.log('A user has connected.', io.engine.clientsCount);
  io.sockets.emit('usersConnected', io.engine.clientsCount);
  socket.emit('status', 'You are connected!');

  console.log(players);

  socket.on('message', function(channel, message){
    if (channel === 'keysPressed') {
      players[socket.id]['keysPressed'] = message;
    }
  });

  socket.on('disconnect', function(socket) {
    console.log('A user has disconnected.', io.engine.clientsCount);
  });
});
