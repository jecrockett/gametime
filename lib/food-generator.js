var Food = require('./food');

function FoodGenerator(width, height) {
  this.canvasWidth = width;
  this.canvasHeight = height;
}

FoodGenerator.prototype = {
  seed: function() {
    var food = [];
    for(var i = 0; i < 50; i++) {
      var foodItem = new Food(this.randOnCanvas());
      food.push(foodItem);
    }
    return food;
  },

  randOnCanvas: function() {
    return { x: Math.floor(Math.random() * (this.canvasWidth - 10) + 5),
             y: Math.floor(Math.random() * (this.canvasHeight - 10) + 5) };
  },

  replaceFood: function(allFood){
    while(allFood.length < 50) {
      var foodItem = new Food(this.randOnCanvas());
      allFood.push(foodItem);
    }
  }
};

module.exports = FoodGenerator;
