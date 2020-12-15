<template>
  <ul class="flex-grow flex justify-between">
    <li
      v-for="(tab, idx) in tabs"
      :key="idx"
      :class="{ 'text-purple-400': tab.name === currentTab }"
      class="flex justify-center items-center"
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
        { name: "TheRequirements", label: "Req." },
        { name: "TheInitialTest", label: "Initial Test" },
        { name: "TheRegistration", label: "Registration" },
        { name: "TheContact", label: "Contact" }
      ]
    };
  }
});
</script>
