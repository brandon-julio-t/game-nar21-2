import Direction from "./Direction";
import Vector2 from "./Vector2";
import store from "@/store";
import Enemy from "./Enemy";

export default class Bullet {
  private readonly HEIGHT = 20;
  private readonly VELOCITY = 10;
  private readonly WIDTH = 5;

  private direction: Direction;
  private position: Vector2;

  public isEnded: boolean = false;

  constructor(x: number, y: number, direction: Direction = Direction.NORTH) {
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
    ctx.fillStyle = "black";
    ctx.fillRect(x - this.WIDTH / 2, y, this.WIDTH, this.HEIGHT);
  }

  public checkCollisionWithEnemy(): void {
    const enemy: Enemy | null = store.enemy as Enemy | null;
    if (enemy !== null) {
      const hasCollision: boolean =
        this.position.x >= enemy.position.x &&
        this.position.y >= enemy.position.y &&
        this.position.x <= enemy.position.x + enemy.WIDTH &&
        this.position.y <= enemy.position.y + enemy.HEIGHT;
      
      if (hasCollision) {
        enemy.reduceHealth(5);
        this.isEnded = true;
      }
    }
  }
}
