import Bullet from "./abstracts/bullet";
import Enemy from "./enemy";
import store from "@/store";
import MiniEnemy from "./mini-enemy";
import Entity from "./abstracts/entity";

export default class PlayerBullet extends Bullet {
  public constructor(x: number, y: number) {
    super(x, y, 0, -25, 20, 5);
  }

  public checkCollision(): void {
    const enemy: Enemy = store.enemy as Enemy;
    const miniEnemies: MiniEnemy[] = store.miniEnemies as MiniEnemy[];

    if (enemy !== null) {
      const hasCollision: boolean = this.checkCollisionWith(enemy);
      if (hasCollision) {
        this.isEnded = true;
        enemy.reduceHealth(1);
      }
    }

    if (miniEnemies !== null) {
      miniEnemies.forEach(miniEnemy => {
        const hasCollision: boolean = this.checkCollisionWith(miniEnemy);
        if (hasCollision) {
          this.isEnded = true;
          miniEnemy.reduceHealth(1);
        }
      });
    }
  }

  private checkCollisionWith(entity: Entity): boolean {
    if (entity !== null) {
      const { HEIGHT, WIDTH } = entity;
      return (
        this.position.x >= entity.position.x &&
        this.position.y >= entity.position.y &&
        this.position.x <= entity.position.x + WIDTH &&
        this.position.y <= entity.position.y + HEIGHT
      );
    }

    return false;
  }
}
