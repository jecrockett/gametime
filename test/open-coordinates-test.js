const chai   = require('chai');
const assert = chai.assert;

const Player          = require('../public/online-player');
const OpenCoordinates = require('../lib/open-coordinates');

describe('OpenCoordinates', function(){
  context('creates coordinates', function(){
    it('outside all players', function(){
      var canvas = { width: 500, height: 400 };
      var player = new Player(1, "J", 5, 5, "black");
      var playerCoords = { x: 5, y: 5};
      var players = [player];
      var openCoordMaker = new OpenCoordinates(canvas.width, canvas.height);
      var coords = [];
      for(var i = 0; i < 200; i++) {
        var openCoords = openCoordMaker.create(players);
        coords.push(openCoords);
      }
      console.log(coords);
      console.log(player);

      coords.forEach(function(singleCoord){
        assert.notEqual(singleCoord, playerCoords);
      });
    });
  });
});
