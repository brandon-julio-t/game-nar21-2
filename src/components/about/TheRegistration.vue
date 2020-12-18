<template>
  <the-layout class="rounded-xl md:rounded-none bg-gray-800 md:bg-none bg-opacity-40 md:bg-opacity-0 p-8 md:p-0">
    <template v-slot:header>BE ONE OF US!</template>

    <section class="text-center text-2xl md:text-3xl leading-6">
      <h2>Open Registration</h2>
      <h3>
        <span class="font-semibold text-lionel-purple">27 January</span> 2021
      </h3>
      <p>Until</p>
      <h3>
        <span class="font-semibold text-lionel-purple">12 February</span> 2021
      </h3>

      <a
        href="https://bluejack.binus.ac.id/lab"
        target="_blank"
        rel="noopener noreferrer"
      >
        <button
          class="py-4 px-8 rounded-full bg-primary mt-16 md:mt-20 shadow-2xl uppercase outline-none border-purple-900 border-2"
        >
          Register Here
        </button>
      </a>
    </section>
  </the-layout>
</template>

<style scoped>
button {
  background-color: #231a84;
  color: #fff;
}

button:hover {
  background-color: #2a1fa1;
}
</style>

<script lang="ts">
import TheLayout from "@/components/about/TheLayout.vue";
import { defineComponent } from "vue";

export default defineComponent({
  components: { TheLayout }
});
</script>
