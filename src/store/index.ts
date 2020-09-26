import { reactive } from "vue";

import Bullet from "@/classes/abstracts/bullet";
import Enemy from "@/classes/enemy";
import Player from "@/classes/player";

import {
  loadEnemy,
  loadEnemyBullet,
  loadMeteor,
  loadPlayer,
  loadReversedEnemy
} from "./assets";

const initialState: Store = {
  assets: {
    enemy: loadEnemy(),
    reversedEnemy: loadReversedEnemy(),
    enemyBullet: loadEnemyBullet(),
    meteor: loadMeteor(),
    player: loadPlayer()
  },
  bullets: [],
  color: "white",
  enemy: null,
  loadedAssetsCount: 0,
  isGaming: false,
  player: null
};

export default reactive(initialState);

interface Store {
  assets: Assets;
  bullets: Bullet[];
  color: string;
  enemy: Enemy | null;
  isGaming: boolean;
  loadedAssetsCount: number;
  player: Player | null;
}

interface Assets {
  enemy: HTMLImageElement;
  reversedEnemy: HTMLImageElement;
  enemyBullet: HTMLImageElement;
  meteor: HTMLImageElement;
  player: HTMLImageElement;
}
