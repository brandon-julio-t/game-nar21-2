import Enemy from "./abstracts/enemy";
import EnemyBulletCircle from "./enemy-bullet-circle";
import store from "@/store";
import { randomIntegerBetween } from "./core/utilities";

export default class EnemyBoss extends Enemy {
  public constructor(health: number, velocity: number) {
    super(
      innerWidth / 2 - store.assets.enemy.naturalWidth / 2,
      store.assets.enemy.naturalHeight * 0.7,
      health,
      store.assets.enemy,
      20,
      store.assets.enemy.naturalHeight * 0.7,
      store.assets.enemy.naturalWidth * 0.7,
      velocity
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
    ctx.fillStyle = "red";
    ctx.fillRect(
      this.position.x - this.WIDTH / 2,
      0,
      this.WIDTH * (this.currentHealth / this.maxHealth),
      this.healthBarHeight
    );

    ctx.strokeStyle = "black";
    ctx.strokeRect(
      this.position.x - this.WIDTH / 2,
      0,
      this.WIDTH * (this.currentHealth / this.maxHealth),
      this.healthBarHeight
    );
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
