
const INPUT_KEYS = new Enum({
  UP: 'ArrowUp',
  DOWN: 'ArrowDown',
  LEFT: 'ArrowLeft',
  RIGHT: 'ArrowRight',
});

const PLAYER_TYPE = Object.freeze({ HUMAN: "HUMAN", COMPUTER: "COMPUTER" });

function PongPlayer(x, y, width, height, canvasHeight, type) {
  let self = {};
  self.x = x;
  self.y = y;
  self.width = width;
  self.height = height;
  self.canvasHeight = canvasHeight;
  self.speed = 2; // Adjust the speed as needed
  self.type = type;
  return self;
}

PongPlayer.prototype.handleInput = function (inputKey) {
  if (this.type === PLAYER_TYPE.HUMAN) {
    // Human player input handling
    switch (inputKey) {
      case INPUT_KEYS.UP.value:
        if (this.y - this.speed > 0) {
          this.y -= this.speed;
        }
        break;
      case INPUT_KEYS.DOWN.value:
        if (this.y + this.height + this.speed < this.canvasHeight) {
          this.y += this.speed;
        }
        break;
    }

  }
};

PongPlayer.prototype.update = function () {
  this.y += this.speed;
};