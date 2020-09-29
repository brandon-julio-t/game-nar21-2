<template>
  <teleport to="body">
    <div
      class="h-screen w-screen flex justify-center items-center absolute inset-0 bg-black bg-opacity-25 text-black"
    >
      <div class="border p-16 bg-white rounded">
        <h1 class="text-xl font-bold">Choose Input System</h1>

        <div class="grid grid-cols-2 my-4">
          <label>
            <input
              :checked="store.useKeyboard"
              @click="InputSystem.useKeyboard()"
              type="radio"
              name="input-sytem"
            />
            Keyboard
          </label>

          <label>
            <input
              :checked="!store.useKeyboard"
              @click="InputSystem.useMouse()"
              type="radio"
              name="input-sytem"
            />
            Mouse
          </label>
        </div>

        <div class="grid grid-cols-2 gap-8">
          <button
            @click="$emit('play-game')"
            class="border border-black px-4 py-2 rounded-lg"
          >
            Play
          </button>
          <button
            @click="$emit('close-dialog')"
            class="border border-black px-4 py-2 rounded-lg"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  </teleport>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import InputSystem from "@/classes/core/input-system";
import store from "@/store";

export default defineComponent({
  emits: ["play-game", "close-dialog"],

  setup() {
    return {
      InputSystem,
      store
    };
  }
});
</script>
