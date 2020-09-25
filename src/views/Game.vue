<template>
  <div v-if="Game.loading">
    <h1>Loading...</h1>
    <h2>{{ store.loadedAssetsCount }} / {{ Game.TOTAL_ASSETS_COUNT }}</h2>
  </div>
  <div v-else class="relative">
    <img src="@/assets/background.jpg" class="absolute h-screen w-screen" />
    <canvas id="game" class="absolute" ref="gameCanvas"></canvas>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, onUnmounted, ref } from "vue";

import Game from "@/classes/game";
import store from "@/store";

export default defineComponent({
  setup() {
    const gameCanvas = ref(null); // Don't give type, TypeScript will yell.

    onMounted(() => Game.start(gameCanvas.value)); // Entry point A.K.A. main
    onUnmounted(() => Game.end());

    return { gameCanvas, Game, store };
  }
});
</script>
