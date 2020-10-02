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
  loadMiniEnemy1,
  loadMiniEnemy2,
  loadMiniEnemy3,
  loadMiniEnemy4,
  loadMiniEnemy5,
  loadPlayer,
  loadPlayerBullet,
  loadPlayerExplodeAudio,
  loadPlayerGetHitAudio,
  loadPlayerHitSprite,
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
    miniEnemy1: loadMiniEnemy1(),
    miniEnemy2: loadMiniEnemy2(),
    miniEnemy3: loadMiniEnemy3(),
    miniEnemy4: loadMiniEnemy4(),
    miniEnemy5: loadMiniEnemy5(),
    player: loadPlayer(),
    playerBullet: loadPlayerBullet(),
    playerExplodeAudio: loadPlayerExplodeAudio(),
    playerHitAudio: loadPlayerGetHitAudio(),
    playerHitSprite: loadPlayerHitSprite(),
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
