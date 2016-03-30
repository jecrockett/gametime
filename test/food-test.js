const chai = require('chai');
const assert = chai.assert;

const Food = require('../lib/food');

describe('Food', function(){
  it('should have an x property', function(){
    let food = new Food({x: 210, y: 30});
    assert.equal( food.x, 210 );
  });

  it('should have a y property', function(){
    let food = new Food({x: 210, y: 30});
    assert.equal( food.y, 30 );
  });
});
