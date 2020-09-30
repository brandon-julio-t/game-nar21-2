import AssetsLoaders from "./assets-loaders";
import Store from "@/classes/interfaces/store";
import { reactive } from "vue";

const {
  loadBackgroundImage,
  loadBackgroundMusic,
  loadEnemy,
  loadEnemyBullet,
  loadExplodeSprite,
  loadMeteor,
  loadMiniEnemy,
  loadPlayer,
  loadPlayerBullet,
  loadReversedEnemy,
  loadShootingAudio
} = AssetsLoaders;

const initialState: Store = {
  assets: {
    backgroundImage: loadBackgroundImage(),
    backgroundMusic: loadBackgroundMusic(),
    enemy: loadEnemy(),
    enemyBullet: loadEnemyBullet(),
    explodeSprite: loadExplodeSprite(),
    meteor: loadMeteor(),
    miniEnemy: loadMiniEnemy(),
    player: loadPlayer(),
    playerBullet: loadPlayerBullet(),
    reversedEnemy: loadReversedEnemy(),
    shootingAudio: loadShootingAudio()
  },
  bullets: [],
  color: "white",
  enemy: null,
  isGaming: false,
  loadedAssetsCount: 0,
  miniEnemies: [],
  player: null,
  useKeyboard: true
};

export default reactive(initialState);
