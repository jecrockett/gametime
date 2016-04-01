function OnlinePlayer(id, name, x, y) {
  this.id   = id;
  this.name = name;
  this.x    = x;
  this.y    = y;
  this.mass = 5;
  this.speed = 5;

  this.movePlayer = function(xOffset, yOffset) {
    this.x += xOffset * this.speed;
    this.y += yOffset * this.speed;
  };
  this.moveLeft = this.movePlayer.bind(this, -1, 0);
  this.moveRight = this.movePlayer.bind(this, 1, 0);
  this.moveUp = this.movePlayer.bind(this, 0, -1);
  this.moveDown = this.movePlayer.bind(this, 0, 1);
};

OnlinePlayer.prototype = {
  move: function(keysPressed) {
    console.log(keysPressed, typeof keysPressed);
    if ((keysPressed.indexOf(65) > -1) && this.canMoveLeft()) {
      this.moveLeft();
    }
    if ((keysPressed.indexOf(68) > -1) && this.canMoveRight()) {
      this.moveRight();
    }
    if ((keysPressed.indexOf(83) > -1) && this.canMoveDown()) {
      this.moveDown();
    }
    if ((keysPressed.indexOf(87) > -1) && this.canMoveUp()) {
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
        if (this.speed > 0.8){ this.speed -= 0.03; }
      }
    }
  },

  canMoveLeft: function(){
    return (this.x-this.mass > 0);
  },

  canMoveRight: function(){
    return (this.x+this.mass < 1140);
  },

  canMoveUp: function(){
    return (this.y-this.mass > 0);
  },

  canMoveDown: function(){
    return (this.y+this.mass < 560);
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
