var KeyTracker = require('./keyboard-tracker');

var canvas = document.getElementById('game');
var ctx = canvas.getContext('2d');
var keyTrack = new KeyTracker();

function Player(name, x, y, mass) {
  this.name = name;
  this.x    = x;
  this.y    = y;
  this.mass = mass;
  this.keyTracker = keyTrack;
}

Player.prototype = {
  draw: function() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, 5, 0, Math.PI * 2);
    ctx.fill();
    return this;
  },

  move: function() {
    if (this.name === 'Player 1') {
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
    } else if (this.name === 'Player 2') {
      if(this.keyTracker.isPressed(this.keyTracker.KEYS.A)) {
        this.x--;
      }
      if (this.keyTracker.isPressed(this.keyTracker.KEYS.D)) {
        this.x++;
      }
      if (this.keyTracker.isPressed(this.keyTracker.KEYS.W)) {
        this.y--;
      }
      if (this.keyTracker.isPressed(this.keyTracker.KEYS.S)) {
        this.y++;
      }
    }
    return this;
  }
};

var players = [];
players.push(new Player('Player 1',200,50,100));
players.push(new Player('Player 2',250,50,100));

requestAnimationFrame(function gameLoop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for(var i = 0; i < players.length; i++) {
    players[i].draw().move();
  }
  requestAnimationFrame(gameLoop);
});
