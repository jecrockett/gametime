var socket = io.connect();

var connectionCount = document.getElementById('connected-users-count');
var statusMessage = document.getElementById('status');

this.onkeydown = function(event) {
    if([65, 68, 83, 87].includes(event.keyCode)){
      var keysPressed = [];
      keysPressed.push(event.keyCode);
      socket.send('keyDown', keysPressed);
    }
};

socket.on('usersConnected', function(count) {
  socket.send('')
  connectionCount.innerText = count + ' users connected.';
});

socket.on('status', function(message) {
  statusMessage.innerText = message;
});
