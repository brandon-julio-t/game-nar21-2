import Direction from "./direction";
import Vector2 from "./vector2";
import store from "@/store";

export default abstract class Bullet {
  protected readonly HEIGHT: number = 0;
  protected readonly VELOCITY: number = 0;
  protected readonly WIDTH: number = 0;

  private direction: Direction;
  protected position: Vector2;
  public isEnded: boolean = false;

  constructor(x: number, y: number, direction: Direction) {
    this.position = new Vector2(x, y);
    this.direction = direction;
  }

  public get isOutOfBounds() {
    const { x, y } = this.position;
    return x < 0 || y < 0 || x > innerWidth || y > innerHeight;
  }

  public move(): void {
    switch (this.direction) {
      case Direction.NORTH:
        this.moveUp();
        break;

      case Direction.NORTH_EAST:
        this.moveUp();
        this.moveRight();
        break;

      case Direction.NORTH_WEST:
        this.moveUp();
        this.moveLeft();
        break;

      case Direction.SOUTH:
        this.moveDown();
        break;

      case Direction.SOUTH_EAST:
        this.moveDown();
        this.moveRight();
        break;

      case Direction.SOUTH_WEST:
        this.moveDown();
        this.moveLeft();
        break;

      case Direction.EAST:
        this.moveLeft();
        break;

      case Direction.WEST:
        this.moveRight();
        break;
    }
  }

  private moveUp(): void {
    this.position.y -= this.VELOCITY;
  }

  private moveDown(): void {
    this.position.y += this.VELOCITY;
  }

  private moveLeft(): void {
    this.position.x -= this.VELOCITY;
  }

  private moveRight(): void {
    this.position.x += this.VELOCITY;
  }

  public draw(ctx: CanvasRenderingContext2D): void {
    const { x, y } = this.position;
    ctx.moveTo(x, y);
    ctx.rect(x - this.WIDTH / 2, y, this.WIDTH, this.HEIGHT);
  }

  public checkCollision(): void {}
}
