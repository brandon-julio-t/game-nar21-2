<template>
  <div
    :class="{
      'w-screen h-screen relative overflow-hidden': !store.isGaming
    }"
  >
    <div
      v-if="!store.isGaming"
      id="main-background"
      class="scroll-down-background-60"
    />
    <main>
      <router-view v-slot="{ Component }">
        <transition name="fade">
          <component :is="Component" />
        </transition>
      </router-view>
    </main>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted } from "vue";

import Environment from "./classes/core/environment";
import InputSystem from "./classes/core/input-system";
import store from "./store";

export default defineComponent({
  setup() {
    if (Environment.isProduction) {
      onMounted(() => {
        document.oncontextmenu = e => e.preventDefault();
        InputSystem.disableInspectElement();
      });
    }

    return {
      store
    };
  }
});
</script>

<style scoped>
#main-background {
  background-image: url("/images/background.webp");
}
</style>
