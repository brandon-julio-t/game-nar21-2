<template>
  <ul class="flex flex-col list-none">
    <li v-for="(tab, idx) in tabs" :key="idx">
      <button
        @click="onButtonClick(tab.name)"
        class="py-2 px-4 w-full my-2 text-lg bg-orange-900 rounded truncate"
      >
        {{ tab.label }}
      </button>
    </li>
  </ul>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  emits: ["change-tab"],

  setup(props, { emit }) {
    const tabs = [
      { name: "TheBenefits", label: "Benefits" },
      { name: "TheRequirements", label: "Req." },
      { name: "TheTest", label: "Initial Test" },
      { name: "TheRegistration", label: "Registration" },
      { name: "TheContact", label: "Contact" }
    ];

    function onButtonClick(tabName: string) {
      emit("change-tab", tabName);
    }

    return {
      onButtonClick,
      tabs
    };
  }
});
</script>
