const chai = require('chai');
const assert = chai.assert;

const SpeedBoost = require('../lib/speed-boost');

describe('SpeedBoost', function(){
  it('should have an x property', function(){
    let speedBoost = new SpeedBoost({x: 260, y: 140});
    assert.equal(speedBoost.x, 260);
  });

  it('should have a y property', function(){
    let speedBoost = new SpeedBoost({x: 260, y: 140});
    assert.equal(speedBoost.y, 140);
  });

  it('should have a default mass', function(){
    let speedBoost = new SpeedBoost({x: 260, y: 140});
    assert.isAbove(speedBoost.mass, 0);
  });

  it('should be green by default', function(){
    let speedBoost = new SpeedBoost({x: 260, y: 140});
    assert.equal(speedBoost.color, '#42c32e');
  });
});
