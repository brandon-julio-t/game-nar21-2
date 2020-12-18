<template>
  <section class="mb-6">
    <h1 class="font-bold mb-2">
      <font-awesome-icon :icon="['fa', 'question-circle']"></font-awesome-icon>
      Instructions
    </h1>

    <div class="grid grid-cols-2 gap-20">
      <section>
        <h2 class="mb-1">
          <font-awesome-icon :icon="['fa', 'keyboard']"></font-awesome-icon>
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
        <h2 class="mb-1">
          <font-awesome-icon :icon="['fa', 'mouse']"></font-awesome-icon>
          Mouse
        </h2>

        <ul class="list-disc">
          <li>Mouse move: move</li>
          <li>Left click: shoot</li>
        </ul>
      </section>
    </div>

    <h1 class="font-bold mb-2 mt-6">
      <font-awesome-icon
        :icon="['fa', 'exclamation-circle']"
      ></font-awesome-icon>
      Notes
    </h1>

    <ul class="list-disc">
      <li>Dodge the bullets</li>
      <li>Kill the boss</li>
      <li>Kill minions for score</li>
      <li>Don't get hit by meteor</li>
    </ul>
  </section>
</template>
