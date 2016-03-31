const express = require('express');
const app = express();
const port = process.env.PORT || 8181;
const http = require('http').Server(app).listen(port, function() {
  console.log('Listening on port ' + port + '.');
});
const io = require('socket.io')(http);

app.use(express.static('public'));

app.get('/', function(req, res) {
  res.sendFile(__dirname + '/public/index.html');
});

io.on('connection', function(socket) {
  console.log('A user has connected.', io.engine.clientsCount);
  io.sockets.emit('usersConnected', io.engine.clientsCount);
  socket.emit('status', 'You are connected!');

  socket.on('keysPressed', function(socket){
    
  });

  socket.on('disconnect', function(socket) {
    console.log('A user has disconnected.', io.engine.clientsCount);
  });
});
