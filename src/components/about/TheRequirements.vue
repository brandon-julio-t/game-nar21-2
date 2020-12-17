<template>
  <the-layout class="rounded-xl md:rounded-none bg-gray-600 md:bg-none bg-opacity-40 md:bg-opacity-0 p-12 md:p-0">
    <template v-slot:header class="text-red-800">Require&shy;ments</template>

    <section class="grid grid-flow-row grid-cols-1 md:grid-cols-2 gap-y-16 gap-x-16 md:gap-y-16 md:gap-x-12 max-w-4xl mx-auto mb-12 md:mb-0">
      <div v-for="(requirement, idx) in requirements" :key="idx">
        <font-awesome-icon
          v-if="requirement.icon"
          :icon="[requirement.family, requirement.icon]"
          class="mx-auto text-9xl md:text-8xl flex text-center text-blue-300 mb-6"
        ></font-awesome-icon>

        <img
          v-else
          :alt="requirement.desc"
          :src="requirement.img"
          class="mx-auto h-32 md:h-24 mb-6"
        />
        <p class="text-center text-lg md:text-xl">
          {{ requirement.desc }}
        </p>
      </div>
    </section>
  </the-layout>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import TheLayout from "@/components/about/TheLayout.vue";

export default defineComponent({
  components: { TheLayout },
  data() {
    return {
      requirements: [
        {
          img: "/images/requirement-binusian.webp",
          desc: "Must be a binusian",
          family: null,
          icon: null
        },
        {
          img: "/images/requirement-sign-contract.webp",
          desc: "Willing to sign a 2 years contract",
          family: "fa",
          icon: "file-signature"
        },
        {
          img: "/images/requirement-grade-b.webp",
          desc: "Min B in Algorithm and Programming or Intro to Programming",
          family: null,
          icon: null
        },
        {
          img: "/images/requirement-faculty.webp",
          desc:
            "Binusian of the following program or faculty : Socs, SIS, FoE, DP, MTP",
          family: "fa",
          icon: "graduation-cap"
        }
      ]
    };
  }
});
</script>
