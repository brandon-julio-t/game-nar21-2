<template>
  <div>
    <h1
      class="text-center text-white font-bold text-5xl mb-5"
      style="color: #B122FE"
    >
      What will you get?
    </h1>

    <section>
      <h2 class="font-semibold mb-8 text-3xl">Hard Skills</h2>
      <app-skills :skills="hardSkills"></app-skills>
    </section>

    <section class="mt-12">
      <h2 class="font-semibold mb-8 text-3xl">Soft Skills</h2>
      <app-skills :skills="softSkills"></app-skills>
    </section>

    <section class="mt-12">
      <h2 class="font-semibold text-3xl">Job Experiences</h2>
      <div></div>
    </section>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import AppSkills from "@/components/about/AppSkills.vue";

export default defineComponent({
  components: { AppSkills },
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
