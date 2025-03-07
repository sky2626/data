<template>
  <div class="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-2xl">
    <h1 class="text-2xl font-bold text-gray-800">Stylish Unisex T-Shirt</h1>
    <p class="text-gray-600 mt-2">Comfortable and trendy t-shirt for both men and women.</p>
    <img src="#" alt="T-Shirt" class="w-full h-64 object-cover mt-4 rounded-xl" />

    <div class="mt-4">
      <h2 class="text-lg font-semibold">Available Sizes</h2>
      <div class="gap-4 grid grid-cols-3 md:grid-cols-4">
        <div v-for="(price, size) in sizes" :key="size" class="flex flex-col w-[100px]">
          <button @click="togglePrice(size)" class="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">
            {{ size }} GB
          </button>
          <span v-if="showPrice === size" class="text-gray-800 mt-1">GH₵{{ price }}</span>
        </div>
      </div>
      <h2>show data price here</h2>
      <span v-if="showPrice === size" class="text-gray-800 mt-1">GH₵{{ price }}</span>

    </div>

    <div class="mt-6">
      <a :href="whatsappLink" class="bg-green-500 text-white px-6 py-2 rounded-lg text-lg hover:bg-green-600">
        Order Now
      </a>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const sizes = ref({
  1: 6,
  2: 11,
  3: 16,
  4: 21,
  5: 26,
  6: 31,
  7: 36,
  8: 41,
  9: 46,
  10: 51,
  11: 56,
  12: 61,
  13: 66,
  14: 71,
  15: 76,
  16: 81,
});

const showPrice = ref(null);

const togglePrice = (size) => {
  showPrice.value = showPrice.value === size ? null : size;
};

const whatsappLink = "https://wa.me/+233537391808";
</script>
