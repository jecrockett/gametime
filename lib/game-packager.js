function GamePackager() {
}

GamePackager.prototype = {

  buildGameState: function(players){
    basePlayers = this.packagePlayers(players);
    return { players: basePlayers };
  },

  packagePlayers: function(players){
    var basePlayers =  players.map(function(player){
      return {x: player.x,
              y: player.y,
              name: player.name,
              mass: player.mass};
    });
    return basePlayers;
  }
};

module.exports = GamePackager;
