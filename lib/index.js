var KeyTracker = require('./keyboard-tracker');

var canvas = document.getElementById('game');
var ctx = canvas.getContext('2d');

function Player(name, x, y, mass) {
  this.name = name;
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
players.push(new Player('Player 2',200,50,100));
players.push(new Player('Player 1',250,50,100));

requestAnimationFrame(function gameLoop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  players.forEach(function(player){
    player.draw().move();
  });
  requestAnimationFrame(gameLoop);
});
