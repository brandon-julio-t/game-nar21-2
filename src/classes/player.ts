import Entity from "./abstracts/entity";
import PlayerBullet from "./player-bullet";
import store from "@/store";
import { playAudio } from "./core/utilities";

export default class Player extends Entity {
  private static readonly HEALTH: number = 12;
  private static readonly VELOCITY: number = 10;

  private readonly HIT_SPRITE: HTMLImageElement;
  private readonly HIT_SPRITE_COLS: number = 4;
  private readonly HIT_SPRITE_ROWS: number = 4;

  protected readonly FREQUENCY: number = 50;

  public readonly HITBOX_SIZE = 10;

  private hitSpriteColIdx: number = 0;
  private hitSpriteRowIdx: number = 0;
  private isPlayingHitAnimation: boolean = false;
  private nextTimeToAttack: number = Date.now();

  protected blinkingTimeoutId: number | null = null;

  public isInvulnerable: boolean = false;
  public isMovingDown: boolean = false;
  public isMovingLeft: boolean = false;
  public isMovingRight: boolean = false;
  public isMovingUp: boolean = false;
  public isShooting: boolean = false;
  public isSlowingDown: boolean = false;

  public constructor(x: number, y: number) {
    super(
      x,
      y,
      Player.HEALTH,
      store.assets.player,
      10,
      store.assets.player.naturalHeight * 0.5,
      store.assets.player.naturalWidth * 0.5,
      Player.VELOCITY,
      store.assets.playerExplodeAudio
    );

    this.HIT_SPRITE = store.assets.playerHitSprite;
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

      if (!this.isDead) {
        playAudio(store.assets.playerHitAudio);
      }

      this.isPlayingHitAnimation = true;
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
    if (afterMoveLeft >= this.WIDTH / 2) {
      this.position.x = afterMoveLeft;
    }
  }

  private moveRight(): void {
    if (!this.isMovingRight) {
      return;
    }

    const afterMoveRight = this.position.x + this.velocity;
    if (afterMoveRight <= innerWidth - this.WIDTH / 2) {
      this.position.x = afterMoveRight;
    }
  }

  private moveUp(): void {
    if (!this.isMovingUp) {
      return;
    }

    const afterMoveUp = this.position.y - this.velocity;
    if (afterMoveUp >= this.HEIGHT / 2) {
      this.position.y = afterMoveUp;
    }
  }

  private moveDown(): void {
    if (!this.isMovingDown) {
      return;
    }

    const afterMoveDown = this.position.y + this.velocity;
    if (afterMoveDown <= innerHeight - this.HEIGHT / 2) {
      this.position.y = afterMoveDown;
    }
  }

  protected drawSelf(ctx: CanvasRenderingContext2D): void {
    const { WIDTH, HEIGHT } = this;
    const { x, y } = this.position;

    if (!this.isInvulnerable || Math.floor(Date.now() / this.FREQUENCY) % 2) {
      ctx.drawImage(this.sprite, x - WIDTH / 2, y - HEIGHT / 2, WIDTH, HEIGHT);
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

    if (this.isPlayingHitAnimation) {
      this.drawHitAnimation(ctx);
    }
  }

  private drawHitAnimation(ctx: CanvasRenderingContext2D): void {
    const width = this.HIT_SPRITE.naturalWidth / this.HIT_SPRITE_COLS;
    const height = this.HIT_SPRITE.naturalHeight / this.HIT_SPRITE_ROWS;

    const scaledWidth = (width * 25) / 100;
    const scaledHeight = (height * 25) / 100;

    ctx.drawImage(
      this.HIT_SPRITE,
      this.hitSpriteColIdx * width,
      this.hitSpriteRowIdx * height,
      width,
      height,
      this.position.x - scaledWidth / 2,
      this.position.y - scaledHeight / 2,
      scaledWidth,
      scaledHeight
    );

    this.hitSpriteColIdx++;

    if (this.hitSpriteColIdx >= this.HIT_SPRITE_COLS) {
      this.hitSpriteColIdx = 0;
      this.hitSpriteRowIdx++;
    }

    if (this.hitSpriteRowIdx >= this.HIT_SPRITE_ROWS) {
      this.hitSpriteRowIdx = 0;
      this.isPlayingHitAnimation = false;
    }
  }

  protected drawHealthBar(ctx: CanvasRenderingContext2D): void {
    ctx.fillStyle = "red";
    ctx.fillRect(
      this.position.x - this.WIDTH / 2,
      this.position.y + this.HEIGHT / 2,
      (this.WIDTH * this.currentHealth) / this.maxHealth,
      this.healthBarHeight
    );

    ctx.strokeStyle = "black";
    ctx.strokeRect(
      this.position.x - this.WIDTH / 2,
      this.position.y + this.HEIGHT / 2,
      (this.WIDTH * this.currentHealth) / this.maxHealth,
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

      const { x, y } = this.position;

      for (let i = 0; i < len; i++) {
        const xOffset: number = nX[i] * 10;
        const yOffset: number = nY[i] * 10;

        store.bullets.splice(
          0,
          0,
          new PlayerBullet(x + xOffset, y + yOffset - this.WIDTH)
        );
      }

      playAudio(store.assets.shootingAudio);
      this.nextTimeToAttack = Date.now() + 75;
    }
  }
}
