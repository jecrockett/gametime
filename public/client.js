var CANVAS_WIDTH = 2000;
var CANVAS_HEIGHT = 2000;

//Socket
////////////////////////////////////////////////////////////
var socket = io.connect();
////////////////////////////////////////////////////////////


//HTML/CSS - User Form
////////////////////////////////////////////////////////////
$('#submit-info').on('click', function(){
  var username = $('#name-input').val();
  var color = $('.jscolor').val();
  var info = [username, color];
  socket.send('userInfo', info);
  $('#game').removeClass('hidden');
  $('.leader-board').removeClass('hidden');
  $('.player-info').addClass('hidden');
});
////////////////////////////////////////////////////////////


//Main 'Rendering' Canvas - Holds True Game State
////////////////////////////////////////////////////////////
var renderingCanvas = document.createElement('canvas');
var renderingContext = renderingCanvas.getContext('2d');
renderingCanvas.setAttribute('width', zoom(CANVAS_WIDTH) + "px");
renderingCanvas.setAttribute('height', zoom(CANVAS_HEIGHT) + "px");
////////////////////////////////////////////////////////////


//'View Window' Canvas
////////////////////////////////////////////////////////////
var canvas = document.getElementById('game');
var ctx = canvas.getContext('2d');
////////////////////////////////////////////////////////////


//Connection/Status
////////////////////////////////////////////////////////////
var connectionCount = document.getElementById('connected-users-count');
var statusMessage = document.getElementById('status');
////////////////////////////////////////////////////////////


//Draw Class
////////////////////////////////////////////////////////////
function ShapeDrawer(canvas, context) {
  this.canvas = canvas;
  this.context = context;
}

ShapeDrawer.prototype = {
  drawFood: function(foodItem) {
    this.context.beginPath();
    this.context.arc(zoom(foodItem.x), zoom(foodItem.y), zoom(foodItem.mass), 0, Math.PI * 2);
    this.context.fillStyle = foodItem.color;
    this.context.fill();
    return this;
  },

  drawPlayer: function(player) {
    this.context.beginPath();
    this.context.arc(zoom(player.x), zoom(player.y), zoom(player.mass), 0, Math.PI * 2);
    this.context.fillStyle = player.color;
    this.context.fill();

    if((1.0 - (player.mass / 450) > 0.25)) {
      var fontSize = Math.floor(18/((1.0 - (player.mass / 450))));
    } else {
      var fontSize = Math.floor(18/(0.25));
    }
    this.context.textAlign = 'center';
    this.context.fillStyle = 'white';
    this.context.font = fontSize + 'px impact';
    this.context.fillText(player.name, Math.floor(zoom(player.x)), Math.floor(zoom(player.y)));
    this.context.strokeStyle = 'black';
    this.context.strokeText(player.name, Math.floor(zoom(player.x)), Math.floor(zoom(player.y)));
    return player;
  }
};
////////////////////////////////////////////////////////////


//Variable Declarations
////////////////////////////////////////////////////////////
var shapeDrawer = new ShapeDrawer(renderingCanvas, renderingContext);
var zoomLevel = 1.0;
var gameState = {};
var keysPressed = {};
////////////////////////////////////////////////////////////


//Key Press Listeners
////////////////////////////////////////////////////////////
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
////////////////////////////////////////////////////////////


//Receive From Server & Process
////////////////////////////////////////////////////////////
socket.on('usersConnected', function(count) {
  connectionCount.innerText = count + ' users connected.';
});

socket.on('status', function(message) {
  statusMessage.innerText = message;
});

socket.on('gameState', function(newState) {
  gameState = newState;
});

socket.on('playerInitialized', function() {
  setInterval(socketLoop, 15);
  requestAnimationFrame(gameLoop);
});
////////////////////////////////////////////////////////////


//User Key Input Loop
////////////////////////////////////////////////////////////
function socketLoop(){
  socket.send('keysPressed', keysPressed);
}
////////////////////////////////////////////////////////////


//Game Loop
////////////////////////////////////////////////////////////
function gameLoop() {
  try {
    var currentPlayer = findPlayer(socket.id);

    zoomLevel = 1.0 - (currentPlayer.mass / 450);
    if (zoomLevel < 0.25) { zoomLevel = 0.25; }

    renderingCanvas.setAttribute('width', zoom(CANVAS_WIDTH) + "px");
    renderingCanvas.setAttribute('height', zoom(CANVAS_HEIGHT) + "px");

    renderingContext.clearRect(0, 0, zoom(renderingCanvas.width), zoom(renderingCanvas.height));
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    drawGameState(currentPlayer);
    drawViewWindow(currentPlayer);
  }
  catch(ex){
    console.log("Exception: ", ex);
  }
  finally {
    requestAnimationFrame(gameLoop);
    appendLeaderBoard(gameState.players);
  }
}
////////////////////////////////////////////////////////////

//Append a dynamically updating leader board to the page
function appendLeaderBoard(players){
  var leaderBoard = $('.list');
  $('.player').remove();
  players.forEach(function(player){
    leaderBoard.prepend('<li class="player">' + player.name + '</li>');
  });
}
/////////////////////////////////////////////////////////////////

//Find a Player by socketID
////////////////////////////////////////////////////////////
function findPlayer(socketID) {
  for(var i = 0; i < gameState.players.length; i++) {
    if (gameState.players[i].id.substring(2) === socketID) {
      return gameState.players[i];
    }
  }
}
////////////////////////////////////////////////////////////


//Scale a Value With zoomLevel
////////////////////////////////////////////////////////////
function zoom(value) {
  return value * zoomLevel;
}
////////////////////////////////////////////////////////////


//Draw Game State
////////////////////////////////////////////////////////////
function drawGameState(currentPlayer) {
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
    for(var l = 0; l < gameState.viruses.length; l++) {
      shapeDrawer.drawFood(gameState.viruses[l]);
    }
  }
}
////////////////////////////////////////////////////////////


//Position and Draw 'View Window' Canvas
////////////////////////////////////////////////////////////
function drawViewWindow(currentPlayer) {
  if(typeof currentPlayer !== 'undefined') {
    var topLeftX = zoom(currentPlayer.x) - (CANVAS_WIDTH/8);
    var topLeftY = zoom(currentPlayer.y) - (CANVAS_HEIGHT/8);
    if (topLeftX < 0) { topLeftX = 0; }
    if (topLeftY < 0) { topLeftY = 0; }
    if (topLeftX + 500 > zoom(CANVAS_WIDTH)) { topLeftX = zoom(CANVAS_WIDTH) - 500; }
    if (topLeftY + 500 > zoom(CANVAS_HEIGHT)) { topLeftY = zoom(CANVAS_HEIGHT) - 500; }
    ctx.drawImage(renderingCanvas, topLeftX, topLeftY, 500, 500, 0, 0, 500, 500);
  }
}
////////////////////////////////////////////////////////////