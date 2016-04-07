const chai = require('chai');
const assert = chai.assert;

const Player = require('../lib/player');
const Food = require('../lib/food');

describe('Player eating food', function(){
  it('deletes the food item from the food array', function(){
    let player = new Player("id", "Joe", 10, 10);
    var food1 = new Food( { x: 8, y: 8} );
    var food2 = new Food( { x: 100, y: 100} );
    var foodArray = [food1, food2];

    assert.equal(foodArray.length, 2);

    player.eatFood(foodArray);

    assert.equal(foodArray.length, 1);
    assert.notInclude(foodArray, food1);
  });

  it('increases the player mass', function(){
    let player = new Player("id", "Joe", 10, 10);
    var food = new Food( { x: 8, y: 8} );
    var foodArray = [food];

    assert.equal(player.mass, 7);

    player.eatFood(foodArray);

    assert.equal(player.mass, 8);
  });

  it('decreases the player speed', function(){
    let player = new Player("id", "Joe", 10, 10);
    var food = new Food( { x: 8, y: 8} );
    var foodArray = [food];

    assert.equal(player.speed, 5);

    player.eatFood(foodArray);
    player.updateSpeed();

    assert.equal(player.speed, 4.985);
  });

  it('cannot skip over food at starting speed', function(){
    let player = new Player("id", "Player 1", 27, 20);
    var keysPressed = {65: true};
    var food = new Food( { x: (player.x - player.mass), y: player.y} );
    var foodArray = [food];

    assert.equal(foodArray.length, 1);
    assert.equal(player.speed, 5);

    player.eatFood(foodArray);

    assert.equal(foodArray.length, 1);

    player.move(keysPressed);
    player.eatFood(foodArray);

    assert.equal(foodArray.length, 0);
  });

  it('cannot skip over food at max speed', function(){
    // max speed is starting speed times two due to a speed boost
    let player = new Player("id", "Player 1", 27, 20);
    player.speed = (player.speed * 2);
    var keysPressed = {65: true};
    var food = new Food( { x: (player.x - player.mass), y: player.y} );
    var foodArray = [food];

    assert.equal(foodArray.length, 1);

    player.eatFood(foodArray);

    assert.equal(foodArray.length, 1);

    player.move(keysPressed);
    player.eatFood(foodArray);

    assert.equal(foodArray.length, 0);
  });
});
