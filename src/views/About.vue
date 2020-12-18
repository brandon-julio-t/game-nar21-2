<template>
  <article class="flex justify-center items-center w-screen text-white">
    <div class="h-screen">
      <!--  Trick to center div.container in the middle of the screen.  -->
    </div>

    <div class="container py-8 px-4 md:px-16 relative">
      <img
        v-for="(tab, idx) in tabs"
        :key="idx"
        :class="{ hidden: currentTab !== tab, block: currentTab === tab }"
        :src="`/images/about-bg/${tab}.webp`"
        alt="background"
        class="absolute inset-0 w-full h-full object-cover rounded-3xl shadow-2xl z-none"
      />

      <section class="w-full">
        <the-tabs :currentTab="currentTab" @change-tab="changeTab"></the-tabs>
      </section>

      <div class="my-16"></div>

      <section style="min-height: 650px;">
        <component :is="currentTab"></component>
      </section>
    </div>
  </article>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";

import TheBenefits from "@/components/about/TheBenefits.vue";
import TheContact from "@/components/about/TheContact.vue";
import TheRegistration from "@/components/about/TheRegistration.vue";
import TheRequirements from "@/components/about/TheRequirements.vue";
import TheTabs from "@/components/about/TheTabs.vue";
import TheInitialTest from "@/components/about/TheInitialTest.vue";
import Galaxy from "@/classes/core/galaxy";

export default defineComponent({
  components: {
    TheBenefits,
    TheContact,
    TheRegistration,
    TheRequirements,
    TheTabs,
    TheInitialTest
  },

  setup() {
    const currentTab = ref("TheBenefits");
    const image = ref("/images/about-bg/TheBenefits.webp");
    const tabs = [
      "TheBenefits",
      "TheContact",
      "TheInitialTest",
      "TheRegistration",
      "TheRequirements"
    ];

    function changeTab(tabName: string) {
      currentTab.value = tabName;
      image.value = `/images/about-bg/${tabName}.webp`;
    }

    return {
      changeTab,
      currentTab,
      image,
      tabs
    };
  }
});
</script>
