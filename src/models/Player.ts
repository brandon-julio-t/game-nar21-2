import Bullet from "./Bullet";
import Vector2 from "./Vector2";
import store, { Store } from "@/store";

export default class Player {
  private readonly WIDTH = 25;
  private readonly HEIGHT = 25;

  private position: Vector2;
  private _velocity: number;

  public isMovingUp: boolean = false;
  public isMovingDown: boolean = false;
  public isMovingLeft: boolean = false;
  public isMovingRight: boolean = false;
  public isSlowingDown: boolean = false;

  constructor(x: number, y: number, velocity: number) {
    this.position = new Vector2(x, y);
    this._velocity = velocity;
  }

  private get velocity(): number {
    return this._velocity / (this.isSlowingDown ? 1.5 : 1);
  }

  public moveAndDraw(ctx: CanvasRenderingContext2D): void {
    this.move();
    this.draw(ctx);
  }

  private move(): void {
    this.moveUp();
    this.moveLeft();
    this.moveDown();
    this.moveRight();
  }

  private moveLeft(): void {
    if (!this.isMovingLeft) {
      return;
    }

    const afterMoveLeft = this.position.x - this.velocity;
    if (afterMoveLeft >= this.WIDTH) {
      this.position.x = afterMoveLeft;
    }
  }

  private moveRight(): void {
    if (!this.isMovingRight) {
      return;
    }

    const afterMoveRight = this.position.x + this.velocity;
    if (afterMoveRight <= innerWidth - this.WIDTH) {
      this.position.x = afterMoveRight;
    }
  }

  private moveUp(): void {
    if (!this.isMovingUp) {
      return;
    }

    const afterMoveUp = this.position.y - this.velocity;
    if (afterMoveUp >= this.HEIGHT) {
      this.position.y = afterMoveUp;
    }
  }

  private moveDown(): void {
    if (!this.isMovingDown) {
      return;
    }

    const afterMoveDown = this.position.y + this.velocity;
    if (afterMoveDown <= innerHeight - this.HEIGHT) {
      this.position.y = afterMoveDown;
    }
  }

  private draw(ctx: CanvasRenderingContext2D): void {
    const offsetX = this.WIDTH / 2;
    const offsetY = this.HEIGHT / 2;

    ctx.beginPath();
    ctx.moveTo(this.position.x - offsetX, this.position.y + offsetY);
    ctx.lineTo(this.position.x, this.position.y - offsetY);
    ctx.lineTo(this.position.x + offsetX, this.position.y + offsetY);
    ctx.fill();
  }

  public shoot(): void {
    /**
     * https://dev.to/ycmjason/thought-on-vue-3-composition-api-reactive-considered-harmful-j8c
     */
    store.bullets.splice(
      0,
      0,
      new Bullet(this.position.x, this.position.y + this.HEIGHT / 2) as never
    );
  }
}
