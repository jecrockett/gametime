var KeyTracker = function() {
  var keyPressed = {};

  window.onkeydown = function(event) {
    keyPressed[event.keyCode] = true;
  };

  window.onkeyup = function(event) {
    keyPressed[event.keyCode] = false;
  };

  this.isPressed = function(keyCode) {
    return keyPressed[keyCode];
  };

  this.KEYS = {
    W: 87,
    A: 65,
    S: 83,
    D: 68,
    UP: 38,
    LEFT: 37,
    DOWN: 40,
    RIGHT: 39
  };
};

module.exports = KeyTracker;
