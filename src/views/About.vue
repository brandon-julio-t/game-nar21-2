<template>
  <article
    class="flex justify-center items-center w-screen h-screen text-white"
  >
    <div
      class="container grid lg:grid-cols-4 gap-8 border-2 bg-black bg-opacity-75 p-16 rounded-lg"
    >
      <section class="lg:col-span-1 flex items-center">
        <the-tabs @change-tab="changeTab" />
      </section>

      <section class="lg:col-span-3 flex items-center justify-center">
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
import TheTest from "@/components/about/TheInitialTest.vue";

export default defineComponent({
  components: {
    TheBenefits,
    TheContact,
    TheRegistration,
    TheRequirements,
    TheTabs,
    TheTest
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

<style scoped>
.container {
  max-width: 80%;
  min-height: 75%;
  border-color: #1676eb;
}
</style>
