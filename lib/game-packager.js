function GamePackager() {
}

GamePackager.prototype = {

  buildGameState: function(players, allFood, allBoosts, allViruses){
    var basePlayers = this.packagePlayers(players).sort(function(a,b){
      return a.mass - b.mass;
    });

    if(basePlayers.length > 0){
      allViruses[0].moveVirus(basePlayers[(basePlayers.length-1)]);
    }

    return { players: basePlayers,
             food: allFood,
             boosts: allBoosts,
             viruses: allViruses};
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
