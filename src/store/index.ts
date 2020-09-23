import { reactive } from "vue";

import Bullet from "@/models/Bullet";
import Enemy from "@/models/Enemy";

const initialState: Store = {
  bullets: [],
  enemy: null,
  isGaming: false
};

export default reactive(initialState);

export interface Store {
  bullets: Bullet[];
  enemy: Enemy | null;
  isGaming: boolean;
}
