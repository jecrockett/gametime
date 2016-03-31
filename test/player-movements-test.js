const chai = require('chai');
const assert = chai.assert;

const Player = require('../lib/player');
const KeyTracker = require('../lib/keyboard-tracker');

describe('Player movement', function(){
  context('Player 1', function(){
    it('moves to the left independently', function(){
      var canvas = { width: 500, height: 500 };
      var keyTracker = new KeyTracker(canvas);
      let player1 = new Player("Player 1", 10, 10, 5, keyTracker);
      let player2 = new Player("Player 2", 20, 20, 5, keyTracker);

      assert.equal(player1.x, 10);
      assert.equal(player2.x, 20);

      keyTracker.keyPressed[65] = true;
      player1.move();
      player2.move();

      assert.equal(player1.x, 9);
      assert.equal(player2.x, 20);
    });

    it('moves to the right independently', function(){
      var canvas = { width: 500, height: 500 };
      var keyTracker = new KeyTracker(canvas);
      let player1 = new Player("Player 1", 10, 10, 5, keyTracker);
      let player2 = new Player("Player 2", 20, 20, 5, keyTracker);

      assert.equal(player1.x, 10);
      assert.equal(player2.x, 20);

      keyTracker.keyPressed[68] = true;
      player1.move();
      player2.move();

      assert.equal(player1.x, 11);
      assert.equal(player2.x, 20);
    });

    it('moves up independently', function(){
      var canvas = { width: 500, height: 500 };
      var keyTracker = new KeyTracker(canvas);
      let player1 = new Player("Player 1", 10, 10, 5, keyTracker);
      let player2 = new Player("Player 2", 20, 20, 5, keyTracker);

      assert.equal(player1.y, 10);
      assert.equal(player2.y, 20);

      keyTracker.keyPressed[87] = true;
      player1.move();
      player2.move();

      assert.equal(player1.y, 9);
      assert.equal(player2.y, 20);
    });

    it('moves down independently', function(){
      var canvas = { width: 500, height: 500 };
      var keyTracker = new KeyTracker(canvas);
      let player1 = new Player("Player 1", 10, 10, 5, keyTracker);
      let player2 = new Player("Player 2", 20, 20, 5, keyTracker);

      assert.equal(player1.y, 10);
      assert.equal(player2.y, 20);

      keyTracker.keyPressed[83] = true;
      player1.move();
      player2.move();

      assert.equal(player1.y, 11);
      assert.equal(player2.y, 20);
    });
  });

  context('Player 2', function(){
    it('moves to the left independently', function(){
      var canvas = { width: 500, height: 500 };
      var keyTracker = new KeyTracker(canvas);
      let player1 = new Player("Player 1", 10, 10, 5, keyTracker);
      let player2 = new Player("Player 2", 20, 20, 5, keyTracker);

      assert.equal(player1.x, 10);
      assert.equal(player2.x, 20);

      keyTracker.keyPressed[76] = true;
      player1.move();
      player2.move();

      assert.equal(player1.x, 10);
      assert.equal(player2.x, 19);
    });

    it('moves to the right independently', function(){
      var canvas = { width: 500, height: 500 };
      var keyTracker = new KeyTracker(canvas);
      let player1 = new Player("Player 1", 10, 10, 5, keyTracker);
      let player2 = new Player("Player 2", 20, 20, 5, keyTracker);

      assert.equal(player1.x, 10);
      assert.equal(player2.x, 20);

      keyTracker.keyPressed[222] = true;
      player1.move();
      player2.move();

      assert.equal(player1.x, 10);
      assert.equal(player2.x, 21);
    });

    it('moves up independently', function(){
      var canvas = { width: 500, height: 500 };
      var keyTracker = new KeyTracker(canvas);
      let player1 = new Player("Player 1", 10, 10, 5, keyTracker);
      let player2 = new Player("Player 2", 20, 20, 5, keyTracker);

      assert.equal(player1.y, 10);
      assert.equal(player2.y, 20);

      keyTracker.keyPressed[80] = true;
      player1.move();
      player2.move();

      assert.equal(player1.y, 10);
      assert.equal(player2.y, 19);
    });

    it('moves down independently', function(){
      var canvas = { width: 500, height: 500 };
      var keyTracker = new KeyTracker(canvas);
      let player1 = new Player("Player 1", 10, 10, 5, keyTracker);
      let player2 = new Player("Player 2", 20, 20, 5, keyTracker);

      assert.equal(player1.y, 10);
      assert.equal(player2.y, 20);

      keyTracker.keyPressed[186] = true;
      player1.move();
      player2.move();

      assert.equal(player1.y, 10);
      assert.equal(player2.y, 21);
    });
  });
});
