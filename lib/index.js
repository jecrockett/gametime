var FoodGenerator = require('./food-generator');
var ShapeDrawer = require('./shape-drawer');
var Player = require('./player');
var KeyTracker = require('./keyboard-tracker');

var canvas = document.getElementById('game');
var ctx = canvas.getContext('2d');
var food = new FoodGenerator(canvas, ctx).seed();
var shapeDrawer = new ShapeDrawer(canvas, ctx);
var keyTracker = new KeyTracker(canvas);

var players = [];
players.push(new Player('Player 1',200,50,5,keyTracker));
players.push(new Player('Player 2',250,50,5,keyTracker));


requestAnimationFrame(function gameLoop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  for(var i = 0; i < players.length; i++) {
    shapeDrawer.drawPlayer(players[i]).move();
  }

  for(var j = 0; j < food.length; j++) {
    shapeDrawer.drawFood(food[j]);
  }

  requestAnimationFrame(gameLoop);
});
