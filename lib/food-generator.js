var Food = require('./food');
var SpeedBoost = require('./speed-boost');
var Virus = require('./virus');
var OpenCoordinates = require('./open-coordinates');

function FoodGenerator(width, height) {
  this.canvasWidth = width;
  this.canvasHeight = height;
  this.coordGenerator = new OpenCoordinates(width, height);
}

FoodGenerator.prototype = {
  seedFood: function(players) {
    var food = [];
    for(var i = 0; i < 200; i++) {
      var foodItem = new Food(this.coordGenerator.create(players));
      food.push(foodItem);
    }
    return food;
  },

  seedSpeedBoosts: function(players) {
    var speedBoosts = [];
    for(var i = 0; i < 15; i++) {
      var boost = new SpeedBoost(this.coordGenerator.create(players));
      speedBoosts.push(boost);
    }
    return speedBoosts;
  },

  seedViruses: function(players) {
    var viruses = [];
    for(var i = 0; i < 8; i++) {
      viruses.push(new Virus(this.coordGenerator.create(players)));
    }
    return viruses;
  },

  replaceFood: function(allFood, speedBoosts, players, viruses) {
    while(allFood.length < 200) {
      var foodItem = new Food(this.coordGenerator.create(players));
      allFood.push(foodItem);
    }
    while(speedBoosts.length < 15) {
      speedBoosts.push(new SpeedBoost(this.coordGenerator.create(players)));
    }
    while(viruses.length < 8) {
      viruses.push(new Virus(this.coordGenerator.create(players)));
    }
  },

  shuffleViruses: function(viruses, players){
    for(i = 0; i < viruses.length; i++) {
      if(viruses[i].birthTime < Date.now() - 300000){
        viruses.splice(i, 1);
        viruses.push(new Virus(this.coordGenerator.create(players)));
      }
    }
  }
};

module.exports = FoodGenerator;
