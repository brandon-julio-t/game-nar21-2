<template>
  <article
    class="flex justify-center items-center w-screen h-screen text-white"
  >
    <div
      class="container border-2 border-lionel bg-black bg-opacity-75 rounded-lg mx-8"
    >
      <div
        class="flex flex-wrap lg:flex-no-wrap justify-center items-center m-8 md:m-32"
      >
        <section
          class="w-full mx-auto lg:w-1/4 flex justify-center items-center"
        >
          <the-tabs @change-tab="changeTab" />
        </section>

        <div class="mx-8" />

        <section class="w-full mx-auto lg:w-3/4">
          <component :is="currentTab" />
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

    function changeTab(tabName: string) {
      currentTab.value = tabName;
    }

    return {
      changeTab,
      currentTab
    };
  }
});
</script>
