import Bullet from "./abstracts/bullet";
import Direction from "./enums/direction";
import Enemy from "./enemy";
import store from "@/store";

export default class PlayerBullet extends Bullet {
  protected readonly HEIGHT: number = 20;
  protected readonly VELOCITY: number = 25;
  protected readonly WIDTH: number = 5;

  constructor(x: number, y: number) {
    super(x, y, Direction.NORTH);
  }

  public checkCollision(): void {
    const enemy: Enemy | null = store.enemy as Enemy;
    if (enemy !== null) {
      const { naturalWidth, naturalHeight } = enemy.sprite;
      const hasCollision: boolean =
        this.position.x >= enemy.position.x &&
        this.position.y >= enemy.position.y &&
        this.position.x <= enemy.position.x + naturalWidth &&
        this.position.y <= enemy.position.y + naturalHeight;

      if (hasCollision) {
        this.isEnded = true;
        enemy.reduceHealth(1);
      }
    }
  }
}
