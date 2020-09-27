import Player from "./player";
import Vector2 from "./core/vector2";
import store from "@/store";
import { randomIntegerBetween } from "./core/utilities";

export default class Meteor {
  private readonly VELOCITY: Vector2 = new Vector2(10, 3);
  private readonly SIZE: number = 100;

  private position: Vector2 = new Vector2(0, 0);
  private timeoutId: number | null = null;

  public sprite: HTMLImageElement;

  public constructor() {
    this.sprite = store.assets.meteor;

    this.position = new Vector2(0, 0);
    this.resetPositionToSpawnPosition();
  }

  private get height(): number {
    const { naturalHeight, naturalWidth } = this.sprite;
    return (this.SIZE * naturalHeight) / naturalWidth;
  }

  private get width(): number {
    const { naturalHeight, naturalWidth } = this.sprite;
    return (this.SIZE * naturalWidth) / naturalHeight;
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
    const { naturalHeight } = this.sprite;
    this.position = new Vector2(
      innerWidth,
      randomIntegerBetween(0, (innerHeight + naturalHeight) / 2)
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
    return x + this.width < 0 || y < 0 || x > innerWidth || y > innerHeight;
  }

  public drawSelf(ctx: CanvasRenderingContext2D): void {
    const { x, y } = this.position;
    ctx.drawImage(this.sprite, x, y, this.width, this.height);
  }

  public checkCollision(): void {
    const player: Player = store.player as Player;
    if (player !== null && !player.isInvulnerable) {
      const { x: xMin, y: yMin } = this.position;
      const xMax = xMin + this.width;
      const yMax = yMin + this.height;

      const hitboxOffset = player.HITBOX_SIZE;
      const left = player.position.x - hitboxOffset;
      const top = player.position.y - hitboxOffset;
      const right = player.position.x + hitboxOffset;
      const bottom = player.position.y + hitboxOffset;

      const hasCollision: boolean =
        left >= xMin && top >= yMin && right <= xMax && bottom <= yMax;

      if (hasCollision) {
        player.reduceHealth(player.currentHealth);
      }
    }
  }
}
