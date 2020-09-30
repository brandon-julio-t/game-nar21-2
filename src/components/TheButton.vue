<template>
  <button
    :class="
      `transition duration-150 ease-in-out px-4 py-2 rounded border ${
        isDark ? 'border-white' : 'border-black'
      } hover:${isDark ? 'bg-white' : 'bg-black'} hover:${
        isDark ? 'text-black' : 'text-white'
      } hover:${isDark ? 'border-white' : 'border-dark'} ${classNames}`
    "
  >
    <slot></slot>
  </button>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    class: {
      type: String,
      required: true
    },

    dark: {
      type: Boolean,
      required: true
    }
  },

  setup(props) {
    return {
      classNames: props.class,
      isDark: props.dark
    };
  }
});
</script>
