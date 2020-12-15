<template>
  <the-layout>
    <template v-slot:header>BE ONE OF US!</template>

    <section class="text-center">
      <h2>Open Registration</h2>
      <h3><span class="font-semibold lionel-purple">27 January</span> 2021</h3>
      <p>Until</p>
      <h3><span class="font-semibold lionel-purple">12 February</span> 2021</h3>

      <a
        href="https://bluejack.binus.ac.id/lab"
        target="_blank"
        rel="noopener noreferrer"
      >
        <button
          class="py-4 px-8 rounded-full bg-primary tracking-widest mt-24 uppercase"
        >
          Register Here
        </button>
      </a>
    </section>
  </the-layout>
</template>

<style scoped>
button {
  background-color: #1b1464;
  color: #fff;
}

button:hover {
  background-color: #231a84;
}
</style>

<script lang="ts">
import TheLayout from "@/components/about/TheLayout.vue";
import { defineComponent } from "vue";

export default defineComponent({
  components: { TheLayout }
});
</script>
