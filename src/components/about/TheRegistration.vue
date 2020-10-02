<template>
  <h1 class="text-center">Registration</h1>

  <section class="text-center">
    <h2>Open Registration</h2>
    <h3><span class="text-lionel-light">27 Januari</span> 2021</h3>
    <p>Until</p>
    <h3 class="text-3xl">
      <span class="text-lionel-light">12 February</span> 2021
    </h3>

    <a
      href="https://bluejack.binus.ac.id/lab"
      target="_blank"
      rel="noopener noreferrer"
    >
      <app-button
        class="bg-primary px-6 py-3 rounded-md text-xl tracking-widest mt-4"
      >
        REGISTER HERE
      </app-button>
    </a>
  </section>
</template>

<style scoped>
button:hover {
  background-color: #228dfd;
  box-shadow: 2px 2px 4px rgba(255, 255, 255, 0.9),
    -2px -2px 4px rgba(255, 255, 255, 0.9);
}
</style>

<script lang="ts">
import AppButton from "../AppButton.vue";
import { defineComponent } from "vue";

export default defineComponent({
  components: { AppButton }
});
</script>
