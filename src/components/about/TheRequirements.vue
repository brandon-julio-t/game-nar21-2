<template>
  <div>
    <h1 class="text-center text-white font-bold text-5xl mb-12">
      Requirements
    </h1>

    <section class="grid grid-rows-2 md:grid-cols-2 gap-8 lg:gap-x-4 lg:gap-y-12 my-0">
      <div v-for="(requirement, idx) in requirements" :key="idx">
        <font-awesome-icon
          v-if="requirement.icon"
          :icon="[requirement.family, requirement.icon]"
          class="mx-auto text-6xl flex text-center h-16 md:h-20 mb-6 text-blue-300"
        ></font-awesome-icon>
        <img
          v-else
          :alt="requirement.desc"
          :src="requirement.img"
          class="mx-auto h-16 md:h-20 mb-6"
        />
        <p class="text-center text-base">{{ requirement.desc }}</p>
      </div>
    </section>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
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
