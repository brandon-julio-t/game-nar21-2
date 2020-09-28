import { reactive } from "vue";

import Bullet from "@/classes/abstracts/bullet";
import Enemy from "@/classes/enemy";
import Player from "@/classes/player";

import {
  loadBackgroundImage,
  loadBackgroundMusic,
  loadEnemy,
  loadEnemyBullet,
  loadMeteor,
  loadPlayer,
  loadReversedEnemy,
  loadShootingAudio
} from "./assets";

const initialState: Store = {
  assets: {
    backgroundImage: loadBackgroundImage(),
    backgroundMusic: loadBackgroundMusic(),
    enemy: loadEnemy(),
    reversedEnemy: loadReversedEnemy(),
    enemyBullet: loadEnemyBullet(),
    meteor: loadMeteor(),
    player: loadPlayer(),
    shootingAudio: loadShootingAudio()
  },
  bullets: [],
  color: "white",
  enemy: null,
  isGaming: false,
  loadedAssetsCount: 0,
  player: null,
  useKeyboard: true
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
  useKeyboard: boolean;
}

interface Assets {
  backgroundImage: HTMLImageElement;
  backgroundMusic: HTMLAudioElement;
  enemy: HTMLImageElement;
  enemyBullet: HTMLImageElement;
  meteor: HTMLImageElement;
  player: HTMLImageElement;
  reversedEnemy: HTMLImageElement;
  shootingAudio: HTMLAudioElement;
}
