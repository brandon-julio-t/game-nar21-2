<template>
  <div class="flex justify-around items-center flex-wrap">
    <div
      v-for="(icon, idx) in skills"
      :key="idx"
      class="group flex flex-col justify-center items-center"
    >
      <font-awesome-icon
        :icon="[icon.family, icon.name]"
        class="text-6xl mx-4 sm:mx-auto"
      ></font-awesome-icon>
      <div
        class="bg-black bg-opacity-50 text-center align-middle rounded text-white px-4 py-2 my-4 opacity-0 group-hover:opacity-100"
      >
        {{ icon.tooltip }}
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    skills: Array
  }
});
</script>
