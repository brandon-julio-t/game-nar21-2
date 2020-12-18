<template>
  <div
    class="h-screen w-screen flex justify-center items-center absolute inset-0 bg-black bg-opacity-50 text-white"
  >
    <div
      class="border-2 border-lionel-alternate bg-black bg-opacity-75 rounded-lg p-16 relative"
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
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import InputSystem from "@/classes/core/input-system";
import AppButtonMainMenu from "./AppButtonMainMenu.vue";
import store from "@/store";

export default defineComponent({
  components: { AppButtonMainMenu },

  emits: ["play-game", "close-dialog"],

  setup(props, { emit }) {
    function playWithKeyboard() {
      InputSystem.useKeyboard();
      emit("play-game");
    }

    function playWithMouse() {
      InputSystem.useMouse();
      emit("play-game");
    }

    return {
      InputSystem,
      playWithKeyboard,
      playWithMouse,
      store
    };
  }
});
</script>
