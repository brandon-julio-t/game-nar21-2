<template>
  <div>
    <h1
      class="text-center text-white font-bold text-5xl"
      style="color: #B122FE;"
    >
      Contact Us
    </h1>

    <section>
      <h2 class="text-center">For more information</h2>

      <section class="text-center">
        <p>Contact us on :</p>
        <p>— Kemanggisan —</p>
        <h3 class="font-semibold" style="color: #B122FE;">
          Christina / Hanni / Natasia
        </h3>
        <p class="text-2xl">021-5345830 ext 1762 - Room 724</p>
      </section>

      <section
        class="flex flex-wrap justify-center items-center mt-16 md:space-x-16"
      >
        <a
          v-for="(social, idx) in socials"
          :key="idx"
          :href="social.link"
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
  </div>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
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
