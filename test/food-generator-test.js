const chai = require('chai');
const assert = chai.assert;

const Player = require('../lib/player');
const FoodGenerator = require('../lib/food-generator');

describe('FoodGenerator', function(){
  it('knows the canvas width and height', function(){
    var canvas = { width: 500, height: 400 };
    var foodGen = new FoodGenerator(canvas.width, canvas.height);

    assert.equal(foodGen.canvasWidth, 500);
    assert.equal(foodGen.canvasHeight, 400);
  });

  context('Runs the seedFood function', function(){
    it('creates fifty food items', function(){
      var canvas = { width: 500, height: 400 };
      var foodGen = new FoodGenerator(canvas.width, canvas.height);
      var player = new Player(1, "J", 5, 5);
      var players = [player];
      assert.lengthOf(foodGen.seedFood(players), 200, "Array of food items is not equal to 200");
    });

    it('creates random numbers in the correct range', function(){
      var canvas = { width: 500, height: 400 };
      var foodGen = new FoodGenerator(canvas.width, canvas.height);
      var player = new Player(1, "J", 5, 5);
      var players = [player];
      var coords = foodGen.seedFood(players);
      assert.isAbove(coords[0].x, 4, 'X is > 4');
      assert.isBelow(coords[0].x, 496, 'X is < 496');
      assert.isAbove(coords[0].y, 4, 'Y is > 4');
      assert.isBelow(coords[0].y, 396, 'Y is < 396');
    });
  });

  context('Runs the seedSpeedBoosts function', function(){
    it('creates fifteen speedBoost items', function(){
      var canvas = { width: 500, height: 400 };
      var foodGen = new FoodGenerator(canvas.width, canvas.height);
      var player = new Player(1, "J", 5, 5);
      var players = [player];
      assert.lengthOf(foodGen.seedSpeedBoosts(players), 15, "Array of speedBoost items is not equal to 15");
    });
  });

  context('Runs the seedViruses function', function(){
    it('creates three virus items', function(){
      var canvas = { width: 500, height: 400 };
      var foodGen = new FoodGenerator(canvas.width, canvas.height);
      var player = new Player(1, "J", 5, 5);
      var players = [player];
      assert.lengthOf(foodGen.seedViruses(players), 3, "Array of virus items is not equal to 8");
    });
  });

  context('Runs the replaceFood function', function(){
    it('replaces food when the array of food is beneath 200', function(){
      var canvas = { width: 500, height: 400 };
      var foodGen = new FoodGenerator(canvas.width, canvas.height);
      var player = new Player(1, "J", 5, 5);
      var players = [player];
      var allFood = foodGen.seedFood(players);
      var speedBoosts = foodGen.seedSpeedBoosts(players);
      var viruses = foodGen.seedViruses(players);
      assert.lengthOf(allFood, 200, "Array of food items is not equal to 200");
      allFood.splice(0, 1);
      assert.lengthOf(allFood, 199, "Array of food items is not equal to 199");
      foodGen.replaceFood(allFood, speedBoosts, players, viruses);
      assert.isAbove(allFood.length, 199, "Array of food items is not equal to 200");
    });
  });
});
