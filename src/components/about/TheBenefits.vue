<template>
  <div>
    <h1 class="text-center text-white font-bold tracking-widest">
      Benefits
    </h1>

    <section>
      <h2 class="font-semibold mb-3">Hard Skill</h2>
      <div class="flex justify-center items-center flex-wrap">
        <font-awesome-icon
          :icon="['fa', 'database']"
          class="text-6xl mx-4 sm:mx-auto text-red-500"
        ></font-awesome-icon>
        <font-awesome-icon
          :icon="['fab', 'js']"
          class="text-6xl mx-4 sm:mx-auto text-yellow-500"
        ></font-awesome-icon>
        <font-awesome-icon
          :icon="['fab', 'laravel']"
          class="text-6xl mx-4 sm:mx-auto text-red-600"
        ></font-awesome-icon>
        <font-awesome-icon
          :icon="['fab', 'angular']"
          class="text-6xl mx-4 sm:mx-auto text-red-600"
        ></font-awesome-icon>
        <font-awesome-icon
          :icon="['fab', 'android']"
          class="text-6xl mx-4 sm:mx-auto text-green-500"
        ></font-awesome-icon>
      </div>
    </section>

    <section>
      <h2 class="font-semibold mb-3">Soft Skill</h2>
      <div class="flex justify-center items-center flex-wrap">
        <font-awesome-icon
          :icon="['fa', 'clock']"
          class="text-6xl mx-4 sm:mx-auto text-white"
        ></font-awesome-icon>
        <font-awesome-icon
          :icon="['fa', 'users']"
          class="text-6xl mx-4 sm:mx-auto text-indigo-600"
        ></font-awesome-icon>
        <font-awesome-icon
          :icon="['fa', 'bullhorn']"
          class="text-6xl mx-4 sm:mx-auto text-red-700"
        ></font-awesome-icon>
        <font-awesome-icon
          :icon="['fa', 'user-friends']"
          class="text-6xl mx-4 sm:mx-auto text-blue-500"
        ></font-awesome-icon>
      </div>
    </section>

    <section>
      <h2 class="font-semibold">Job Experiences</h2>
      <div></div>
    </section>
  </div>
</template>