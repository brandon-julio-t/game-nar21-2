<template>
  <ul class="flex flex-col list-none m-auto">
    <li v-for="(tab, idx) in tabs" :key="idx">
      <button
        @click="onButtonClick(tab.name)"
        class="py-2 px-4 w-full my-2 text-lg rounded truncate transition duration-150 bg-primary"
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
    function onButtonClick(tabName: string) {
      emit("change-tab", tabName);
    }

    return {
      onButtonClick,
      tabs: [
        { name: "TheBenefits", label: "Benefits" },
        { name: "TheRequirements", label: "Req." },
        { name: "TheTest", label: "Initial Test" },
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
