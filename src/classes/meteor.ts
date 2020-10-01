import Bullet from "./abstracts/bullet";
import Player from "./player";
import Vector2 from "./core/vector2";
import store from "@/store";
import { randomIntegerBetween } from "./core/utilities";

export default class Meteor extends Bullet {
  private static readonly SCALE_DOWN_RATIO: number = 0.3;
  private static readonly VELOCITY: Vector2 = new Vector2(10, 3);

  private timeoutId: number | null = null;

  public constructor() {
    super(
      0,
      0,
      Meteor.VELOCITY.x,
      Meteor.VELOCITY.y,
      store.assets.meteor.naturalHeight * Meteor.SCALE_DOWN_RATIO,
      store.assets.meteor.naturalWidth * Meteor.SCALE_DOWN_RATIO,
      store.assets.meteor
    );

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
    this.position = new Vector2(
      innerWidth,
      randomIntegerBetween(0, (innerHeight + this.HEIGHT) / 2)
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
    return x + this.WIDTH < 0 || y < 0 || x > innerWidth || y > innerHeight;
  }

  public drawSelf(ctx: CanvasRenderingContext2D): void {
    const { x, y } = this.position;
    ctx.drawImage(this.SPRITE, x, y, this.WIDTH, this.HEIGHT);
  }

  public checkCollision(): void {
    const player: Player = store.player as Player;
    if (player !== null && !player.isInvulnerable) {
      const { x: xMin, y: yMin } = this.position;
      const xMax = xMin + this.WIDTH;
      const yMax = yMin + this.HEIGHT;

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

  /**
   * Handled by drawSelf()
   */
  public draw(_: CanvasRenderingContext2D): void {}
}
