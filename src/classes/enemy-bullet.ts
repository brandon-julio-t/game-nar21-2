import Bullet from "./abstracts/bullet";
import Player from "./player";
import store from "@/store";
import { degreeToRadian, randomIntegerBetween } from "./core/utilities";

export default class EnemyBullet extends Bullet {
  private rotationDegree: number = 0;

  public constructor(x: number, y: number) {
    super(
      x,
      y,
      randomIntegerBetween(-7, 7),
      randomIntegerBetween(3, 7),
      15,
      15,
      store.assets.enemyBullet
    );
  }

  public draw(ctx: CanvasRenderingContext2D): void {
    const { x, y } = this.position;

    ctx.save();
    ctx.translate(x + this.WIDTH / 2, y + this.HEIGHT / 2);
    ctx.rotate(degreeToRadian(this.rotationDegree));
    ctx.drawImage(
      this.SPRITE,
      -this.WIDTH / 2,
      -this.HEIGHT / 2,
      this.WIDTH,
      this.HEIGHT
    );
    ctx.restore();

    this.rotationDegree += Math.sqrt(
      this.VELOCITY.y ** 2 + this.VELOCITY.x ** 2
    );
  }

  public checkCollision(): void {
    const player: Player = store.player as Player;
    if (player !== null) {
      const { x: left, y: top } = this.position;
      const right: number = left + this.WIDTH;
      const bottom: number = top + this.HEIGHT;

      const hitboxOffset: number = player.HITBOX_SIZE;
      const xMin: number = player.position.x - hitboxOffset;
      const yMin: number = player.position.y - hitboxOffset;
      const xMax: number = player.position.x + hitboxOffset;
      const yMax: number = player.position.y + hitboxOffset;

      const hasCollision: boolean =
        left >= xMin && top >= yMin && right <= xMax && bottom <= yMax;

      if (hasCollision) {
        this.isEnded = true;
        player.reduceHealth(1);
      }
    }
  }
}
