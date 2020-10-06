<template>
  <h1 class="font-bold flex items-center">
    <icon-question-circle class="mr-2"></icon-question-circle>
    Instructions
  </h1>

  <div class="grid grid-cols-2 gap-8">
    <section>
      <h2 class="flex items-center">
        <icon-keyboard class="mr-2"></icon-keyboard>
        Keyboard
      </h2>
      <ul class="list-disc">
        <li>
          <kbd>w</kbd>
          <kbd>a</kbd>
          <kbd>s</kbd>
          <kbd>d</kbd>
          /
          <kbd>↑</kbd>
          <kbd>←</kbd>
          <kbd>↓</kbd>
          <kbd>→</kbd>: move
        </li>
        <li><kbd>Shift</kbd>: slow down</li>
        <li><kbd>Space</kbd>: shoot</li>
      </ul>
    </section>

    <section>
      <h2 class="flex items-center">
        <icon-mouse class="mr-2"></icon-mouse>
        Mouse
      </h2>
      <ul class="list-disc">
        <li>Mouse move: move</li>
        <li>Left click: shoot</li>
      </ul>
    </section>
  </div>

  <h1 class="font-bold flex items-center">
    <icon-exclamation-circle class="mr-2"></icon-exclamation-circle>
    Notes
  </h1>
  <ul class="list-disc">
    <li>Dodge the bullets</li>
    <li>Kill the boss</li>
    <li>Kill minions for score</li>
    <li>Don't get hit by meteor</li>
  </ul>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import IconExclamationCircle from "@/components/icons/IconExclamationCircle.vue";
import IconKeyboard from "@/components/icons/IconKeyboard.vue";
import IconMouse from "@/components/icons/IconMouse.vue";
import IconQuestionCircle from "@/components/icons/IconQuestionCircle.vue";

export default defineComponent({
  components: {
    IconExclamationCircle,
    IconKeyboard,
    IconMouse,
    IconQuestionCircle
  }
});
</script>
