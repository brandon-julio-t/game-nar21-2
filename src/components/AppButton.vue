<template>
  <button
    :class="classNames"
    class="transition duration-150 ease-in-out px-8 py-4 rounded bg-lionel hover:bg-lionel-light text-white"
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
