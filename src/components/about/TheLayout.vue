<template>
  <div class="text-2xl">
    <header class="text-center font-bold text-4xl md:text-5xl text-lionel-purple">
      <slot name="header"></slot>
    </header>

    <div class="my-16"></div>

    <slot></slot>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    title: String
  }
});
</script>
