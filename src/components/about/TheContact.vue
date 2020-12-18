<template>
  <the-layout
    class="rounded-xl md:rounded-none bg-gray-800 md:bg-none bg-opacity-40 md:bg-opacity-0 p-12 md:p-0"
  >
    <template v-slot:header>Contact Us</template>

    <section>
      <h2 class="text-center text-2xl md:text-3xl">For more information</h2>

      <section class="text-center text-xl md:text-2xl">
        <p>Contact us on :</p>
        <p>— Kemanggisan —</p>
        <h3 class="font-semibold text-lionel-purple">
          Christina / Hanni / Natasia
        </h3>
        <p class="text-xl md:text-2xl">021-5345830 ext 1762 - Room 724</p>
      </section>

      <section
        class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-16 max-w-screen-md mx-auto"
      >
        <a
          v-for="(social, idx) in socials"
          :key="idx"
          :href="social.link"
          rel="noopener noreferrer"
          target="_blank"
          class="flex flex-row space-x-2 justify-center items-center text-center text-base sm:text-lg md:text-2xl hover:underline"
        >
          <font-awesome-icon
            :icon="[social.icon.family, social.icon.name]"
          ></font-awesome-icon>
          <span>
            {{ social.caption }}
          </span>
        </a>
      </section>
    </section>
  </the-layout>
</template>

<script>
import { defineComponent } from "vue";
import TheLayout from "@/components/about/TheLayout.vue";

export default defineComponent({
  components: { TheLayout },
  data() {
    return {
      socials: [
        {
          icon: {
            family: "fab",
            name: "facebook"
          },
          caption: "SoftwareLabCenter",
          link: "https://www.facebook.com/SoftwareLabCenter"
        },
        {
          icon: {
            family: "fab",
            name: "instagram"
          },
          caption: "slcbinusuniv",
          link: "https://www.instagram.com/slcbinusuniv"
        },
        {
          icon: {
            family: "fab",
            name: "youtube"
          },
          caption: "Software Lab Center",
          link: "https://www.facebook.com/SoftwareLabCenter"
        },
        {
          icon: {
            family: "fa",
            name: "envelope"
          },
          caption: "recsel.slc@binus.edu",
          link: "mailto:recsel.slc@binus.edu"
        }
      ]
    };
  }
});
</script>
