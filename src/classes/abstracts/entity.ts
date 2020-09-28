import Vector2 from "../core/vector2";
import store from "@/store";

export default abstract class Entity {
  public readonly HEIGHT: number;
  public readonly WIDTH: number;

  private rowIdx: number = 0;
  private colIdx: number = 0;

  protected healthBarHeight: number;
  protected maxHealth: number;

  public currentHealth: number;
  public explodeAnimation: HTMLImageElement;
  public hasFinishedExploding: boolean = false;
  public position: Vector2;
  public sprite: HTMLImageElement;

  public constructor(
    x: number,
    y: number,
    health: number,
    sprite: HTMLImageElement,
    healthBarHeight: number,
    height: number,
    width: number
  ) {
    this.healthBarHeight = healthBarHeight;
    this.maxHealth = this.currentHealth = health;
    this.position = new Vector2(x, y);
    this.sprite = sprite;
    this.explodeAnimation = store.assets.explodeAnimation;
    this.HEIGHT = height;
    this.WIDTH = width;
  }

  public get isDead(): boolean {
    return this.currentHealth <= 0;
  }

  public reduceHealth(points: number): void {
    this.currentHealth -= points;
  }

  public drawSelfAndHealthBar(ctx: CanvasRenderingContext2D): void {
    if (this.isDead) {
      this.drawExplodeSprite(ctx);
    } else {
      this.drawSelf(ctx);
      this.drawHealthBar(ctx);
    }
  }

  public drawExplodeSprite(ctx: CanvasRenderingContext2D): void {
    const cols: number = 6;
    const rows: number = 7;

    const imgWidth: number = this.explodeAnimation.naturalWidth;
    const imgHeight: number = this.explodeAnimation.naturalHeight;

    const spriteWidth: number = imgWidth / cols;
    const spriteHeight: number = imgHeight / rows;

    const { x, y } = this.position;

    ctx.drawImage(
      this.explodeAnimation,
      this.colIdx * spriteWidth,
      this.rowIdx * spriteHeight,
      spriteWidth,
      spriteHeight,
      x,
      y,
      spriteWidth,
      spriteHeight
    );

    this.colIdx++;

    if (this.colIdx >= cols) {
      this.colIdx = 0;
      this.rowIdx++;
    }

    if (this.rowIdx >= rows) {
      this.hasFinishedExploding = true;
    }
  }

  protected abstract drawSelf(ctx: CanvasRenderingContext2D): void;
  protected abstract drawHealthBar(ctx: CanvasRenderingContext2D): void;

  public abstract move(): void;
  public abstract shoot(): void;
}
