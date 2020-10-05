<template>
  <button
    :class="classNames"
  >
    <span>
      <slot></slot>
    </span>
  </button>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    class: {
      type: String,
      required: false
    }
  },

  setup(props) {
    return {
      classNames: props.class
    };
  }
});
</script>

<style scoped>
button {
  border: none;
  display: block;
  text-align: center;
  cursor: pointer;
  text-transform: uppercase;
  outline: none;
  overflow: hidden;
  position: relative;
  color: #fff;
  font-weight: 700;
  font-size: 15px;
  background-color: transparent;
  padding: 17px 60px;
  margin: 0 auto;
  box-shadow: 0 5px 15px rgba(0,0,0,0.20);
  box-shadow: 6px 6px 0 #fff, -6px -6px 0 #fff ;
}

button span {
  position: relative; 
  z-index: 1;
}

/* #076A80 */
/* #00AACD */

button:hover {
  box-shadow: 6px 6px 0 #076A80, -6px -6px 0 #076A80 ;
}

button:after {
  content: "";
  position: absolute;
  left: 0;
  top: 0;
  height: 490%;
  width: 140%;
  background: #00AACD;
  -webkit-transition: all .5s ease-in-out;
  transition: all .2s ease-in-out;
  -webkit-transform: translateX(-98%) translateY(-25%) rotate(45deg);
  transform: translateX(-98%) translateY(-25%) rotate(45deg);
}

button:hover:after {
  -webkit-transform: translateX(-9%) translateY(-25%) rotate(45deg);
  transform: translateX(-9%) translateY(-25%) rotate(45deg);
}
</style>