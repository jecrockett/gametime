require('./player');
var KeyTracker = require('./keyboard-tracker');

var canvas = document.getElementById('game');
var ctx = canvas.getContext('2d');

function Player(x, y, mass) {
  this.x    = x;
  this.y    = y;
  this.mass = mass;
  this.keyTracker = new KeyTracker();
}

Player.prototype = {
  draw: function() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, 5, 0, Math.PI * 2);
    ctx.fill();
    return this;
  },

  move: function() {
    if(this.keyTracker.isPressed(this.keyTracker.KEYS.LEFT)) {
      this.x--;
    }
    if (this.keyTracker.isPressed(this.keyTracker.KEYS.RIGHT)) {
      this.x++;
    }
    if (this.keyTracker.isPressed(this.keyTracker.KEYS.UP)) {
      this.y--;
    }
    if (this.keyTracker.isPressed(this.keyTracker.KEYS.DOWN)) {
      this.y++;
    }
    return this;
  }
};

var players = [];
players.push(new Player(50,50,100));

requestAnimationFrame(function gameLoop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for(var i = 0; i < players.length; i++) {
    players[i].draw().move();
  }
  requestAnimationFrame(gameLoop);
});
