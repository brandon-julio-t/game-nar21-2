<template>
  <button
    :class="classNames"
    class="transition duration-150 ease-in-out px-4 py-2 rounded border border-white hover:bg-white hover:text-black hover:border-white"
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
      required: false
    }
  },

  setup(props) {
    return {
      classNames: props.class
    };
  }
});
</script>
