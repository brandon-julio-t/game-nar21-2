<template>
  <div class="relative">
    <section
      v-if="!store.isGaming"
      class="flex justify-center items-center w-screen h-screen m-0"
    >
      <div v-if="!logoClicked" class="w-1/5 m-0">
        <img
          alt="Vue logo"
          class="transition duration-300 ease-in-out transform hover:scale-125 cursor-pointer h-full w-full mx-auto"
          src="/images/logo-nar21-2.webp"
          @click="onLogoClick()"
        />
      </div>

      <div
        v-else
        class="flex justify-center items-center p-16 rounded-lg bg-black bg-opacity-75 border-2 border-lionel-alternate text-white"
      >
        <div>
          <the-dialog-game-instruction></the-dialog-game-instruction>

          <div
            v-if="!isLoadingFinished"
            class="mt-8 p-16 rounded bg-black text-white text-center"
          >
            <h1>Loading...</h1>
            <h2>
              {{
                Number(
                  (store.loadedAssetsCount / totalAssetsCount) * 100
                ).toFixed(1)
              }}%
            </h2>
          </div>
          <app-button-main-menu
            v-else
            class="flex justify-center items-center py-4 lg:py-8 mt-16 w-full"
            @click="openChooseInputSystemModal = true"
          >
            <icon-controller class="inline"></icon-controller>
            Play
          </app-button-main-menu>
        </div>
      </div>

      <the-dialog-choose-input-system
        v-if="openChooseInputSystemModal"
        @close-dialog="openChooseInputSystemModal = false"
        @play-game="playGame()"
      />
    </section>

    <div v-show="store.isGaming" class="w-screen h-screen relative overflow-hidden">
      <canvas ref="enemiesCanvas" class="absolute"></canvas>
      <canvas ref="playerCanvas" class="absolute"></canvas>
      <canvas ref="bulletsCanvas" class="absolute"></canvas>
      <div ref="backgroundImage" class="game-background" id="game-bg"></div>
    </div>

    <transition name="fade">
      <div v-show="store.gameOver" class="absolute inset-0 h-screen w-screen flex justify-center items-center">
        <div
          :class="{
            'text-red-600': store.player?.isDead,
            'text-blue-600': !store.player?.isDead
          }"
          class="w-full p-32 bg-black text-center"
        >
          <h2 class="text-6xl">You {{ store.player?.isDead ? "Lose" : "Win" }}!</h2>
          <h3 v-if="!store.player?.isDead" class="text-3xl text-blue-600">
            In Honesty and Hard-work, We Strive for Excellence.
          </h3>
          <h3 v-if="store.player?.isDead" class="text-3xl text-red-500">
            Don't abandon all hopes, a bright future awaits!
          </h3>
        </div>
      </div>
    </transition>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, onUnmounted, reactive, ref, toRefs } from "vue";

import IconController from "@/components/icons/IconController.vue";
import AppButtonMainMenu from "@/components/AppButtonMainMenu.vue";
import TheDialogChooseInputSystem from "@/components/TheDialogChooseInputSystem.vue";
import TheDialogGameInstruction from "@/components/TheDialogGameInstruction.vue";

import Game from "@/classes/game";
import InputSystem from "@/classes/core/input-system";
import loadAssets from "@/store/assets-loaders";
import store from "@/store";

export default defineComponent({
  components: {
    IconController,
    AppButtonMainMenu,
    TheDialogChooseInputSystem,
    TheDialogGameInstruction
  },

  setup() {
    const state = reactive({
      logoClicked: false,
      openChooseInputSystemModal: false,
      totalAssetsCount: computed(() => Object.keys(store.assets).length),
      isLoadingFinished: computed(() => store.loadedAssetsCount === Object.keys(store.assets).length)
    });

    const backgroundImage = ref<HTMLImageElement | null>(null);
    const bulletsCanvas = ref<HTMLCanvasElement | null>(null);
    const enemiesCanvas = ref<HTMLCanvasElement | null>(null);
    const playerCanvas = ref<HTMLCanvasElement | null>(null);

    onMounted(() => {
      store.loadedAssetsCount = 0;
      store.useKeyboard ? InputSystem.useKeyboard() : InputSystem.useMouse();
    });

    onUnmounted(() => Game.end());

    function onLogoClick() {
      state.logoClicked = true;
      store.assets = loadAssets();
    }

    function playGame() {
      // Entry point A.K.A. main
      store.gameBackground = backgroundImage.value
      Game.start(
        {
          bulletsCanvas: bulletsCanvas.value,
          enemiesCanvas: enemiesCanvas.value,
          playerCanvas: playerCanvas.value
        },
        backgroundImage.value
      );
    }

    return {
      ...toRefs(state),
      Game,
      InputSystem,
      backgroundImage,
      bulletsCanvas,
      enemiesCanvas,
      onLogoClick,
      playGame,
      playerCanvas,
      store
    };
  }
});
</script>
