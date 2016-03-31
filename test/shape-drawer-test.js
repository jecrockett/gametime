const chai = require('chai');
const assert = chai.assert;

const ShapeDrawer = require('../lib/shape-drawer');

describe('ShapeDrawer properties', function(){
  it('has a canvas', function(){
    var canvas = { width: 500, height: 500 };
    var shapeDrawer = new ShapeDrawer(canvas);
    assert.isDefined(shapeDrawer.canvas, "ShapeDrawer does not have a canvas");
  });
});
