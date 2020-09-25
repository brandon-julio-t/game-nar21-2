import Bullet from "./abstracts/bullet";
import Direction from "./enums/direction";
import Player from "./player";
import store from "@/store";

export default class EnemyBullet extends Bullet {
  protected readonly HEIGHT: number = 5;
  protected readonly VELOCITY: number = 7;
  protected readonly WIDTH: number = 5;
  protected readonly RADIUS: number = 5;

  constructor(x: number, y: number, direction: Direction) {
    super(x, y, direction);
  }

  public draw(ctx: CanvasRenderingContext2D): void {
    const { x, y } = this.position;
    ctx.moveTo(x, y);
    ctx.arc(x, y, this.RADIUS, 0, Math.PI * 2, true);
  }

  public checkCollision(): void {
    const player: Player = store.player as Player;
    if (player !== null) {
      const hasCollision: boolean =
        this.position.x >= player.position.x &&
        this.position.y >= player.position.y &&
        this.position.x <= player.position.x + player.WIDTH / 2 &&
        this.position.y <= player.position.y + player.HEIGHT / 2;

      if (hasCollision) {
        this.isEnded = player.isDead = true;
      }
    }
  }

  public wrapHorizontal(): void {
    const { x } = this.position;
    if (x <= 0) {
      this.position.x = innerWidth;
    } else if (x >= innerWidth) {
      this.position.x = 0;
    }
  }
}
