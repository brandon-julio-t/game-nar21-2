<template>
  <div class="flex justify-around items-center flex-wrap">
    <div
      v-for="(icon, idx) in skills"
      :key="idx"
      class="group flex flex-col justify-center items-center"
    >
      <font-awesome-icon
        :icon="[icon.family, icon.name]"
        class="text-6xl"
      ></font-awesome-icon>
      <div
        class="bg-black bg-opacity-50 text-center align-middle rounded text-white px-4 py-2 my-2 opacity-0 group-hover:opacity-100 transition duration-150 ease-in-out fly-down text-lg"
      >
        {{ icon.tooltip }}
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.fly-down {
  transform: translateY(-1.5rem);
}

.group:hover {
  .fly-down {
    transform: translateY(0);
  }
}
</style>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    skills: Array
  }
});
</script>
