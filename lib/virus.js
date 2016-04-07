function Virus(coords) {
  this.x = coords.x;
  this.y = coords.y;
  this.mass = 20;
  this.color = 'red';
  this.birthTime = Date.now();
}

Virus.prototype = {
  moveVirus: function(largestPlayer){
    if(largestPlayer.x >= this.x) {
      this.x += 0.65;
    } else {
      this.x -= 0.65;
    }
    if(largestPlayer.y >= this.y) {
      this.y += 0.65;
    } else {
      this.y -= 0.65;
    }
  }
};

module.exports = Virus;
