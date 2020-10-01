import Bullet from "./abstracts/bullet";
import EnemyBoss from "./enemy-boss";
import EnemyMini from "./enemy-mini";
import Entity from "./abstracts/entity";
import Vector2 from "./core/vector2";
import store from "@/store";

export default class PlayerBullet extends Bullet {
  private static readonly VELOCITY: Vector2 = new Vector2(0, -25);

  public constructor(x: number, y: number) {
    super(
      x,
      y,
      PlayerBullet.VELOCITY.x,
      PlayerBullet.VELOCITY.y,
      store.assets.playerBullet.naturalHeight,
      store.assets.playerBullet.naturalWidth,
      store.assets.playerBullet
    );
  }

  public draw(ctx: CanvasRenderingContext2D): void {
    const { x, y } = this.position;
    ctx.drawImage(this.SPRITE, x - this.WIDTH / 2, y);
  }

  public checkCollision(): void {
    const enemy: EnemyBoss = store.enemy as EnemyBoss;
    const miniEnemies: EnemyMini[] = store.miniEnemies as EnemyMini[];

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
      this.position.x >= entity.position.x - WIDTH / 2 &&
      this.position.y >= entity.position.y - HEIGHT / 2 &&
      this.position.x <= entity.position.x + WIDTH / 2 &&
      this.position.y <= entity.position.y + HEIGHT / 2
    );
  }
}
