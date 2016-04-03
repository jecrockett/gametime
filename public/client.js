var socket = io.connect();
var canvas = document.getElementById('game');
var ctx = canvas.getContext('2d');
var renderingCanvas = document.createElement('canvas');
var renderingContext = renderingCanvas.getContext('2d');
var connectionCount = document.getElementById('connected-users-count');
var statusMessage = document.getElementById('status');
var zoomLevel = 1.0;
renderingCanvas.setAttribute('width', z(3000) + "px");
renderingCanvas.setAttribute('height', z(3000) + "px");


//////////Draw Class//////////
function ShapeDrawer(canvas, context) {
  this.canvas = canvas;
  this.context = context;
}

ShapeDrawer.prototype = {
  drawFood: function(food) {
    this.context.beginPath();
    this.context.arc(z(food.x), z(food.y), z(5), 0, Math.PI * 2);
    this.context.fillStyle = food.color;
    this.context.fill();
    return this;
  },

  drawPlayer: function(player) {
    this.context.beginPath();
    this.context.arc(z(player.x), z(player.y), z(player.mass), 0, Math.PI * 2);
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
  currentPlayer = findPlayer(socket.id);
  console.log("x: "+currentPlayer.x + ", y: " + currentPlayer.y);
  zoomLevel = 1.0 - (currentPlayer.mass / 450);

  renderingCanvas.setAttribute('width', z(3000) + "px");
  renderingCanvas.setAttribute('height', z(3000) + "px");

  socket.send('keysPressed', keysPressed);
  renderingContext.clearRect(0, 0, z(renderingCanvas.width), z(renderingCanvas.height));
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
  
    //////////Define 'View Window' Start Point (Top Left Corner)//////////
    if(typeof currentPlayer !== 'undefined') {
      var topLeftX = z(currentPlayer.x) - 250;
      var topLeftY = z(currentPlayer.y) - 250;

      if (topLeftX < 0)
        topLeftX = 0;
      if (topLeftY < 0)
        topLeftY = 0;
      
      if (topLeftX + 500 > z(3000)) {
        topLeftX = z(3000) - 500;
      }
      if (topLeftY + 500 > z(3000)) {
        topLeftY = z(3000) - 500;
      }

      var img = renderingContext.getImageData(topLeftX, topLeftY, 500, 500);
      ctx.putImageData(img, 0, 0);
    }
    //////////////////////////////////////////////////////////////////////
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

//Scale a value with zoomLevel
function z(value) {
  return value * zoomLevel;
};
