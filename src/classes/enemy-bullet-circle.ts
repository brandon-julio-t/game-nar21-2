import EnemyBullet from "./abstracts/enemy-bullet";
import store from "@/store";
import { degreeToRadian, randomIntegerBetween } from "./core/utilities";

export default class EnemyBulletCircle extends EnemyBullet {
  private static readonly WIDTH: number = 15;
  private static readonly HEIGHT: number = 15;

  private rotationDegree: number = 0;

  public constructor(x: number, y: number) {
    super(
      x,
      y,
      randomIntegerBetween(-7, 7),
      randomIntegerBetween(3, 7),
      EnemyBulletCircle.HEIGHT,
      EnemyBulletCircle.WIDTH,
      store.assets.enemyBulletCircle
    );
  }

  public draw(ctx: CanvasRenderingContext2D): void {
    const { x, y } = this.position;

    ctx.save();
    ctx.translate(x + this.WIDTH / 2, y + this.HEIGHT / 2);
    ctx.rotate(degreeToRadian(this.rotationDegree));
    ctx.drawImage(this.SPRITE, 0, 0, this.WIDTH, this.HEIGHT);
    ctx.restore();

    this.rotationDegree += Math.sqrt(
      this.VELOCITY.y ** 2 + this.VELOCITY.x ** 2
    );
  }
}
