import store from "@/store";
import Player from "../player";
import Bullet from "./bullet";

export default abstract class EnemyBullet extends Bullet {
  public constructor(
    x: number,
    y: number,
    xVelocity: number,
    yVelocity: number,
    height: number,
    width: number,
    sprite: HTMLImageElement
  ) {
    super(x, y, xVelocity, yVelocity, height, width, sprite);
  }

  public checkCollision(): void {
    const player: Player = store.player as Player;
    if (player !== null) {
      const { x: left, y: top } = this.position;
      const right: number = left + this.WIDTH;
      const bottom: number = top + this.HEIGHT;

      const xMin: number = player.position.x - player.HITBOX_SIZE;
      const yMin: number = player.position.y - player.HITBOX_SIZE;
      const xMax: number = player.position.x + player.HITBOX_SIZE;
      const yMax: number = player.position.y + player.HITBOX_SIZE;

      const hasCollision: boolean =
        left >= xMin && right <= xMax && top >= yMin && bottom <= yMax;

      if (hasCollision) {
        this.isEnded = true;
        player.reduceHealth(1);
      }
    }
  }
}
