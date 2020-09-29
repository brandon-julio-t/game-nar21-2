import Vector2 from "../core/vector2";
import store from "@/store";

export default abstract class Entity {
  private readonly EXPLODING_SPRITE_COLS: number = 6;
  private readonly EXPLODING_SPRITE_ROWS: number = 7;

  public readonly HEIGHT: number;
  public readonly WIDTH: number;

  private explodingSpriteRowIdx: number = 0;
  private explodingSpriteColIdx: number = 0;

  protected _velocity: number;
  protected healthBarHeight: number;
  protected maxHealth: number;

  public currentHealth: number;
  public explodeSprite: HTMLImageElement;
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
    width: number,
    velocity: number
  ) {
    this.healthBarHeight = healthBarHeight;
    this.maxHealth = this.currentHealth = health;
    this.position = new Vector2(x, y);
    this.sprite = sprite;
    this.explodeSprite = store.assets.explodeSprite;
    this.HEIGHT = height;
    this.WIDTH = width;
    this._velocity = velocity;
  }

  public get isDead(): boolean {
    return this.currentHealth <= 0;
  }

  protected get velocity(): number {
    return this._velocity;
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
    const { naturalHeight, naturalWidth } = this.explodeSprite;

    const spriteHeight: number = naturalHeight / this.EXPLODING_SPRITE_ROWS;
    const spriteWidth: number = naturalWidth / this.EXPLODING_SPRITE_COLS;

    const { x, y } = this.position;

    ctx.drawImage(
      this.explodeSprite,
      this.explodingSpriteColIdx * spriteWidth,
      this.explodingSpriteRowIdx * spriteHeight,
      spriteWidth,
      spriteHeight,
      x,
      y,
      spriteWidth,
      spriteHeight
    );

    this.explodingSpriteColIdx++;

    if (this.explodingSpriteColIdx >= this.EXPLODING_SPRITE_COLS) {
      this.explodingSpriteColIdx = 0;
      this.explodingSpriteRowIdx++;
    }

    if (this.explodingSpriteRowIdx >= this.EXPLODING_SPRITE_ROWS) {
      this.hasFinishedExploding = true;
    }
  }

  protected abstract drawSelf(ctx: CanvasRenderingContext2D): void;
  protected abstract drawHealthBar(ctx: CanvasRenderingContext2D): void;

  public abstract move(): void;
  public abstract shoot(): void;
}
