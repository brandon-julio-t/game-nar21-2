<template>
  <h1 class="text-4xl text-center">Requirements</h1>
  <section class="grid grid-cols-2 gap-y-16 mt-10">
    <div class="flex" v-for="(requirement, idx) in requirements" :key="idx">
      <img :src="requirement.img" :alt="requirement.desc" />
      <p class="ml-3">{{ requirement.desc }}</p>
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  setup() {
    const requirements = [
      {
        img: require("../../assets/benefits/vue.png"),
        desc: "Must be a binusian",
      },
      {
        img: require("../../assets/benefits/vue.png"),
        desc: "Willing to sign a 2 years contract",
      },
      {
        img: require("../../assets/benefits/vue.png"),
        desc: "Min B in Algorithm and Programming or Intro to Programming",
      },
      {
        img: require("../../assets/benefits/vue.png"),
        desc:
          "Binusian of the following program or faculty : Socs, SIS, FoE, DP, MTP",
      },
    ];

    return {
      requirements,
    };
  },
});
</script>

<style scoped>
img {
  width: 20%;
}
</style>
