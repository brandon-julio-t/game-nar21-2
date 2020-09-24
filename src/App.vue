<template>
  <div
    v-if="!store.isGaming"
    class="container mx-auto flex justify-center items-center w-screen h-screen"
  >
    <div>
      <navbar />

      <main>
        <router-view />
      </main>
    </div>
  </div>
  <main v-else>
    <router-view />
  </main>
</template>

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
