const chai = require('chai');
const assert = chai.assert;

const Player = require('../public/online-player');
const Virus = require('../lib/virus');

describe('Player eating viruses', function(){
  context('Player is large enough to consume virus', function() {

    it('deletes the virus from the viruses array', function() {
      var player = new Player("id", "Joe", 10, 10);
      var virus1 = new Virus( { x: 10, y: 10} );
      var virus2 = new Virus( { x: 100, y: 100} );
      var virusesArray = [virus1, virus2];
      player.mass = virus1.mass / 0.89;

      assert.equal(virusesArray.length, 2);

      player.eatViruses(virusesArray);

      assert.equal(virusesArray.length, 1);
      assert.notInclude(virusesArray, virus1);
    });

    it("cuts the player's mass in half", function() {
      var player = new Player("id", "Joe", 10, 10);
      var virus = new Virus( { x: 10, y: 10} );
      var virusesArray = [virus];
      player.mass = virus.mass / 0.89;
      var startingMass = player.mass;

      player.eatViruses(virusesArray);

      assert.equal(player.mass, startingMass/2);
    });
  });

  context("Player is not large enough to consume a virus", function() {
    it('does not delete the virus from the viruses array', function() {
      var player = new Player("id", "Joe", 10, 10);
      var virus1 = new Virus( { x: 10, y: 10} );
      var virus2 = new Virus( { x: 100, y: 100} );
      var virusesArray = [virus1, virus2];
      player.mass = virus1.mass / 0.90;

      assert.equal(virusesArray.length, 2);

      player.eatViruses(virusesArray);

      assert.equal(virusesArray.length, 2);
    });

    it('does not change the player mass', function() {
      var player = new Player("id", "Joe", 10, 10);
      var virus = new Virus( { x: 10, y: 10} );
      var virusesArray = [virus];
      player.mass = virus.mass / 0.90;
      var startingMass = player.mass;

      player.eatViruses(virusesArray);

      assert.equal(virusesArray.length, 1);
      assert.equal(player.mass, startingMass);
    });
  });
});
