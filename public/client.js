var socket = io.connect();
var canvas = document.getElementById('game');
var ctx = canvas.getContext('2d');
var connectionCount = document.getElementById('connected-users-count');
var statusMessage = document.getElementById('status');


//////////Draw Class//////////
function ShapeDrawer(canvas, context) {
  this.canvas = canvas;
  this.context = context;
}

ShapeDrawer.prototype = {
  drawFood: function(food) {
    this.context.beginPath();
    this.context.arc(food.x, food.y, 5, 0, Math.PI * 2);
    this.context.fill();
    return this;
  },

  drawPlayer: function(player) {
    this.context.beginPath();
    this.context.arc(player.x, player.y, player.mass, 0, Math.PI * 2);
    this.context.fill();
    return player;
  }
};
//////////////////////////////


var shapeDrawer = new ShapeDrawer(canvas, ctx);

var gameState = {};


//////////Listener/Send//////////
this.onkeydown = function(event) {
    if([65, 68, 83, 87].includes(event.keyCode)){
      var keysPressed = [];
      keysPressed.push(event.keyCode);
      socket.send('keyDown', keysPressed);
    }
};
//////////////////////////////


//////////Receive/Process//////////
socket.on('usersConnected', function(count) {
  connectionCount.innerText = count + ' users connected.';
});

socket.on('status', function(message) {
  statusMessage.innerText = message;
});

socket.on('gameState', function(newState) {
  gameState = newState;
});
//////////////////////////////


// foodGen.replaceFood(food);

//////////Game Loop//////////
function gameLoop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  if(typeof gameState.players !== "undefined"){

    for(var i = 0; i < gameState.players.length; i++) {
      shapeDrawer.drawPlayer(gameState.players[i]);
    }

  }
  window.requestAnimationFrame(gameLoop);
  };

window.requestAnimationFrame(gameLoop);
//////////////////////////////