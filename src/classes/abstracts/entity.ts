import Vector2 from "../core/vector2";

export default abstract class Entity {
  public readonly HEIGHT: number | null = null;
  public readonly WIDTH: number | null = null;

  protected healthBarHeight: number;
  protected maxHealth: number;

  public currentHealth: number;
  public position: Vector2;
  public sprite: HTMLImageElement;

  constructor(x: number, y: number, health: number, sprite: HTMLImageElement, healthBarHeight: number) {
    this.maxHealth = this.currentHealth = health;
    this.position = new Vector2(x, y);
    this.sprite = sprite;
    this.healthBarHeight = healthBarHeight;
  }

  public get isDead(): boolean {
    return this.currentHealth <= 0;
  }

  public reduceHealth(points: number): void {
    this.currentHealth -= points;
  }

  public drawSelfAndHealthBar(ctx: CanvasRenderingContext2D): void {
    this.drawSelf(ctx);
    this.drawHealthBar(ctx);
  }

  protected abstract drawSelf(ctx: CanvasRenderingContext2D): void;
  protected abstract drawHealthBar(ctx: CanvasRenderingContext2D): void;

  public abstract move(): void;
  public abstract shoot(): void;
}
