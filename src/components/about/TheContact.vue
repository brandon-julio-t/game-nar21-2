<template>
  <the-layout>
    <template v-slot:header>Contact Us</template>

    <section>
      <h2 class="text-center text-3xl">For more information</h2>

      <section class="text-center">
        <p>Contact us on :</p>
        <p>— Kemanggisan —</p>
        <h3 class="font-semibold lionel-purple">
          Christina / Hanni / Natasia
        </h3>
        <p class="text-2xl">021-5345830 ext 1762 - Room 724</p>
      </section>

      <section
        class="flex flex-wrap justify-around items-center mt-16 max-w-4xl mx-auto"
      >
        <a
          v-for="(social, idx) in socials"
          :key="idx"
          :href="social.link"
          rel="noopener noreferrer"
          target="_blank"
          class="flex flex-row space-x-2 justify-center items-center text-center text-base sm:text-lg md:text-xl hover:underline"
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
          alt: "Facebook",
          caption: "SoftwareLabCenter",
          link: "https://www.facebook.com/SoftwareLabCenter"
        },
        {
          icon: {
            family: "fab",
            name: "instagram"
          },
          alt: "Instagram",
          caption: "slcbinusuniv",
          link: "https://www.instagram.com/slcbinusuniv"
        },
        {
          icon: {
            family: "fab",
            name: "youtube"
          },
          alt: "YouTube",
          caption: "Software Lab Center",
          link: "https://www.facebook.com/SoftwareLabCenter"
        }
      ]
    };
  }
});
</script>
