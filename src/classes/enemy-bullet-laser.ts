import EnemyBullet from "./abstracts/enemy-bullet";
import MiniEnemy from "./mini-enemy";
import Player from "./player";
import store from "@/store";
import { radianToVector, vectorToRadian } from "./core/utilities";

export default class EnemyBulletLaser extends EnemyBullet {
  private readonly SHOOTER: MiniEnemy;
  private readonly ANGLE: number = 0;

  public constructor(x: number, y: number, shooter: MiniEnemy) {
    super(
      x,
      y,
      0,
      0,
      store.assets.enemyBulletLaser.naturalHeight,
      store.assets.enemyBulletLaser.naturalWidth,
      store.assets.enemyBulletLaser
    );

    this.SHOOTER = shooter;

    const { player } = store;
    if (player !== null) {
      this.VELOCITY.x = (player.position.x - this.position.x) * 0.01;
      this.VELOCITY.y = (player.position.y - this.position.y) * 0.01;

      this.ANGLE = vectorToRadian(this.VELOCITY);
    }
  }

  public draw(ctx: CanvasRenderingContext2D): void {
    const { x, y } = this.position;
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(this.ANGLE);
    ctx.drawImage(this.SPRITE, 0, 0);
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
