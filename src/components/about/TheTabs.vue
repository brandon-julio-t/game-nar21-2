<template>
  <ul class="grid grid-rows-5 gap-8">
    <li v-for="(tab, idx) in tabs" :key="idx">
      <app-button-about
        @click="onButtonClick(tab.name)"
        class="w-full rounded truncate bg-primary"
      >
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
