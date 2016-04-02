const chai = require('chai');
const assert = chai.assert;

const Player = require('../lib/player');
const KeyTracker = require('../lib/keyboard-tracker');
const Food = require('../lib/food');

describe('Player eats food', function(){
  it('grows as they eat', function(){
    var canvas = { width: 500, height: 500 };
    var keyTracker = new KeyTracker(canvas);
    let player1 = new Player("Player 1", 5, 5, 5, keyTracker);
    var food1 = new Food( { x: 6, y: 6} );
    var foodArray = [food1];

    assert.equal(player1.mass, 5);
    player1.eatFood(foodArray);
    assert(player1.mass > 5);
  });

  it('moves slower as they eat', function(){
    var canvas = { width: 500, height: 500 };
    var keyTracker = new KeyTracker(canvas);
    let player1 = new Player("Player 1", 5, 5, 5, keyTracker);
    var food1 = new Food( { x: 6, y: 6} );
    var foodArray = [food1];

    assert.equal(player1.speed, 5);
    player1.eatFood(foodArray);
    assert(player1.speed < 5);
  });
});
