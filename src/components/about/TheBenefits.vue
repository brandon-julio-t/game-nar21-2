<template>
  <the-layout class="max-w-4xl mx-auto rounded-xl md:rounded-none bg-gray-800 md:bg-none bg-opacity-40 md:bg-opacity-0 py-12 px-8 md:p-0">
    <template v-slot:header>What will you get?</template>

    <section>
      <h2 class="font-semibold mb-8 text-3xl text-center md:text-left">Hard Skills</h2>
      <app-skills :skills="hardSkills"></app-skills>
    </section>

    <section>
      <h2 class="font-semibold mb-8 text-3xl text-center md:text-left">Soft Skills</h2>
      <app-skills :skills="softSkills"></app-skills>
    </section>

    <section>
      <h2 class="font-semibold text-3xl">Job Experiences</h2>
      <div></div>
    </section>
  </the-layout>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import AppSkills from "@/components/about/AppSkills.vue";
import TheLayout from "@/components/about/TheLayout.vue";

export default defineComponent({
  components: { AppSkills, TheLayout },
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
