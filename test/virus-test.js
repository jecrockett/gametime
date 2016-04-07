const chai = require('chai');
const assert = chai.assert;

const Virus = require('../lib/virus');

describe('Virus', function(){
  context('properties', function(){
    it('should have an x property', function(){
      let virus = new Virus({x: 40, y: 300});
      assert.equal(virus.x, 40);
    });

    it('should have a y property', function(){
      let virus = new Virus({x: 40, y: 300});
      assert.equal(virus.y, 300);
    });

    it('should have a default mass', function(){
      let virus = new Virus({x: 40, y: 300});
      assert.isAbove(virus.mass, 0);
    });

    it('should be red by default', function(){
      let virus = new Virus({x: 40, y: 300});
      assert.equal(virus.color, 'red');
    });
  });

  context('movement', function(){
    it('moves the first virus towards the largest player (positive)', function(){
      let virus = new Virus({x:100, y:100});
      let testPlayer = {x: 150, y: 150};
      virus.moveVirus(testPlayer);
      assert.isAbove(virus.x, 100);
      assert.isAbove(virus.y, 100);
    });

    it('moves the first virus towards the largest player (negative)', function(){
      let virus = new Virus({x:100, y:100});
      let testPlayer = {x: 50, y: 50};
      virus.moveVirus(testPlayer);
      assert.isBelow(virus.x, 100);
      assert.isBelow(virus.y, 100);
    });
  });
});
