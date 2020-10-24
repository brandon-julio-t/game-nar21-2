<template>
  <div
    :class="{
      'w-screen h-screen relative overflow-hidden': !store.isGaming
    }"
  >
    <canvas
      v-show="!store.isGaming"
      class="w-full h-full z-none bg-cover absolute inset-0"
      ref="galaxyBackground"
    ></canvas>
    <canvas
      v-show="!store.isGaming"
      class="w-full h-full z-none bg-cover absolute inset-0"
      ref="galaxyStars"
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
    const galaxyStars = ref<HTMLCanvasElement | null>(null);
    const galaxyBackground = ref<HTMLCanvasElement | null>(null);

    onMounted(() => {
      if (Environment.isProduction) {
        document.oncontextmenu = e => e.preventDefault();
        InputSystem.disableInspectElement();
      }

      const galaxyAnimation = new Galaxy();
      const galaxyBackgroundCanvas = galaxyBackground.value;
      const galaxyStarsCanvas = galaxyStars.value;

      if (galaxyStarsCanvas !== null && galaxyBackgroundCanvas !== null) {
        galaxyBackgroundCanvas.height = innerHeight;
        galaxyBackgroundCanvas.width = innerWidth;
        galaxyStarsCanvas.height = innerHeight;
        galaxyStarsCanvas.width = innerWidth;
      }

      const galaxyBackgroundCtx = galaxyBackgroundCanvas
        ?.transferControlToOffscreen()
        ?.getContext("2d");

      const galaxyStarsCtx = galaxyStarsCanvas
        ?.transferControlToOffscreen()
        ?.getContext("2d");

      watch(() => store.isGaming, handleGalaxyBackground);

      function handleGalaxyBackground(isGaming: boolean): void {
        if (
          !isGaming &&
          galaxyBackgroundCanvas !== null &&
          galaxyBackgroundCtx !== null &&
          galaxyBackgroundCtx !== undefined &&
          galaxyStarsCanvas !== null &&
          galaxyStarsCtx !== null &&
          galaxyStarsCtx !== undefined
        ) {
          galaxyAnimation.play(galaxyBackgroundCtx, galaxyStarsCtx);
        } else {
          galaxyAnimation.pause();
        }
      }

      handleGalaxyBackground(store.isGaming);
    });

    return { galaxyBackground, galaxyStars, store };
  }
});
</script>
