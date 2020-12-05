<template>
  <div>
    <h1 class="text-center text-white font-bold tracking-widest">
      Registration
    </h1>

    <section class="text-center">
      <h2>Open Registration</h2>
      <h3><span class="text-lionel-light font-bold">27 Januari</span> 2021</h3>
      <p>Until</p>
      <h3><span class="text-lionel-light font-bold">12 February</span> 2021</h3>

      <a
        href="https://bluejack.binus.ac.id/lab"
        target="_blank"
        rel="noopener noreferrer"
      >
        <app-button-about
          class="bg-primary rounded-md tracking-widest mt-4 uppercase"
        >
          Register Here
        </app-button-about>
      </a>
    </section>
  </div>
</template>

<script lang="ts">
import AppButtonAbout from "../AppButtonAbout.vue";
import { defineComponent } from "vue";

export default defineComponent({
  components: { AppButtonAbout }
});
</script>