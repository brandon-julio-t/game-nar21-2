<template>
  <div
    :class="{
      'w-screen h-screen relative overflow-hidden': !store.isGaming
    }"
  >
    <canvas
      v-show="!store.isGaming"
      ref="starryBg"
      class="absolute bottom-0 w-full h-full z-none bg-black"
    ></canvas>
    <main>
      <router-view v-slot="{ Component }">
        <transition name="fade">
          <component :is="Component"></component>
        </transition>
      </router-view>
    </main>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";

import Environment from "./classes/core/environment";
import InputSystem from "./classes/core/input-system";
import starry from "./canvas-backgrounds/starry";
import store from "./store";

export default defineComponent({
  setup() {
    const starryBg = ref<HTMLCanvasElement | null>(null);

    onMounted(() => {
      if (Environment.isProduction) {
        document.oncontextmenu = e => e.preventDefault();
        InputSystem.disableInspectElement();
      }

      if (starryBg.value !== null) {
        starry(starryBg.value);
      }
    });

    return {
      store,
      starryBg
    };
  }
});
</script>
