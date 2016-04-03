var socket = io.connect();
var canvas = document.getElementById('game');
var ctx = canvas.getContext('2d');
var renderingCanvas = document.createElement('canvas');
var renderingContext = renderingCanvas.getContext('2d');
var connectionCount = document.getElementById('connected-users-count');
var statusMessage = document.getElementById('status');
renderingCanvas.setAttribute('width', '3000px');
renderingCanvas.setAttribute('height', '3000px');

// ctx.scale(5, 5);

//////////Draw Class//////////
function ShapeDrawer(canvas, context) {
  this.canvas = canvas;
  this.context = context;
}

ShapeDrawer.prototype = {
  drawFood: function(food) {
    this.context.beginPath();
    this.context.arc(food.x, food.y, 5, 0, Math.PI * 2);
    this.context.fillStyle = food.color;
    this.context.fill();
    return this;
  },

  drawPlayer: function(player) {
    this.context.beginPath();
    this.context.arc(player.x, player.y, player.mass, 0, Math.PI * 2);
    this.context.fillStyle = 'royalblue';
    this.context.fill();
    return player;
  }
};
//////////////////////////////


var shapeDrawer = new ShapeDrawer(renderingCanvas, renderingContext);

var gameState = {};
var keysPressed = {};


//////////Listener/Send//////////
this.onkeydown = function(event) {
    if([65, 68, 83, 87].includes(event.keyCode)){
      keysPressed[event.keyCode] = true;
    }
};

this.onkeyup = function(event) {
    if([65, 68, 83, 87].includes(event.keyCode)){
      keysPressed[event.keyCode] = false;
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


socket.on('connect', function() {
  requestAnimationFrame(gameLoop);
});
//////////////////////////////


//////////Game Loop//////////
function gameLoop() {
  socket.send('keysPressed', keysPressed);
  renderingContext.clearRect(0, 0, renderingCanvas.width, renderingCanvas.height);
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  if(typeof gameState.players !== "undefined"){

    for(var i = 0; i < gameState.players.length; i++) {
      shapeDrawer.drawPlayer(gameState.players[i]);
    }

    for(var j = 0; j < gameState.food.length; j++) {
      shapeDrawer.drawFood(gameState.food[j]);
    }

    for(var k = 0; k < gameState.boosts.length; k++) {
      shapeDrawer.drawFood(gameState.boosts[k]);
    }
    currentPlayer = findPlayer(socket.id);
  

    if(typeof currentPlayer !== 'undefined') {
      // ctx.drawImage(renderingCanvas, (currentPlayer.x - 250)/6, (currentPlayer.y - 250)/6, 500, 500);
      // ctx.drawImage(renderingCanvas, Math.max((currentPlayer.x - 250), 0), Math.max((currentPlayer.y - 250), 0), 500, 500, 0, 0, 500, 500);
      ctx.drawImage(renderingCanvas, Math.min((Math.max((currentPlayer.x - 250), 0)), (Math.min((currentPlayer.x + 250), 2500))), Math.min((Math.max((currentPlayer.y - 250), 0)), (Math.min((currentPlayer.y + 250), 2500))), 500, 500, 0, 0, 500, 500);
    }
  }
  requestAnimationFrame(gameLoop);
}

//////////////////////////////

function findPlayer(socketID) {
  for(var i = 0; i < gameState.players.length; i++) {
    if (gameState.players[i].id.substring(2) === socketID) {
      return gameState.players[i];
    }
  }
}
