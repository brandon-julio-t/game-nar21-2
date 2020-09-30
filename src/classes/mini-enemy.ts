import EnemyBulletLaser from "./enemy-bullet-laser";
import Entity from "./abstracts/entity";
import store from "@/store";
import { playAudio, randomIntegerBetween } from "./core/utilities";

export default class MiniEnemy extends Entity {
  private static readonly ENEMY_SPRITE_COLS: number = 4;
  private static readonly ENEMY_SPRITE_ROWS: number = 4;

  private readonly SPRITE_COL_CHANGE_TIME = 500; // ENEMY_SPRITE_COLS + 1 every x miliseconds

  private moveTimeoutId: number | null = null;
  private nextTimeToChangeSpriteCol: number = Date.now();
  private nextTimeToShoot: number = Date.now();
  private spriteColIdx: number = 0;

  public constructor() {
    super(
      randomIntegerBetween(0, innerWidth),
      0,
      1,
      store.assets.miniEnemy,
      0,
      store.assets.miniEnemy.naturalHeight / MiniEnemy.ENEMY_SPRITE_ROWS,
      store.assets.miniEnemy.naturalWidth / MiniEnemy.ENEMY_SPRITE_COLS,
      randomIntegerBetween(1, 3)
    );
  }

  public reduceHealth(points: number): void {
    super.reduceHealth(points);
    if (this.isDead) {
      playAudio(store.assets.enemyMiniExplodeAudio);
    }
  }

  protected drawSelf(ctx: CanvasRenderingContext2D): void {
    const { x, y } = this.position;

    ctx.drawImage(
      this.sprite,
      this.spriteColIdx * this.WIDTH,
      0, // Only using the first row of the sprite
      this.WIDTH,
      this.HEIGHT,
      x,
      y,
      this.WIDTH,
      this.HEIGHT
    );

    if (Date.now() >= this.nextTimeToChangeSpriteCol) {
      this.spriteColIdx++;
      this.spriteColIdx %= MiniEnemy.ENEMY_SPRITE_COLS;

      this.nextTimeToChangeSpriteCol = Date.now() + this.SPRITE_COL_CHANGE_TIME;
    }
  }

  /**
   * No health bar.
   */
  protected drawHealthBar(_: CanvasRenderingContext2D): void {}

  public move(): void {
    this.position.y += this.velocity;

    if (this.moveTimeoutId === null) {
      this.moveTimeoutId = setTimeout(() => {
        this._velocity = 0;
        this.moveTimeoutId = null;
      }, 3000);
    }
  }

  public shoot(): void {
    if (Date.now() >= this.nextTimeToShoot && !this.isDead) {
      const { x, y } = this.position;

      const xSpawn = x + this.WIDTH / 2;
      const ySpawn = y + this.HEIGHT / 2;

      store.bullets.splice(0, 0, new EnemyBulletLaser(xSpawn, ySpawn, this));

      this.nextTimeToShoot = Date.now() + 1000;
    }
  }
}
