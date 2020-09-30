import Bullet from "./abstracts/bullet";
import Enemy from "./enemy";
import store from "@/store";
import MiniEnemy from "./mini-enemy";
import Entity from "./abstracts/entity";

export default class PlayerBullet extends Bullet {
  public constructor(x: number, y: number) {
    super(
      x,
      y,
      0,
      -25,
      store.assets.playerBullet.naturalHeight,
      store.assets.playerBullet.naturalWidth,
      store.assets.playerBullet
    );
  }

  public checkCollision(): void {
    const enemy: Enemy = store.enemy as Enemy;
    const miniEnemies: MiniEnemy[] = store.miniEnemies as MiniEnemy[];

    if (enemy !== null && miniEnemies !== null) {
      [enemy, ...miniEnemies].forEach(e => {
        const hasCollision: boolean = this.checkCollisionWith(e);
        if (hasCollision) {
          this.isEnded = true;
          e.reduceHealth(1);
        }
      });
    }
  }

  private checkCollisionWith(entity: Entity): boolean {
    const { HEIGHT, WIDTH } = entity;
    return (
      entity !== null &&
      this.position.x >= entity.position.x &&
      this.position.y >= entity.position.y &&
      this.position.x <= entity.position.x + WIDTH &&
      this.position.y <= entity.position.y + HEIGHT
    );
  }
}
