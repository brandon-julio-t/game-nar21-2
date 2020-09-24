import { reactive } from "vue";

import Bullet from "@/classes/bullet";
import Enemy from "@/classes/enemy";
import Player from '@/classes/player';

const initialState: Store = {
  bullets: [],
  enemy: null,
  isGaming: false,
  player: null
};

export default reactive(initialState);

export interface Store {
  bullets: Bullet[];
  enemy: Enemy | null;
  isGaming: boolean;
  player: Player | null;
}
