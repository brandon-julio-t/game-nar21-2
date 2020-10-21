import CanDraw from "../interfaces/can-draw";
import Star from "./star";
import Vector2 from "./vector2";
import { degreeToRadian, randomIntegerBetween } from "./utilities";

export default class Galaxy implements CanDraw {
  private readonly STARS_COUNT: number = innerWidth / 3;
  private readonly STARS_DIRECTION_DEGREE: number = 145;
  private readonly STARS_RADIUS_MAX: number = 3;
  private readonly STARS_RADIUS_MIN: number = 1;
  private readonly STARS_SPEED_MAX: number = 5;
  private readonly STARS_SPEED_MIN: number = 1;

  private stars: Star[] = [];

  public constructor(canvas: HTMLCanvasElement | null) {
    if (canvas === null) return;

    canvas.width = innerWidth;
    canvas.height = innerHeight;

    const { x: xVelocity, y: yVelocity } = Vector2.fromRadian(
      degreeToRadian(this.STARS_DIRECTION_DEGREE)
    ).normalized();

    for (let i = 0; i < this.STARS_COUNT; i++) {
      const randomVelocityMultiplier =
        randomIntegerBetween(this.STARS_SPEED_MIN, this.STARS_SPEED_MAX) / 10;

      this.stars.push(
        new Star(
          randomIntegerBetween(0, innerWidth),
          randomIntegerBetween(0, innerHeight),
          xVelocity * randomVelocityMultiplier,
          yVelocity * randomVelocityMultiplier,
          randomIntegerBetween(this.STARS_RADIUS_MIN, this.STARS_RADIUS_MAX)
        )
      );
    }
  }

  public drawSelf(ctx: CanvasRenderingContext2D): void {
    const FPSInterval = 1000 / 60;
    let lastFrameTime = Date.now();

    const loop = () => {
      requestAnimationFrame(loop);

      const now = Date.now();
      const deltaTime = now - lastFrameTime;
      if (deltaTime > FPSInterval) {
        lastFrameTime = now - (lastFrameTime % deltaTime);

        ctx.clearRect(0, 0, innerWidth, innerHeight);

        const leftCloud = ctx.createRadialGradient(
          0,
          0,
          innerWidth / 4,
          innerWidth / 2,
          innerHeight / 2,
          2000
        );
        leftCloud.addColorStop(0, "#495B9A");
        leftCloud.addColorStop(1, "rgb(0, 0, 0, 0)");

        ctx.fillStyle = leftCloud;
        ctx.fillRect(0, 0, innerWidth, innerHeight);

        const rightCloud = ctx.createRadialGradient(
          innerWidth,
          innerHeight - 200,
          innerWidth / 2,
          innerWidth / 2,
          innerHeight / 2,
          2000
        );
        rightCloud.addColorStop(0, "#243C5A");
        rightCloud.addColorStop(1, "rgb(0, 0, 0, 0)");

        ctx.fillStyle = rightCloud;
        ctx.fillRect(0, 0, innerWidth, innerHeight);

        ctx.fill();

        this.stars.forEach(star => {
          star.drawSelf(ctx);
          star.move();
          star.wrapIfNecessary();
        });
      }
    };

    requestAnimationFrame(loop);
  }
}
