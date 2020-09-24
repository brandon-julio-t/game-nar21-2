<template>
  <canvas id="game" ref="gameCanvas"></canvas>
</template>

<script lang="ts">
import { defineComponent, onMounted, onUnmounted, ref } from "vue";

import Game from "@/classes/game";

export default defineComponent({
  setup() {
    const gameCanvas = ref(null); // Don't give type, TypeScript will yell.

    onMounted(() => Game.start(gameCanvas.value)); // Entry point A.K.A. main
    onUnmounted(() => Game.end());

    return { gameCanvas };
  }
});
</script>
