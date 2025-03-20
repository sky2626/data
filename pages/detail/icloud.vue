<template>
  <div>
    <div class="relative">
      <div
        class="h-[400px] mt-34 max-w-7xl mx-2  md:mx-auto rounded-[65px] absolute top-[-200px] inset-0 bg-[url('/mtn.png')] bg-cover">
        <div class="flex justify-between items-center p-8">
          <IconsMtn class="text-yellow-800 text-2xl" />
          <h2 class="text-2xl text-black font-semibold">MTN Data</h2>
          <NuxtLink to="/" class="text-black font-semibold px-6 hover:text-gray-800 ">
            New Product
          </NuxtLink>
        </div>

      </div>

      <div class="max-w-5xl mx-2 md:mx-auto mt-34 p-6 shadow-lg rounded-[60px] bg-gray-300/10 backdrop-blur-lg ">
        <div class="w-full flex flex-col md:flex-row justify-center gap-4 py-8">

          <div class="w-full">
            <h1 class="text-2xl font-bold text-gray-800">MTN DATA</h1>
            <p class="text-gray-600 mt-2">MTN non-expiry data available</p>
          </div>

          <div class="border-y-3 border-yellow-500 rounded-full w-full h-full p-4">
            <img
              src="https://www.google.com/url?sa=i&url=https%3A%2F%2Fencrypted-tbn0.gstatic.com%2Fimages%3Fq%3Dtbn%3AANd9GcTetditgkwKb-7fCP26_WQesZAoldpOcC44AfFAkco5jMOEMcaS&psig=AOvVaw3CgmYE-MD34aCjVxiBpac9&ust=1741439274786000&source=images&cd=vfe&opi=89978449&ved=0CBAQjRxqFwoTCIDUz_yE-IsDFQAAAAAdAAAAABAE"
              alt="T-Shirt" class="w-full object-cover rounded-full border border-gray-300/10" />
          </div>

          <div class="w-full">
            <h2 class="text-lg font-semibold mb-4 text-black">Available Bundle</h2>
            <div class="gap-2 grid grid-cols-3 md:grid-cols-4">
              <div v-for="(price, size) in sizes" :key="size" class="flex flex-col">
                <NuxtLink  @click="togglePrice(size, price)"
                  class="bg-gray-300/10 backdrop-blur-lg shadow-sm text-black font-semibold px-2 py-2 rounded-xl hover:bg-yellow-500">
                  {{ size }} GB
                </NuxtLink >
              </div>
            </div>
            <div>
              <h2 class="mt-4 text-lg font-semibold">Selected Price:</h2>
              <p class="text-gray-800 mt-1">{{ selectedPrice ? `GH₵${selectedPrice}` : 'Select a size to see the price'
                }}
              </p>
            </div>
            <div class="mt-4">
              <label for="phone" aria-required="true">Recipient Number</label>
              <input type="tel"
                class=" border border-black rounded-xl p-2 w-full focus:ring-yellow-500 focus:border-yellow-500"
                id="phone" name="phone" placeholder="Recipient Number" required>
            </div>
            <div class="mt-6">
              <a :href="whatsappLink" class="bg-black text-yellow-500 px-6 py-2 rounded-xl text-lg hover:bg-gray-800">
                Buy Now
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="mx-2 md:mx-auto mt-8 max-w-7xl">
      <h2 class="text-2xl font-semibold text-gray-800 mb-4">Related Products</h2>
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        <div v-for="product in products" :key="product.name"
          class="bg-white shadow-lg p-4 rounded-2xl transform hover:scale-105 transition-all duration-300 ease-in-out">

          <div class="relative">
            <img :src="product.image" alt="product.name"
              class="w-full h-48 object-cover rounded-xl border border-gray-200">

            <!-- Sale Badge (Optional) -->
            <span v-if="product.sale"
              class="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full">
              Sale
            </span>
          </div>

          <div class="text-start mt-3">
            <h3 class="text-lg font-semibold text-gray-900">{{ product.name }}</h3>
            <p class="text-gray-500 text-sm">{{ product.category }}</p>
            <p class="text-xl font-bold text-yellow-600 mt-2">GH₵{{ product.price }}</p>

            <!-- CTA NuxtLink s -->
            <div class="mt-4">
              
              <NuxtLink to="#"
                class="border border-yellow-500 text-yellow-500 px-4 py-2 rounded-lg text-sm hover:bg-yellow-500 hover:text-white transition">
                View Details
              </NuxtLink >
            </div>
          </div>

        </div>
      </div>

    </div>
  </div>


</template>

<script setup>
import { ref } from 'vue';


const products = ref({
  1: {
    name: "MTN Data",
    image: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fencrypted-tbn0.gstatic.com%2Fimages%3Fq%3Dtbn%3AANd9GcTetditgkwKb-7fCP26_WQesZAoldpOcC44AfFAkco5jMOEMcaS&psig=AOvVaw3CgmYE-MD34aCjVxiBpac9&ust=1741439274786000&source=images&cd=vfe&opi=89978449&ved=0CBAQjRxqFwoTCIDUz_yE-IsDFQAAAAAdAAAAABAE",
    price: "10 - 400",
  },
  2: {
    name: "Vodafone Data",
    image: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fencrypted-tbn0.gstatic.com%2Fimages%3Fq%3Dtbn%3AANd9GcTetditgkwKb-7fCP26_WQesZAoldpOcC44AfFAkco5jMOEMcaS&psig=AOvVaw3CgmYE-MD34aCjVxiBpac9&ust=1741439274786000&source=images&cd=vfe&opi=89978449&ved=0CBAQjRxqFwoTCIDUz_yE-IsDFQAAAAAdAAAAABAE",
    price: "10 - 400",
  },
  3: {
    name: "Airtel Data",
    image: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fencrypted-tbn0.gstatic.com%2Fimages%3Fq%3Dtbn%3AANd9GcTetditgkwKb-7fCP26_WQesZAoldpOcC44AfFAkco5jMOEMcaS&psig=AOvVaw3CgmYE-MD34aCjVxiBpac9&ust=1741439274786000&source=images&cd=vfe&opi=89978449",
    price: "10 - 400",
  },
  4: {
    name: "Airtel Data",
    image: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fencrypted-tbn0.gstatic.com%2Fimages%3Fq%3Dtbn%3AANd9GcTetditgkwKb-7fCP26_WQesZAoldpOcC44AfFAkco5jMOEMcaS&psig=AOvVaw3CgmYE-MD34aCjVxiBpac9&ust=1741439274786000&source=images&cd=vfe&opi=89978449",
    price: "10 - 400",
  },
})


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

const selectedPrice = ref(null);

const togglePrice = (size, price) => {
  selectedPrice.value = selectedPrice.value === price ? null : price;
};

const whatsappLink = "https://wa.me/+233537391808";
</script>
