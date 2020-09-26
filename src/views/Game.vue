<template>
  <div v-if="Game.loading">
    <h1>Loading...</h1>
    <h2>{{ store.loadedAssetsCount }} / {{ Game.TOTAL_ASSETS_COUNT }}</h2>
  </div>
  <div v-else class="relative">
    <img class="absolute h-screen w-screen" ref="backgroundImage" />
    <canvas id="game" class="absolute" ref="gameCanvas"></canvas>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, onUnmounted, ref } from "vue";

import Game from "@/classes/game";
import store from "@/store";

export default defineComponent({
  setup() {
    const gameCanvas = ref<HTMLCanvasElement | null>(null); // Don't give type, TypeScript will yell.
    const backgroundImage = ref<HTMLImageElement | null>(null);

    onMounted(() => {
      Game.start(gameCanvas.value);

      if (backgroundImage.value !== null) {
        backgroundImage.value.src = store.assets.backgroundImage.src;
      }
    }); // Entry point A.K.A. main
    onUnmounted(() => Game.end());

    return { backgroundImage, gameCanvas, Game, store };
  }
});
</script>
