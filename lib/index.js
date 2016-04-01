var FoodGenerator = require('./food-generator');
var ShapeDrawer = require('./shape-drawer');
var Player = require('./player');
var KeyTracker = require('./keyboard-tracker');

var canvas = document.getElementById('game');
var ctx = canvas.getContext('2d');
var shapeDrawer = new ShapeDrawer(canvas, ctx);
var keyTracker = new KeyTracker(canvas);
var foodGen = new FoodGenerator(canvas, ctx);

var players = [];
players.push(new Player('Player 1',200,50,5,keyTracker));
players.push(new Player('Player 2',250,50,5,keyTracker));

var food = foodGen.seed();

requestAnimationFrame(function gameLoop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  for(var j = 0; j < food.length; j++) {
    shapeDrawer.drawFood(food[j]);
  }

  for(var i = 0; i < players.length; i++) {
    shapeDrawer.drawPlayer(players[i]).move();
    players[i].eatFood.call(players[i], food);
    players[i].eatPlayer.call(players[i], players);
  }

  foodGen.replaceFood(food);

  requestAnimationFrame(gameLoop);
});
