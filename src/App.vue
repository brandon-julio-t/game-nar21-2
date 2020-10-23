<template>
  <div
    :class="{
      'w-screen h-screen relative overflow-hidden': !store.isGaming
    }"
  >
    <canvas
      v-show="!store.isGaming"
      class="w-full h-full z-none bg-cover absolute inset-0"
      ref="galaxy"
    ></canvas>
    <main>
      <router-view v-slot="{ Component }">
        <transition name="fade">
          <component :is="Component"></component>
        </transition>
      </router-view>
    </main>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, watch } from "vue";

import Environment from "./classes/core/environment";
import Galaxy from "./classes/core/galaxy";
import InputSystem from "./classes/core/input-system";
import store from "./store";

export default defineComponent({
  setup() {
    const galaxy = ref<HTMLCanvasElement | null>(null);

    onMounted(() => {
      if (Environment.isProduction) {
        document.oncontextmenu = e => e.preventDefault();
        InputSystem.disableInspectElement();
      }

      const galaxyCanvas = galaxy.value;
      const galaxyAnimation = new Galaxy(galaxyCanvas);

      if (galaxyCanvas !== null) {
        galaxyCanvas.width = innerWidth;
        galaxyCanvas.height = innerHeight;
      }

      const galaxyCtx = galaxyCanvas
        ?.transferControlToOffscreen()
        ?.getContext("2d");

      watch(() => store.isGaming, handleGalaxyBackground);

      function handleGalaxyBackground(isGaming: boolean): void {
        if (
          !isGaming &&
          galaxyCanvas !== null &&
          galaxyCtx !== null &&
          galaxyCtx !== undefined
        ) {
          galaxyAnimation.drawSelf(galaxyCtx);
        } else {
          galaxyAnimation.pause();
        }
      }

      handleGalaxyBackground(store.isGaming);
    });

    return {
      galaxy,
      store
    };
  }
});
</script>

<style scoped>
#main-background {
  background-image: url("/images/main-background.webp");
}
</style>
