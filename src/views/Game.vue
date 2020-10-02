<template>
  <section
    v-if="!store.isGaming"
    class="flex justify-center items-center w-screen h-screen"
  >
    <div v-if="!logoClicked">
      <img
        @click="onLogoClick()"
        alt="Vue logo"
        class="transition duration-300 ease-in-out transform hover:scale-125 cursor-pointer w-64 h-64 mx-auto"
        src="/images/logo-nar21-2.webp"
      />
    </div>

    <div
      v-else
      class="flex justify-center items-center mt-16 p-16 rounded bg-black text-white text-3xl"
    >
      <div>
        <the-dialog-game-instruction />

        <div
          v-if="!isLoadingFinished"
          class="mt-8 p-16 rounded bg-black text-white text-center"
        >
          <h1 class="text-xl">Loading...</h1>
          <h2 class="text-lg">
            {{
              Number(
                (store.loadedAssetsCount / totalAssetsCount) * 100
              ).toFixed(1)
            }}%
          </h2>
        </div>
        <app-button-dark
          v-else
          @click="openChooseInputSystemModal = true"
          class="flex justify-center items-center py-8 mt-4 w-full"
        >
          <icon-controller class="mr-2" />
          Play
        </app-button-dark>
      </div>
    </div>

    <the-dialog-choose-input-system
      v-if="openChooseInputSystemModal"
      @close-dialog="openChooseInputSystemModal = false"
      @play-game="playGame()"
    />
  </section>

  <div class="w-screen h-screen relative overflow-hidden">
    <canvas class="absolute" ref="enemiesCanvas" />
    <canvas class="absolute" ref="playerCanvas" />
    <canvas class="absolute" ref="bulletsCanvas" />
    <p class="absolute bottom-0 left-0 text-white text-2xl p-4">
      Score: {{ score }}
    </p>
    <div id="game-background" ref="backgroundImage" />
  </div>
</template>

<script lang="ts">
import {
  computed,
  defineComponent,
  onMounted,
  onUnmounted,
  reactive,
  ref,
  toRefs
} from "vue";

import IconController from "@/components/icons/IconController.vue";
import AppButtonDark from "@/components/AppButtonDark.vue";
import TheDialogChooseInputSystem from "@/components/TheDialogChooseInputSystem.vue";
import TheDialogGameInstruction from "@/components/TheDialogGameInstruction.vue";

import Game from "@/classes/game";
import InputSystem from "@/classes/core/input-system";
import store from "@/store";
import loadAssets from "@/store/assets";

export default defineComponent({
  components: {
    IconController,
    AppButtonDark,
    TheDialogChooseInputSystem,
    TheDialogGameInstruction
  },

  setup() {
    const state = reactive({
      logoClicked: false,
      openChooseInputSystemModal: false,
      score: computed(() =>
        Number(store.enemiesKilledCount * 100).toLocaleString()
      ),
      totalAssetsCount: computed(() => {
        if (store.assets != null) {
          return Object.keys(store.assets).length;
        }

        return -1;
      }),
      isLoadingFinished: computed(() => {
        if (store.assets !== null) {
          return store.loadedAssetsCount === Object.keys(store.assets).length;
        }

        return false;
      })
    });

    const backgroundImage = ref<HTMLImageElement | null>(null);
    const bulletsCanvas = ref<HTMLCanvasElement | null>(null);
    const enemiesCanvas = ref<HTMLCanvasElement | null>(null);
    const playerCanvas = ref<HTMLCanvasElement | null>(null);

    onMounted(() =>
      store.useKeyboard ? InputSystem.useKeyboard() : InputSystem.useMouse()
    );
    onUnmounted(() => Game.end());

    function onLogoClick() {
      state.logoClicked = true;
      store.assets = loadAssets();
    }

    return {
      ...toRefs(state),
      Game,
      InputSystem,
      backgroundImage,
      bulletsCanvas,
      enemiesCanvas,
      onLogoClick,
      playerCanvas,
      playGame() {
        // Entry point A.K.A. main
        Game.start(
          {
            bulletsCanvas: bulletsCanvas.value,
            enemiesCanvas: enemiesCanvas.value,
            playerCanvas: playerCanvas.value
          },
          backgroundImage.value
        );
      },
      store
    };
  }
});
</script>

<style scoped>
#game-background {
  animation: backgroundScroll 7s linear infinite;
  background-repeat: repeat;
  height: 2048px;
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
    transform: translate3d(0, 1024px, 0);
  }
}
</style>
