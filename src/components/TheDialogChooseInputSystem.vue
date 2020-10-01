<template>
  <teleport to="body">
    <div
      class="h-screen w-screen flex justify-center items-center absolute inset-0 bg-black bg-opacity-25 text-black text-2xl"
    >
      <div class="border p-16 bg-white rounded-lg relative">
        <h1 class="font-bold text-center mb-8">Choose Input System</h1>

        <div class="grid grid-cols-2 gap-8">
          <app-button-light @click="playWithKeyboard()">
            <icon-keyboard class="w-full text-6xl" />
            Keyboard
          </app-button-light>
          <app-button-light @click="playWithMouse()">
            <icon-mouse class="w-full text-6xl" />
            Mouse
          </app-button-light>
        </div>

        <button
          @click="$emit('close-dialog')"
          class="absolute top-0 right-0 p-4"
        >
          <icon-x />
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
import AppButtonLight from "./AppButtonLight.vue";
import store from "@/store";

export default defineComponent({
  components: { IconKeyboard, IconMouse, IconX, AppButtonLight },

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
