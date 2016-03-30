var KeyTracker = function(canvas) {
  this.canvas = canvas;
  this.keyPressed = {};

  window.onkeydown = function(event) {
    console.log(this);
    this.keyPressed[event.keyCode] = true;
  }.bind(this);

    window.onkeyup = function(event) {
      this.keyPressed[event.keyCode] = false;
    }.bind(this);
};

KeyTracker.prototype = {

  isPressed: function(keyCode) {
    return this.keyPressed[keyCode];
  },

  keys: {
    P1UP: 87,     //w
    P1LEFT: 65,   //a
    P1DOWN: 83,   //s
    P1RIGHT: 68,  //d
    P2UP: 80,     //p
    P2LEFT: 76,   //l
    P2DOWN: 186,  //;
    P2RIGHT: 222  //'
  },

  canMoveLeft: function(player){
    return (player.x-player.mass > 0);
  },

  canMoveRight: function(player){
    return (player.x+player.mass < this.canvas.width);
  },

  canMoveUp: function(player){
    return (player.y-player.mass > 0);
  },

  canMoveDown: function(player){
    return (player.y+player.mass < this.canvas.height);
  }
};

module.exports = KeyTracker;
