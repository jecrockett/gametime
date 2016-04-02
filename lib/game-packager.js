function GamePackager(players) {
  this.gameState = {};
  this.gameState['food'] = "food";
  this.gameState['boosts'] = "boosts";
  this.gameState['players'] = this.packagePlayers(players);
}

GamePackager.prototype = {

  // packageGame: function(players) {
  //   packagePlayers(players);
  // }

  packagePlayers: function(players){
    var state =  players.map(function(player){
      return {x: player.x,
              y: player.y,
              name: player.name,
              mass: player.mass};
    });
    return state;
  }
};

module.exports = GamePackager;
