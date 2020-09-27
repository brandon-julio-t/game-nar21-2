import Vector2 from "../core/vector2";

export default abstract class Bullet {
  protected readonly HEIGHT: number;
  protected readonly VELOCITY: Vector2;
  protected readonly WIDTH: number;

  protected position: Vector2;
  public isEnded: boolean = false;

  public constructor(
    x: number,
    y: number,
    xVelocity: number,
    yVelocity: number,
    height: number,
    width: number
  ) {
    this.HEIGHT = height;
    this.VELOCITY = new Vector2(xVelocity, yVelocity);
    this.WIDTH = width;
    this.position = new Vector2(x, y);
  }

  public get isOutOfBounds(): boolean {
    const { x, y } = this.position;
    return x < 0 || y < 0 || x > innerWidth || y > innerHeight;
  }

  public move(): void {
    this.position.x += this.VELOCITY.x;
    this.position.y += this.VELOCITY.y;
  }

  public draw(ctx: CanvasRenderingContext2D): void {
    const { x, y } = this.position;
    ctx.moveTo(x, y);
    ctx.rect(x - this.WIDTH / 2, y, this.WIDTH, this.HEIGHT);
  }

  public abstract checkCollision(): void;
}
