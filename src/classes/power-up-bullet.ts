import PowerUp from "./abstracts/power-up";
import store from "@/store";

export default class PowerUpBullet extends PowerUp {
  constructor(x: number, y: number) {
    super(x, y, store.assets.powerUpBullet);
  }

  public onCollide(): void {
    const { player } = store;
    if (player !== null) {
      player.bulletLevel++;
      super.onCollide();
    }
  }
}
