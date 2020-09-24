import PlayerBullet from "./player-bullet";
import Vector2 from "./vector2";
import store from "@/store";

export default class Player  {
  public readonly WIDTH = 25;
  public readonly HEIGHT = 25;

  private _velocity: number;
  private nextTimeToAttack: number = Date.now();

  public _isDead: boolean = false;
  public isMovingDown: boolean = false;
  public isMovingLeft: boolean = false;
  public isMovingRight: boolean = false;
  public isMovingUp: boolean = false;
  public isSlowingDown: boolean = false;
  public position: Vector2;

  constructor(x: number, y: number, velocity: number) {
    this.position = new Vector2(x, y);
    this._velocity = velocity;
  }

  public get isDead(): boolean {
    return this._isDead;
  }

  public set isDead(isDead: boolean) {
    this._isDead = isDead;
  }

  private get velocity(): number {
    return this._velocity / (this.isSlowingDown ? 1.75 : 1);
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
    const { x, y } = this.position;
    const offsetX = this.WIDTH / 2;
    const offsetY = this.HEIGHT / 2;

    ctx.fillStyle = "black";
    ctx.beginPath();
    ctx.moveTo(x - offsetX, y + offsetY);
    ctx.lineTo(x, y - offsetY);
    ctx.lineTo(x + offsetX, y + offsetY);
    ctx.fill();
  }

  public shoot(): void {
    /**
     * https://dev.to/ycmjason/thought-on-vue-3-composition-api-reactive-considered-harmful-j8c
     */
    if (Date.now() >= this.nextTimeToAttack) {
      const { x, y } = this.position;
      store.bullets.splice(0, 0, new PlayerBullet(x, y - this.HEIGHT / 2));
      this.nextTimeToAttack = Date.now() + 250;
    }
  }
}
