<template>
  <div
    :class="{
      'w-screen h-screen relative overflow-hidden': !store.isGaming
    }"
  >
    <div v-if="!store.isGaming" id="main-background"></div>
    <main>
      <router-view />
    </main>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import store from "./store";

export default defineComponent({
  data() {
    return { store };
  }
});
</script>

<style scoped>
#main-background {
  animation: scrollDown 30s linear infinite;
  background-image: url("~@/assets/main-menu-background.jpg");
  background-repeat: repeat;
  height: 5712px;
  position: absolute;
  bottom: 0;
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
