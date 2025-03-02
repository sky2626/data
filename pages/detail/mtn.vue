<template>
    <UContainer class="pt-40-4">
      <div class="max-w-md mx-auto bg-white shadow-lg rounded-2xl overflow-hidden">
        <!-- Product Image -->
        <div class="h-64 bg-cover bg-center" :style="{ backgroundImage: `url(${product.image})` }">
        </div>
      
        <!-- Product Info -->
        <div class="p-5">
          <h2 class="text-xl font-bold text-gray-900">{{ product.name }}</h2>
          <p class="text-gray-600 mt-2">{{ product.description }}</p>
          <p class="text-lg font-semibold text-green-600 mt-3">{{ product.price }}</p>
      
          <!-- Add to Cart Button -->
          <button class="mt-4 w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition">
            Add to Cart
          </button>
        </div>
      </div>
    </UContainer>
</template>



<script setup>
import { ref } from 'vue';

const product = ref({
  name: "Wireless Headphones",
  price: "$99.99",
  description: "High-quality wireless headphones with noise cancellation and long battery life.",
  image: "https://example.com/headphones.jpg"
});
</script>

