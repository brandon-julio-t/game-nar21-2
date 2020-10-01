import Enemy from "./abstracts/enemy";
import EnemyBulletCircle from "./enemy-bullet-circle";
import store from "@/store";
import { randomIntegerBetween } from "./core/utilities";

export default class EnemyBoss extends Enemy {
  private static readonly HEALTH: number = 1500;
  private static readonly HEALTH_BAR_HEIGHT: number = 20;
  private static readonly SCALE_DOWN_RATIO: number = 0.7;
  private static readonly VELOCITY: number = 2;

  public constructor() {
    super(
      innerWidth / 2 - store.assets.enemy.naturalWidth / 2,
      store.assets.enemy.naturalHeight * EnemyBoss.SCALE_DOWN_RATIO,
      EnemyBoss.HEALTH,
      store.assets.enemy,
      EnemyBoss.HEALTH_BAR_HEIGHT,
      store.assets.enemy.naturalHeight * EnemyBoss.SCALE_DOWN_RATIO,
      store.assets.enemy.naturalWidth * EnemyBoss.SCALE_DOWN_RATIO,
      EnemyBoss.VELOCITY
    );
  }

  public move(): void {
    const { x } = this.position;

    if (x + this.sprite.naturalWidth >= innerWidth || x <= 0) {
      this._velocity *= -1;
    }

    this.position.x += this.velocity;
  }

  protected drawSelf(ctx: CanvasRenderingContext2D): void {
    const { x, y } = this.position;

    ctx.fillStyle = store.color;
    ctx.drawImage(
      this.sprite,
      x - this.WIDTH / 2,
      y - this.HEIGHT / 2,
      this.WIDTH,
      this.HEIGHT
    );
  }

  protected drawHealthBar(ctx: CanvasRenderingContext2D): void {
    const x = this.position.x - this.WIDTH / 2;
    const y = 0;
    const w = this.WIDTH * (this.currentHealth / this.maxHealth);
    const h = this.healthBarHeight;

    ctx.fillStyle = "red";
    ctx.fillRect(x, y, w, h);

    ctx.strokeStyle = "black";
    ctx.strokeRect(x, y, w, h);
  }

  public shoot(): void {
    const { x, y } = this.position;
    const ySpawn =
      y + this.healthBarHeight + randomIntegerBetween(0, this.HEIGHT);

    store.bullets.splice(
      0,
      0,
      new EnemyBulletCircle(
        randomIntegerBetween(x - this.WIDTH / 2, x + this.WIDTH / 2),
        ySpawn
      )
    );
  }
}
