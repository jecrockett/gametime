const chai = require('chai');
const assert = chai.assert;

const Player = require('../lib/player');
const KeyTracker = require('../lib/keyboard-tracker');

describe('Player', function(){
  context('Assigned player properties', function(){
    it('player name is correctly assigned', function(){
      var canvas = { width: 500, height: 500 };
      var keyTracker = new KeyTracker(canvas);
      let player = new Player("Joe", 10, 10, 5, keyTracker);
      assert.equal(player.name, "Joe", "Name is not the assigned name Joe");
    });

    it('player coordinates are correctly assigned', function(){
      var canvas = { width: 500, height: 500 };
      var keyTracker = new KeyTracker(canvas);
      let player = new Player("Joe", 10, 15, 5, keyTracker);
      assert.equal(player.x, 10, "x coordinate is not the assigned value of 10");
      assert.equal(player.y, 15, "y coordinate is not the assigned value of 15");
    });

    it('player mass is correctly assigned', function(){
      var canvas = { width: 500, height: 500 };
      var keyTracker = new KeyTracker(canvas);
      let player = new Player("Joe", 10, 10, 9, keyTracker);
      assert.equal(player.mass, 9, "Mass is not the assigned value of of 9");
    });

    it('player mass defaults to 5 if unassigned', function(){
      var canvas = { width: 500, height: 500 };
      var keyTracker = new KeyTracker(canvas);
      let player = new Player("Joe", 10, 10, null, keyTracker);
      assert.equal(player.mass, 5, "Mass is not the default value of of 5");
    });

    it('player keyTracker is correctly assigned', function(){
      var canvas = { width: 500, height: 500 };
      var keyTracker = new KeyTracker(canvas);
      let player = new Player("Joe", 10, 10, 5, keyTracker);
      assert.isDefined(player.keyTracker, "keyTracker is undefined");
    });
  });    
});
