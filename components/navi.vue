<template>
  <nav class="fixed top-0 left-0 w-full bg-white/10 backdrop-blur-lg shadow-lg p-4">
    <div class="container mx-auto flex justify-between items-center">
      <NuxtLink to="/" class="text-xl font-bold">Brand</NuxtLink>
      <button @click="toggleMenu" class="md:hidden text-white focus:outline-none">
        <IconsMenu class="text-violet-500" />
      </button>
      <ul class="hidden md:flex space-x-6">
        <li>
          <NuxtLink to="/" class="hover:text-gray-300">Home</NuxtLink>
        </li>
        <li>
          <NuxtLink to="/about" class="hover:text-gray-300">About</NuxtLink>
        </li>
        <li>
          <NuxtLink to="/services" class="hover:text-gray-300">Services</NuxtLink>
        </li>
        <li>
          <NuxtLink to="/contact" class="hover:text-gray-300">Contact</NuxtLink>
        </li>
      </ul>
    </div>
    <ul v-if="isMenuOpen" class="flex flex-col space-y-4 mt-4 md:hidden text-center">
      <li>
        <NuxtLink to="/" class="block p-2 hover:text-gray-300">Home</NuxtLink>
      </li>
      <li>
        <NuxtLink to="/about" class="block p-2 hover:text-gray-300">About</NuxtLink>
      </li>
      <li>
        <NuxtLink to="/services" class="block p-2 hover:text-gray-300">Services</NuxtLink>
      </li>
      <li>
        <NuxtLink to="/contact" class="block p-2 hover:text-gray-300">Contact</NuxtLink>
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
