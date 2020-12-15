<template>
  <div class="text-xl">
    <header class="text-center font-bold text-5xl lionel-purple">
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
