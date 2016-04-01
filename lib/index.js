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
players.push(new Player('Player 1',200,50,8,keyTracker));
players.push(new Player('Player 2',250,50,8,keyTracker));

var food = foodGen.seedFood();
var boosts = foodGen.seedSpeedBoosts();

requestAnimationFrame(function gameLoop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  for(var i = 0; i < food.length; i++) {
    shapeDrawer.drawFood(food[i]);
  }

  for(var j = 0; j < players.length; j++) {
    players[j].resetSpeedBoost();
    shapeDrawer.drawPlayer(players[j]).move();
    players[j].eatFood.call(players[j], food);
    players[j].eatBoosts.call(players[j], boosts);
    players[j].eatPlayer.call(players[j], players);
  }

  for(var k = 0; k < boosts.length; k++) {
    shapeDrawer.drawFood(boosts[k]);
  }

  foodGen.replaceFood(food, boosts);

  requestAnimationFrame(gameLoop);
});
