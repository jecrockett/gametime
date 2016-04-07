const chai = require('chai');
const assert = chai.assert;

const Player = require('../public/online-player');

describe('Player movement', function(){
  context('General movement', function(){
    it('moves to the left when A is pressed', function(){
      var keysPressed = {65: true};
      var player = new Player("id", "Player 1", 100, 100);

      assert.equal(player.x, 100);

      var startingX = player.x;
      player.move(keysPressed);

      assert.equal(player.x, (startingX - player.speed));
    });

    it('moves to the right when D is pressed', function(){
      var keysPressed = {68: true};
      var player = new Player("id", "Player 1", 100, 100);

      assert.equal(player.x, 100);

      var startingX = player.x;
      player.move(keysPressed);

      assert.equal(player.x, (startingX + player.speed));
    });

    it('moves up when W is pressed', function(){
      var keysPressed = {87: true};
      var player = new Player("id", "Player 1", 100, 100);

      assert.equal(player.y, 100);

      var startingY = player.y;
      player.move(keysPressed);

      assert.equal(player.y, (startingY - player.speed));
    });

    it('moves down when S is pressed', function(){
      var keysPressed = {83: true};
      var player = new Player("id", "Player 1", 100, 100);

      assert.equal(player.y, 100);

      var startingY = player.y;
      player.move(keysPressed);

      assert.equal(player.y, (startingY + player.speed));
    });
  });

  context('Player circle reaches the edge of the canvas', function(){
    it("cannot move past the left edge", function() {
      var keysPressed = {65: true};
      var player = new Player("id", "Player 1", 7, 100);
      var canMoveLeft = player.canMoveLeft();

      player.move(keysPressed);

      assert.equal(canMoveLeft, false);
      assert.equal(player.x, 7);
    });

    it("cannot move past the right edge", function() {
      var keysPressed = {68: true};
      var player = new Player("id", "Player 1", 2393, 100);
      var canMoveRight = player.canMoveRight();

      player.move(keysPressed);

      assert.equal(canMoveRight, false);
      assert.equal(player.x, 2393);
    });

    it("cannot move past the top edge", function() {
      var keysPressed = {87: true};
      var player = new Player("id", "Player 1", 100, 7);
      var canMoveUp = player.canMoveUp();

      player.move(keysPressed);

      assert.equal(canMoveUp, false);
      assert.equal(player.y, 7);
    });

    it("cannot move past the bottom edge", function() {
      var keysPressed = {83: true};
      var player = new Player("id", "Player 1", 100, 2393);
      var canMoveDown = player.canMoveDown();

      player.move(keysPressed);

      assert.equal(canMoveDown, false);
      assert.equal(player.y, 2393);
    });
  });
});
