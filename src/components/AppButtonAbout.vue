<template>
  <button class="px-8 py-4">
    <span>
      <slot></slot>
    </span>
  </button>
</template>

<style scoped>
button {
  border: none;
  text-transform: uppercase;
  outline: none;
  overflow: hidden;
  position: relative;
  color: #fff;
  background-color: transparent;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
  box-shadow: 4px 4px 0 #fff, -4px -4px 0 #fff;
}

button span {
  position: relative;
  z-index: 1;
}

button:hover {
  box-shadow: 4px 4px 0 #fff, -4px -4px 0 #fff;
}

button:after {
  content: "";
  position: absolute;
  left: 0;
  top: 0;
  height: 490%;
  width: 140%;
  background: #2981E2;
  -webkit-transition: all 0.5s ease-in-out;
  transition: all 0.2s ease-in-out;
  -webkit-transform: translateX(-98%) translateY(-25%) rotate(45deg);
  transform: translateX(-98%) translateY(-25%) rotate(45deg);
}

button:hover:after {
  -webkit-transform: translateX(-9%) translateY(-25%) rotate(45deg);
  transform: translateX(-9%) translateY(-25%) rotate(45deg);
}
</style>
