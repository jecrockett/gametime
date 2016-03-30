var Food = require('./food');
var ShapeDrawer = require('./shape-drawer');

function FoodGenerator(canvas, context) {
  this.canvas = canvas;
  this.context = context;
  
  var drawer = new ShapeDrawer(this.canvas, this.context);
  this.drawer = drawer;
  
};

FoodGenerator.prototype = {
  seed: function() {
    var food = [];
    for(var i = 0; i < 50; i++) {
      var foodItem = new Food(this.randOnCanvas(this.canvas));
      food.push(foodItem);
      this.drawer.drawFood(foodItem);
    }
    return food;
  },

  randOnCanvas: function(canvas) {
    return { x: Math.floor(Math.random() * (canvas.width - 10) + 5),
             y: Math.floor(Math.random() * (canvas.height - 10) + 5) };
  }

};


module.exports = FoodGenerator;
