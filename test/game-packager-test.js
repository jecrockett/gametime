const chai = require('chai');
const assert = chai.assert;

const GamePackager = require('../lib/game-packager');
const OnlinePlayer = require('../public/online-player');
const Food = require('../lib/food');
const SpeedBoost = require('../lib/speed-boost');
const Virus = require('../lib/virus');

describe('GamePackager', function(){
  context('buildGameState', function(){
    it('compiles and returns game state object', function(){
      var player1 = new OnlinePlayer('id1', 'name1', 150, 150, 'blue');
      var player2 = new OnlinePlayer('id2', 'name2', 250, 250, 'red');
      var players = [player1, player2];
      var allFood = [new Food({x: 100, y: 200}), new Food({x: 50, y: 75})];
      var allBoosts = [new Food({x: 100, y: 200}), new Food({x: 50, y: 75})];
      var allViruses = [new Food({x: 100, y: 200}), new Food({x: 50, y: 75})];

      var gamePackager = new GamePackager();
      var gameState = gamePackager.buildGameState(players, allFood, allBoosts, allViruses);

      assert.equal(gameState.players.length, 2);
      assert.equal(gameState.food.length, 2);
      assert.equal(gameState.boosts.length, 2);
      assert.equal(gameState.viruses.length, 2);

      assert.equal(gameState.players[0].id, 'id1');
      assert.equal(gameState.players[0].name, 'name1');
      assert.equal(gameState.food[0].x, 100);
      assert.equal(gameState.food[0].y, 200);
      assert.equal(gameState.boosts[0].x, 100);
      assert.equal(gameState.boosts[0].y, 200);
      assert.equal(gameState.viruses[0].x, 100);
      assert.equal(gameState.viruses[0].y, 200);
    });
  });

  context('packagePlayers', function(){
    it('reduces online-player and returns simplified object', function(){
      var player1 = new OnlinePlayer('id1', 'name1', 150, 160, 'blue');
      var player2 = new OnlinePlayer('id2', 'name2', 250, 260, 'red');
      var players = [player1, player2];
      
      var gamePackager = new GamePackager();
      var basePlayers = gamePackager.packagePlayers(players);

      assert.equal(basePlayers.length, 2);
      assert.equal(basePlayers[0].id, 'id1');
      assert.equal(basePlayers[0].name, 'name1');
      console.log(basePlayers);
      assert.equal(basePlayers[0].x, 150);
      assert.equal(basePlayers[0].y, 160);
      assert.isAbove(basePlayers[0].mass, 0);
      assert.equal(basePlayers[0].color, 'blue');

      assert.isUndefined(basePlayers[0].speed);
      assert.isUndefined(basePlayers[0].speedBoostTime);
    });
  });
});
