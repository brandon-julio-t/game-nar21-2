<template>
  <teleport to="body">
    <div
      class="h-screen w-screen flex justify-center items-center absolute inset-0 bg-black bg-opacity-25 text-black"
    >
      <div class="border p-16 bg-white rounded-lg relative">
        <h1 class="text-xl font-bold text-center mb-8">Choose Input System</h1>

        <div class="grid grid-cols-2 gap-8">
          <button
            @click="playWithKeyboard()"
            class="transition duration-300 ease-in-out border border-black px-4 py-2 rounded hover:bg-black hover:text-white hover:border-white"
          >
            Keyboard
          </button>
          <button
            @click="playWithMouse()"
            class="transition duration-300 ease-in-out border border-black px-4 py-2 rounded hover:bg-black hover:text-white hover:border-white"
          >
            Mouse
          </button>
        </div>

        <button @click="$emit('close-dialog')" class="absolute" id="close-btn">
          <svg
            width="1em"
            height="1em"
            viewBox="0 0 16 16"
            class="bi bi-x w-8 h-8"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"
            />
          </svg>
        </button>
      </div>
    </div>
  </teleport>
</template>

<style scoped>
#close-btn {
  top: 10px;
  right: 10px;
}
</style>

<script lang="ts">
import { defineComponent } from "vue";

import InputSystem from "@/classes/core/input-system";
import store from "@/store";

export default defineComponent({
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
