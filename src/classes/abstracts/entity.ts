import Vector2 from "../core/vector2";

export default abstract class Entity {
  protected healthBarHeight: number;
  protected maxHealth: number;

  public currentHealth: number;
  public position: Vector2;
  public sprite: HTMLImageElement;
  
  public isGetHit : boolean;
  public FREQUENCY: number = 50;

  constructor(x: number, y: number, health: number, sprite: HTMLImageElement, healthBarHeight: number) {
    this.maxHealth = this.currentHealth = health;
    this.position = new Vector2(x, y);
    this.sprite = sprite;
    this.healthBarHeight = healthBarHeight;
    this.isGetHit = false;
  }

  public get isDead(): boolean {
    return this.currentHealth <= 0;
  }

  public reduceHealth(points: number): void {
    this.isGetHit = true;
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
