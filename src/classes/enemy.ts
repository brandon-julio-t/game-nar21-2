import Direction from "./enums/direction";
import EnemyBullet from "./enemy-bullet";
import Entity from "./abstracts/entity";
import store from "@/store";
import { randomIntegerBetween } from "./core/utilities";

export default class Enemy extends Entity {
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
    const directions: Direction[] = [
      Direction.SOUTH,
      Direction.SOUTH_EAST,
      Direction.SOUTH_WEST
    ];

    const { x, y } = this.position;
    store.bullets.splice(
      0,
      0,
      ...directions.map(
        direction =>
          new EnemyBullet(
            randomIntegerBetween(x, x + this.sprite.naturalWidth),
            y + this.sprite.naturalHeight + this.healthBarHeight,
            direction
          )
      )
    );
  }
}
