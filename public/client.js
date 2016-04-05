var CANVAS_WIDTH = 2000;
var CANVAS_HEIGHT = 2000;

//Socket
////////////////////////////////////////////////////////////
var socket = io.connect();

$('#submit-info').on('click', function(){
  var username = $('#player-input').val();
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
  drawFood: function(food) {
    this.context.beginPath();
    this.context.arc(zoom(food.x), zoom(food.y), zoom(5), 0, Math.PI * 2);
    this.context.fillStyle = food.color;
    this.context.fill();
    return this;
  },

  drawPlayer: function(player) {
    this.context.beginPath();
    this.context.arc(zoom(player.x), zoom(player.y), zoom(player.mass), 0, Math.PI * 2);
    this.context.fillStyle = player.color;
    this.context.fill();
    return player;
  }
};
////////////////////////////////////////////////////////////


var shapeDrawer = new ShapeDrawer(renderingCanvas, renderingContext);
var zoomLevel = 1.0;
var gameState = {};
var keysPressed = {};


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


//Game Loop
////////////////////////////////////////////////////////////
function socketLoop(){
  socket.send('keysPressed', keysPressed);
}

function gameLoop() {
  try {
    var currentPlayer = findPlayer(socket.id);

    zoomLevel = 1.0 - (currentPlayer.mass / 450);
       if (zoomLevel < 0.25) {
         zoomLevel = 0.25;
       }

    renderingCanvas.setAttribute('width', zoom(CANVAS_WIDTH) + "px");
    renderingCanvas.setAttribute('height', zoom(CANVAS_HEIGHT) + "px");

    renderingContext.clearRect(0, 0, zoom(renderingCanvas.width), zoom(renderingCanvas.height));
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
      //Define 'View Window' Start Point (Top Left Corner)
      ////////////////////////////////////////////////////////////
      if(typeof currentPlayer !== 'undefined') {
        var topLeftX = zoom(currentPlayer.x) - 250;
        var topLeftY = zoom(currentPlayer.y) - 250;

        if (topLeftX < 0) {
          topLeftX = 0;
        }
        if (topLeftY < 0) {
          topLeftY = 0;
        }
        if (topLeftX + 500 > zoom(CANVAS_WIDTH)) {
          topLeftX = zoom(CANVAS_WIDTH) - 500;
        }
        if (topLeftY + 500 > zoom(CANVAS_HEIGHT)) {
          topLeftY = zoom(CANVAS_HEIGHT) - 500;
        }

        ctx.drawImage(renderingCanvas, topLeftX, topLeftY, 500, 500, 0, 0, 500, 500);
      }
      ////////////////////////////////////////////////////////////
    }

  }
  catch(ex){
    console.log("exception hit: ", ex);
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
  var sorted = players.sort(function(a,b){
    return b.mass - a.mass;
  });
  sorted.forEach(function(player){
    leaderBoard.append('<li class="player">' + player.name + '</li>');
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

//Error Listeners
/////////////////////////////////////////////////////////////////////////////////////////////////
socket.on('error', function(o) {
  console.log('error: ' + o);
});

socket.on('reconnect', function(o) {
  console.log('reconnect: ' + o);
});

socket.on('reconnect_attempt', function(o) {
  console.log('reconnect_attempt: ' + o);
});

socket.on('reconnect_error', function(o) {
  console.log('reconnect_error: ' + o);
});

socket.on('reconnect_failed', function(o) {
  console.log('reconnect_failed: ' + o);
});

socket.on('disconnect', function(o) {
  console.log('disconnect: ' + o);
});
/////////////////////////////////////////////////////////////////////////////////////////////////
