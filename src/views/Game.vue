<template>
  <section
    v-if="!store.isGaming"
    class="flex justify-center items-center w-screen h-screen"
  >
    <div v-if="!logoClicked">
      <img
        @click="logoClicked = true"
        alt="Vue logo"
        class="transition duration-300 ease-in-out transform hover:scale-125 cursor-pointer w-64 h-64 mx-auto"
        src="@/assets/logo-nar21-2.png"
      />
    </div>

    <div v-if="logoClicked">
      <dialog-game-instruction />

      <div
        v-if="!isLoadingFinished"
        class="mt-8 p-16 rounded bg-black text-white text-center"
      >
        <h1 class="text-xl">Loading...</h1>
        <h2 class="text-lg">
          {{ (store.loadedAssetsCount / totalAssetsCount) * 100 }}%
        </h2>
      </div>
      <div v-else class="mt-8 p-16 rounded bg-black text-white text-center">
        <button @click="openChooseInputSystemModal = true">Button</button>
      </div>
    </div>

    <dialog-choose-input-system
      v-if="openChooseInputSystemModal"
      @close-dialog="openChooseInputSystemModal = false"
      @play-game="playGame()"
    />
  </section>

  <div class="w-screen h-screen relative overflow-hidden">
    <canvas class="absolute" ref="bulletsCanvas" />
    <canvas class="absolute" ref="enemiesCanvas" />
    <canvas class="absolute" ref="playerCanvas" />
    <div id="game-background" ref="backgroundImage" />
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, onUnmounted, ref } from "vue";

import DialogChooseInputSystem from "@/components/DialogChooseInputSystem.vue";
import DialogGameInstruction from "@/components/DialogGameInstruction.vue";

import Game from "@/classes/game";
import InputSystem from "@/classes/core/input-system";
import store from "@/store";

export default defineComponent({
  components: { DialogChooseInputSystem, DialogGameInstruction },

  setup() {
    const backgroundImage = ref<HTMLImageElement | null>(null);
    const bulletsCanvas = ref<HTMLCanvasElement | null>(null);
    const enemiesCanvas = ref<HTMLCanvasElement | null>(null);
    const openChooseInputSystemModal = ref(false);
    const playerCanvas = ref<HTMLCanvasElement | null>(null);
    const logoClicked = ref(false);

    const totalAssetsCount = computed(() => Object.keys(store.assets).length);
    const isLoadingFinished = computed(
      () => store.loadedAssetsCount === totalAssetsCount.value
    );

    onMounted(() =>
      store.useKeyboard ? InputSystem.useKeyboard() : InputSystem.useMouse()
    );
    onUnmounted(() => Game.end());

    return {
      Game,
      InputSystem,
      backgroundImage,
      bulletsCanvas,
      enemiesCanvas,
      playerCanvas,
      isLoadingFinished,
      openChooseInputSystemModal,
      logoClicked,
      playGame() {
        // Entry point A.K.A. main
        Game.start(
          {
            bulletsCanvas: bulletsCanvas.value,
            enemiesCanvas: enemiesCanvas.value,
            playerCanvas: playerCanvas.value,
          },
          backgroundImage.value
        );
      },
      store,
      totalAssetsCount,
    };
  },
});
</script>

<style scoped>
#game-background {
  animation: backgroundScroll 15s linear infinite;
  background-size: contain;
  background-repeat: repeat;
  height: 9000px;
  position: absolute;
  bottom: 0;
  width: 100%;
  z-index: -1;
}

@keyframes backgroundScroll {
  0% {
    transform: translate3d(0, 0, 0);
  }
  100% {
    transform: translate3d(0, 4500px, 0);
  }
}
</style>
