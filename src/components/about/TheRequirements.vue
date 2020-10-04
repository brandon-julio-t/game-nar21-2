<template>
  <h1 class="text-center font-bold heading tracking-widest">Requirements</h1>

  <section class="grid grid-cols-2 gap-8 mt-10">
    <figure v-for="(requirement, idx) in requirements" :key="idx">
      <img
        :src="requirement.img"
        :alt="requirement.desc"
        class="w-32 mx-auto"
      />
      <figcaption class="text-center">{{ requirement.desc }}</figcaption>
    </figure>
  </section>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  data() {
    return {
      requirements: [
        {
          img: "/images/benefits/vue.webp",
          desc: "Must be a binusian"
        },
        {
          img: "/images/benefits/vue.webp",
          desc: "Willing to sign a 2 years contract"
        },
        {
          img: "/images/benefits/vue.webp",
          desc: "Min B in Algorithm and Programming or Intro to Programming"
        },
        {
          img: "/images/benefits/vue.webp",
          desc:
            "Binusian of the following program or faculty : Socs, SIS, FoE, DP, MTP"
        }
      ]
    };
  }
});
</script>
