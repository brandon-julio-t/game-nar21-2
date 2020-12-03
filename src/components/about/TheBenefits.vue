<template>
  <div>
    <h1 class="text-center text-white text-5xl font-bold tracking-widest">
      Benefits
    </h1>

    <section>
      <h2 class="font-semibold mb-3">Hard Skill</h2>
      <div class="grid grid-cols-5">
        <font-awesome-icon
          :icon="['fa', 'database']"
          class="text-6xl mx-auto"
        ></font-awesome-icon>
        <font-awesome-icon
          :icon="['fab', 'js']"
          class="text-6xl mx-auto text-yellow-500"
        ></font-awesome-icon>
        <font-awesome-icon
          :icon="['fab', 'laravel']"
          class="text-6xl mx-auto text-red-600"
        ></font-awesome-icon>
        <font-awesome-icon
          :icon="['fab', 'angular']"
          class="text-6xl mx-auto text-red-600"
        ></font-awesome-icon>
        <font-awesome-icon
          :icon="['fab', 'android']"
          class="text-6xl mx-auto text-green-500"
        ></font-awesome-icon>
      </div>
    </section>

    <section>
      <h2 class="font-semibold mb-3">Soft Skill</h2>
      <div class="grid grid-cols-4 w-full">
        <font-awesome-icon
          :icon="['fa', 'clock']"
          class="text-6xl mx-auto"
        ></font-awesome-icon>
        <font-awesome-icon
          :icon="['fa', 'users']"
          class="text-6xl mx-auto"
        ></font-awesome-icon>
        <font-awesome-icon
          :icon="['fa', 'bullhorn']"
          class="text-6xl mx-auto"
        ></font-awesome-icon>
        <font-awesome-icon
          :icon="['fa', 'user-friends']"
          class="text-6xl mx-auto"
        ></font-awesome-icon>
      </div>
    </section>

    <section>
      <h2 class="font-semibold">Job Experiences</h2>
      <div></div>
    </section>
  </div>
</template>