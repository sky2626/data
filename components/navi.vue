<template>
  <nav class="fixed z-100 top-0 left-0 w-full bg-white/10 backdrop-blur-lg shadow-lg p-4">
    <div class="container mx-auto flex justify-between items-center">
      <NuxtLink to="/" class="text-xl text-gray-700 font-bold">Brand</NuxtLink>
      <button @click="toggleMenu" class="md:hidden text-white focus:outline-none">
        <IconsMenu class="text-violet-500" />
      </button>
      <ul class="hidden md:flex space-x-6">
        <li>
          <NuxtLink to="/" class="block text-gray-700 p-2 hover:text-gray-300 font-bold">Home</NuxtLink>
        </li>
        <li>
          <NuxtLink to="/" class="block text-gray-700 p-2 hover:text-gray-300 font-bold">Shop</NuxtLink>
        </li>
        <li>
          <NuxtLink to="/#" class="block text-gray-700 p-2 hover:text-gray-300 font-bold">Streaming</NuxtLink>
        </li>
        <li>
          <NuxtLink to="/#" class="block text-gray-700 p-2 hover:text-gray-300 font-bold">Contact</NuxtLink>
        </li>
      </ul>
      <div class="flex items-center space-x-4">
        <h2 class="block p-2 hover:text-gray-300 font-bold">GH₵0.00</h2>
        <IconsCart class="text-black font-bold text-2xl" />
      </div>
    </div>
    <ul v-if="isMenuOpen" class="flex flex-col space-y-4 mt-4 md:hidden text-center">
      <li>
        <NuxtLink to="/" class="block text-gray-700 p-2 hover:text-gray-300 font-bold">Home</NuxtLink>
      </li>
      <li>
        <NuxtLink to="/" class="block text-gray-700 p-2 hover:text-gray-300 font-bold">Shop</NuxtLink>
      </li>
      <li>
        <NuxtLink to="/#" class="block text-gray-700 p-2 hover:text-gray-300 font-bold">Streaming</NuxtLink>
      </li>
      <li>
        <NuxtLink to="/#" class="block text-gray-700 p-2 hover:text-gray-300 font-bold">Contact</NuxtLink>
      </li>
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
