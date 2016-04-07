const chai   = require('chai');
const assert = chai.assert;

const Player          = require('../lib/player');
const OpenCoordinates = require('../lib/open-coordinates');

describe('OpenCoordinates', function(){
  context('creates coordinates', function(){
    it('outside all players', function(){
      var canvas = { width: 500, height: 400 };
      var player = new Player(1, "J", 5, 5, "black");
      var player2 = new Player(2, "k", 345, 255, "white");
      var players = [player, player2];
      var openCoordMaker = new OpenCoordinates(canvas.width, canvas.height);
      var coords = [];
      for(var i = 0; i < 200; i++) {
        var openCoords = openCoordMaker.create(players);
        coords.push(openCoords);
      }
      coords.forEach(function(singleCoord){
        var x1Diff = singleCoord.x - player.x;
        var y1Diff = singleCoord.y - player.y;
        var distance = Math.sqrt( x1Diff*x1Diff + y1Diff*y1Diff);
        assert(distance > (player.mass + 20), "coordinates are inside player");
        var x2Diff = singleCoord.x - player2.x;
        var y2Diff = singleCoord.y - player2.y;
        var distance2 = Math.sqrt( x2Diff*x2Diff + y2Diff*y2Diff);
        assert(distance2 > (player2.mass + 20), "coordinates are inside player");
      });
    });
  });
});
