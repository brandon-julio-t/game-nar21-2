import { degreeToRadian, randomIntegerBetween } from "./core/utilities";

import Bullet from "./abstracts/bullet";
import Vector2 from "./core/vector2";
import store from "@/store";

export default class Meteor extends Bullet {
  private static readonly SCALE_DOWN_RATIO: number = 0.125;
  private static readonly VELOCITY: Vector2 = new Vector2(10, 3);

  private rotationDegree: number = 0;
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

  public drawSelf(
    ctx: CanvasRenderingContext2D | OffscreenCanvasRenderingContext2D
  ): void {
    const { x, y } = this.position;
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(degreeToRadian(this.rotationDegree));
    ctx.drawImage(
      this.SPRITE,
      -this.WIDTH / 2,
      -this.HEIGHT / 2,
      this.WIDTH,
      this.HEIGHT
    );
    ctx.restore();

    this.rotationDegree -=
      Math.sqrt(this.VELOCITY.y ** 2 + this.VELOCITY.x ** 2) / 2;
  }

  public checkCollision(): void {
    const { player } = store;
    if (player !== null && !player.isInvulnerable) {
      const { position: p1 } = this;
      const { position: p2 } = player;

      const euclideanDistance: number = p1.euclideanDistanceTo(p2);

      const hasCollision: boolean =
        euclideanDistance <=
        player.HIT_BOX_SIZE + Math.min(this.WIDTH, this.HEIGHT) / 2;

      if (hasCollision) {
        this.onCollide();
      }
    }
  }

  public onCollide(): void {
    const { player } = store;
    if (player !== null) {
      player.reduceHealth(Number.MAX_SAFE_INTEGER);
    }
  }
}
