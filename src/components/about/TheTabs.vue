<template>
  <ul class="grid grid-rows-5 gap-4">
    <li v-for="(tab, idx) in tabs" :key="idx">
      <app-button
        @click="onButtonClick(tab.name)"
        class="w-full rounded truncate transition duration-150 bg-primary"
      >
        {{ tab.label }}
      </app-button>
    </li>
  </ul>
</template>

<script lang="ts">
import AppButton from "../AppButton.vue";
import { defineComponent } from "vue";

export default defineComponent({
  components: { AppButton },

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

<style scoped>
button:hover {
  background-color: #228dfd;
}
</style>
