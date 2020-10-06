<template>
  <teleport to="main">
    <div
      class="h-screen w-screen flex justify-center items-center absolute inset-0 bg-black bg-opacity-50 text-white"
    >
      <div class="card p-16 relative">
        <h1 class="font-bold text-center mb-8">Choose Input System</h1>

        <div class="grid grid-cols-2 gap-2 md:gap-4 lg:gap-8">
          <app-button-main-menu @click="playWithKeyboard()" class="truncate">
            <icon-keyboard class="w-full text-6xl"></icon-keyboard>
            Keyboard
          </app-button-main-menu>
          <app-button-main-menu @click="playWithMouse()" class="truncate">
            <icon-mouse class="w-full text-6xl"></icon-mouse>
            Mouse
          </app-button-main-menu>
        </div>

        <button
          @click="$emit('close-dialog')"
          class="absolute top-0 right-0 p-4"
        >
          <icon-x></icon-x>
        </button>
      </div>
    </div>
  </teleport>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import IconKeyboard from "@/components/icons/IconKeyboard.vue";
import IconMouse from "@/components/icons/IconMouse.vue";
import IconX from "@/components/icons/IconX.vue";
import InputSystem from "@/classes/core/input-system";
import AppButtonMainMenu from "./AppButtonMainMenu.vue";
import store from "@/store";

export default defineComponent({
  components: {
    AppButtonMainMenu,
    IconKeyboard,
    IconMouse,
    IconX
  },

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
