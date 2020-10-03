<template>
  <h1 class="text-center font-bold heading tracking-widest">Registration</h1>

  <section class="text-center">
    <h2>Open Registration</h2>
    <h3 class="text-3xl">
      <span class="text-lionel-light font-bold">27 Januari</span> 2021
    </h3>
    <p>Until</p>
    <h3 class="text-3xl">
      <span class="text-lionel-light font-bold">12 February</span> 2021
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
@import url("https://fonts.googleapis.com/css2?family=Gugi&display=swap");
button:hover {
  background-color: #228dfd;
  box-shadow: 2px 2px 4px rgba(255, 255, 255, 0.9),
    -2px -2px 4px rgba(255, 255, 255, 0.9);
}

h1 {
  font-family: "Gugi", cursive;
}
</style>

<script lang="ts">
import AppButton from "../AppButton.vue";
import { defineComponent } from "vue";

export default defineComponent({
  components: { AppButton },
});
</script>
