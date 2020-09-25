import PlayerBullet from "./player-bullet";
import Vector2 from "./vector2";
import store from "@/store";

export default class Player {
  public readonly SIZE = 50;
  public readonly HITBOX_SIZE = this.SIZE / 4;

  private _velocity: number;
  private nextTimeToAttack: number = Date.now();
  private sprite: HTMLImageElement;

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

    this.sprite = new Image();
    this.sprite.src = `${process.env.BASE_URL}player.png`;
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
    if (afterMoveLeft >= this.SIZE) {
      this.position.x = afterMoveLeft;
    }
  }

  private moveRight(): void {
    if (!this.isMovingRight) {
      return;
    }

    const afterMoveRight = this.position.x + this.velocity;
    if (afterMoveRight <= innerWidth - this.SIZE) {
      this.position.x = afterMoveRight;
    }
  }

  private moveUp(): void {
    if (!this.isMovingUp) {
      return;
    }

    const afterMoveUp = this.position.y - this.velocity;
    if (afterMoveUp >= this.SIZE) {
      this.position.y = afterMoveUp;
    }
  }

  private moveDown(): void {
    if (!this.isMovingDown) {
      return;
    }

    const afterMoveDown = this.position.y + this.velocity;
    if (afterMoveDown <= innerHeight - this.SIZE) {
      this.position.y = afterMoveDown;
    }
  }

  private draw(ctx: CanvasRenderingContext2D): void {
    const { x, y } = this.position;
    const { naturalWidth, naturalHeight } = this.sprite;
    const width = (this.SIZE * naturalWidth) / naturalHeight + 10;
    const height = (this.SIZE * naturalHeight) / naturalWidth;
    ctx.drawImage(this.sprite, x - width / 2, y - height / 2, width, height);

    if (process.env.NODE_ENV === "development") {
      ctx.fillStyle = "red";
      ctx.fillRect(
        x - this.HITBOX_SIZE / 2,
        y - this.HITBOX_SIZE / 2,
        this.HITBOX_SIZE,
        this.HITBOX_SIZE
      );
    }
  }

  public shoot(): void {
    if (Date.now() >= this.nextTimeToAttack) {
      const { x, y } = this.position;
      store.bullets.splice(0, 0, new PlayerBullet(x, y));
      this.nextTimeToAttack = Date.now() + 250;
    }
  }
}
