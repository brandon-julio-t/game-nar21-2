import Store from "@/classes/interfaces/store";
import { reactive } from "vue";

const initialState: Store = {
  assets: {
    backgroundImage: new Image(),
    backgroundMusic: new Audio(),
    enemy1: new Image(),
    enemy2: new Image(),
    enemy3: new Image(),
    enemy4: new Image(),
    enemy5: new Image(),
    enemy6: new Image(),
    enemy7: new Image(),
    enemy8: new Image(),
    enemy9: new Image(),
    enemyBulletCircle: new Image(),
    enemyBulletLaser: new Image(),
    enemyExplodeAudio: new Audio(),
    enemyMini: new Image(),
    enemyMiniExplodeAudio: new Audio(),
    explodeSprite: new Image(),
    meteor: new Image(),
    player1: new Image(),
    player2: new Image(),
    player3: new Image(),
    player4: new Image(),
    player5: new Image(),
    playerBullet: new Image(),
    playerExplodeAudio: new Audio(),
    playerHitAudio: new Audio(),
    playerHitSprite: new Image(),
    shootingAudio: new Audio()
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
