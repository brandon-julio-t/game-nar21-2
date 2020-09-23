import { reactive } from "vue";

import Bullet from "@/models/Bullet";

export default reactive({
  isGaming: false,
  bullets: []
});

export interface Store {
  isGaming: boolean;
  bullets: Bullet[];
}
