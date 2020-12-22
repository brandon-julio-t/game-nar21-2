<template>
  <the-layout
    class="max-w-4xl mx-auto rounded-xl md:rounded-none bg-gray-800 md:bg-none bg-opacity-40 md:bg-opacity-0 py-12 px-8 md:p-0"
  >
    <template v-slot:header>What will you get?</template>

    <section>
      <h2 class="font-semibold mb-8 text-3xl text-center md:text-left">
        Hard Skills
      </h2>
      <app-skills :skills="hardSkills"></app-skills>
    </section>

    <section>
      <h2 class="font-semibold mb-8 text-3xl text-center md:text-left">
        Soft Skills
      </h2>
      <app-skills :skills="softSkills"></app-skills>
    </section>

    <section>
      <h2 class="font-semibold text-3xl text-center md:text-left">Job Experiences</h2>
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
  data() {
    return {
      hardSkills: [
        { family: "fa", name: "database", tooltip: "SQL" },
        { family: "fab", name: "js", tooltip: "JavaScript" },
        { family: "fab", name: "laravel", tooltip: "Laravel" },
        { family: "fab", name: "angular", tooltip: "Angular" },
        { family: "fab", name: "android", tooltip: "Android" },
        { family: "fa", name: "ellipsis-h", tooltip: "Many More" }
      ],
      softSkills: [
        { family: "fa", name: "clock", tooltip: "Time Management" },
        { family: "fa", name: "users", tooltip: "Networking" },
        { family: "fa", name: "bullhorn", tooltip: "Public Speaking" },
        { family: "fa", name: "user-friends", tooltip: "Teamwork" },
        { family: "fa", name: "ellipsis-h", tooltip: "Many More" }
      ]
    };
  }
});
</script>
