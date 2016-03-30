var KeyTracker = require('./keyboard-tracker');

var Player = function(options) {
  this.x = options.size.x / 2;
  this.y = options.size.y / 2;
  this.name = options.name;
  this.mass = options.mass || 10;
  this.velocity = options.velocity || 3;
  this.keyTracker = new KeyTracker();
};

Player.prototype = {
  update: function() {
    // if(this.keyTracker.isPressed(this.keyTracker.KEYS.LEFT)) {
    //   this.x -= 1;
    // } else if (this.keyTracker.isPressed(this.keyTracker.KEYS.RIGHT)) {
    //   this.x += 1;
    // } else if (this.keyTracker.isPressed(this.keyTracker.KEYS.UP)) {
    //   this.y -= 1;
    // } else if (this.keyTracker.isPressed(this.keyTracker.KEYS.DOWN)) {
    //   this.y += 1;
    // }
  },
  draw: function() {
    console.log("hi");
    // context.beginPath();
    // context.arc(this.x, this.y, 10, 0, 2 * Math.PI);
    // context.stroke();
  }
};

module.exports = Player;
