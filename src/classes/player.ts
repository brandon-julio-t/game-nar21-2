import Entity from "./abstracts/entity";
import Environment from "./core/environment";
import PlayerBullet from "./player-bullet";
import { playAudio } from "./core/utilities";
import store from "@/store";
import CanGoOutOfBounds from "./interfaces/can-go-out-of-bounds";

export default class Player extends Entity implements CanGoOutOfBounds {
  private static readonly HEALTH: number = 7;
  // private static readonly HEALTH: number = 1;
  private static readonly HEALTH_BAR_HEIGHT: number = 10;
  private static readonly SCALE_DOWN_RATIO: number = 0.15;
  private static readonly SLOW_DOWN_RATIO: number = 0.5;
  private static readonly VELOCITY: number = 10;
  public readonly HIT_BOX_SIZE = 20;
  public bulletLevel: number = 1;
  public isInvulnerable: boolean = false;
  public isMovingDown: boolean = false;
  public isMovingLeft: boolean = false;
  public isMovingRight: boolean = false;
  public isMovingUp: boolean = false;
  public isShooting: boolean = false;
  public isSlowingDown: boolean = false;
  protected readonly BLINKING_FREQUENCY: number = 50;
  protected blinkingTimeoutId: number | null = null;
  private readonly ANIMATED_SPRITE: HTMLImageElement[];
  private readonly HIT_SPRITE: HTMLImageElement;
  private readonly HIT_SPRITE_COLS: number = 4;
  private readonly HIT_SPRITE_ROWS: number = 4;
  private animatedSpriteIdx: number = 0;
  private hitSpriteColIdx: number = 0;
  private hitSpriteRowIdx: number = 0;
  private isPlayingHitAnimation: boolean = false;
  private nextTimeToAttack: number = Date.now();
  private isMovingBackward: boolean = true;
  private movingBackwardTimeoutId: number | null = null;
  private winCallbackTimeoutId: number | null = null;
  private movingBackwardDelayTimeoutId: number | null = null;
  private isDelayingMovingBackward: boolean = true;

  public constructor(x: number, y: number) {
    super(
      x,
      y,
      Player.HEALTH,
      store.assets.player1,
      Player.HEALTH_BAR_HEIGHT,
      store.assets.player1.naturalHeight * Player.SCALE_DOWN_RATIO,
      store.assets.player1.naturalWidth * Player.SCALE_DOWN_RATIO,
      Player.VELOCITY,
      store.assets.playerExplodeAudio
    );

    const { player1, player2, player3, player4, player5 } = store.assets;
    this.ANIMATED_SPRITE = [player1, player2, player3, player4, player5];
    this.HIT_SPRITE = store.assets.playerHitSprite;
  }

  public get isOutOfBounds(): boolean {
    return this.position.y - this.HEIGHT / 2 <= innerHeight;
  }

  protected get velocity(): number {
    return this._velocity * (this.isSlowingDown ? Player.SLOW_DOWN_RATIO : 1);
  }

  public stopMoving(): void {
    this.isMovingDown = this.isMovingLeft = this.isMovingRight = this.isMovingUp = false;
  }

  public reduceHealth(points: number): void {
    if (!this.isInvulnerable && !store.enemy?.isDead) {
      super.reduceHealth(points);

      if (!this.isDead) {
        playAudio(store.assets.playerHitAudio);
      }

      this.isPlayingHitAnimation = true;
    }

    if (!store.enemy?.isDead) this.isInvulnerable = true;
  }

  public heal(points: number): void {
    this.currentHealth = Math.min(this.maxHealth, this.currentHealth + points);
  }

  public moveAndDraw(
    ctx: CanvasRenderingContext2D | OffscreenCanvasRenderingContext2D
  ): void {
    this.move();
    this.drawSelf(ctx);
  }

  public move(): void {
    super.move();
    this.moveUp();
    this.moveLeft();
    this.moveDown();
    this.moveRight();
  }

  public drawSelf(
    ctx: CanvasRenderingContext2D | OffscreenCanvasRenderingContext2D
  ): void {
    const { WIDTH, HEIGHT } = this;
    const { x, y } = this.position;

    if (
      !this.isInvulnerable ||
      Math.floor(Date.now() / this.BLINKING_FREQUENCY) % 2
    ) {
      ctx.drawImage(
        this.ANIMATED_SPRITE[this.animatedSpriteIdx],
        x - WIDTH / 2,
        y - HEIGHT / 2,
        WIDTH,
        HEIGHT
      );

      this.animatedSpriteIdx++;
      this.animatedSpriteIdx %= this.ANIMATED_SPRITE.length;
    }

    if (this.blinkingTimeoutId === null) {
      this.blinkingTimeoutId = setTimeout(() => {
        this.isInvulnerable = false;
        this.blinkingTimeoutId = null;
      }, 1000);
    }

    if (Environment.isDevelopment) {
      this.drawHitBox(ctx);
    }

    if (this.isPlayingHitAnimation) {
      this.drawHitAnimation(ctx);
    }

    this.drawScore(ctx);
    this.drawShield(ctx);
  }

  public drawHealthBar(
    ctx: CanvasRenderingContext2D | OffscreenCanvasRenderingContext2D
  ): void {
    const {
      HEIGHT,
      WIDTH,
      currentHealth,
      healthBarHeight,
      maxHealth,
      position
    } = this;
    const { x, y } = position;

    const xPos: number = x - WIDTH / 2;
    const yPos: number = y + HEIGHT / 2;
    const width: number = (WIDTH * currentHealth) / maxHealth;
    const height: number = healthBarHeight;

    ctx.fillStyle = "dodgerblue";
    ctx.fillRect(xPos, yPos, width, height);

    ctx.strokeStyle = "black";
    ctx.strokeRect(xPos, yPos, width, height);
  }

  public shoot(): void {
    if (
      !this.isDead &&
      this.isShooting &&
      Date.now() >= this.nextTimeToAttack
    ) {
      const nX: number[] = [-2, -1, 0, 1, 2];
      const nY: number[] = [2, 1, 0, 1, 2];

      const len: number = nX.length;
      const nMultiplier: number = this.bulletLevel === 1 ? 15 : 20;

      const { x, y } = this.position;

      for (let i = 0; i < len; i++) {
        const xOffset: number = nX[i] * nMultiplier;
        const yOffset: number = nY[i] * nMultiplier;

        store.bullets.splice(
          0,
          0,
          new PlayerBullet(
            x + xOffset,
            y + yOffset - this.HEIGHT / 2 - (this.bulletLevel === 1 ? 0 : 50),
            this.bulletLevel
          )
        );
      }

      playAudio(store.assets.shootingAudio);
      this.nextTimeToAttack = Date.now() + 75;
    }
  }

  public win(callback: () => void): void {
    if (!this.movingBackwardDelayTimeoutId) {
      this.movingBackwardDelayTimeoutId = setTimeout(
        () => (this.isDelayingMovingBackward = false),
        1000
      );

      return;
    }

    if (this.isDelayingMovingBackward) return;

    if (this.isMovingBackward) {
      if (!this.movingBackwardTimeoutId) {
        this.movingBackwardTimeoutId = setTimeout(
          () => (this.isMovingBackward = false),
          1000
        );
      }

      this.position.y += Math.abs(this.velocity) * 0.25;
    } else {
      this.position.y -= Math.abs(this.velocity) * 2;
    }

    if (this.isOutOfBounds && !this.winCallbackTimeoutId) {
      this.winCallbackTimeoutId = setTimeout(() => {
        callback();
      }, 3750);
    }
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

  private drawHitBox(
    ctx: CanvasRenderingContext2D | OffscreenCanvasRenderingContext2D
  ): void {
    const { HIT_BOX_SIZE, position } = this;
    const { x, y } = position;

    const size: number = HIT_BOX_SIZE * 2;

    ctx.fillStyle = "red";
    ctx.beginPath();
    ctx.rect(x - HIT_BOX_SIZE, y - HIT_BOX_SIZE, size, size);
    ctx.fill();

    ctx.fillStyle = "blue";
    ctx.beginPath();
    ctx.arc(x, y, 2, 0, Math.PI * 2);
    ctx.fill();
  }

  private drawHitAnimation(
    ctx: CanvasRenderingContext2D | OffscreenCanvasRenderingContext2D
  ): void {
    const width: number = this.HIT_SPRITE.naturalWidth / this.HIT_SPRITE_COLS;
    const height: number = this.HIT_SPRITE.naturalHeight / this.HIT_SPRITE_ROWS;

    const scaleDownRatio: number = 0.25;
    const scaledWidth: number = width * scaleDownRatio;
    const scaledHeight: number = height * scaleDownRatio;

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

  private drawScore(
    ctx: CanvasRenderingContext2D | OffscreenCanvasRenderingContext2D
  ): void {
    const { x, y } = this.position;

    ctx.fillStyle = "royalblue";
    ctx.font =
      'normal 20px "PT Mono", Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace';
    ctx.fillText(
      `Score: ${Number(store.enemiesKilledCount * 100).toLocaleString()}`,
      x - this.WIDTH / 2,
      y + this.HEIGHT
    );
  }

  private drawShield(
    ctx: CanvasRenderingContext2D | OffscreenCanvasRenderingContext2D
  ): void {
    const { playerShield } = store.assets;
    const { height, width } = playerShield;
    const { currentHealth, maxHealth, position } = this;
    const { x, y } = position;

    const scaleDownRatio: number = 0.25;

    const opacity: number = currentHealth / maxHealth;
    const scaledWidth: number = width * scaleDownRatio;
    const scaledHeight: number = height * scaleDownRatio;

    ctx.save();
    ctx.globalAlpha = opacity;
    ctx.drawImage(
      playerShield,
      x - scaledWidth / 2,
      y - scaledHeight / 2,
      scaledWidth,
      scaledHeight
    );
    ctx.restore();
  }
}
