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

  constructor() {
    this.sprite = store.assets.meteor;

    this.position = new Vector2(0, 0);
    this.resetPositionToSpawnPosition();
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
    const { naturalHeight, naturalWidth } = this.sprite;
    return (
      x + this.SIZE * (naturalWidth / naturalHeight) < 0 ||
      y < 0 ||
      x > innerWidth ||
      y > innerHeight
    );
  }

  public drawSelf(ctx: CanvasRenderingContext2D): void {
    const { x, y } = this.position;
    const { naturalHeight, naturalWidth } = this.sprite;
    ctx.drawImage(
      this.sprite,
      x,
      y,
      this.SIZE * (naturalWidth / naturalHeight),
      this.SIZE * (naturalHeight / naturalWidth)
    );
  }

  public checkCollision(): void {
    const player: Player = store.player as Player;
    if (player !== null) {
      const { naturalHeight, naturalWidth } = this.sprite;
      const { x: xMin, y: yMin } = this.position;
      const xMax = xMin + this.SIZE * (naturalWidth / naturalHeight);
      const yMax = yMin + this.SIZE * (naturalHeight / naturalWidth);

      const hitboxOffset = player.HITBOX_SIZE;
      const left = player.position.x - hitboxOffset;
      const top = player.position.y - hitboxOffset;
      const right = player.position.x + hitboxOffset;
      const bottom = player.position.y + hitboxOffset;

      const hasCollision: boolean =
        left >= xMin && top >= yMin && right <= xMax && bottom <= yMax;

      if (hasCollision) {
        player.isDead = true;
      }
    }
  }
}
