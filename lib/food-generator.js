var Food = require('./food');
var SpeedBoost = require('./speed-boost');

function FoodGenerator(width, height) {
  this.canvasWidth = width;
  this.canvasHeight = height;
}

FoodGenerator.prototype = {
  seedFood: function() {
    var food = [];
    for(var i = 0; i < 250; i++) {
      var foodItem = new Food(this.randOnCanvas());
      food.push(foodItem);
    }
    return food;
  },

  seedSpeedBoosts: function() {
    var speedBoosts = [];
    for(var i = 0; i < 30; i++) {
      var boost = new SpeedBoost(this.randOnCanvas());
      speedBoosts.push(boost);
    }
    return speedBoosts;
  },

  randOnCanvas: function() {
    return { x: Math.floor(Math.random() * (this.canvasWidth - 10) + 5),
             y: Math.floor(Math.random() * (this.canvasHeight - 10) + 5) };
  },

  replaceFood: function(allFood, speedBoosts) {
    while(allFood.length < 250) {
      var foodItem = new Food(this.randOnCanvas());
      allFood.push(foodItem);
    }
    while(speedBoosts.length < 30) {
      speedBoosts.push(new SpeedBoost(this.randOnCanvas()));
    }
  }
};

module.exports = FoodGenerator;
