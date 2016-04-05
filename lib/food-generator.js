var Food = require('./food');
var SpeedBoost = require('./speed-boost');
var Virus = require('./virus');

function FoodGenerator(width, height) {
  this.canvasWidth = width;
  this.canvasHeight = height;
}

FoodGenerator.prototype = {
  seedFood: function(players) {
    var food = [];
    for(var i = 0; i < 200; i++) {
      var foodItem = new Food(this.randOnCanvas(players));
      food.push(foodItem);
    }
    return food;
  },

  seedSpeedBoosts: function(players) {
    var speedBoosts = [];
    for(var i = 0; i < 15; i++) {
      var boost = new SpeedBoost(this.randOnCanvas(players));
      speedBoosts.push(boost);
    }
    return speedBoosts;
  },

  seedViruses: function(players) {
    var viruses = [];
    for(var i = 0; i < 8; i++) {
      viruses.push(new Virus(this.randOnCanvas(players)));
    }
    return viruses;
  },

  randOnCanvas: function(players) {
    var newCoords =  { x: Math.floor(Math.random() * (this.canvasWidth - 10) + 5),
                       y: Math.floor(Math.random() * (this.canvasHeight - 10) + 5) };
    var isNotInsidePlayer = false;
    var canWidth = this.canvasWidth;
    var canHeight = this.canvasHeight;

    function checkPlayer(player, i, players){
      var xDiff = newCoords.x - player.x;
      var yDiff = newCoords.y - player.y;
      var distance = Math.sqrt( xDiff*xDiff + yDiff*yDiff);
      return distance > (player.mass + 20);
    }

    while(isNotInsidePlayer === false){
      isNotInsidePlayer = players.every(checkPlayer);
      if (isNotInsidePlayer === false){
        newCoords =  { x: Math.floor(Math.random() * (canWidth - 10) + 5),
                       y: Math.floor(Math.random() * (canHeight - 10) + 5) };
      }
    }
    return newCoords;
  },

  replaceFood: function(allFood, speedBoosts, players, viruses) {
    while(allFood.length < 200) {
      var foodItem = new Food(this.randOnCanvas(players));
      allFood.push(foodItem);
    }
    while(speedBoosts.length < 15) {
      speedBoosts.push(new SpeedBoost(this.randOnCanvas(players)));
    }
    while(viruses.length < 8) {
      viruses.push(new Virus(this.randOnCanvas(players)));
    }
  }
};

module.exports = FoodGenerator;
