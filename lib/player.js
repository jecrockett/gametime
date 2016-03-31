function Player(name, x, y, mass, keyTracker) {
  this.name = name;
  this.x    = x;
  this.y    = y;
  this.mass = mass || 5;
  this.keyTracker = keyTracker;

  this.movePlayer = function(xOffset, yOffset) {
    this.x += xOffset;
    this.y += yOffset;
  };
  this.moveLeft = this.movePlayer.bind(this, -1, 0);
  this.moveRight = this.movePlayer.bind(this, 1, 0);
  this.moveUp = this.movePlayer.bind(this, 0, -1);
  this.moveDown = this.movePlayer.bind(this, 0, 1);
}

Player.prototype = {
  move: function() {
    this.movePlayer1();
    this.movePlayer2();
    return this;
  },

  eatFood: function(food) {
    for(var i = 0; i < food.length; i++) {
      var xDiff = this.x - food[i].x;
      var yDiff = this.y - food[i].y;
      var distance = Math.sqrt( xDiff*xDiff + yDiff*yDiff );
      if(distance < this.mass) {
        food.splice(i, 1);
        this.mass += 1;
      }
    }
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

module.exports = Player;
