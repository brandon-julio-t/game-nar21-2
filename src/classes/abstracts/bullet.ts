import CanCollide from "../interfaces/can-collide";
import CanDraw from "../interfaces/can-draw";
import CanGoOutOfBounds from "../interfaces/can-go-out-of-bounds";
import CanMove from "../interfaces/can-move";
import Vector2 from "../core/vector2";

export default abstract class Bullet
  implements CanCollide, CanDraw, CanGoOutOfBounds, CanMove {
  public isEnded: boolean = false;
  protected readonly HEIGHT: number;
  protected readonly VELOCITY: Vector2;
  protected readonly WIDTH: number;
  protected readonly SPRITE: HTMLImageElement;
  protected position: Vector2;

  public constructor(
    x: number,
    y: number,
    xVelocity: number,
    yVelocity: number,
    height: number,
    width: number,
    sprite: HTMLImageElement
  ) {
    this.position = new Vector2(x, y);
    this.VELOCITY = new Vector2(xVelocity, yVelocity);
    this.HEIGHT = height;
    this.WIDTH = width;
    this.SPRITE = sprite;
  }

  public get isOutOfBounds(): boolean {
    return this.isOutOfHorizontalBounds || this.isOutOfVerticalBounds;
  }

  public get isOutOfHorizontalBounds(): boolean {
    const { x } = this.position;
    return x < 0 || x > innerWidth;
  }

  public get isOutOfVerticalBounds(): boolean {
    const { y } = this.position;
    return y < 0 || y > innerHeight;
  }

  public move(): void {
    this.position.x += this.VELOCITY.x;
    this.position.y += this.VELOCITY.y;
  }

  public onCollide(): void {
    this.isEnded = true;
  }

  public abstract checkCollision(): void;

  public abstract drawSelf(
    ctx: CanvasRenderingContext2D | OffscreenCanvasRenderingContext2D
  ): void;
}
