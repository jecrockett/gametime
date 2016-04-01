var socket = io.connect();

var connectionCount = document.getElementById('connected-users-count');
var statusMessage = document.getElementById('status');

var keysPressed = {};
this.onkeydown = function(event) {
    keysPressed[event.keyCode] = true;
      console.log(keysPressed);
    socket.send('keysPressed', keysPressed);
};
this.onkeyup = function(event) {
    keysPressed[event.keyCode] = false;
    socket.send('keysPressed', keysPressed);
};

socket.on('usersConnected', function(count) {
  connectionCount.innerText = count + ' users connected.';
});

socket.on('status', function(message) {
  statusMessage.innerText = message;
});
