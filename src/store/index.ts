import AssetsLoaders from "./assets-loaders";
import Store from "@/classes/interfaces/store";
import { reactive } from "vue";

const {
  loadBackgroundImage,
  loadBackgroundMusic,
  loadEnemy,
  loadEnemyBulletCircle,
  loadEnemyBulletLaser,
  loadEnemyExplodeAudio,
  loadEnemyMiniExplodeAudio,
  loadExplodeSprite,
  loadMeteor,
  loadMiniEnemy,
  loadPlayer,
  loadPlayerBullet,
  loadPlayerExplodeAudio,
  loadPlayerGetHitAudio,
  loadReversedEnemy,
  loadShootingAudio
} = AssetsLoaders;

const initialState: Store = {
  assets: {
    backgroundImage: loadBackgroundImage(),
    backgroundMusic: loadBackgroundMusic(),
    enemy: loadEnemy(),
    enemyBulletCircle: loadEnemyBulletCircle(),
    enemyBulletLaser: loadEnemyBulletLaser(),
    enemyExplodeAudio: loadEnemyExplodeAudio(),
    enemyMiniExplodeAudio: loadEnemyMiniExplodeAudio(),
    explodeSprite: loadExplodeSprite(),
    meteor: loadMeteor(),
    miniEnemy: loadMiniEnemy(),
    player: loadPlayer(),
    playerBullet: loadPlayerBullet(),
    playerGetHitAudio: loadPlayerGetHitAudio(),
    playerExplodeAudio: loadPlayerExplodeAudio(),
    reversedEnemy: loadReversedEnemy(),
    shootingAudio: loadShootingAudio()
  },
  bullets: [],
  color: "white",
  enemiesKilledCount: 0,
  enemy: null,
  isGaming: false,
  loadedAssetsCount: 0,
  miniEnemies: [],
  player: null,
  useKeyboard: true
};

export default reactive(initialState);
