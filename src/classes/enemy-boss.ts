import Enemy from "./abstracts/enemy";
import EnemyBulletCircle from "./enemy-bullet-circle";
import store from "@/store";
import { randomIntegerBetween } from "./core/utilities";
import EnemyBulletLaser from "./enemy-bullet-laser";
import Vector2 from "./core/vector2";

export default class EnemyBoss extends Enemy {
  private static readonly HEALTH: number = 750;
  private static readonly HEALTH_BAR_HEIGHT: number = 20;
  private static readonly SCALE_DOWN_RATIO: number = 0.35;
  private static readonly VELOCITY: number = 3;

  private readonly ANIMATED_SPRITE: HTMLImageElement[];
  private readonly CIRCLE_BULLET_SPAWN_TIME: number = 3000;
  private readonly LASER_BULLET_SPAWN_TIME: number = 50;

  private animatedSpriteIdx: number = 0;
  private nextCircleBulletShootTime: number = Date.now();
  private nextLaserBulletShootTime: number = Date.now();
  private currentStage: number = 1;

  public isEntering: boolean = true;

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

  protected drawSelf(ctx: CanvasRenderingContext2D): void {
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

  protected drawHealthBar(ctx: CanvasRenderingContext2D): void {
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
    if (this.isEntering) {
      return;
    }

    const { x, y } = this.position;

    const xSpawn = randomIntegerBetween(x - this.WIDTH / 2, x + this.WIDTH / 2);
    const ySpawn =
      y + this.healthBarHeight + randomIntegerBetween(0, this.HEIGHT);

    this.handleStageOneBullets(xSpawn, ySpawn);
    this.handleStageTwoBullets(x, y);
    this.handleStageThreebullets(xSpawn, ySpawn);
    this.handleBackgroundMusic();
  }

  private handleStageOneBullets(x: number, y: number): void {
    store.bullets.splice(0, 0, new EnemyBulletCircle(x, y));
  }

  private handleStageTwoBullets(x: number, y: number): void {
    if (Date.now() >= this.nextCircleBulletShootTime && this.isStageTwo) {
      this.currentStage = 2;

      const velocity: number = randomIntegerBetween(3, 5);
      for (let degree = 0; degree < 360; degree += 5) {
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

  private handleStageThreebullets(x: number, y: number): void {
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

  private handleBackgroundMusic(): void {
    const {
      backgroundMusic1,
      backgroundMusic2,
      backgroundMusic3
    } = store.assets;

    // BGM1 is handled by game.ts in prepareBackgroundMusic()

    if (this.currentStage === 2 && backgroundMusic2.paused) {
      console.log(`Stage 2 BGM: ${backgroundMusic2.paused}`);
      backgroundMusic2.currentTime = backgroundMusic1.currentTime;

      backgroundMusic1.pause();
      backgroundMusic2.play();
      backgroundMusic3.pause();
    } else if (this.currentStage === 3 && backgroundMusic3.paused) {
      console.log(`Stage 3 BGM: ${backgroundMusic3.paused}`);
      backgroundMusic3.currentTime = backgroundMusic2.currentTime;

      backgroundMusic1.pause();
      backgroundMusic2.pause();
      backgroundMusic3.play();
    }
  }

  public die(): void {
    super.die();
    store.enemiesKilledCount += 10; // 10 * 100 == 1000
  }
}
