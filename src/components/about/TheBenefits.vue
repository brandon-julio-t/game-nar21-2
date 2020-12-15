<template>
  <div>
    <h1
      class="text-center text-white font-bold text-5xl mb-5"
      style="color: #B122FE"
    >
      What will you get?
    </h1>

    <section class="my-0">
      <h2 class="font-semibold mb-3">Hard Skills</h2>
      <div class="flex justify-around items-center flex-wrap">
        <div v-for="(icon, idx) in hardSkills" :key="idx">
          <font-awesome-icon
            :icon="[icon.family, icon.name]"
            class="text-6xl mx-4 sm:mx-auto"
          ></font-awesome-icon>
        </div>
      </div>
    </section>

    <section class="mt-12">
      <h2 class="font-semibold mb-3">Soft Skills</h2>
      <div class="flex justify-center items-center flex-wrap">
        <font-awesome-icon
          v-for="(icon, idx) in softSkills"
          :key="idx"
          :icon="[icon.family, icon.name]"
          class="text-6xl mx-4 sm:mx-auto"
        ></font-awesome-icon>
      </div>
    </section>

    <section class="mt-12">
      <h2 class="font-semibold">Job Experiences</h2>
      <div></div>
    </section>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  data: () => ({
    hardSkills: [
      { family: "fa", tooltip: "SQL", name: "database" },
      { family: "fab", tooltip: "JavaScript", name: "js" },
      { family: "fab", tooltip: "Laravel", name: "laravel" },
      { family: "fab", tooltip: "Angular", name: "angular" },
      { family: "fab", tooltip: "Android", name: "android" }
    ],
    softSkills: [
      { family: "fa", tooltip: "Time Management", name: "clock" },
      { family: "fa", tooltip: "Networking", name: "users" },
      { family: "fa", tooltip: "Public Speaking", name: "bullhorn" },
      { family: "fa", tooltip: "Teamwork", name: "user-friends" }
    ]
  })
});
</script>
