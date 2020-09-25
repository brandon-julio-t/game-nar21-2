import utilities from "./core/utilities";
import Vector2 from "./core/vector2";

export default class Meteor {
  private readonly VELOCITY: Vector2 = new Vector2(10, 3);

  private image: HTMLImageElement;
  private position: Vector2 = new Vector2(0, 0);
  private timeoutId: number | null = null;

  constructor() {
    this.image = new Image();
    this.image.src = `${process.env.BASE_URL}meteor.svg`;

    this.position = new Vector2(0, 0);
    this.resetPositionToSpawnPosition();
  }

  public spawnAgainLater(): void {
    if (this.timeoutId === null) {
      this.timeoutId = setTimeout(() => {
        this.resetPositionToSpawnPosition();
        this.timeoutId = null;
      }, 3000);
    }
  }

  private resetPositionToSpawnPosition(): void {
    const { naturalHeight } = this.image;
    this.position = new Vector2(
      innerWidth,
      utilities.randomIntegerBetween(0, (innerHeight + naturalHeight) / 2)
    );
  }

  public move(): void {
    this.moveDown();
    this.moveLeft();
  }

  private moveDown(): void {
    this.position.y += this.VELOCITY.y;
  }

  private moveLeft(): void {
    this.position.x -= this.VELOCITY.x;
  }

  public get isOutOfBounds(): boolean {
    const { x, y } = this.position;
    const { naturalWidth } = this.image;
    return x + naturalWidth < 0 || y < 0 || x > innerWidth || y > innerHeight;
  }

  public drawSelf(ctx: CanvasRenderingContext2D): void {
    const { x, y } = this.position;
    ctx.drawImage(this.image, x, y);
  }
}
