<template>
  <button>
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
  padding: 17px 60px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
  box-shadow: 6px 6px 0 #fff, -6px -6px 0 #fff;
}

button span {
  position: relative;
  z-index: 1;
}

button:hover {
  box-shadow: 6px 6px 0 #076a80, -6px -6px 0 #076a80;
}

button:after {
  content: "";
  position: absolute;
  left: 0;
  top: 0;
  height: 490%;
  width: 140%;
  background: #00aacd;
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
