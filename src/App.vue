<template>
  <div
    :class="{
      'container mx-auto flex justify-center items-center w-screen h-screen': !store.isGaming
    }"
  >
    <div>
      <navbar v-if="!store.isGaming" />

      <main>
        <router-view />
      </main>
    </div>
  </div>
</template>

<style scoped>
body{
  background-color: #333;
}
</style>

<script lang="ts">
import { defineComponent } from "vue";

import Navbar from "./components/Navbar.vue";
import store from "./store";

export default defineComponent({
  components: {
    Navbar
  },

  data() {
    return {
      store
    };
  }
});
</script>
