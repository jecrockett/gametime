const chai = require('chai');
const assert = chai.assert;

const Player = require('../public/online-player');
const SpeedBoost = require('../lib/speed-boost');

describe('Player eating speed boosts', function(){
  it('deletes the boost from the boost array', function() {
    let player = new Player("id", "Joe", 10, 10);
    var boost1 = new SpeedBoost( { x: 8, y: 8} );
    var boost2 = new SpeedBoost( { x: 100, y: 100} );
    var boostArray = [boost1, boost2];

    assert.equal(boostArray.length, 2);

    player.eatBoosts(boostArray);

    assert.equal(boostArray.length, 1);
    assert.notInclude(boostArray, boost1);
  });

  it("makes the player move twice as far", function() {
    var keysPressed = {65: true};
    let player = new Player("id", "Joe", 100, 100);
    var boost = new SpeedBoost( { x: player.x - player.mass, y: player.y} );
    var boostArray = [boost];

    assert.equal(player.x, 100);

    player.move(keysPressed);
    assert.equal(player.x, 95);

    player.eatBoosts(boostArray);
    player.resetBoosts();

    player.move(keysPressed);
    assert.equal(player.x, 85);
  });

  it("stops doubling a boosted player's movement after 1200 ms", function() {
    var keysPressed = {65: true};
    let player = new Player("id", "Joe", 100, 100);
    var boost = new SpeedBoost( { x: player.x, y: player.y} );
    var boostArray = [boost];

    player.eatBoosts(boostArray);
    player.speedBoostTime = Date.now() - 1201;
    player.resetBoosts();
    player.move(keysPressed);

    assert.equal(player.x, 95);
  });
});
