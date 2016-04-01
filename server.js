var OnlinePlayer = require('./public/online-player');
const EXPRESS = require('express');
const app = EXPRESS();
const port = process.env.PORT || 8181;
const http = require('http').Server(app).listen(port, function() {
  console.log('Listening on port ' + port + '.');
});
const io = require('socket.io')(http);

var players = {};

app.use(EXPRESS.static('public'));

app.get('/', function(req, res) {
  res.sendFile(__dirname + '/public/index.html');
});

io.on('connection', function(socket) {
  var numOfPlayers = Object.keys(players).length;
  var player_name = ("Player " + (numOfPlayers + 1));
  players[socket.id] = new OnlinePlayer(socket.id, player_name, (numOfPlayers * 5), (numOfPlayers * 5));
  console.log('A user has connected.', io.engine.clientsCount);
  io.sockets.emit('usersConnected', io.engine.clientsCount);
  socket.emit('status', 'You are connected!');


  socket.on('message', function(channel, message){
    if (channel === 'keyDown') {
      var player = findPlayer(socket.id);
      player.move(message);
      console.log(player.name, player.x, player.y);
    }
  });

  socket.on('disconnect', function(socket) {
    console.log('A user has disconnected.', io.engine.clientsCount);
  });
});


function findPlayer(socketID) {
  for(var i = 0; i < Object.keys(players).length; i++) {
    if (players[socketID].id === socketID) {
      return players[socketID];
    }
  }
}
