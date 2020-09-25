import Direction from "./enums/direction";
import EnemyBullet from "./enemy-bullet";
import Entity from "./abstracts/entity";
import Vector2 from "./core/vector2";
import store from "@/store";
import { randomIntegerBetween } from "./core/utilities";

export default class Enemy extends Entity {
  public position: Vector2;
  public sprite: HTMLImageElement;

  private currentHealth: number;
  private healthbarHeight: number;
  private maxHealth: number;
  private velocity: number = 5;

  constructor(health: number) {
    super();
    this.currentHealth = this.maxHealth = health;
    this.sprite = store.assets.enemy;
    this.healthbarHeight = this.sprite.naturalHeight / 4;
    this.position = new Vector2(
      innerWidth / 2 - this.sprite.naturalWidth / 2,
      0
    );
  }

  public get isDead(): boolean {
    return this.currentHealth <= 0;
  }

  public reduceHealth(points: number): void {
    this.currentHealth -= points;
  }

  public move(): void {
    const { x } = this.position;
    if (x + this.sprite.naturalWidth >= innerWidth || x <= 0) {
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
    const { naturalHeight, naturalWidth } = this.sprite;
    ctx.fillStyle = store.color;
    ctx.drawImage(
      this.sprite,
      x,
      y + this.healthbarHeight,
      naturalWidth,
      naturalHeight
    );
  }

  private drawHealthBar(ctx: CanvasRenderingContext2D): void {
    ctx.fillStyle = "red";
    ctx.fillRect(
      this.position.x,
      0,
      this.sprite.naturalWidth * (this.currentHealth / this.maxHealth),
      this.healthbarHeight
    );
  }

  public shoot(): void {
    const directions: Direction[] = [
      Direction.SOUTH,
      Direction.SOUTH_EAST,
      Direction.SOUTH_WEST
    ];

    const { x, y } = this.position;
    store.bullets.splice(
      0,
      0,
      ...directions.map(
        direction =>
          new EnemyBullet(
            randomIntegerBetween(x, x + this.sprite.naturalWidth),
            y + this.sprite.naturalHeight + this.healthbarHeight,
            direction
          )
      )
    );
  }
}
