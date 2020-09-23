import { createRouter, createWebHashHistory } from 'vue-router';

import Index from '../views/Index.vue';

const routes = [
  {
    path: '/',
    name: 'Index',
    component: Index,
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('../views/About.vue'),
  },
  {
    path: '/game',
    name: 'Game',
    component: () => import('../views/Game.vue'),
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
