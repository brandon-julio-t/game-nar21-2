<template>
  <the-layout
    class="text-center mx-auto rounded-xl md:rounded-none bg-gray-800 md:bg-none bg-opacity-40 md:bg-opacity-0 p-12 md:p-0 flex flex-col"
  >
    <template v-slot:header>Initial Test</template>

    <div class="flex justify-center">
      <div>
        <section class="text-xl md:text-3xl">
          <h2>
            Sunday,
            <span class="font-semibold text-lionel-purple">03 March</span> 2021
            <br />
            07:30 - 12:00
          </h2>
        </section>

        <section class="text-xl md:text-2xl text-left mt-8">
          <p>
            Please dress politely and bring Binusian Card
            <br />
            The Initial Test Consists of:
          </p>

          <ol class="list-decimal ml-5 text-left">
            <li>
              <span class="font-semibold text-lionel-purple">Aptitude</span>
              Test
            </li>
            <li>
              <span class="font-semibold text-lionel-purple">Programming</span>
              Test (Using
              <span class="font-semibold text-lionel-purple"
                >C / C++ / Java</span
              >)
            </li>
          </ol>
        </section>
      </div>
    </div>
  </the-layout>
</template>

<script lang="ts">
import TheLayout from "@/components/about/TheLayout.vue";
import { defineComponent } from "vue";

export default defineComponent({
  components: { TheLayout }
});
</script>
