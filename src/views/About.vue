<template>
  <article class="flex justify-center items-center w-screen text-white">
    <div class="h-screen">
      <!--  Trick to center div.container in the middle of the screen.  -->
    </div>

    <div
      class="container rounded-xl shadow-2xl py-8 px-16 md:px-32"
      :style="{ backgroundImage: `url('${image}')` }"
    >
      <div
        class="flex flex-col justify-center items-center space-y-16"
        style="height: 800px;"
      >
        <section class="w-full flex items-center">
          <the-tabs @change-tab="changeTab" :currentTab="currentTab"></the-tabs>
        </section>

        <section class="overflow-y-auto" style="min-height: 700px;">
          <component :is="currentTab"></component>
        </section>
      </div>
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

    function changeTab(tabName: string) {
      currentTab.value = tabName;
      image.value = `/images/about-bg/${tabName}.webp`;
    }

    return {
      changeTab,
      currentTab,
      image
    };
  }
});
</script>

<style scoped>
article {
  font-family: "Montserrat", sans-serif;
}

.container {
  background-size: cover;
  background-repeat: no-repeat;
}
</style>
