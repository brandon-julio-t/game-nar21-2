<template>
  <article
    class="flex justify-center items-center w-screen h-screen text-white"
  >
    <div class="bg-black bg-opacity-75 p-16 w-3/4 rounded-lg flex">
      <div class="w-1/4">
        <tabs @changetab="changeTab" />
      </div>
      <section class="w-3/4 ml-4">
        <component v-bind:is="currentTabComponent"></component>
      </section>
    </div>
  </article>
</template>

<script>
import Tabs from "../components/info/Tabs";
import Benefits from "../components/info/Benefits";
import Requirements from "../components/info/Requirements";
import Test from "../components/info/Test";
import Registration from "../components/info/Registration";
import Contact from "../components/info/Contact";

export default {
  data() {
    return {
      currentStep: 1,
      totalSteps: 5,
      currentTab: "Benefits",
    };
  },
  components: { Tabs, Benefits, Requirements, Test, Registration, Contact },
  methods: {
    changeTab(tabName) {
      this.currentTab = tabName;
    },
  },
  computed: {
    currentTabComponent() {
      return this.currentTab;
    },
  },
};
</script>