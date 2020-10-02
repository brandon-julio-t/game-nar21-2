<template>
  <div>
    <h1 class="text-4xl text-center">Benefits</h1>

    <h2 class="text-2xl mb-2">Hard Skill</h2>
    <div class="grid grid-cols-5">
      <div v-for="(hardSkill, idx) in hardSkills" :key="idx">
        <img :src="hardSkill.img" :alt="hardSkill.name" class="mx-auto w-1/2" />
        <!-- <h3 class="mt-2 text-center">{{ hardSkill.name }}</h3> -->
      </div>
    </div>

    <h2 class="text-2xl mt-6 mb-2">Soft Skill</h2>
    <div>
      <div class="grid grid-cols-5">
        <div v-for="(softSkill, idx) in softSkills" :key="idx">
          <img
            :src="softSkill.img"
            :alt="softSkill.name"
            class="mx-auto w-1/2"
          />
          <!-- <h3 class="mt-2 text-center">{{ softSkill.name }}</h3> -->
        </div>
      </div>

      <h2 class="text-2xl mt-6">Job Experiences</h2>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  data() {
    return {
      hardSkills: [
        { name: "Angular", img: "/images/benefits/vue.webp" },
        { name: "Java", img: "/images/benefits/vue.webp" },
        { name: "Javascript", img: "/images/benefits/vue.webp" },
        { name: "Python", img: "/images/benefits/vue.webp" },
        { name: "Android", img: "/images/benefits/vue.webp" }
      ],

      softSkills: [
        {
          name: "Public Speaking",
          img: require("/images/benefits/vue.webp")
        },
        {
          name: "Social Networking",
          img: require("/images/benefits/vue.webp")
        },
        { name: "Teamwork", img: require("/images/benefits/vue.webp") },
        {
          name: "Time Management",
          img: require("/images/benefits/vue.webp")
        }
      ]
    };
  }
});
</script>
