<template>
  <ul class="flex flex-col list-none">
    <li v-for="tab in tabs" :key="tab.id">
      <button class="p-2 w-full mb-4 text-lg" @click="onButtonClick(tab.name)">
        {{ tab.alias }}
      </button>
    </li>
  </ul>
</template>

<script>
export default {
  name: "Tabs",
  data() {
    return {
      tabs: [
        {
          id: 1,
          name: "Benefits",
          alias: "Benefits",
        },
        {
          id: 2,
          name: "Requirements",
          alias: "Req.",
        },
        {
          id: 3,
          name: "Test",
          alias: "Test",
        },
        {
          id: 4,
          name: "Registration",
          alias: "Regist.",
        },
        {
          id: 5,
          name: "Contact",
          alias: "Contact",
        },
      ],
    };
  },
  methods: {
    onButtonClick(tabName) {
      console.log("oke");
      this.$emit("changetab", tabName);
    },
  },
};
</script>

<style>
button {
  background-color: #995656;
}
</style>