<template>
  <nav class="text-center">
    <router-link
      class="text-black no-underline hover:underline"
      exact-active-class="font-medium"
      to="/"
      >Home</router-link
    >
    |
    <router-link
      class="text-black no-underline hover:underline"
      exact-active-class="font-medium"
      to="/about"
      >About</router-link
    >
    |
    <router-link
      class="text-black no-underline hover:underline"
      exact-active-class="font-medium"
      to="/game"
      >Game</router-link
    >
  </nav>
</template>
