const chai   = require('chai');
const assert = chai.assert;

const Player          = require('../public/online-player');
const OpenCoordinates = require('../lib/open-coordinates');

describe('OpenCoordinates', function(){
  context('creates coordinates', function(){
    it('outside all players', function(){
      var canvas = { width: 500, height: 400 };
      var player = new Player(1, "J", 5, 5, "black");
      var player2 = new Player(2, "k", 345, 255, "white");
      var playerCoords = { x: player.x, y: player.y};
      var player2Coords = { x: player2.x, y: player2.y};
      var players = [player, player2];
      var openCoordMaker = new OpenCoordinates(canvas.width, canvas.height);
      var coords = [];
      for(var i = 0; i < 200; i++) {
        var openCoords = openCoordMaker.create(players);
        coords.push(openCoords);
      }

      coords.forEach(function(singleCoord){
        assert.notEqual(singleCoord, playerCoords);
        assert.notEqual(singleCoord, player2Coords);
      });
    });
  });
});
