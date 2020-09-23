import Vector2 from "./Vector2";

export default class Player {
  readonly WIDTH = 50;
  readonly HEIGHT = 50;

  position: Vector2;
  velocity: number;

  constructor(x: number, y: number, velocity: number) {
    this.position = new Vector2(x, y);
    this.velocity = velocity;
  }

  moveLeft() {
    const afterMoveLeft = this.position.x - this.velocity;
    if (afterMoveLeft >= this.WIDTH) {
      this.position.x = afterMoveLeft;
    }
  }

  moveRight() {
    const afterMoveRight = this.position.x + this.velocity;
    if (afterMoveRight <= innerWidth - this.WIDTH) {
      this.position.x = afterMoveRight;
    }
  }

  moveUp() {
    const afterMoveUp = this.position.y - this.velocity;
    if (afterMoveUp >= this.HEIGHT) {
      this.position.y = afterMoveUp;
    }
  }

  moveDown() {
    const afterMoveDown = this.position.y + this.velocity;
    if (afterMoveDown <= innerHeight - this.HEIGHT) {
      this.position.y = afterMoveDown;
    }
  }

  draw(ctx: CanvasRenderingContext2D) {
    const offsetX = this.WIDTH / 2;
    const offsetY = this.HEIGHT / 2;

    ctx.beginPath();
    ctx.moveTo(this.position.x - offsetX, this.position.y + offsetY);
    ctx.lineTo(this.position.x, this.position.y - offsetY);
    ctx.lineTo(this.position.x + offsetX, this.position.y + offsetY);
    ctx.fill();
  }
}
