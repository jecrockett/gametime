var Food = require('./food');
var SpeedBoost = require('./speed-boost');
var ShapeDrawer = require('./shape-drawer');

function FoodGenerator(canvas, context) {
  var drawer = new ShapeDrawer(canvas, context);
  this.canvas = canvas;
  this.drawer = drawer;
}

FoodGenerator.prototype = {
  seedFood: function() {
    var food = [];
    for(var i = 0; i < 50; i++) {
      var foodItem = new Food(this.randOnCanvas(this.canvas));
      food.push(foodItem);
    }
    return food;
  },

  seedSpeedBoosts: function() {
    var speedBoosts = [];
    for(var i = 0; i < 4; i++) {
      var boost = new SpeedBoost(this.randOnCanvas());
      speedBoosts.push(boost);
    }
    return speedBoosts;
  },

  randOnCanvas: function() {
    return { x: Math.floor(Math.random() * (this.canvas.width - 10) + 5),
             y: Math.floor(Math.random() * (this.canvas.height - 10) + 5) };
  },

  replaceFood: function(food, speedBoosts) {
    while(food.length < 50) {
      var foodItem = new Food(this.randOnCanvas(this.canvas));
      food.push(foodItem);
    }
    while(speedBoosts.length < 4) {
      speedBoosts.push(new SpeedBoost(this.randOnCanvas()));
    }
  }
};


module.exports = FoodGenerator;
