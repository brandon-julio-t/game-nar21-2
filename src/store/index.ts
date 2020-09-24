import { reactive } from "vue";

import Bullet from "@/models/bullet";
import Enemy from "@/models/enemy";
import Player from '@/models/player';

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
