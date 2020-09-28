<template>
  <section v-if="!store.isGaming">
    <div v-if="!isLoadingFinished">
      <h1>Loading...</h1>
      <h2>{{ store.loadedAssetsCount }} / {{ totalAssetsCount }}</h2>
    </div>
    <div v-else>
      <img
        @click="playGame()"
        alt="Vue logo"
        class="transition duration-500 ease-in-out transform hover:scale-125 cursor-pointer"
        src="@/assets/logo-nar21-2.jpg"
      />
    </div>
  </section>

  <section class="relative">
    <canvas id="game" class="absolute" ref="gameCanvas"></canvas>
  </section>
</template>

<script lang="ts">
import { computed, defineComponent, onUnmounted, ref } from "vue";

import Game from "@/classes/game";
import store from "@/store";

export default defineComponent({
  setup() {
    const gameCanvas = ref<HTMLCanvasElement | null>(null); // Don't give type, TypeScript will yell.
    const backgroundImage = ref<HTMLImageElement | null>(null);

    const totalAssetsCount = computed(() => Object.keys(store.assets).length);
    const isLoadingFinished = computed(
      () => store.loadedAssetsCount === totalAssetsCount.value
    );

    onUnmounted(() => Game.end());

    return {
      Game,
      backgroundImage,
      gameCanvas,
      isLoadingFinished,
      playGame() {
        Game.start(gameCanvas.value); // Entry point A.K.A. main
      },
      store,
      totalAssetsCount
    };
  }
});
</script>

<style scoped>
.background {
  animation-fill-mode: forwards;
  animation: backgroundScroll 10s linear infinite;
  background-image: url("~@/assets/background.jpg");
  height: 100vh;
  width: 100vw;
}

@keyframes backgroundScroll {
  0% {
    background-position: 0 0;
  }
  100% {
    background-position: 0 4500px;
  }
}
</style>
