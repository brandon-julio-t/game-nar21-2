<template>
  <div
    :class="{
      'w-screen h-screen relative overflow-hidden': !store.isGaming
    }"
  >
    <div v-if="!store.isGaming" id="main-background"></div>
    <main>
      <router-view v-slot="{ Component }">
        <transition name="fade">
          <component :is="Component" />
        </transition>
      </router-view>
    </main>
  </div>
</template>

<script lang="ts">
import "./assets/styles.css";

import { defineComponent, onMounted } from "vue";

import store from "./store";
import InputSystem from "./classes/core/input-system";

export default defineComponent({
  setup() {
    onMounted(() => {
      document.oncontextmenu = e => e.preventDefault();
      InputSystem.disableInspectElement();
    });

    return {
      store
    };
  }
});
</script>

<style scoped>
#main-background {
  animation: scrollDown 60s linear infinite;
  background-image: url("/images/background.webp");
  background-repeat: repeat;
  bottom: 0;
  height: 2048px;
  position: absolute;
  width: 100%;
  z-index: -1;
}

@keyframes scrollDown {
  0% {
    transform: translate3d(0, 0, 0);
  }
  100% {
    transform: translate3d(0, 1024px, 0);
  }
}
</style>
