var Player = require('./player');

;(function() {
  var Game = function(canvasId) {
    var canvas = document.getElementById('game');
    var context = canvas.getContext('2d');
    var gameSize = {x: canvas.width, y: canvas.height };
    var players = [new Player({size: gameSize, name: "Player 1"}), new Player({size: gameSize, name: "Player 2"})];

    var game = this;
    //   game.update(players);
    //   game.draw(players, context, gameSize);
    //   requestAnimationFrame(gameLoop);
    // });

    function gameLoop() {

      game.update(players);
      game.draw(players, context, gameSize);
      requestAnimationFrame(gameLoop(context));
    }
  gameLoop(context);
  };

  Game.prototype = {
    update: function(players) {
      for(var i = 0; i < players.length; i++) {
        players[i].update();
      }
    },

    draw: function(players, context, gameSize) {

      context.clearRect(0, 0, gameSize.x, gameSize.y);
      for(var i = 0; i < players.length; i++) {
      }
    }
  };



new Game("game");
})(this);
