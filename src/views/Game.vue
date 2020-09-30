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

    <div
      v-if="logoClicked"
      class="flex justify-center items-center mt-16 p-16 rounded bg-black text-white text-2xl"
    >
      <div>
        <the-dialog-game-instruction
          @open-choose-input-system-modal="openChooseInputSystemModal = true"
        />

        <div
          v-if="!isLoadingFinished"
          class="mt-8 p-16 rounded bg-black text-white text-center"
        >
          <h1 class="text-xl text-black">Loading...</h1>
          <h2 class="text-lg text-black">
            {{
              Number(
                (store.loadedAssetsCount / totalAssetsCount) * 100
              ).toFixed(2)
            }}%
          </h2>
        </div>
        <the-button
          v-else
          @click="openChooseInputSystemModal = true"
          class="flex justify-center items-center py-8 mt-4 w-full"
          :dark="true"
        >
          <svg
            width="1em"
            height="1em"
            viewBox="0 0 16 16"
            class="bi bi-controller"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              d="M11.119 2.693c.904.19 1.75.495 2.235.98.407.408.779 1.05 1.094 1.772.32.733.599 1.591.805 2.466.206.875.34 1.78.364 2.606.024.815-.059 1.602-.328 2.21a1.42 1.42 0 0 1-1.445.83c-.636-.067-1.115-.394-1.513-.773a11.307 11.307 0 0 1-.739-.809c-.126-.147-.25-.291-.368-.422-.728-.804-1.597-1.527-3.224-1.527-1.627 0-2.496.723-3.224 1.527-.119.131-.242.275-.368.422-.243.283-.494.576-.739.81-.398.378-.877.705-1.513.772a1.42 1.42 0 0 1-1.445-.83c-.27-.608-.352-1.395-.329-2.21.024-.826.16-1.73.365-2.606.206-.875.486-1.733.805-2.466.315-.722.687-1.364 1.094-1.772.486-.485 1.331-.79 2.235-.98.932-.196 2.03-.292 3.119-.292 1.089 0 2.187.096 3.119.292zm-6.032.979c-.877.185-1.469.443-1.733.708-.276.276-.587.783-.885 1.465a13.748 13.748 0 0 0-.748 2.295 12.351 12.351 0 0 0-.339 2.406c-.022.755.062 1.368.243 1.776a.42.42 0 0 0 .426.24c.327-.034.61-.199.929-.502.212-.202.4-.423.615-.674.133-.156.276-.323.44-.505C4.861 9.97 5.978 9.026 8 9.026s3.139.943 3.965 1.855c.164.182.307.35.44.505.214.25.403.472.615.674.318.303.601.468.929.503a.42.42 0 0 0 .426-.241c.18-.408.265-1.02.243-1.776a12.354 12.354 0 0 0-.339-2.406 13.753 13.753 0 0 0-.748-2.295c-.298-.682-.61-1.19-.885-1.465-.264-.265-.856-.523-1.733-.708-.85-.179-1.877-.27-2.913-.27-1.036 0-2.063.091-2.913.27z"
            />
            <path
              d="M11.5 6.026a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0zm-1 1a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0zm2 0a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0zm-1 1a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0zm-7-2.5h1v3h-1v-3z"
            />
            <path
              d="M3.5 6.526h3v1h-3v-1zM3.051 3.26a.5.5 0 0 1 .354-.613l1.932-.518a.5.5 0 0 1 .258.966l-1.932.518a.5.5 0 0 1-.612-.354zm9.976 0a.5.5 0 0 0-.353-.613l-1.932-.518a.5.5 0 1 0-.259.966l1.932.518a.5.5 0 0 0 .612-.354z"
            />
          </svg>

          <span class="ml-2">
            Play
          </span>
        </the-button>
      </div>
    </div>

    <the-dialog-choose-input-system
      v-if="openChooseInputSystemModal"
      @close-dialog="openChooseInputSystemModal = false"
      @play-game="playGame()"
    />
  </section>

  <div class="w-screen h-screen relative overflow-hidden">
    <p class="absolute top-0 left-0 text-white text-2xl p-4">
      Score: {{ score }}
    </p>
    <canvas class="absolute" ref="bulletsCanvas" />
    <canvas class="absolute" ref="enemiesCanvas" />
    <canvas class="absolute" ref="playerCanvas" />
    <div id="game-background" ref="backgroundImage" />
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, onUnmounted, ref } from "vue";

import TheButton from "@/components/TheButton.vue";
import TheDialogChooseInputSystem from "@/components/TheDialogChooseInputSystem.vue";
import TheDialogGameInstruction from "@/components/TheDialogGameInstruction.vue";

import Game from "@/classes/game";
import InputSystem from "@/classes/core/input-system";
import store from "@/store";

export default defineComponent({
  components: {
    TheButton,
    TheDialogChooseInputSystem,
    TheDialogGameInstruction
  },

  setup() {
    const backgroundImage = ref<HTMLImageElement | null>(null);
    const bulletsCanvas = ref<HTMLCanvasElement | null>(null);
    const enemiesCanvas = ref<HTMLCanvasElement | null>(null);
    const logoClicked = ref<boolean>(true);
    const openChooseInputSystemModal = ref<boolean>(false);
    const playerCanvas = ref<HTMLCanvasElement | null>(null);

    const isLoadingFinished = computed(
      () => store.loadedAssetsCount === totalAssetsCount.value
    );
    const score = computed(() =>
      Number(store.enemiesKilledCount * 100).toLocaleString()
    );
    const totalAssetsCount = computed(() => Object.keys(store.assets).length);

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
      isLoadingFinished,
      openChooseInputSystemModal,
      playerCanvas,
      logoClicked,
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
      score,
      store,
      totalAssetsCount
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
