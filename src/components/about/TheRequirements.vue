<template>
  <div>
    <h1
      class="text-center text-white text-white font-bold text-5xl tracking-widest"
    >
      Requirements
    </h1>

    <section class="grid grid-cols-2 gap-6">
      <figure v-for="(requirement, idx) in requirements" :key="idx">
        <img
          :alt="requirement.desc"
          :src="requirement.img"
          class="w-24 mx-auto h-16 xl:h-32 w-auto mb-6"
        />
        <figcaption class="text-center">{{ requirement.desc }}</figcaption>
      </figure>
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
          desc: "Must be a binusian"
        },
        {
          img: "/images/requirement-sign-contract.webp",
          desc: "Willing to sign a 2 years contract"
        },
        {
          img: "/images/requirement-grade-b.webp",
          desc: "Min B in Algorithm and Programming or Intro to Programming"
        },
        {
          img: "/images/requirement-faculty.webp",
          desc:
            "Binusian of the following program or faculty : Socs, SIS, FoE, DP, MTP"
        }
      ]
    };
  }
});
</script>