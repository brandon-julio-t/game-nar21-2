import CanDraw from "../interfaces/can-draw";
import CanMove from "../interfaces/can-move";
import HasHealthBar from "../interfaces/has-health-bar";
import Vector2 from "../core/vector2";
import store from "@/store";
import { playAudio } from "../core/utilities";
import CanShoot from "../interfaces/can-shoot";

export default abstract class Entity implements CanDraw, CanMove, CanShoot, HasHealthBar {
  public readonly HEIGHT: number;
  public readonly WIDTH: number;
  public explodeSprite: HTMLImageElement;
  public hasFinishedDying: boolean = false;
  public position: Vector2;
  public sprite: HTMLImageElement;
  protected currentHealth: number;
  protected healthBarHeight: number;
  protected isPlayingExplodingAudio: boolean = false;
  protected maxHealth: number;
  protected _velocity: number;
  private readonly EXPLODING_SPRITE_COLS: number = 8;
  private readonly EXPLODING_SPRITE_ROWS: number = 8;
  private readonly explodingAudio: HTMLAudioElement;
  private explodingSpriteColIdx: number = 0;
  private explodingSpriteRowIdx: number = 0;
  private hasTriggeredOnDie: boolean = false;

  protected constructor(
    x: number,
    y: number,
    health: number,
    sprite: HTMLImageElement,
    healthBarHeight: number,
    height: number,
    width: number,
    velocity: number,
    explodingAudio: HTMLAudioElement
  ) {
    this.healthBarHeight = healthBarHeight;
    this.maxHealth = this.currentHealth = health;
    this.position = new Vector2(x, y);
    this.sprite = sprite;
    this.explodeSprite = store.assets.explodeSprite;
    this.HEIGHT = height;
    this.WIDTH = width;
    this._velocity = velocity;
    this.explodingAudio = explodingAudio;
  }

  public get isDead(): boolean {
    return this.currentHealth <= 0;
  }

  protected get velocity(): number {
    return this._velocity;
  }

  public reduceHealth(points: number): void {
    this.currentHealth -= points;

    if (this.isDead && !this.isPlayingExplodingAudio) {
      playAudio(this.explodingAudio);
      this.isPlayingExplodingAudio = true;
    }
  }

  public drawSelfAndHealthBar(ctx: OffscreenCanvasRenderingContext2D): void {
    if (this.isDead) {
      this.drawExplodeSprite(ctx);

      if (!this.hasTriggeredOnDie) {
        this.die();
      }
    } else {
      this.drawSelf(ctx);
      this.drawHealthBar(ctx);
    }
  }

  public drawExplodeSprite(ctx: OffscreenCanvasRenderingContext2D): void {
    if (this.explodingSpriteRowIdx >= this.EXPLODING_SPRITE_ROWS) {
      this.hasFinishedDying = true;
      return;
    }

    const { naturalHeight, naturalWidth } = this.explodeSprite;

    const spriteHeight: number = naturalHeight / this.EXPLODING_SPRITE_ROWS;
    const spriteWidth: number = naturalWidth / this.EXPLODING_SPRITE_COLS;

    const { WIDTH, position } = this;
    const { x, y } = position;

    const scaleDownRatio: number = 0.0125;
    const scaledHeight: number = spriteHeight * WIDTH * scaleDownRatio;
    const scaledWidth: number = spriteWidth * WIDTH * scaleDownRatio;

    ctx.drawImage(
      this.explodeSprite,
      this.explodingSpriteColIdx * spriteWidth,
      this.explodingSpriteRowIdx * spriteHeight,
      spriteWidth,
      spriteHeight,
      x - scaledWidth / 2,
      y - scaledHeight / 2,
      scaledWidth,
      scaledHeight
    );

    this.explodingSpriteColIdx++;

    if (this.explodingSpriteColIdx >= this.EXPLODING_SPRITE_COLS) {
      this.explodingSpriteColIdx = 0;
      this.explodingSpriteRowIdx++;
    }
  }

  public move(): void {
    if (this.isDead) {
      this.stopMoving();
    }
  }

  protected die(): void {
    this.hasTriggeredOnDie = true;
  }

  public abstract shoot(): void;

  public abstract drawSelf(ctx: OffscreenCanvasRenderingContext2D): void;

  public abstract drawHealthBar(ctx: OffscreenCanvasRenderingContext2D): void;

  protected stopMoving(): void {
    this._velocity = 0;
  }
}
