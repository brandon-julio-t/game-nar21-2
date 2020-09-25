import Bullet from "./abstracts/bullet";
import Direction from "./enums/direction";
import Player from "./player";
import store from "@/store";

export default class EnemyBullet extends Bullet {
  protected readonly VELOCITY: number = 7;
  protected readonly RADIUS: number = 10;

  public readonly sprite: HTMLImageElement;

  constructor(x: number, y: number, direction: Direction) {
    super(x, y, direction);
    this.sprite = store.assets.enemyBullet;
  }

  public draw(ctx: CanvasRenderingContext2D): void {
    const { x, y } = this.position;
    ctx.drawImage(this.sprite, x, y, this.RADIUS, this.RADIUS);
  }

  public checkCollision(): void {
    const player: Player = store.player as Player;
    if (player !== null) {
      const { x: left, y: top } = this.position;
      const right = left + this.RADIUS;
      const bottom = top + this.RADIUS;

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
}
