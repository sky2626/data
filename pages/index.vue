<script setup>
import { ref } from 'vue';

const products = ref([
  {
    id: 1,
    link: "/detail/mtn",
    image: "https://assets.nflxext.com/ffe/siteui/vlv3/04ef06cc-5f81-4a8e-8db0-6430ba4af286/web/NG-en-20250224-TRIFECTA-perspective_5680cc3f-a4c0-41bc-a57f-3ef3482ea3ef_large.jpg"
  },
  {
    id: 2,
    link: "/detail/vodafone",
    image: "https://assets.nflxext.com/ffe/siteui/vlv3/04ef06cc-5f81-4a8e-8db0-6430ba4af286/web/NG-en-20250224-TRIFECTA-perspective_5680cc3f-a4c0-41bc-a57f-3ef3482ea3ef_large.jpg"
  },
  {
    id: 3,
    link: "/detail/tigo",
    image: "https://assets.nflxext.com/ffe/siteui/vlv3/04ef06cc-5f81-4a8e-8db0-6430ba4af286/web/NG-en-20250224-TRIFECTA-perspective_5680cc3f-a4c0-41bc-a57f-3ef3482ea3ef_large.jpg"
  },
  {
    id: 4,
    link: "/detail/airteltigo",
    image: "https://example.com/airteltigo.jpg"
  }
]);
</script>

<template>
  <div class="pt-40">
    <UContainer>
      <Placeholder class="h-32" />
    </UContainer>
    <UContainer>
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6">
        <a v-for="product in products" :key="product.id" :href="product.link"
          class="w-full h-96 bg-white shadow-lg rounded-2xl flex items-center justify-center transition-transform hover:scale-105 bg-cover bg-center"
          :style="{ backgroundImage: `url(${product.image})` }">
          <h5 class="text-2xl font-bold text-red-500 bg-white bg-opacity-50 px-4 py-2 rounded-lg">Buy Now</h5>
        </a>
      </div>
    </UContainer>
  </div>
</template>
