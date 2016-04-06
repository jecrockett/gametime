const chai = require('chai');
const assert = chai.assert;

const Player = require('../public/online-player');
const FoodGenerator = require('../lib/food-generator');

describe('OpenCoordinates', function(){
  it('creates food outside all players', function(){
    var canvas = { width: 500, height: 400 };
    var foodGen = new FoodGenerator(canvas.width, canvas.height);

    assert.equal(foodGen.canvasWidth, 500);
    assert.equal(foodGen.canvasHeight, 400);
  });
