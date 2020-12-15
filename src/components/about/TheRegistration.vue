<template>
  <div>
    <h1 class="text-center text-white font-bold text-5xl" style="color: #B122FE">
      BE ONE OF US!
    </h1>

    <section class="text-center">
      <h2>Open Registration</h2>
      <h3><span class="font-semibold" style="color: #B122FE;">27 Januari</span> 2021</h3>
      <p>Until</p>
      <h3><span class="font-semibold" style="color: #B122FE">12 February</span> 2021</h3>

      <a
        href="https://bluejack.binus.ac.id/lab"
        target="_blank"
        rel="noopener noreferrer"
      >
        <button
          class="py-4 px-8 rounded-full bg-primary tracking-widest mt-24 uppercase"
        >
          Register Here
        </button>
      </a>
    </section>
  </div>
</template>

<style scoped>
button{
  background-color: #1B1464;
  color: #fff
}

button:hover {
  background-color: #231a84;
}
</style>

<script lang="ts">
import AppButtonAbout from "../AppButtonAbout.vue";
import { defineComponent } from "vue";

export default defineComponent({
  components: { AppButtonAbout }
});
</script>
