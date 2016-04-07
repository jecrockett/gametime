const chai = require('chai');
const assert = chai.assert;

const OnlinePlayer = require('../lib/player');

describe('Players eating each other', function(){
  context('One player can eat another player', function(){
    it('Resets the mass and speed of the smaller player', function(){
      var player1 = new OnlinePlayer("id", "Tom Brady", 50, 50);
      var player2 = new OnlinePlayer("id", "Peyton Manning", 50, 50);
      player1.mass = 20;
      player2.mass = 10;
      player2.speed = 1;

      var players = [player1, player2];

      player1.eatPlayer(players);

      assert.equal(player2.mass, 7);
      assert.equal(player2.speed, 5);
    });

    it('Consumes when the larger player overlaps more than half the radius of the smaller player', function(){
      var player1 = new OnlinePlayer("id", "Tom Brady", 50, 50);
      var player2 = new OnlinePlayer("id", "Peyton Manning", 50, 64);
      player1.mass = 20;
      player2.mass = 10;
      player2.speed = 1;
      var players = [player1, player2];

      player1.eatPlayer(players);

      assert.equal(player2.mass, 7);
      assert.equal(player2.speed, 5);
    });
  });

  context('Players cannot eat each other', function(){
    it('Does not consume if neither is big enough', function(){
      var player1 = new OnlinePlayer("id", "Tom Brady", 50, 50);
      var player2 = new OnlinePlayer("id", "Peyton Manning", 50, 50);
      player1.mass = 11;
      player1.speed = 2;
      player2.mass = 10;
      player2.speed = 2;
      var players = [player1, player2];

      player1.eatPlayer(players);
      player2.eatPlayer(players);

      assert.equal(player1.mass, 11);
      assert.equal(player1.speed, 2);
      assert.equal(player2.mass, 10);
      assert.equal(player2.speed, 2);
    });

    it('Does not consume if the larger player overlaps half the radius of the smaller player or less', function(){
      var player1 = new OnlinePlayer("id", "Tom Brady", 50, 50);
      var player2 = new OnlinePlayer("id", "Peyton Manning", 50, 65);
      player1.mass = 20;
      player2.mass = 10;

      var players = [player1, player2];

      player1.eatPlayer(players);

      assert.equal(player2.mass, 10);

      player2.moveDown();
      player1.eatPlayer(players);

      assert.equal(player2.mass, 10);
    });
  });
});
