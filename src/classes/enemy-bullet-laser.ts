import EnemyBullet from "./abstracts/enemy-bullet";
import Player from "./player";
import store from "@/store";
import Vector2 from "./core/vector2";

export default class EnemyBulletLaser extends EnemyBullet {
  private static readonly SPEED: number = 7;

  private readonly ANGLE: number = 0;

  public constructor(
    x: number,
    y: number,
    xVelocity: number = EnemyBulletLaser.SPEED,
    yVelocity: number = EnemyBulletLaser.SPEED
  ) {
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

      this.VELOCITY.x = normalized.x * xVelocity;
      this.VELOCITY.y = normalized.y * yVelocity;

      this.ANGLE = this.VELOCITY.toRadian();
    }
  }

  public drawSelf(
    ctx: CanvasRenderingContext2D | OffscreenCanvasRenderingContext2D
  ): void {
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
      const { x, y } = Vector2.fromRadian(this.ANGLE);

      const xPos: number = this.position.x + x;
      const yPos: number = this.position.y + y;

      const hasCollision: boolean =
        xPos >= player.position.x - player.HIT_BOX_SIZE / 2 &&
        xPos <= player.position.x + player.HIT_BOX_SIZE / 2 &&
        yPos >= player.position.y - player.HIT_BOX_SIZE / 2 &&
        yPos <= player.position.y + player.HIT_BOX_SIZE / 2;

      if (hasCollision) {
        this.isEnded = true;
        player.reduceHealth(1);
      }
    }
  }
}
