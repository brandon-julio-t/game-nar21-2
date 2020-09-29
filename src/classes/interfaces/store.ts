import Assets from './assets';
import Bullet from '../abstracts/bullet';
import Enemy from '../enemy';
import Player from '../player';
import MiniEnemy from '../mini-enemy';

export default interface Store {
  assets: Assets;
  bullets: Bullet[];
  color: string;
  enemy: Enemy | null;
  isGaming: boolean;
  loadedAssetsCount: number;
  miniEnemies: MiniEnemy[];
  player: Player | null;
  useKeyboard: boolean;
}
