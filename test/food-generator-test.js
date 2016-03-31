const chai = require('chai');
const assert = chai.assert;

const FoodGenerator = require('../lib/food-generator');

describe('FoodGenerator', function(){
  it('knows the canvas width and height', function(){
    var canvas = { width: 500, height: 400 };
    var foodGen = new FoodGenerator(canvas);

    assert.isDefined(foodGen.canvas, 'FoodGenerator does not have a canvas');
    assert.equal(foodGen.canvas.width, 500);
    assert.equal(foodGen.canvas.height, 400);
  });

  it('has a shape drawer', function() {
    var canvas = { width: 500, height: 400 };
    var foodGen = new FoodGenerator(canvas);

    assert.isDefined(foodGen.drawer, 'ShapeDrawer has not been defined');
  });

  context('Runs the seed function', function(){
    it('creates fifty food items', function(){
      var canvas = { width: 500, height: 400 };
      var foodGen = new FoodGenerator(canvas);

      assert.lengthOf(foodGen.seed(), 50, "Array of food items is not equal to 50");
    });
  });

  context('Runs the randOnCanvas function', function(){
    it('creates random numbers in the correct range', function(){
      var canvas = { width: 500, height: 400 };
      var foodGen = new FoodGenerator(canvas);
      var coords = foodGen.randOnCanvas();
      assert.isAbove(coords.x, 4, 'X is > 4');
      assert.isBelow(coords.x, 496, 'X is < 496');
      assert.isAbove(coords.y, 4, 'Y is > 4');
      assert.isBelow(coords.y, 396, 'Y is < 396');
    });
  });
});
