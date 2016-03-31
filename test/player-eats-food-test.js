const chai = require('chai');
const assert = chai.assert;

const Player = require('../lib/player');
const KeyTracker = require('../lib/keyboard-tracker');
const Food = require('../lib/food')

describe('Player eats food', function(){
  context('Player 1', function(){
    it('eats a piece of food if its in range', function(){
      var canvas = { width: 500, height: 500 };
      var keyTracker = new KeyTracker(canvas);
      let player1 = new Player("Player 1", 5, 5, 5, keyTracker);
      var food1 = new Food( { x: 6, y: 6} );
      var foodArray = [food1]

      assert.equal(foodArray.length, 1)
      player1.eatFood(foodArray)
      assert.equal(foodArray.length, 0)
    });

    it('does not eat a piece of food if its out of range', function(){
      var canvas = { width: 500, height: 500 };
      var keyTracker = new KeyTracker(canvas);
      let player1 = new Player("Player 1", 5, 5, 5, keyTracker);
      var food1 = new Food( { x: 5, y: 20} );
      var foodArray = [food1]

      assert.equal(foodArray.length, 1)
      player1.eatFood(foodArray)
      assert.equal(foodArray.length, 1)

      keyTracker.keyPressed[83] = true;
      for(var i = 0; i < 10; i++){
        player1.move();
      };

      player1.eatFood(foodArray)
      assert.equal(foodArray.length, 1)
    });

    it('moves towards food and eats a piece of food if its in range', function(){
      var canvas = { width: 500, height: 500 };
      var keyTracker = new KeyTracker(canvas);
      let player1 = new Player("Player 1", 5, 5, 5, keyTracker);
      var food1 = new Food( { x: 5, y: 20} );
      var foodArray = [food1]

      assert.equal(foodArray.length, 1)
      player1.eatFood(foodArray)
      assert.equal(foodArray.length, 1)

      keyTracker.keyPressed[83] = true;
      for(var i = 0; i < 10; i++){
        player1.move();
      };
      assert.equal(foodArray.length, 1)

      player1.move()
      player1.eatFood(foodArray)
      assert.equal(foodArray.length, 0)
    });
  });
});
