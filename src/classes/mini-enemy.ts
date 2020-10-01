import EnemyBulletLaser from "./enemy-bullet-laser";
import Entity from "./abstracts/entity";
import store from "@/store";
import {
  playAudio,
  randomIntegerBetween,
  randomMiniEnemySprite
} from "./core/utilities";

export default class MiniEnemy extends Entity {
  private readonly SIZE: number = 50;

  private moveTimeoutId: number | null = null;
  private nextTimeToShoot: number = Date.now();

  public constructor() {
    super(
      randomIntegerBetween(0, innerWidth),
      0,
      1,
      randomMiniEnemySprite(),
      0,
      store.assets.miniEnemy1.naturalHeight,
      store.assets.miniEnemy1.naturalWidth,
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
    const offset = this.SIZE / 2;
    ctx.drawImage(this.sprite, x - offset, y - offset, this.SIZE, this.SIZE);
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
