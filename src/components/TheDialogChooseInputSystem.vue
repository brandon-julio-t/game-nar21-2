<template>
  <div
    class="h-screen w-screen flex justify-center items-center absolute inset-0 text-white"
    style="background: #1b2f47;"
  >
    <div
      class="border-2 border-lionel-alternate bg-black bg-opacity-75 rounded-lg p-16 relative z-20"
    >
      <h1 class="font-bold text-center mb-8">Choose Input System</h1>

      <div class="grid grid-cols-2 gap-2 md:gap-4 lg:gap-8">
        <app-button-main-menu class="truncate" @click="playWithKeyboard()">
          <font-awesome-icon :icon="['fa', 'keyboard']"></font-awesome-icon>
          Keyboard
        </app-button-main-menu>

        <app-button-main-menu class="truncate" @click="playWithMouse()">
          <font-awesome-icon :icon="['fa', 'mouse']"></font-awesome-icon>
          Mouse
        </app-button-main-menu>
      </div>

      <button class="absolute top-0 right-0 p-4" @click="$emit('close-dialog')">
        <font-awesome-icon :icon="['fa', 'times']"></font-awesome-icon>
      </button>
    </div>

    <canvas ref="SLakeCanvas" class="absolute inset-0 z-10"></canvas>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, onUnmounted, ref } from "vue";

import InputSystem from "@/classes/core/input-system";
import AppButtonMainMenu from "./AppButtonMainMenu.vue";
import store from "@/store";
import SLake from "@/classes/core/SLake";

export default defineComponent({
  components: { AppButtonMainMenu },

  emits: ["play-game", "close-dialog"],

  setup(props, { emit }) {
    const SLakeCanvas = ref<HTMLCanvasElement | null>(null);
    const SL = ref<SLake | null>(null);

    onMounted(() => {
      if (SLakeCanvas.value) {
        SL.value = new SLake(SLakeCanvas.value.transferControlToOffscreen());
      }
    });

    onUnmounted(() => {
      if (SL.value) {
        console.log("clean");
        SL.value.cleanUp();
      }
    });

    function playWithKeyboard() {
      InputSystem.useKeyboard();
      emit("play-game");
    }

    function playWithMouse() {
      InputSystem.useMouse();
      emit("play-game");
    }

    return {
      SLakeCanvas,
      InputSystem,
      playWithKeyboard,
      playWithMouse,
      store
    };
  }
});
</script>
