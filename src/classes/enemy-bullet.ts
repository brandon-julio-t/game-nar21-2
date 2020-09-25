import Bullet from "./abstracts/bullet";
import Player from "./player";
import store from "@/store";
import { randomIntegerBetween } from "./core/utilities";

export default class EnemyBullet extends Bullet {
  public readonly sprite: HTMLImageElement;

  constructor(x: number, y: number) {
    super(x, y, randomIntegerBetween(-7, 7), 7, 10, 10);
    this.sprite = store.assets.enemyBullet;
  }

  public draw(ctx: CanvasRenderingContext2D): void {
    const { x, y } = this.position;
    ctx.drawImage(this.sprite, x, y, this.WIDTH, this.HEIGHT);
  }

  public checkCollision(): void {
    const player: Player = store.player as Player;
    if (player !== null) {
      const { x: left, y: top } = this.position;
      const right = left + this.WIDTH;
      const bottom = top + this.HEIGHT;

      const hitboxOffset = player.HITBOX_SIZE;
      const xMin = player.position.x - hitboxOffset;
      const yMin = player.position.y - hitboxOffset;
      const xMax = player.position.x + hitboxOffset;
      const yMax = player.position.y + hitboxOffset;

      const hasCollision: boolean =
        left >= xMin && top >= yMin && right <= xMax && bottom <= yMax;

      if (hasCollision) {
        this.isEnded = true;
        player.reduceHealth(1);
      }
    }
  }

  public wrapHorizontal(): void {
    const { x } = this.position;
    if (x <= 0) {
      this.position.x = innerWidth;
    } else if (x >= innerWidth) {
      this.position.x = 0;
    }
  }

  public wrapVertical(): void {
    const { y } = this.position;
    if (y <= 0) {
      this.position.y = innerHeight;
    } else if (y >= innerHeight) {
      this.position.y = 0;
    }
  }
}
