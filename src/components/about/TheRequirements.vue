<template>
  <h1 class="text-4xl text-center">Requirements</h1>
  <section class="grid grid-cols-2 gap-y-16 mt-10">
    <div
      class="flex items-center"
      v-for="(requirement, idx) in requirements"
      :key="idx"
    >
      <img :src="requirement.img" :alt="requirement.desc" class="w-1/5" />
      <p class="ml-4">{{ requirement.desc }}</p>
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  data() {
    return {
      requirements: [
        {
          img: require("../../assets/benefits/vue.png"),
          desc: "Must be a binusian"
        },
        {
          img: require("../../assets/benefits/vue.png"),
          desc: "Willing to sign a 2 years contract"
        },
        {
          img: require("../../assets/benefits/vue.png"),
          desc: "Min B in Algorithm and Programming or Intro to Programming"
        },
        {
          img: require("../../assets/benefits/vue.png"),
          desc:
            "Binusian of the following program or faculty : Socs, SIS, FoE, DP, MTP"
        }
      ]
    };
  }
});
</script>
