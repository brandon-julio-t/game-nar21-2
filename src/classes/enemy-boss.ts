import { playBgm, randomIntegerBetween } from "./core/utilities";

import Enemy from "./abstracts/enemy";
import EnemyBulletCircle from "./enemy-bullet-circle";
import EnemyBulletLaser from "./enemy-bullet-laser";
import Vector2 from "./core/vector2";
import store from "@/store";
import CanGoOutOfBounds from "./interfaces/can-go-out-of-bounds";

export default class EnemyBoss extends Enemy implements CanGoOutOfBounds {
  private static readonly HEALTH: number = 750;
  // private static readonly HEALTH: number = 1;
  private static readonly HEALTH_BAR_HEIGHT: number = 20;
  private static readonly SCALE_DOWN_RATIO: number = 0.35;
  private static readonly VELOCITY: number = 3;
  public isEntering: boolean = true;
  private readonly ANIMATED_SPRITE: HTMLImageElement[];
  private readonly CIRCLE_BULLET_SPAWN_TIME: number = 3000;
  private readonly LASER_BULLET_SPAWN_TIME: number = 50;

  private animatedSpriteIdx: number = 0;
  private nextCircleBulletShootTime: number = Date.now();
  private nextLaserBulletShootTime: number = Date.now();
  private currentStage: number = 1;
  private isMovingBackward: boolean = true;
  private movingBackwardTimeoutId: number | null = null;
  private winCallbackTimeoutId: number | null = null;
  private explodingSpriteXPositions: number[] = [];
  private explodingSpriteYPositions: number[] = [];
  private explodingSpriteColIdxs: number[] = [];
  private explodingSpriteRowIdxs: number[] = [];
  private explodingSpritesCount: number = 0;
  private lastExplodingSpriteTime: number = 0;

  public constructor() {
    super(
      randomIntegerBetween(
        store.assets.enemy1.naturalWidth * EnemyBoss.SCALE_DOWN_RATIO,
        innerWidth -
          store.assets.enemy1.naturalWidth * EnemyBoss.SCALE_DOWN_RATIO
      ),
      -store.assets.enemy1.naturalHeight * EnemyBoss.SCALE_DOWN_RATIO,
      EnemyBoss.HEALTH,
      store.assets.enemy1,
      EnemyBoss.HEALTH_BAR_HEIGHT,
      store.assets.enemy1.naturalHeight * EnemyBoss.SCALE_DOWN_RATIO,
      store.assets.enemy1.naturalWidth * EnemyBoss.SCALE_DOWN_RATIO,
      EnemyBoss.VELOCITY
    );

    const {
      enemy1,
      enemy2,
      enemy3,
      enemy4,
      enemy5,
      enemy6,
      enemy7,
      enemy8,
      enemy9
    } = store.assets;

    this.ANIMATED_SPRITE = [
      enemy1,
      enemy2,
      enemy3,
      enemy4,
      enemy5,
      enemy6,
      enemy7,
      enemy8,
      enemy9
    ];
  }

  public get isOutOfBounds(): boolean {
    return this.position.y - this.HEIGHT / 2 >= innerHeight;
  }

  private get isStageTwo(): boolean {
    return this.currentHealth <= (this.maxHealth * 80) / 100;
  }

  private get isStageThree(): boolean {
    return this.currentHealth <= (this.maxHealth * 40) / 100;
  }

  public reduceHealth(points: number): void {
    if (!this.isEntering) {
      super.reduceHealth(points);
    }
  }

  public move(): void {
    if (store.player?.isDead) return;

    super.move();

    if (
      this.position.y <
      EnemyBoss.HEALTH_BAR_HEIGHT +
        (store.assets.enemy1.naturalHeight * EnemyBoss.SCALE_DOWN_RATIO) / 2
    ) {
      this.position.y += this.velocity / 2;
    } else {
      const { x } = this.position;
      const isOnEdge = x + this.WIDTH >= innerWidth || x <= this.WIDTH;
      this._velocity *= isOnEdge ? -1 : 1;
      this.position.x += this.velocity;
      this.isEntering = false;
    }
  }

  public drawSelf(ctx: OffscreenCanvasRenderingContext2D): void {
    if (store.player?.isDead) return;

    const { x, y } = this.position;

    ctx.fillStyle = store.color;
    ctx.drawImage(
      this.ANIMATED_SPRITE[this.animatedSpriteIdx],
      x - this.WIDTH / 2,
      y - this.HEIGHT / 2,
      this.WIDTH,
      this.HEIGHT
    );

    this.animatedSpriteIdx++;
    this.animatedSpriteIdx %= this.ANIMATED_SPRITE.length;
  }

  public drawHealthBar(ctx: OffscreenCanvasRenderingContext2D): void {
    if (store.player?.isDead) return;

    const x = this.position.x - this.WIDTH / 2;
    const y = this.position.y - this.HEIGHT / 2;
    const w = this.WIDTH * (this.currentHealth / this.maxHealth);
    const h = this.healthBarHeight;

    ctx.fillStyle = "red";
    ctx.fillRect(x, y, w, h);

    ctx.strokeStyle = "black";
    ctx.strokeRect(x, y, w, h);
  }

  public shoot(): void {
    if (this.isEntering || this.isDead || store.player?.isDead) {
      return;
    }

    const { x, y } = this.position;

    const xSpawn = randomIntegerBetween(x - this.WIDTH / 2, x + this.WIDTH / 2);
    const ySpawn =
      y + this.healthBarHeight + randomIntegerBetween(0, this.HEIGHT);

    this.handleStageOneBullets(xSpawn, ySpawn);
    this.handleStageTwoBullets(x, y);
    this.handleStageThreeBullets(xSpawn, ySpawn);

    playBgm(this.currentStage);
  }

  public win(
    callback: () => void,
    ctx: OffscreenCanvasRenderingContext2D
  ): void {
    const now = Date.now();
    const delta = now - this.lastExplodingSpriteTime;

    if (delta >= 100) {
      this.lastExplodingSpriteTime = Date.now();
      this.explodingSpriteXPositions.push(randomIntegerBetween(0, innerWidth));
      this.explodingSpriteYPositions.push(randomIntegerBetween(0, innerHeight));
      this.explodingSpriteColIdxs.push(0);
      this.explodingSpriteRowIdxs.push(0);
      this.explodingSpritesCount++;
    }

    for (let i = 0; i < this.explodingSpritesCount; i++) {
      const { naturalHeight, naturalWidth } = this.explodeSprite;

      const spriteHeight: number = naturalHeight / 8;
      const spriteWidth: number = naturalWidth / 8;

      const { WIDTH } = this;
      const { x, y } = {
        x: this.explodingSpriteXPositions[i],
        y: this.explodingSpriteYPositions[i]
      };

      const scaleDownRatio: number = 0.0125;
      const scaledHeight: number = spriteHeight * WIDTH * scaleDownRatio;
      const scaledWidth: number = spriteWidth * WIDTH * scaleDownRatio;

      ctx.drawImage(
        this.explodeSprite,
        this.explodingSpriteColIdxs[i] * spriteWidth,
        this.explodingSpriteRowIdxs[i] * spriteHeight,
        spriteWidth,
        spriteHeight,
        x - scaledWidth / 2,
        y - scaledHeight / 2,
        scaledWidth,
        scaledHeight
      );

      this.explodingSpriteColIdxs[i]++;

      if (this.explodingSpriteColIdxs[i] >= 8) {
        this.explodingSpriteColIdxs[i] = 0;
        this.explodingSpriteRowIdxs[i]++;
      }
    }

    if (!this.winCallbackTimeoutId) {
      this.winCallbackTimeoutId = setTimeout(() => {
        callback();
      }, 3000);
    }
  }

  protected die(): void {
    super.die();
    store.enemiesKilledCount += 10; // 10 * 100 == 1000
  }

  private handleStageOneBullets(x: number, y: number): void {
    store.bullets.splice(0, 0, new EnemyBulletCircle(x, y));
  }

  private handleStageTwoBullets(x: number, y: number): void {
    if (Date.now() >= this.nextCircleBulletShootTime && this.isStageTwo) {
      this.currentStage = 2;

      const velocity: number = randomIntegerBetween(3, 5);
      for (let degree = 0; degree < 360; degree += Math.PI) {
        const direction: Vector2 = Vector2.fromRadian(degree).normalized();

        store.bullets.splice(
          0,
          0,
          new EnemyBulletCircle(
            x,
            y,
            direction.x * velocity,
            direction.y * velocity
          )
        );
      }

      this.nextCircleBulletShootTime =
        Date.now() + this.CIRCLE_BULLET_SPAWN_TIME;
    }
  }

  private handleStageThreeBullets(x: number, y: number): void {
    if (Date.now() >= this.nextLaserBulletShootTime && this.isStageThree) {
      this.currentStage = 3;

      const velocity: number = 12;
      store.bullets.splice(
        0,
        0,
        new EnemyBulletLaser(x, y, velocity, velocity)
      );
      this.nextLaserBulletShootTime = Date.now() + this.LASER_BULLET_SPAWN_TIME;
    }
  }
}
