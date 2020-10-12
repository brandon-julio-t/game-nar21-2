import Bullet from "./bullet";
import store from "@/store";

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
    const { player } = store;
    if (player !== null) {
      const { x, y } = this.position;

      const xMid: number = x - this.WIDTH / 2;
      const yMid: number = y - this.HEIGHT / 2;

      const xMin: number = player.position.x - player.HITBOX_SIZE;
      const yMin: number = player.position.y - player.HITBOX_SIZE;
      const xMax: number = player.position.x + player.HITBOX_SIZE;
      const yMax: number = player.position.y + player.HITBOX_SIZE;

      const hasCollision: boolean =
        xMid >= xMin && xMid <= xMax && yMid >= yMin && yMid <= yMax;

      if (hasCollision) {
        this.onCollide();
      }
    }
  }

  public onCollide(): void {
    const { player } = store;
    if (player !== null) {
      super.onCollide();
      player.reduceHealth(1);
    }
  }
}
