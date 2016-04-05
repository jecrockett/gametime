function GamePackager() {
}

GamePackager.prototype = {

  buildGameState: function(players, allFood, allBoosts){
    var basePlayers = this.packagePlayers(players).sort(function(a,b){
      return a.mass - b.mass
    });
    return { players: basePlayers, food: allFood, boosts: allBoosts };
  },

  packagePlayers: function(players){
    var basePlayers =  players.map(function(player){
      return {x: player.x,
              y: player.y,
              name: player.name,
              mass: player.mass,
              color: player.color,
              id: player.id};
    });
    return basePlayers;
  }
};

module.exports = GamePackager;
