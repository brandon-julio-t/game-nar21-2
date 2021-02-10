<template>
  <the-layout
    class="rounded-xl md:rounded-none bg-gray-800 md:bg-none bg-opacity-40 md:bg-opacity-0 p-8 md:p-0 flex flex-col"
  >
    <template v-slot:header>BE ONE OF US!</template>

    <div class="flex items-center">
      <div class="w-full">
        <section class="text-center text-2xl md:text-3xl leading-6">
          <div class="leading-relaxed">
            <h2>Open Registration</h2>
            <h3>
              <span class="font-semibold text-lionel-purple">22 February</span>
              2021
            </h3>
            <p>Until</p>
            <h3>
              <span class="font-semibold text-lionel-purple">10 March</span>
              2021
            </h3>
          </div>

          <a
            href="https://bluejack.binus.ac.id/nar"
            rel="noopener noreferrer"
            target="_blank"
          >
            <button
              class="py-4 px-8 rounded-full bg-primary text-xl md:text-3xl mt-16 md:mt-20 shadow-2xl uppercase outline-none border-purple-900 border-2"
            >
              Register Here
            </button>
          </a>
        </section>
      </div>
    </div>
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
