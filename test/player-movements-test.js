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

      var player1StartXcoor = player1.x

      keyTracker.keyPressed[65] = true;
      player1.move();
      player2.move();

      assert.equal(player1.x, player1StartXcoor - player1.speed);
      assert.equal(player2.x, 20);
    });

    it('moves to the right independently', function(){
      var canvas = { width: 500, height: 500 };
      var keyTracker = new KeyTracker(canvas);
      let player1 = new Player("Player 1", 10, 10, 5, keyTracker);
      let player2 = new Player("Player 2", 20, 20, 5, keyTracker);

      var player1StartXcoor = player1.x

      assert.equal(player1.x, 10);
      assert.equal(player2.x, 20);

      keyTracker.keyPressed[68] = true;
      player1.move();
      player2.move();

      assert.equal(player1.x, player1StartXcoor + player1.speed);
      assert.equal(player2.x, 20);
    });

    it('moves up independently', function(){
      var canvas = { width: 500, height: 500 };
      var keyTracker = new KeyTracker(canvas);
      let player1 = new Player("Player 1", 10, 10, 5, keyTracker);
      let player2 = new Player("Player 2", 20, 20, 5, keyTracker);

      var player1StartYcoor = player1.y

      assert.equal(player1.y, 10);
      assert.equal(player2.y, 20);

      keyTracker.keyPressed[87] = true;
      player1.move();
      player2.move();

      assert.equal(player1.y, player1StartYcoor - player1.speed);
      assert.equal(player2.y, 20);
    });

    it('moves down independently', function(){
      var canvas = { width: 500, height: 500 };
      var keyTracker = new KeyTracker(canvas);
      let player1 = new Player("Player 1", 10, 10, 5, keyTracker);
      let player2 = new Player("Player 2", 20, 20, 5, keyTracker);

      assert.equal(player1.y, 10);
      assert.equal(player2.y, 20);

      var player1StartYcoor = player1.y

      keyTracker.keyPressed[83] = true;
      player1.move();
      player2.move();

      assert.equal(player1.y, player1StartYcoor + player1.speed);
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

      var player1StartXcoor = player2.x

      keyTracker.keyPressed[76] = true;
      player1.move();
      player2.move();

      assert.equal(player1.x, 10);
      assert.equal(player2.x, player1StartXcoor - player2.speed);
    });

    it('moves to the right independently', function(){
      var canvas = { width: 500, height: 500 };
      var keyTracker = new KeyTracker(canvas);
      let player1 = new Player("Player 1", 10, 10, 5, keyTracker);
      let player2 = new Player("Player 2", 20, 20, 5, keyTracker);

      assert.equal(player1.x, 10);
      assert.equal(player2.x, 20);

      var player1StartXcoor = player2.x

      keyTracker.keyPressed[222] = true;
      player1.move();
      player2.move();

      assert.equal(player1.x, 10);
      assert.equal(player2.x, player1StartXcoor + player2.speed);
    });

    it('moves up independently', function(){
      var canvas = { width: 500, height: 500 };
      var keyTracker = new KeyTracker(canvas);
      let player1 = new Player("Player 1", 10, 10, 5, keyTracker);
      let player2 = new Player("Player 2", 20, 20, 5, keyTracker);

      assert.equal(player1.y, 10);
      assert.equal(player2.y, 20);

      var player2StartYcoor = player2.y

      keyTracker.keyPressed[80] = true;
      player1.move();
      player2.move();

      assert.equal(player1.y, 10);
      assert.equal(player2.y, player2StartYcoor - player2.speed);
    });

    it('moves down independently', function(){
      var canvas = { width: 500, height: 500 };
      var keyTracker = new KeyTracker(canvas);
      let player1 = new Player("Player 1", 10, 10, 5, keyTracker);
      let player2 = new Player("Player 2", 20, 20, 5, keyTracker);

      assert.equal(player1.y, 10);
      assert.equal(player2.y, 20);

      var player2StartYcoor = player2.y

      keyTracker.keyPressed[186] = true;
      player1.move();
      player2.move();

      assert.equal(player1.y, 10);
      assert.equal(player2.y, player2StartYcoor + player2.speed);
    });
  });

  context('players cannot move beyond the edge of the canvas', function(){
    it("can not move left when already at the left edge", function() {
      var canvas = { width: 500, height: 500 };
      var keyTracker = new KeyTracker(canvas);
      let player1 = new Player("Player 1", 0, 10, 5, keyTracker);
      let player2 = new Player("Player 2", 0, 20, 5, keyTracker);

      assert.equal(player1.x, 0);
      assert.equal(player2.x, 0);

      keyTracker.keyPressed[65] = true;
      keyTracker.keyPressed[76] = true;

      player1.move();
      player2.move();

      assert.equal(player1.x, 0);
      assert.equal(player2.x, 0);
    });

    it("cannot move right when already at the right edge", function() {
      var canvas = { width: 500, height: 500 };
      var keyTracker = new KeyTracker(canvas);
      let player1 = new Player("Player 1", canvas.width, 10, 5, keyTracker);
      let player2 = new Player("Player 2", canvas.width, 20, 5, keyTracker);

      assert.equal(player1.x, canvas.width);
      assert.equal(player2.x, canvas.width);

      keyTracker.keyPressed[68] = true;
      keyTracker.keyPressed[222] = true;

      player1.move();
      player2.move();

      assert.equal(player1.x, canvas.width);
      assert.equal(player2.x, canvas.width);
    });

    it("cannot move up when already at the top edge", function() {
      var canvas = { width: 500, height: 500 };
      var keyTracker = new KeyTracker(canvas);
      let player1 = new Player("Player 1", 10, 0, 5, keyTracker);
      let player2 = new Player("Player 2", 20, 0, 5, keyTracker);

      assert.equal(player1.y, 0);
      assert.equal(player2.y, 0);

      keyTracker.keyPressed[87] = true;
      keyTracker.keyPressed[80] = true;

      player1.move();
      player2.move();

      assert.equal(player1.y, 0);
      assert.equal(player2.y, 0);
    });

    it("cannot move down when already at the bottom edge", function() {
      var canvas = { width: 500, height: 500 };
      var keyTracker = new KeyTracker(canvas);
      let player1 = new Player("Player 1", 10, canvas.height, 5, keyTracker);
      let player2 = new Player("Player 2", 20, canvas.height, 5, keyTracker);

      assert.equal(player1.y, canvas.height);
      assert.equal(player2.y, canvas.height);

      keyTracker.keyPressed[83] = true;
      keyTracker.keyPressed[186] = true;

      player1.move();
      player2.move();

      assert.equal(player1.y, canvas.height);
      assert.equal(player2.y, canvas.height);
    });
  });
});
