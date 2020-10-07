import Store from "@/classes/interfaces/store";
import loadAssets from './assets-loaders';
import { reactive } from "vue";

const initialState: Store = {
  assets: loadAssets(true),
  bullets: [],
  color: "white",
  enemiesKilledCount: 0,
  enemy: null,
  isGaming: false,
  loadedAssetsCount: 0,
  miniEnemies: [],
  player: null,
  powerUps: [],
  useKeyboard: true
};

export default reactive(initialState);
