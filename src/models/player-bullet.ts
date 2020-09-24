import Bullet from "./bullet";
import Direction from "./direction";
import Enemy from "./enemy";
import store from "@/store";

export default class PlayerBullet extends Bullet {
  protected readonly HEIGHT: number = 20;
  protected readonly VELOCITY: number = 10;
  protected readonly WIDTH: number = 5;

  constructor(x: number, y: number) {
    super(x, y, Direction.NORTH);
  }

  public checkCollision(): void {
    const enemy: Enemy | null = store.enemy as Enemy;
    if (enemy !== null) {
      const hasCollision: boolean =
        this.position.x >= enemy.position.x &&
        this.position.y >= enemy.position.y &&
        this.position.x <= enemy.position.x + enemy.WIDTH &&
        this.position.y <= enemy.position.y + enemy.HEIGHT;

      if (hasCollision) {
        enemy.reduceHealth(1);
        this.isEnded = true;
      }
    }
  }
}
