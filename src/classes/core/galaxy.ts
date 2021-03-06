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

  private readonly backgroundCtx:
    | CanvasRenderingContext2D
    | OffscreenCanvasRenderingContext2D
    | null = null;
  private readonly starsCtx:
    | CanvasRenderingContext2D
    | OffscreenCanvasRenderingContext2D
    | null = null;

  private stars: Star[] = [];
  private animationId: number = -1;

  public constructor(
    backgroundCanvas: HTMLCanvasElement | null,
    starsCanvas: HTMLCanvasElement | null
  ) {
    if (!backgroundCanvas || !starsCanvas) return;

    backgroundCanvas.width = starsCanvas.width = innerWidth;
    backgroundCanvas.height = starsCanvas.height = innerHeight;

    if (backgroundCanvas.transferControlToOffscreen) {
      this.backgroundCtx = backgroundCanvas
        .transferControlToOffscreen()
        .getContext("2d") as OffscreenCanvasRenderingContext2D;
    } else {
      this.backgroundCtx = backgroundCanvas.getContext(
        "2d"
      ) as CanvasRenderingContext2D;
    }

    if (starsCanvas.transferControlToOffscreen) {
      this.starsCtx = starsCanvas
        .transferControlToOffscreen()
        .getContext("2d") as OffscreenCanvasRenderingContext2D;
    } else {
      this.starsCtx = starsCanvas.getContext("2d") as CanvasRenderingContext2D;
    }

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
          randomIntegerBetween(this.STARS_RADIUS_MIN, this.STARS_RADIUS_MAX),
          this.starsCtx
        )
      );
    }
  }

  public play(isIndex: boolean): void {
    onresize = () => {
      const main = document.querySelector("main");

      if (!this.backgroundCtx || !this.starsCtx || !main) return;

      this.starsCtx.canvas.width = this.backgroundCtx.canvas.width = innerWidth;
      this.starsCtx.canvas.height = this.backgroundCtx.canvas.height = innerHeight;

      this.drawBackground(isIndex);
    };

    this.drawBackground(isIndex);

    const FPSInterval = 1000 / 60;
    let lastFrameTime = Date.now();

    const loop = () => {
      this.animationId = requestAnimationFrame(loop);

      const now = Date.now();
      const deltaTime = now - lastFrameTime;
      if (deltaTime > FPSInterval && this.starsCtx) {
        lastFrameTime = now - (lastFrameTime % deltaTime);

        this.starsCtx.clearRect(
          0,
          0,
          this.starsCtx.canvas.width,
          this.starsCtx.canvas.height
        );

        this.stars.forEach(star => {
          if (!this.starsCtx) return;
          star.drawSelf(this.starsCtx);
          star.move();
          star.wrapIfNecessary();
        });
      }
    };

    this.animationId = requestAnimationFrame(loop);
  }

  public pause(): void {
    onresize = null;
    cancelAnimationFrame(this.animationId);
  }

  private drawBackground(isIndex: boolean): void {
    if (!this.backgroundCtx) return;

    const { height, width } = this.backgroundCtx.canvas;

    const leftCloud = this.backgroundCtx.createRadialGradient(
      0,
      0,
      width / 4,
      width / 2,
      height / 2,
      width * 2
    );
    leftCloud.addColorStop(0, isIndex ? "#007ACE" : "#3D2288");
    leftCloud.addColorStop(1, "rgb(0, 0, 0, 0)");

    this.backgroundCtx.fillStyle = leftCloud;
    this.backgroundCtx.fillRect(0, 0, width, height);

    const rightCloud = this.backgroundCtx.createRadialGradient(
      width,
      height,
      width / 2,
      width / 2,
      height / 2,
      width * 2
    );
    rightCloud.addColorStop(0, isIndex ? "#243C5A" : "#2D1C70");
    rightCloud.addColorStop(1, "rgb(0, 0, 0, 0)");

    this.backgroundCtx.fillStyle = rightCloud;
    this.backgroundCtx.fillRect(0, 0, width, height);

    this.backgroundCtx.fill();
  }
}
