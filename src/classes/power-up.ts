import CanCollide from "./interfaces/can-collide";
import CanDraw from "./interfaces/can-draw";
import CanGoOutOfBounds from "./interfaces/can-go-out-of-bounds";
import CanMove from "./interfaces/can-move";
import Vector2 from "./core/vector2";
import store from "@/store";

export default class PowerUp
  implements CanCollide, CanDraw, CanMove, CanGoOutOfBounds {
  private readonly HEIGHT: number;
  private readonly SPRITE: HTMLImageElement;
  private readonly VELOCITY: number = 5;
  private readonly WIDTH: number;

  private position: Vector2;

  public isEnded: boolean = false;

  public constructor(x: number, y: number) {
    this.position = new Vector2(x, y);

    const { naturalHeight, naturalWidth } = (this.SPRITE =
      store.assets.playerPowerUp);

    this.HEIGHT = naturalHeight;
    this.WIDTH = naturalWidth;
  }

  public get isOutOfBounds(): boolean {
    const { x, y } = this.position;
    return x + this.WIDTH < 0 || y < 0 || x > innerWidth || y > innerHeight;
  }

  public drawSelf(ctx: CanvasRenderingContext2D): void {
    const { x, y } = this.position;
    ctx.drawImage(this.SPRITE, x - this.WIDTH / 2, y - this.HEIGHT / 2);
  }

  public move(): void {
    this.position.y += this.VELOCITY;
  }

  public checkCollision(): void {
    const { player } = store;
    if (player !== null) {
      const { position: p1 } = this;
      const { WIDTH, HEIGHT, position: p2 } = player;

      const euclideanDistance: number = p1.euclideanDistanceTo(p2);

      const hasCollision: boolean =
        euclideanDistance <= Math.min(WIDTH, HEIGHT) / 2;

      if (hasCollision) {
        this.onCollide();
      }
    }
  }

  public onCollide(): void {
    const { player } = store;
    if (player !== null) {
      player.bulletLevel++;
      store.assets.playerPowerUpAudio.currentTime = 0;
      store.assets.playerPowerUpAudio.play();
      this.isEnded = true;
    }
  }
}
