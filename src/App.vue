<template>
  <div
    :class="{
      'container mx-auto flex justify-center items-center w-screen h-screen': !store.isGaming
    }"
    id="main-container"
  >
    <div>
      <main>
        <router-view />
      </main>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import store from "./store";

export default defineComponent({
  data() {
    return { store };
  }
});
</script>
