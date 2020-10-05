import EnemyBullet from "./abstracts/enemy-bullet";
import Player from "./player";
import store from "@/store";
import { radianToVector, vectorToRadian } from "./core/utilities";
import Vector2 from "./core/vector2";

export default class EnemyBulletLaser extends EnemyBullet {
  private readonly SPEED: number = 7;
  private readonly ANGLE: number = 0;

  public constructor(x: number, y: number) {
    super(
      x,
      y,
      0,
      0,
      store.assets.enemyBulletLaser.naturalHeight,
      store.assets.enemyBulletLaser.naturalWidth,
      store.assets.enemyBulletLaser
    );
    const { player } = store;
    if (player !== null) {
      const x: number = (player.position.x - this.position.x) * 0.01;
      const y: number = (player.position.y - this.position.y) * 0.01;
      const normalized = new Vector2(x, y).normalized();

      this.VELOCITY.x = normalized.x * this.SPEED;
      this.VELOCITY.y = normalized.y * this.SPEED;

      this.ANGLE = vectorToRadian(this.VELOCITY);
    }
  }

  public draw(ctx: CanvasRenderingContext2D): void {
    const { x, y } = this.position;
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(this.ANGLE);
    ctx.drawImage(this.SPRITE, -this.WIDTH / 2, -this.HEIGHT / 2);
    ctx.restore();
  }

  public checkCollision(): void {
    const player: Player = store.player as Player;
    if (player !== null) {
      const { x, y } = radianToVector(this.ANGLE);

      const xPos: number = this.position.x + x;
      const yPos: number = this.position.y + y;

      const hasCollision: boolean =
        xPos >= player.position.x - player.HITBOX_SIZE / 2 &&
        xPos <= player.position.x + player.HITBOX_SIZE / 2 &&
        yPos >= player.position.y - player.HITBOX_SIZE / 2 &&
        yPos <= player.position.y + player.HITBOX_SIZE / 2;

      if (hasCollision) {
        this.isEnded = true;
        player.reduceHealth(1);
      }
    }
  }
}
