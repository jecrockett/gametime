var CANVAS_WIDTH = 2000;
var CANVAS_HEIGHT = 2000;

function OnlinePlayer(id, name, x, y, color) {
  this.id   = id;
  this.name = name;
  this.x    = 5;
  this.y    = 5;
  this.mass = 7;
  this.speed = 5;
  this.color = 'white';
  this.speedBoostTime = null;

  this.movePlayer = function(xOffset, yOffset) {
    if (this.speedBoostTime !== null) {
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

OnlinePlayer.prototype = {
  move: function(keysPressed) {
    if (keysPressed[65] && this.canMoveLeft()) {
      this.moveLeft();
    }
    if (keysPressed[68] && this.canMoveRight()) {
      this.moveRight();
    }
    if (keysPressed[83] && this.canMoveDown()) {
      this.moveDown();
    }
    if (keysPressed[87] && this.canMoveUp()) {
      this.moveUp();
    }
  },

  eatFood: function(food) {
    for(var i = 0; i < food.length; i++) {
      var xDiff = this.x - food[i].x;
      var yDiff = this.y - food[i].y;
      var distance = Math.sqrt( xDiff*xDiff + yDiff*yDiff );
      if(distance < this.mass) {
        food.splice(i, 1);
        this.mass += 1;
        if (this.speed > 0.8){ this.speed -= 0.015; }
      }
    }
  },

  eatBoosts: function(boosts) {
    for(var i = 0; i < boosts.length; i++) {
      var xDiff = this.x - boosts[i].x;
      var yDiff = this.y - boosts[i].y;
      var distance = Math.sqrt( xDiff*xDiff + yDiff*yDiff );
      if(distance < this.mass) {
        boosts.splice(i, 1);
        this.speedBoostTime = Date.now();
      }
    }
  },

  eatViruses: function(viruses) {
    for(var i = 0; i < viruses.length; i++) {
      var xDiff = this.x - viruses[i].x;
      var yDiff = this.y - viruses[i].y;
      var distance = Math.sqrt( xDiff*xDiff + yDiff*yDiff );
      if((distance < (this.mass + viruses[i].mass)) && ((this.mass * 0.9) > viruses[i].mass)) {
        viruses.splice(i, 1);
        this.mass = this.mass / 2;
      }
    }
  },

  resetPlayer: function(){
    this.mass  = 5;
    this.x     = Math.floor((Math.random() * CANVAS_WIDTH) + 5);
    this.y     = Math.floor((Math.random() * CANVAS_HEIGHT) + 5);
    this. f = 5;
    this.speedBoostTime = null;
  },

  eatPlayer: function(players){
    for(var i = 0; i < players.length; i++) {
      var xDiff = this.x - players[i].x;
      var yDiff = this.y - players[i].y;
      var distance = Math.sqrt( xDiff*xDiff + yDiff*yDiff);
      if((this.mass > (distance + players[i].mass * 0.5)) &&
         (players[i] !== this) &&
         (this.mass * 0.9 > players[i].mass)){
           this.mass = this.mass + (players[i].mass/2);
           this.speed = this.speed - ((players[i].mass/2) * .015);
           players[i].resetPlayer();
      }
    }
  },


  resetBoosts: function() {
    if(this.speedBoostTime < (Date.now() - 1200)) {
      this.speedBoostTime = null;
    }
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

  movePlayer1: function() {
    if (this.isPlayer1()) {
      if (this.attemptsValidMoveLeft('P1LEFT')) {
        this.moveLeft();
      }
      if (this.attemptsValidMoveRight('P1RIGHT')) {
        this.moveRight();
      }
      if (this.attemptsValidMoveUp('P1UP')) {
        this.moveUp();
      }
      if (this.attemptsValidMoveDown('P1DOWN')) {
        this.moveDown();
      }
    }
  },

  movePlayer2: function() {
    if (this.isPlayer2()) {
      if (this.attemptsValidMoveLeft('P2LEFT')) {
        this.moveLeft();
      }
      if (this.attemptsValidMoveRight('P2RIGHT')) {
        this.moveRight();
      }
      if (this.attemptsValidMoveUp('P2UP')) {
        this.moveUp();
      }
      if (this.attemptsValidMoveDown('P2DOWN')) {
        this.moveDown();
      }
    }
  },

  isPlayer1: function() {
    return this.name === 'Player 1';
  },

  isPlayer2: function() {
    return this.name === 'Player 2';
  },

  attemptsValidMoveLeft: function(key) {
    return (this.keyTracker.isPressed(this.keyTracker.keys[key]) &&
            this.keyTracker.canMoveLeft(this));
  },

  attemptsValidMoveRight: function(key) {
    return (this.keyTracker.isPressed(this.keyTracker.keys[key]) &&
            this.keyTracker.canMoveRight(this));
  },

  attemptsValidMoveUp: function(key) {
    return (this.keyTracker.isPressed(this.keyTracker.keys[key]) &&
            this.keyTracker.canMoveUp(this));
  },

  attemptsValidMoveDown: function(key) {
    return (this.keyTracker.isPressed(this.keyTracker.keys[key]) &&
        this.keyTracker.canMoveDown(this));
  }
};

module.exports = OnlinePlayer;
