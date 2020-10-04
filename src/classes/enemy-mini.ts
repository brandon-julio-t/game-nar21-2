import Enemy from "./abstracts/enemy";
import EnemyBulletLaser from "./enemy-bullet-laser";
import store from "@/store";
import { randomIntegerBetween, randomMiniEnemySprite } from "./core/utilities";

export default class EnemyMini extends Enemy {
  private static readonly SIZE: number = 50;

  private nextTimeToShoot: number = Date.now();

  public constructor() {
    super(
      randomIntegerBetween(0, innerWidth),
      -EnemyMini.SIZE,
      1,
      randomMiniEnemySprite(),
      0,
      EnemyMini.SIZE,
      EnemyMini.SIZE,
      randomIntegerBetween(1, 3)
    );

    setTimeout(() => this.stopMoving(), 3000);
  }

  protected drawSelf(ctx: CanvasRenderingContext2D): void {
    const { x, y } = this.position;
    ctx.drawImage(
      this.sprite,
      x - this.WIDTH / 2,
      y - this.HEIGHT / 2,
      this.WIDTH,
      this.HEIGHT
    );
  }

  /**
   * No health bar.
   */
  protected drawHealthBar(_: CanvasRenderingContext2D): void {}

  public move(): void {
    super.move()
    
    this.position.y += this.velocity;
  }

  public shoot(): void {
    if (Date.now() >= this.nextTimeToShoot && !this.isDead) {
      const { x, y } = this.position;
      store.bullets.splice(0, 0, new EnemyBulletLaser(x, y + this.HEIGHT));

      this.nextTimeToShoot = Date.now() + 1000;
    }
  }
}
