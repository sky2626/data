<template>
  <nav class="fixed z-100 top-0 left-0 w-full bg-white/10 backdrop-blur-lg shadow-lg p-4">
    <div class="container mx-auto flex justify-between items-center">
      <NuxtLink to="/" class="flex items-center space-x-1">
        <img src="/bisadata.png" alt="bisadatagh" class="w-12 h-12" />
        <h1 class="text-yellow-600 text-2xl font-bold">Bisadatagh</h1>
      </NuxtLink>

      <button @click="toggleMenu" class="md:hidden text-white focus:outline-none">
        <IconsMenu class="text-yellow-600 text-2xl" />
      </button>
      <ul class="hidden md:flex space-x-6">
        <li>
          <NuxtLink to="/" class="block text-yellow-600 p-2 hover:text-yellow-800 font-bold">Home</NuxtLink>
        </li>
        <li>
          <NuxtLink to="/" class="block text-yellow-600 p-2 hover:text-yellow-800 font-bold">Shop</NuxtLink>
        </li>
        <li>
          <NuxtLink to="/#" class="block text-yellow-600 p-2 hover:text-yellow-800 font-bold">Streaming</NuxtLink>
        </li>
        <li>
          <NuxtLink to="/#" class="block text-yellow-600 p-2 hover:text-yellow-800 font-bold">Contact</NuxtLink>
        </li>
      </ul>
      <div class="hidden md:flex items-center space-x-4">
        <h2 class="block p-2 text-yellow-600 hover:text-yellow-800 font-bold">GH₵0.00</h2>
        <IconsCart class="text-black font-bold text-2xl" />
      </div>
    </div>
    <ul v-if="isMenuOpen" class="flex flex-col space-y-4 mt-4 md:hidden text-center">
      <li>
        <NuxtLink to="/" class="block text-yellow-600 p-2 hover:text-yellow-800 font-bold">Home</NuxtLink>
      </li>
      <li>
        <NuxtLink to="/" class="block text-yellow-600 p-2 hover:text-yellow-800 font-bold">Shop</NuxtLink>
      </li>
      <li>
        <NuxtLink to="/#" class="block text-yellow-600 p-2 hover:text-yellow-800 font-bold">Streaming</NuxtLink>
      </li>
      <li>
        <NuxtLink to="/#" class="block text-yellow-600 p-2 hover:text-yellow-800 font-bold">Contact</NuxtLink>
      </li>
      <div class="flex items-center justify-center space-x-4">
        <h2 class="block p-2 text-yellow-600 hover:text-yellow-800 font-bold">GH₵0.00</h2>
        <IconsCart class="text-black font-bold text-2xl" />
      </div>
    </ul>
  </nav>
</template>

<script setup>
import { ref } from 'vue';

const isMenuOpen = ref(false);
const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value;
};
</script>

<style>
/* Add any additional styles here */
</style>
