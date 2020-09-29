import AssetsLoaders from "./assets-loaders";
import Store from "@/classes/interfaces/store";
import { reactive } from "vue";

const {
  loadBackgroundImage,
  loadBackgroundMusic,
  loadEnemy,
  loadReversedEnemy,
  loadEnemyBullet,
  loadExplodeSprite,
  loadMeteor,
  loadPlayer,
  loadShootingAudio
} = AssetsLoaders;

const initialState: Store = {
  assets: {
    backgroundImage: loadBackgroundImage(),
    backgroundMusic: loadBackgroundMusic(),
    enemy: loadEnemy(),
    reversedEnemy: loadReversedEnemy(),
    enemyBullet: loadEnemyBullet(),
    explodeSprite: loadExplodeSprite(),
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
