import EnemyBullet from "./enemy-bullet";
import Entity from "./abstracts/entity";
import store from "@/store";
import { randomIntegerBetween } from "./core/utilities";

export default class Enemy extends Entity {
  private readonly BULLETS_MULTIPLIER: number = 3;

  private velocity: number = 5;

  constructor(health: number) {
    super(
      innerWidth / 2 - store.assets.enemy.naturalWidth / 2,
      0,
      health,
      store.assets.enemy,
      store.assets.enemy.naturalHeight / 4
    );
  }

  public move(): void {
    const { x } = this.position;
    if (x + this.sprite.naturalWidth >= innerWidth || x <= 0) {
      this.velocity *= -1;
    }

    if(this.velocity < 0) {
      this.sprite = store.assets.reversedEnemy;
    }else{
      this.sprite = store.assets.enemy;
    }

    this.position.x += this.velocity;
  }

  protected drawSelf(ctx: CanvasRenderingContext2D): void {
    const { x, y } = this.position;
    const { naturalHeight, naturalWidth } = this.sprite;
    ctx.fillStyle = store.color;
    ctx.drawImage(
      this.sprite,
      x,
      y + this.healthBarHeight,
      naturalWidth,
      naturalHeight
    );
  }

  protected drawHealthBar(ctx: CanvasRenderingContext2D): void {
    ctx.fillStyle = "red";
    ctx.fillRect(
      this.position.x,
      0,
      this.sprite.naturalWidth * (this.currentHealth / this.maxHealth),
      this.healthBarHeight
    );
  }

  public shoot(): void {
    const { x, y } = this.position;
    const ySpawn = y + this.sprite.naturalHeight + this.healthBarHeight;

    for (let i = 0; i < this.BULLETS_MULTIPLIER; i++) {
      store.bullets.splice(
        0,
        0,
        new EnemyBullet(
          randomIntegerBetween(x, x + this.sprite.naturalWidth),
          ySpawn
        )
      );
    }
  }
}
