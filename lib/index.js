var KeyTracker = require('./keyboard-tracker');
var FoodGenerator = require('./food-generator');
var ShapeDrawer = require('./shape-drawer');

var canvas = document.getElementById('game');
var ctx = canvas.getContext('2d');

var keyTracker = new KeyTracker(canvas);
var foodGen = new FoodGenerator(canvas, ctx);
var shapeDrawer = new ShapeDrawer(canvas, ctx);

function Player(name, x, y, mass) {
  this.name = name;
  this.x    = x;
  this.y    = y;
  this.mass = mass || 5;
}

Player.prototype = {
  draw: function() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.mass, 0, Math.PI * 2);
    ctx.fill();
    return this;
  },

  move: function() {
    if (this.name === 'Player 1') {
      if(keyTracker.isPressed(keyTracker.keys.P1LEFT) &&
         keyTracker.canMoveLeft(this)) {
        this.x--;
      }
      if (keyTracker.isPressed(keyTracker.keys.P1RIGHT) &&
          keyTracker.canMoveRight(this)) {
        this.x++;
      }
      if (keyTracker.isPressed(keyTracker.keys.P1UP) &&
          keyTracker.canMoveUp(this)) {
        this.y--;
      }
      if (keyTracker.isPressed(keyTracker.keys.P1DOWN) &&
          keyTracker.canMoveDown(this)) {
        this.y++;
      }
    } else if (this.name === 'Player 2') {
      if(keyTracker.isPressed(keyTracker.keys.P2LEFT) &&
         keyTracker.canMoveLeft(this)) {
        this.x--;
      }
      if (keyTracker.isPressed(keyTracker.keys.P2RIGHT) &&
          keyTracker.canMoveRight(this)) {
        this.x++;
      }
      if (keyTracker.isPressed(keyTracker.keys.P2UP) &&
          keyTracker.canMoveUp(this)) {
        this.y--;
      }
      if (keyTracker.isPressed(keyTracker.keys.P2DOWN) &&
          keyTracker.canMoveDown(this)) {
        this.y++;
      }
    }
    return this;
  }
};

var players = [];
players.push(new Player('Player 1',200,50));
players.push(new Player('Player 2',250,50));

var food = foodGen.seed();

requestAnimationFrame(function gameLoop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  for(var i = 0; i < players.length; i++) {
    players[i].draw().move();
  }

  for(var i = 0; i < food.length; i++) {
    shapeDrawer.drawFood(food[i]);
  }

  requestAnimationFrame(gameLoop);
});
