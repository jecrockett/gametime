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
  }
};

module.exports = Player;
