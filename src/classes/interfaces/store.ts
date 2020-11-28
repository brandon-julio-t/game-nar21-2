import Assets from "./assets";
import Bullet from "../abstracts/bullet";
import EnemyBoss from "../enemy-boss";
import EnemyMini from "../enemy-mini";
import Player from "../player";
import PowerUp from "../abstracts/power-up";

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
  powerUps: PowerUp[];
  useKeyboard: boolean;
  gameOver: boolean | null;
  hasPressedOk: boolean | null;
}
