import CanDraw from "../interfaces/can-draw";
import Star from "./star";
import Vector2 from "./vector2";
import { degreeToRadian, randomIntegerBetween } from "./utilities";

export default class Galaxy {
  private readonly STARS_COUNT: number = innerWidth / 3;
  private readonly STARS_DIRECTION_DEGREE: number = 145;
  private readonly STARS_RADIUS_MAX: number = 3;
  private readonly STARS_RADIUS_MIN: number = 1;
  private readonly STARS_SPEED_MAX: number = 5;
  private readonly STARS_SPEED_MIN: number = 1;

  private stars: Star[] = [];
  private animationId: number = -1;

  public constructor() {
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

  public play(
    backgroundCtx: OffscreenCanvasRenderingContext2D,
    starsCtx: OffscreenCanvasRenderingContext2D
  ): void {
    const leftCloud = backgroundCtx.createRadialGradient(
      0,
      0,
      innerWidth / 4,
      innerWidth / 2,
      innerHeight / 2,
      innerWidth * 2
    );
    leftCloud.addColorStop(0, "#007ACE");
    leftCloud.addColorStop(1, "rgb(0, 0, 0, 0)");

    backgroundCtx.fillStyle = leftCloud;
    backgroundCtx.fillRect(0, 0, innerWidth, innerHeight);

    const rightCloud = backgroundCtx.createRadialGradient(
      innerWidth,
      innerHeight,
      innerWidth / 2,
      innerWidth / 2,
      innerHeight / 2,
      innerWidth * 2
    );
    rightCloud.addColorStop(0, "#243C5A");
    rightCloud.addColorStop(1, "rgb(0, 0, 0, 0)");

    backgroundCtx.fillStyle = rightCloud;
    backgroundCtx.fillRect(0, 0, innerWidth, innerHeight);

    backgroundCtx.fill();

    const FPSInterval = 1000 / 60;
    let lastFrameTime = Date.now();

    const loop = () => {
      this.animationId = requestAnimationFrame(loop);

      const now = Date.now();
      const deltaTime = now - lastFrameTime;
      if (deltaTime > FPSInterval) {
        lastFrameTime = now - (lastFrameTime % deltaTime);

        starsCtx.clearRect(0, 0, innerWidth, innerHeight);

        this.stars.forEach(star => {
          star.drawSelf(starsCtx);
          star.move();
          star.wrapIfNecessary();
        });
      }
    };

    this.animationId = requestAnimationFrame(loop);
  }

  public pause(): void {
    cancelAnimationFrame(this.animationId);
  }
}
