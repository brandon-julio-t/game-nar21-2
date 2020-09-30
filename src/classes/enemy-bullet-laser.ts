import EnemyBullet from "./abstracts/enemy-bullet";
import MiniEnemy from "./mini-enemy";
import Player from "./player";
import store from "@/store";

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
      const xPlayer: number = player.position.x - player.WIDTH / 2;
      const yPlayer: number = player.position.y - player.HEIGHT / 2;

      this.VELOCITY.x = (xPlayer - this.SHOOTER.position.x) * 0.01;
      this.VELOCITY.y = (yPlayer - this.SHOOTER.position.y) * 0.01;

      this.ANGLE = Math.atan2(this.VELOCITY.y, this.VELOCITY.x) + Math.PI / 2;
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
      const x: number = this.position.x + Math.cos(this.ANGLE);
      const y: number = this.position.y + Math.sin(this.ANGLE);

      const hasCollision: boolean =
        x >= player.position.x &&
        x <= player.position.x + player.HITBOX_SIZE &&
        y >= player.position.y &&
        y <= player.position.y + player.HITBOX_SIZE;

      if (hasCollision) {
        this.isEnded = true;
        player.reduceHealth(1);
      }
    }
  }
}
