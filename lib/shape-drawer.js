function ShapeDrawer(canvas, context) {
  this.canvas = canvas;
  this.context = context;
}

ShapeDrawer.prototype = {
  drawFood: function(food) {
    this.context.beginPath();
    this.context.arc(food.x, food.y, 3, 0, Math.PI * 2);
    this.context.fill();
    return this;
  },

  drawPlayer: function(player) {
    this.context.beginPath();
    this.context.arc(player.x, player.y, player.mass, 0, Math.PI * 2);
    this.context.fill();
    return player;
  }
};

module.exports = ShapeDrawer;
