var CANVAS_WIDTH = 2400;
var CANVAS_HEIGHT = 2400;

function Player(id, name, x, y) {
  this.id   = id;
  this.name = name;
  this.x    = x;
  this.y    = y;
  this.mass = 7;
  this.speed = 5;
  this.color = 'white';
  this.speedBoostTime = null;

  this.movePlayer = function(xOffset, yOffset) {
    if (this.speedBoostTime) {
      this.x += xOffset * (this.speed * 2);
      this.y += yOffset * (this.speed * 2);
    } else {
      this.x += xOffset * this.speed;
      this.y += yOffset * this.speed;
    }
  };

  this.moveLeft = this.movePlayer.bind(this, -1, 0);
  this.moveRight = this.movePlayer.bind(this, 1, 0);
  this.moveUp = this.movePlayer.bind(this, 0, -1);
  this.moveDown = this.movePlayer.bind(this, 0, 1);
}

 Player.prototype = {
  move: function(keysPressed) {
    if (keysPressed[37] && this.canMoveLeft()) { this.moveLeft(); }
    if (keysPressed[39] && this.canMoveRight()) { this.moveRight(); }
    if (keysPressed[40] && this.canMoveDown()) { this.moveDown(); }
    if (keysPressed[38] && this.canMoveUp()) { this.moveUp(); }
  },

  canMoveLeft: function(){
    return (this.x - this.mass > 0);
  },

  canMoveRight: function(){
    return (this.x + this.mass < CANVAS_WIDTH);
  },

  canMoveUp: function(){
    return (this.y - this.mass > 0);
  },

  canMoveDown: function(){
    return (this.y + this.mass < CANVAS_HEIGHT);
  },

  collisionDistance: function(object) {
    var xDiff = this.x - object.x;
    var yDiff = this.y - object.y;
    return Math.sqrt( xDiff*xDiff + yDiff*yDiff );
  },

  eatFood: function(food) {
    for(var i = 0; i < food.length; i++) {
      if(this.collisionDistance(food[i]) < this.mass) {
        food.splice(i, 1);
        this.mass += 1;
      }
    }
  },

  eatBoosts: function(boosts) {
    for(var i = 0; i < boosts.length; i++) {
      if(this.collisionDistance(boosts[i]) < this.mass) {
        boosts.splice(i, 1);
        this.speedBoostTime = Date.now();
      }
    }
  },

  eatViruses: function(viruses) {
    for(var i = 0; i < viruses.length; i++) {
      if((this.collisionDistance(viruses[i]) < (this.mass + viruses[i].mass)) &&
        ((this.mass * 0.9) > viruses[i].mass)) {
        viruses.splice(i, 1);
        this.mass = this.mass / 2;
      }
    }
  },

  eatPlayer: function(players){
    for(var i = 0; i < players.length; i++) {
      if((this.mass > (this.collisionDistance(players[i]) + players[i].mass * 0.5)) &&
         (players[i] !== this) &&
         (this.mass * 0.9 > players[i].mass)){
           this.mass = this.mass + (players[i].mass/2);
           players[i].resetPlayer();
      }
    }
  },

  resetPlayer: function(){
    this.mass  = 7;
    this.speed = 5;
    this.speedBoostTime = null;
    this.x = Math.floor((Math.random() * CANVAS_WIDTH) + 5);
    this.y = Math.floor((Math.random() * CANVAS_HEIGHT) + 5);
  },

  resetBoosts: function() {
    if(this.speedBoostTime < (Date.now() - 1200)) {
      this.speedBoostTime = null;
    }
  },

  updateSpeed: function(){
    this.speed = 5 - ((this.mass - 7) * 0.015);
    if (this.speed < 0.75) { this.speed = 0.75; }
  }
};

module.exports = Player;
