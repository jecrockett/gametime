// var Player = require('./player');
var Game = function(canvasId) {
  // var canvas = document.getElementById('game');
  var canvas = document.getElementById(canvasId);
  var context = canvas.getContext('2d');
  var gameSize = { x: canvas.width, y: canvas.height };
  // var players = [new Player({size: gameSize, name: "Player 1"}), new Player({size: gameSize, name: "Player 2"})];

  var self = this;
  var gameLoop = function() {
    self.update();
    self.draw(context, gameSize);
    requestAnimationFrame(gameLoop);
  };
gameLoop();
};

Game.prototype = {
  update: function() {
    // for(var i = 0; i < players.length; i++) {
    //   players[i].update();
    // }
  },

  draw: function() {
    context.fillRect(10, 10, 10, 10);
    // context.beginPath();
    // context.arc(this.x, this.y, 10, 0, 2 * Math.PI);
    // context.stroke();
    // context.clearRect(0, 0, gameSize.x, gameSize.y);
    // for(var i = 0; i < players.length; i++) {
    // }
  }
};


window.onload = function() {
  new Game("game");
};
