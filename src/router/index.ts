import { createRouter, createWebHashHistory } from "vue-router";

import Game from "../views/Game.vue";

const routes = [
  {
    path: "/",
    name: "Game",
    component: Game
  },
  {
    path: "/about",
    name: "About",
    component: () => import("../views/About.vue")
  }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes
});

export default router;
