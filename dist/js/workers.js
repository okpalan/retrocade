
function Player(x, y, width, height, canvasHeight) {
  let self = {};
  self.x = x;
  self.y = y;
  self.width = width;
  self.height = height;
  self.canvasHeight = canvasHeight;
  self.speed = .2; // Adjust the speed as needed
  self.type = Object.freeze({ PLAYER: "PLAYER", "COMPUTER": "COMPUTER" })
  return self;
}

Player.prototype.handleInput = function (key) {
  if (key === 'ArrowUp' && this.y - this.speed > 0) {
    this.y -= this.speed;
  } else if (key === 'ArrowDown' && this.y + this.height + this.speed < this.canvasHeight) {
    this.y += this.speed;
  }
};

Player.prototype.update = function () {
  this.y += this.speed;
};

