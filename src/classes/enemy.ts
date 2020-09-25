import Direction from "./enums/direction";
import EnemyBullet from "./enemy-bullet";
import Entity from "./abstracts/entity";
import Vector2 from "./core/vector2";
import store from "@/store";
import utility from "./core/utilities";

export default class Enemy extends Entity {
  public readonly HEIGHT: number = innerHeight / 4;
  public readonly WIDTH: number = innerWidth / 2;

  private readonly HEALTHBAR_HEIGHT = this.HEIGHT / 4;

  public position: Vector2 = new Vector2(innerWidth / 2 - this.WIDTH / 2, 0);

  private velocity: number = 5;
  private maxHealth: number;
  private currentHealth: number;

  constructor(health: number) {
    super();
    this.currentHealth = this.maxHealth = health;
  }

  public get isDead(): boolean {
    return this.currentHealth <= 0;
  }

  public reduceHealth(points: number): void {
    this.currentHealth -= points;
  }

  public move(): void {
    const { x } = this.position;
    if (x + this.WIDTH >= innerWidth || x <= 0) {
      this.velocity *= -1;
    }

    this.position.x += this.velocity;
  }

  public drawSelfAndHealthBar(ctx: CanvasRenderingContext2D): void {
    this.drawSelf(ctx);
    this.drawHealthBar(ctx);
  }

  private drawSelf(ctx: CanvasRenderingContext2D): void {
    const { x, y } = this.position;
    ctx.fillStyle = store.color;
    ctx.fillRect(x, y, this.WIDTH, this.HEIGHT);
  }

  private drawHealthBar(ctx: CanvasRenderingContext2D): void {
    ctx.fillStyle = "red";
    ctx.fillRect(
      0,
      0,
      innerWidth * (this.currentHealth / this.maxHealth),
      this.HEALTHBAR_HEIGHT
    );
  }

  public shoot(): void {
    const directions: Direction[] = [
      // Direction.NORTH,
      // Direction.NORTH_EAST,
      // Direction.NORTH_WEST,
      Direction.SOUTH,
      Direction.SOUTH_EAST,
      Direction.SOUTH_WEST
      // Direction.EAST,
      // Direction.WEST
    ];

    const { x, y } = this.position;
    store.bullets.splice(
      0,
      0,
      ...directions.map(
        direction =>
          new EnemyBullet(
            utility.randomIntegerBetween(x, x + this.WIDTH),
            utility.randomIntegerBetween(
              y + this.HEALTHBAR_HEIGHT,
              y + this.HEIGHT
            ),
            direction
          )
      )
    );
  }
}
