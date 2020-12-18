<template>
  <div class="w-screen h-screen relative overflow-hidden">
    <canvas
      v-show="!store.isGaming"
      ref="galaxyBackground"
      class="w-full h-full z-none bg-cover absolute inset-0"
    ></canvas>
    <canvas
      v-show="!store.isGaming"
      ref="galaxyStars"
      class="w-full h-full z-none bg-cover absolute inset-0"
    ></canvas>

    <main class="overflow-y-auto overflow-x-hidden h-full">
      <router-view v-slot="{ Component }">
        <transition name="fade">
          <component :is="Component"></component>
        </transition>
      </router-view>
    </main>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, watch } from "vue";

import Environment from "./classes/core/environment";
import Galaxy from "./classes/core/galaxy";
import InputSystem from "./classes/core/input-system";
import store from "./store";
import { useRoute, useRouter } from "vue-router";

export default defineComponent({
  setup() {
    const galaxyStars = ref<HTMLCanvasElement | null>(null);
    const galaxyBackground = ref<HTMLCanvasElement | null>(null);

    const router = useRouter();
    const route = useRoute();

    onMounted(() => {
      if (Environment.isProduction) {
        document.oncontextmenu = e => e.preventDefault();
        InputSystem.disableInspectElement();
      }

      router.afterEach(() => handleGalaxyBackground(store.isGaming));
      watch(() => store.isGaming, handleGalaxyBackground);

      const galaxy = new Galaxy(galaxyBackground.value, galaxyStars.value);

      function handleGalaxyBackground(isGaming: boolean): void {
        const isIndex = route.path === "/";

        if (!isGaming) galaxy.play(isIndex);
        else galaxy.pause();
      }

      handleGalaxyBackground(store.isGaming);
    });

    return { galaxyBackground, galaxyStars, store };
  }
});
</script>
