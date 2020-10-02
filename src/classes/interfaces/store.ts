import Assets from "./assets";
import Bullet from "../abstracts/bullet";
import EnemyBoss from "../enemy-boss";
import Player from "../player";
import EnemyMini from "../enemy-mini";

export default interface Store {
  assets: Assets;
  bullets: Bullet[];
  color: string;
  enemiesKilledCount: number;
  enemy: EnemyBoss | null;
  isGaming: boolean;
  loadedAssetsCount: number;
  miniEnemies: EnemyMini[];
  player: Player | null;
  useKeyboard: boolean;
}
