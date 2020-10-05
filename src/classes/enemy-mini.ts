import Enemy from "./abstracts/enemy";
import EnemyBulletLaser from "./enemy-bullet-laser";
import store from "@/store";
import { degreeToRadian, randomIntegerBetween } from "./core/utilities";

export default class EnemyMini extends Enemy {
  private static readonly SCALE_DOWN_RATIO: number = 0.15;

  private nextTimeToShoot: number = Date.now();

  public constructor() {
    super(
      randomIntegerBetween(
        store.assets.enemyMini.naturalWidth * EnemyMini.SCALE_DOWN_RATIO,
        innerWidth
      ),
      -store.assets.enemyMini.naturalHeight * EnemyMini.SCALE_DOWN_RATIO,
      1,
      store.assets.enemyMini,
      0,
      store.assets.enemyMini.naturalHeight * EnemyMini.SCALE_DOWN_RATIO,
      store.assets.enemyMini.naturalWidth * EnemyMini.SCALE_DOWN_RATIO,
      randomIntegerBetween(1, 3)
    );

    setTimeout(() => this.stopMoving(), 3000);
  }

  protected drawSelf(ctx: CanvasRenderingContext2D): void {
    const { x, y } = this.position;
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(degreeToRadian(180));
    ctx.drawImage(
      this.sprite,
      -this.WIDTH / 2,
      -this.HEIGHT / 2,
      this.WIDTH,
      this.HEIGHT
    );
    ctx.restore();
  }

  /**
   * No health bar.
   */
  protected drawHealthBar(_: CanvasRenderingContext2D): void {}

  public move(): void {
    super.move();

    this.position.y += this.velocity;
  }

  public shoot(): void {
    if (Date.now() >= this.nextTimeToShoot && !this.isDead) {
      const { x, y } = this.position;
      store.bullets.splice(0, 0, new EnemyBulletLaser(x, y + this.HEIGHT / 2));

      this.nextTimeToShoot = Date.now() + 1000;
    }
  }
}
