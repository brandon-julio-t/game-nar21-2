import Bullet from "./abstracts/bullet";
import Player from "./player";
import store from "@/store";
import { randomIntegerBetween } from "./core/utilities";

export default class EnemyBullet extends Bullet {
  public constructor(x: number, y: number) {
    super(
      x,
      y,
      randomIntegerBetween(-7, 7),
      randomIntegerBetween(3, 7),
      10,
      10,
      store.assets.enemyBullet
    );
  }

  public checkCollision(): void {
    const player: Player = store.player as Player;
    if (player !== null) {
      const { x: left, y: top } = this.position;
      const right: number = left + this.WIDTH;
      const bottom: number = top + this.HEIGHT;

      const hitboxOffset: number = player.HITBOX_SIZE;
      const xMin: number = player.position.x - hitboxOffset;
      const yMin: number = player.position.y - hitboxOffset;
      const xMax: number = player.position.x + hitboxOffset;
      const yMax: number = player.position.y + hitboxOffset;

      const hasCollision: boolean =
        left >= xMin && top >= yMin && right <= xMax && bottom <= yMax;

      if (hasCollision) {
        this.isEnded = true;
        player.reduceHealth(1);
      }
    }
  }
}
