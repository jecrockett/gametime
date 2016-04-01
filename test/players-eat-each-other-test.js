const chai = require('chai');
const assert = chai.assert;

const Player = require('../lib/player');
const KeyTracker = require('../lib/keyboard-tracker');

describe('Players eat each other or not', function(){
  context('If in Range and one player is big enough', function(){
    it('A player can eat another player', function(){
      var canvas = { width: 500, height: 500 };
      var keyTracker = new KeyTracker(canvas);
      let player1 = new Player("Player 1", 5, 5, 10, keyTracker);
      let player2 = new Player("Player 2", 5, 25, 5, keyTracker);
      var players = [player1, player2];

      assert.equal(players.length, 2);
      assert(players.includes(player2));

      keyTracker.keyPressed[83] = true;
      player1.move();
      player1.move();
      player1.move();
      player1.eatPlayer(players);

      assert.equal(players.length, 1);
      assert.notInclude(players, player2);
    });

    it('A player eats another player no matter how they collide', function(){
      var canvas = { width: 500, height: 500 };
      var keyTracker = new KeyTracker(canvas);
      let player1 = new Player("Player 1", 5, 5, 5, keyTracker);
      let player2 = new Player("Player 2", 5, 55, 50, keyTracker);
      var players = [player1, player2];

      player2.eatPlayer(players); // should not eat player 1 at this point
      assert.equal(players.length, 2);
      assert(players.includes(player1));

      keyTracker.keyPressed[83] = true;
      player1.move();
      player1.move();
      player1.move();
      player1.move();
      player1.move();
      player2.eatPlayer(players);

      assert.equal(players.length, 1);
      assert.notInclude(players, player1);
    });
  });

  context('Players can not eat each other', function(){
    it('When neither is big enough', function(){
      var canvas = { width: 500, height: 500 };
      var keyTracker = new KeyTracker(canvas);
      let player1 = new Player("Player 1", 5, 5, 10, keyTracker);
      let player2 = new Player("Player 2", 5, 25, 9, keyTracker);
      var players = [player1, player2];

      assert.equal(players.length, 2);
      assert(players.includes(player2));

      keyTracker.keyPressed[83] = true;
      player1.move();
      player1.move();
      player1.move();
      player1.eatPlayer(players);

      assert.equal(players.length, 2);
      assert(players.includes(player2));
    });

    it('When one player is too far away to be eaten', function(){
      var canvas = { width: 500, height: 500 };
      var keyTracker = new KeyTracker(canvas);
      let player1 = new Player("Player 1", 5, 5, 5, keyTracker);
      let player2 = new Player("Player 2", 5, 55, 5, keyTracker);
      var players = [player1, player2];

      player2.eatPlayer(players);
      assert.equal(players.length, 2);
      assert(players.includes(player1));

      keyTracker.keyPressed[83] = true;
      player1.move();
      player2.eatPlayer(players);

      assert.equal(players.length, 2);
      assert(players.includes(player1));
    });
  });
});
