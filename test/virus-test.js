const chai = require('chai');
const assert = chai.assert;

const Virus = require('../lib/virus');

describe('Virus', function(){
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
