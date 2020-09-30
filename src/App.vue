<template>
  <div
    :class="{
      'w-screen h-screen relative overflow-hidden': !store.isGaming,
    }"
  >
    <div v-if="!store.isGaming" id="main-background"></div>
    <main>
      <transition name="fade">
        <router-view />
      </transition>
    </main>
  </div>
</template>

<script lang="ts">
import "./assets/styles.css";

import { defineComponent } from "vue";

import store from "./store";

export default defineComponent({
  data() {
    return { store };
  },
});
</script>

<style scoped>
#main-background {
  animation: scrollDown 30s linear infinite;
  background-image: url("~@/assets/main-menu-background.jpg");
  background-repeat: repeat;
  background-size: contain;
  bottom: 0;
  height: 5712px;
  position: absolute;
  width: 100%;
  z-index: -1;
}

@keyframes scrollDown {
  0% {
    transform: translate3d(0, 0, 0);
  }
  100% {
    transform: translate3d(0, 2856px, 0);
  }
}
</style>
