function OpenCoordinates(canvasWidth, canvasHeight) {
  this.canvasWidth  = canvasWidth,
  this.canvasHeight = canvasHeight
}

OpenCoordinates.prototype = {
  create: function(players){
    var newCoords =  { x: Math.floor(Math.random() * (this.canvasWidth - 10) + 5),
                       y: Math.floor(Math.random() * (this.canvasHeight - 10) + 5) };
    var isNotInsidePlayer = false;
    var canWidth = this.canvasWidth;
    var canHeight = this.canvasHeight;

    function checkPlayer(player){
      var xDiff = newCoords.x - player.x;
      var yDiff = newCoords.y - player.y;
      var distance = Math.sqrt( xDiff*xDiff + yDiff*yDiff);
      return distance > (player.mass + 20);
    }

    while(!isNotInsidePlayer){
      isNotInsidePlayer = players.every(checkPlayer);
      if (!isNotInsidePlayer){
        newCoords =  { x: Math.floor(Math.random() * (canWidth - 10) + 5),
                       y: Math.floor(Math.random() * (canHeight - 10) + 5) };
      }
    }
    return newCoords;
  }
};

module.exports = OpenCoordinates;
