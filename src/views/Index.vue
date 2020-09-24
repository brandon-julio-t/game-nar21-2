<template>
  <div class="home">
    <h1 class="text-center text-6xl">NAR21-2</h1>
    <img alt="Vue logo" src="@/assets/logo-nar21-2.jpg" />
  </div>
</template>

<script lang="ts">
import Player from "@/models/player";
import { defineComponent } from "vue";

export default defineComponent({
  mounted() {
    console.log(new Player(0, 0, 0));
  }
});
</script>
