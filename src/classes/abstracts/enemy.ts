import store from "@/store";
import Entity from "./entity";

export default abstract class Enemy extends Entity {
  public constructor(
    x: number,
    y: number,
    health: number,
    sprite: HTMLImageElement,
    healthBarHeight: number,
    height: number,
    width: number,
    velocity: number
  ) {
    super(
      x,
      y,
      health,
      sprite,
      healthBarHeight,
      width,
      height,
      velocity,
      store.assets.enemyExplodeAudio
    );
  }

  public stopMoving(): void {
    this._velocity = 0;
  }
}
