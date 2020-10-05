<template>
  <section
    v-if="!store.isGaming"
    class="flex justify-center items-center w-screen h-screen m-0"
  >
    <div v-if="!logoClicked" class="w-1/5 m-0">
      <img
        @click="onLogoClick()"
        alt="Vue logo"
        class="transition duration-300 ease-in-out transform hover:scale-125 cursor-pointer h-full w-full mx-auto"
        src="/images/logo-nar21-2.webp"
      />
    </div>

    <div
      v-else
      class="flex justify-center items-center p-16 rounded bg-black bg-opacity-75 border-2 border-lionel text-white"
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
        <app-button
          v-else
          @click="openChooseInputSystemModal = true"
          class="flex justify-center items-center py-4 lg:py-8 mt-4 w-full"
        >
          <icon-controller class="mr-2"></icon-controller>
          Play
        </app-button>
      </div>
    </div>

    <the-dialog-choose-input-system
      v-if="openChooseInputSystemModal"
      @close-dialog="openChooseInputSystemModal = false"
      @play-game="playGame()"
    />
  </section>

  <div class="w-screen h-screen relative overflow-hidden">
    <canvas class="absolute" ref="enemiesCanvas"></canvas>
    <canvas class="absolute" ref="playerCanvas"></canvas>
    <canvas class="absolute" ref="bulletsCanvas"></canvas>
    <div class="scroll-down-background-7" ref="backgroundImage"></div>
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
import AppButton from "@/components/AppButton.vue";
import TheDialogChooseInputSystem from "@/components/TheDialogChooseInputSystem.vue";
import TheDialogGameInstruction from "@/components/TheDialogGameInstruction.vue";

import Game from "@/classes/game";
import InputSystem from "@/classes/core/input-system";
import store from "@/store";
import loadAssets from "@/store/assets";

export default defineComponent({
  components: {
    IconController,
    AppButton,
    TheDialogChooseInputSystem,
    TheDialogGameInstruction
  },

  setup() {
    const state = reactive({
      logoClicked: false,
      openChooseInputSystemModal: false,
      totalAssetsCount: computed(() =>
        store.assets != null ? Object.keys(store.assets).length : -1
      ),
      isLoadingFinished: computed(() =>
        store.assets !== null
          ? store.loadedAssetsCount === Object.keys(store.assets).length
          : false
      )
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
