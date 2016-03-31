var Food = require('./food');
var ShapeDrawer = require('./shape-drawer');

function FoodGenerator(canvas, context) {
  var drawer = new ShapeDrawer(canvas, context);
  this.canvas = canvas;
  this.drawer = drawer;
}

FoodGenerator.prototype = {
  seed: function() {
    var food = [];
    for(var i = 0; i < 50; i++) {
      var foodItem = new Food(this.randOnCanvas(this.canvas));
      food.push(foodItem);
    }
    return food;
  },

  randOnCanvas: function() {
    return { x: Math.floor(Math.random() * (this.canvas.width - 10) + 5),
             y: Math.floor(Math.random() * (this.canvas.height - 10) + 5) };
  }
};


module.exports = FoodGenerator;
