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
        <p class="text-xl md:text-2xl">
          <a class="hover:underline" href="tel:+62215345830">021-5345830</a>
          ext 1762 - Room 724
        </p>
        <a
          class="text-xl md:text-2xl hover:underline"
          href="mailto:recsel.slc@binus.edu"
        >
          <font-awesome-icon :icon="['fa', 'envelope']"></font-awesome-icon>
          recsel.slc@binus.edu
        </a>
      </section>

      <section
        class="flex flex-wrap justify-around mx-auto items-center mt-16 max-w-4xl"
      >
        <a
          v-for="(social, idx) in socials"
          :key="idx"
          :href="social.link"
          class="flex flex-row space-x-2 justify-center items-center text-center text-base sm:text-lg md:text-2xl hover:underline"
          rel="noopener noreferrer"
          target="_blank"
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
        }
      ]
    };
  }
});
</script>
