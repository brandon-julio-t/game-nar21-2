<template>
  <ul
    class="w-full grid grid-cols-1 lg:grid-cols-5 grid-flow-row gap-4 text-xl"
  >
    <li
      v-for="(tab, idx) in tabs"
      :key="idx"
      :class="{
        'bg-purple-600 bg-opacity-50 bg-blur border border-white border-opacity-10 shadow-inner':
          tab.name === currentTab
      }"
      class="flex justify-center items-center rounded-lg"
    >
      <app-button-about class="w-full mx-auto" @click="onButtonClick(tab.name)">
        {{ tab.label }}
      </app-button-about>
    </li>
  </ul>
</template>

<script lang="ts">
import AppButtonAbout from "../AppButtonAbout.vue";
import { defineComponent } from "vue";

export default defineComponent({
  components: { AppButtonAbout },
  props: { currentTab: String },
  emits: ["change-tab"],

  setup(props, { emit }) {
    function onButtonClick(tabName: string) {
      emit("change-tab", tabName);
    }

    return {
      onButtonClick,
      tabs: [
        { name: "TheBenefits", label: "Benefits" },
        { name: "TheRequirements", label: "Requirements" },
        { name: "TheInitialTest", label: "Initial Test" },
        { name: "TheRegistration", label: "Registration" },
        { name: "TheContact", label: "Contact" }
      ]
    };
  }
});
</script>
