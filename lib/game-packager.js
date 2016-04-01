function GamePackager(players) {
  this.gameState = {};
  this.gameState['food'] = "food";
  this.gameState['boosts'] = "boosts";
  this.gameState['players'] = this.packagePlayers(players);
};

GamePackager.prototype = {

  packagePlayers: function(players){
    return players.map(function(player){
      { x: player.x,
        y: player.y,
        name: player.name,
        mass: player.mass
       };
  });
};

module.exports = GamePackager;
