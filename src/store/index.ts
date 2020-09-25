import { reactive } from "vue";

import Bullet from "@/classes/abstracts/bullet";
import Enemy from "@/classes/enemy";
import Player from "@/classes/player";

const initialState: Store = {
  bullets: [],
  color: "white",
  enemy: null,
  isGaming: false,
  player: null
};

export default reactive(initialState);

export interface Store {
  bullets: Bullet[];
  color: string;
  enemy: Enemy | null;
  isGaming: boolean;
  player: Player | null;
}
