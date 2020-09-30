import Entity from "./abstracts/entity";
import PlayerBullet from "./player-bullet";
import store from "@/store";
import { playAudio } from "./core/utilities";

export default class Player extends Entity {
  public static readonly SIZE = 50;

  protected readonly FREQUENCY: number = 50;

  public readonly HITBOX_SIZE = Player.SIZE / 4;

  private nextTimeToAttack: number = Date.now();

  protected blinkingTimeoutId: number | null = null;

  public isInvulnerable: boolean = false;
  public isMovingDown: boolean = false;
  public isMovingLeft: boolean = false;
  public isMovingRight: boolean = false;
  public isMovingUp: boolean = false;
  public isShooting: boolean = false;
  public isSlowingDown: boolean = false;

  public constructor(x: number, y: number, velocity: number, health: number) {
    super(
      x,
      y,
      health,
      store.assets.player,
      (Player.SIZE * store.assets.player.naturalHeight) /
        store.assets.player.naturalWidth /
        8,
      Player.SIZE,
      Player.SIZE,
      velocity
    );
  }

  protected get velocity(): number {
    return this._velocity / (this.isSlowingDown ? 1.75 : 1);
  }

  public stopMoving(): void {
    this.isMovingDown = this.isMovingLeft = this.isMovingRight = this.isMovingUp = false;
  }

  public reduceHealth(points: number): void {
    if (!this.isInvulnerable) {
      super.reduceHealth(points);

      playAudio(
        this.isDead
          ? store.assets.playerExplodeAudio
          : store.assets.playerGetHitAudio
      );
    }

    this.isInvulnerable = true;
  }

  public moveAndDraw(ctx: CanvasRenderingContext2D): void {
    this.move();
    this.drawSelf(ctx);
  }

  public move(): void {
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
    if (afterMoveLeft >= Player.SIZE) {
      this.position.x = afterMoveLeft;
    }
  }

  private moveRight(): void {
    if (!this.isMovingRight) {
      return;
    }

    const afterMoveRight = this.position.x + this.velocity;
    if (afterMoveRight <= innerWidth - Player.SIZE) {
      this.position.x = afterMoveRight;
    }
  }

  private moveUp(): void {
    if (!this.isMovingUp) {
      return;
    }

    const afterMoveUp = this.position.y - this.velocity;
    if (afterMoveUp >= Player.SIZE) {
      this.position.y = afterMoveUp;
    }
  }

  private moveDown(): void {
    if (!this.isMovingDown) {
      return;
    }

    const afterMoveDown = this.position.y + this.velocity;
    if (afterMoveDown <= innerHeight - Player.SIZE) {
      this.position.y = afterMoveDown;
    }
  }

  protected drawSelf(ctx: CanvasRenderingContext2D): void {
    const { x, y } = this.position;
    const { naturalWidth, naturalHeight } = this.sprite;
    const width = (Player.SIZE * naturalWidth) / naturalHeight + 10;
    const height = (Player.SIZE * naturalHeight) / naturalWidth;

    if (!this.isInvulnerable || Math.floor(Date.now() / this.FREQUENCY) % 2) {
      ctx.drawImage(this.sprite, x - width / 2, y - height / 2, width, height);
    }

    if (this.blinkingTimeoutId === null) {
      this.blinkingTimeoutId = setTimeout(() => {
        this.isInvulnerable = false;
        this.blinkingTimeoutId = null;
      }, 1000);
    }

    if (process.env.NODE_ENV === "development") {
      ctx.fillStyle = "red";
      ctx.beginPath();
      ctx.rect(
        x - this.HITBOX_SIZE,
        y - this.HITBOX_SIZE,
        this.HITBOX_SIZE * 2,
        this.HITBOX_SIZE * 2
      );
      ctx.fill();
    }
  }

  protected drawHealthBar(ctx: CanvasRenderingContext2D): void {
    ctx.fillStyle = "red";
    ctx.fillRect(
      this.position.x - Player.SIZE / 2,
      this.position.y + Player.SIZE,
      (Player.SIZE * this.currentHealth) / this.maxHealth,
      this.healthBarHeight
    );

    ctx.strokeStyle = "black";
    ctx.strokeRect(
      this.position.x - Player.SIZE / 2,
      this.position.y + Player.SIZE,
      (Player.SIZE * this.currentHealth) / this.maxHealth,
      this.healthBarHeight
    );
  }

  public shoot(): void {
    if (
      !this.isDead &&
      this.isShooting &&
      Date.now() >= this.nextTimeToAttack
    ) {
      const nX: number[] = [-3, -2, -1, 0, 1, 2, 3];
      const nY: number[] = [3, 2, 1, 0, 1, 2, 3];
      const len: number = nX.length;

      const { naturalHeight, naturalWidth } = this.sprite;
      const { x, y } = this.position;

      for (let i = 0; i < len; i++) {
        const xOffset: number = nX[i] * 10;
        const yOffset: number = nY[i] * 10;

        store.bullets.splice(
          0,
          0,
          new PlayerBullet(
            x + xOffset,
            y + yOffset - (Player.SIZE * naturalWidth) / naturalHeight
          )
        );
      }

      playAudio(store.assets.shootingAudio);
      this.nextTimeToAttack = Date.now() + 75;
    }
  }
}
