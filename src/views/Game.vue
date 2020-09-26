<template>
  <div v-if="!store.isGaming">
    <h1>Loading...</h1>
    <h2>{{ store.loadedAssetsCount }} / {{ totalAssetsCount }}</h2>
  </div>

  <div class="relative">
    <img class="absolute h-screen w-screen" ref="backgroundImage" />
    <canvas id="game" class="absolute" ref="gameCanvas"></canvas>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, onUnmounted, ref } from "vue";

import Game from "@/classes/game";
import store from "@/store";

export default defineComponent({
  setup() {
    const gameCanvas = ref<HTMLCanvasElement | null>(null); // Don't give type, TypeScript will yell.
    const backgroundImage = ref<HTMLImageElement | null>(null);

    const totalAssetsCount = computed(() => Object.keys(store.assets).length);

    onMounted(() => Game.start(gameCanvas.value, backgroundImage.value)); // Entry point A.K.A. main
    onUnmounted(() => Game.end());

    return {
      Game,
      backgroundImage,
      gameCanvas,
      store,
      totalAssetsCount
    };
  }
});
</script>
