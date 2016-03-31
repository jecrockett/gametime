function Player(name, x, y, mass, keyTracker) {
  this.name = name;
  this.x    = x;
  this.y    = y;
  this.mass = mass || 5;
  this.keyTracker = keyTracker;
}

Player.prototype = {
  move: function() {
    if (this.name === 'Player 1') {
      if(this.keyTracker.isPressed(this.keyTracker.keys.P1LEFT) &&
         this.keyTracker.canMoveLeft(this)) {
        this.x--;
      }
      if (this.keyTracker.isPressed(this.keyTracker.keys.P1RIGHT) &&
          this.keyTracker.canMoveRight(this)) {
        this.x++;
      }
      if (this.keyTracker.isPressed(this.keyTracker.keys.P1UP) &&
          this.keyTracker.canMoveUp(this)) {
        this.y--;
      }
      if (this.keyTracker.isPressed(this.keyTracker.keys.P1DOWN) &&
          this.keyTracker.canMoveDown(this)) {
        this.y++;
      }
    } else if (this.name === 'Player 2') {
      if(this.keyTracker.isPressed(this.keyTracker.keys.P2LEFT) &&
         this.keyTracker.canMoveLeft(this)) {
        this.x--;
      }
      if (this.keyTracker.isPressed(this.keyTracker.keys.P2RIGHT) &&
          this.keyTracker.canMoveRight(this)) {
        this.x++;
      }
      if (this.keyTracker.isPressed(this.keyTracker.keys.P2UP) &&
          this.keyTracker.canMoveUp(this)) {
        this.y--;
      }
      if (this.keyTracker.isPressed(this.keyTracker.keys.P2DOWN) &&
          this.keyTracker.canMoveDown(this)) {
        this.y++;
      }
    }
    return this;
  },

  eatFood: function(food) {
    for(var i = 0; i < food.length; i++) {
      var xDiff = this.x - food[i].x
      var yDiff = this.y - food[i].y
      var distance = Math.sqrt( xDiff*xDiff + yDiff*yDiff );
      if(distance < this.mass) {
        food.splice(i, 1);
        this.mass += 1;
      }
    }
  }
};

module.exports = Player;
