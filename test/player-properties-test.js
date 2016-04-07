const chai = require('chai');
const assert = chai.assert;

const Player = require('../lib/player');

describe('Player', function(){
  context('Player properties', function(){
    it('assigns the player a name', function(){
      var player = new Player("id", "Joe", 10, 10);
      assert.equal(player.name, "Joe", "Name is not correctly assigned");
    });

    it('assigns player coordinates', function(){
      var player = new Player("id", "Joe", 10, 15);
      assert.equal(player.x, 10, "x coordinate is not correctly assigned.");
      assert.equal(player.y, 15, "y coordinate is not correctly assigned.");
    });

    it('assigns the player id', function(){
      var player = new Player("id", "Joe", 10, 10);
      assert.equal(player.id, "id", "ID is not correctly assigned.");
    });

    it('player color defaults to white', function(){
      var player = new Player("id", "Joe", 10, 10);
      assert.equal(player.color, "white", "Default color is not correctly assigned.");
    });

    it('player speedBoostTime defaults to null', function(){
      var player = new Player("id", "Joe", 10, 10);
      assert.equal(player.speedBoostTime, null, "Default speedBoostTime is not correctly assigned.");
    });
  });

  context('Resetting player propterties after being eaten', function() {
    it('resets properties to default values', function() {
      var player = new Player("id", "Joe", 0, 0);
      var time = Date.now();
      player.mass = 100;
      player.speed = 2;
      this.speedBoostTime = time;

      player.resetPlayer();

      assert.notEqual(player.x, 10);
      assert.notEqual(player.y, 10);

      assert.notEqual(player.mass, 100);
      assert.equal(player.mass, 7);

      assert.notEqual(player.speed, 2);
      assert.equal(player.speed, 5);

      assert.notEqual(player.speedBoostTime, time);
      assert.equal(player.speedBoostTime, null);
    });
  });
});
