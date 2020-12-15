<template>
  <article class="flex justify-center items-center w-screen text-white">
    <div class="h-screen">
      <!--  Trick to center div.container in the middle of the screen.  -->
    </div>

    <div class="container shadow-2xl py-8 px-16 md:px-32">
      <div class="flex flex-wrap lg:flex-no-wrap lg:flex-col justify-center items-center min-h-full">
        <section
          class="w-full"
        >
          <the-tabs @change-tab="changeTab"></the-tabs>
        </section>

        <section class="w-full mx-auto">
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
article {
  font-family: 'Montserrat', sans-serif;
}

.container {
  background-image: url("/images/galaxy.webp");
  background-size: 100% 100%;
  background-repeat: no-repeat;
  min-height: 80vh;
}

</style>
