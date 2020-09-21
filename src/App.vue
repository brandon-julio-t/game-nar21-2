<template>
  <div class="container mx-auto flex justify-center items-center w-screen h-screen">
    <div>
      <nav class="text-center">
        <router-link class="text-black no-underline hover:underline" to="/">Home</router-link> |
        <router-link class="text-black no-underline hover:underline" to="/about">About</router-link>
      </nav>

      <main>
        <router-view />
      </main>
    </div>
  </div>
</template>

<style></style>
