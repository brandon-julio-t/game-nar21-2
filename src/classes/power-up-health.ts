import PowerUp from "./abstracts/power-up";
import store from "@/store";

export default class PowerUpHealth extends PowerUp {
  constructor(x: number, y: number) {
    super(x, y, store.assets.powerUpHealth);
  }

  public onCollide(): void {
    const { player } = store;
    if (player !== null) {
      player.heal(1);
      super.onCollide();
    }
  }
}
