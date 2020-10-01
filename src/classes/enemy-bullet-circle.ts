import EnemyBullet from "./abstracts/enemy-bullet";
import store from "@/store";
import { degreeToRadian, randomIntegerBetween } from "./core/utilities";
import Vector2 from "./core/vector2";

export default class EnemyBulletCircle extends EnemyBullet {
  private static readonly VELOCITY: Vector2 = new Vector2(
    randomIntegerBetween(-7, 7),
    randomIntegerBetween(3, 7)
  );

  private static readonly WIDTH: number = 15;
  private static readonly HEIGHT: number = 15;

  private rotationDegree: number = 0;

  public constructor(x: number, y: number) {
    super(
      x,
      y,
      EnemyBulletCircle.VELOCITY.x,
      EnemyBulletCircle.VELOCITY.y,
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
}
