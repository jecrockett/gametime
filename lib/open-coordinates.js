function OpenCoordinates(canvasWidth, canvasHeight) {
  this.canvasWidth  = canvasWidth;
  this.canvasHeight = canvasHeight;
}

OpenCoordinates.prototype = {
  create: function(players){
    var newCoords;
    var isNotInsidePlayer = false;

    while(!isNotInsidePlayer){
      newCoords =  { x: Math.floor(Math.random() * (this.canvasWidth - 10) + 5),
                     y: Math.floor(Math.random() * (this.canvasHeight - 10) + 5) };
      isNotInsidePlayer = players.every(this.checkPlayer.bind(this, newCoords));
    }
    return newCoords;
  },

  checkPlayer: function(coords, player) {
    var xDiff = coords.x - player.x;
    var yDiff = coords.y - player.y;
    var distance = Math.sqrt( xDiff*xDiff + yDiff*yDiff);
    return distance > (player.mass + 20);
  }
};

module.exports = OpenCoordinates;
