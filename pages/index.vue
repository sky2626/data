<script setup>
import { ref } from 'vue';
const newproducts = ref([
  {
    id: 1,
    name: "MTN Data",
    image: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fencrypted-tbn0.gstatic.com%2Fimages%3Fq%3Dtbn%3AANd9GcTetditgkwKb-7fCP26_WQesZAoldpOcC44AfFAkco5jMOEMcaS&psig=AOvVaw3CgmYE-MD34aCjVxiBpac9&ust=1741439274786000&source=images&cd=vfe&opi=89978449&ved=0CBAQjRxqFwoTCIDUz_yE-IsDFQAAAAAdAAAAABAE",
    price: "10 - 400",
  },
  {
    id: 2,
    name: "Vodafone Data",
    image: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fencrypted-tbn0.gstatic.com%2Fimages%3Fq%3Dtbn%3AANd9GcTetditgkwKb-7fCP26_WQesZAoldpOcC44AfFAkco5jMOEMcaS&psig=AOvVaw3CgmYE-MD34aCjVxiBpac9&ust=1741439274786000&source=images&cd=vfe&opi=89978449&ved=0CBAQjRxqFwoTCIDUz_yE-IsDFQAAAAAdAAAAABAE",
    price: "10 - 400",
  },
  {
    id: 3,
    name: "Airtel Data",
    image: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fencrypted-tbn0.gstatic.com%2Fimages%3Fq%3Dtbn%3AANd9GcTetditgkwKb-7fCP26_WQesZAoldpOcC44AfFAkco5jMOEMcaS&psig=AOvVaw3CgmYE-MD34aCjVxiBpac9&ust=1741439274786000&source=images&cd=vfe&opi=89978449",
    price: "10 - 400",
  },
  {
    id: 4,
    name: "Airtel Data",
    image: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fencrypted-tbn0.gstatic.com%2Fimages%3Fq%3Dtbn%3AANd9GcTetditgkwKb-7fCP26_WQesZAoldpOcC44AfFAkco5jMOEMcaS&psig=AOvVaw3CgmYE-MD34aCjVxiBpac9&ust=1741439274786000&source=images&cd=vfe&opi=89978449",
    price: "10 - 400",
  },
])

const products = ref([
  {
    id: 1,
    name: "MTN",
    link: "/detail/mtn",
    image: "https://assets.nflxext.com/ffe/siteui/vlv3/04ef06cc-5f81-4a8e-8db0-6430ba4af286/web/NG-en-20250224-TRIFECTA-perspective_5680cc3f-a4c0-41bc-a57f-3ef3482ea3ef_large.jpg",
    price: "GH₵10 - GH₵400"
  },
  {
    id: 2,
    name: "Telecel",
    link: "/detail/telecel",
    image: "https://assets.nflxext.com/ffe/siteui/vlv3/04ef06cc-5f81-4a8e-8db0-6430ba4af286/web/NG-en-20250224-TRIFECTA-perspective_5680cc3f-a4c0-41bc-a57f-3ef3482ea3ef_large.jpg",
    price: "GH₵10 - GH₵400",
  },
  {
    id: 3,
    name: "AirtelTigo ishare",
    link: "/detail/at",
    image: "https://assets.nflxext.com/ffe/siteui/vlv3/04ef06cc-5f81-4a8e-8db0-6430ba4af286/web/NG-en-20250224-TRIFECTA-perspective_5680cc3f-a4c0-41bc-a57f-3ef3482ea3ef_large.jpg",
    price: "GH₵10 - GH₵400",
  },
  {
    id: 4,
    name: "airteltigo Big data",
    link: "/detail/airteltigo",
    image: "https://example.com/airteltigo.jpg",
    price: "GH₵10 - GH₵400",
  }
]);
</script>

<template>
  <div class="pt-40">
    <UContainer>
      <h2 class="text-2xl font-semibold text-gray-800 mb-4">New Products</h2>
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-14">
        <div v-for="newproduct in newproducts" :key="newproduct.name"
          class="bg-white shadow-lg p-4 rounded-2xl transform hover:scale-105 transition-all duration-300 ease-in-out">

          <div class="">
            <img :src="newproduct.image" alt="product.name"
              class="w-full h-48 object-cover rounded-xl border border-gray-200">
          </div>

          <div class="text-start mt-3">
            <h3 class="text-lg font-semibold text-gray-900">{{ newproduct.name }}</h3>
            <p class="text-gray-500 text-sm">{{ newproduct.category }}</p>
            <p class="text-xl font-bold text-yellow-600 mt-2">GH₵{{ newproduct.price }}</p>

            <!-- CTA NuxtLink s -->
            <div class="mt-4">
              <NuxtLink to="#"
                class="border border-yellow-500 text-yellow-500 px-4 py-2 rounded-lg text-sm hover:bg-yellow-500 hover:text-white transition">
                View Details
              </NuxtLink>
            </div>
          </div>
        </div>
      </div>
    </UContainer>
    <UContainer>
      <h2 class="text-2xl font-bold text-black">Popular Product</h2>
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 py-6">
        <a v-for="product in products" :key="product.id" :href="product.link"
          class="w-full p-4 bg-white shadow-lg rounded-2xl flex justify-center transition-transform hover:scale-105 bg-cover bg-center">
          <div>
            <!-- Comment
            <div class="flex justify-between items-center mb-2">
              <IconsCmenu class="text-2xl" />
              <IconsCart class="text-2xl" />
            </div>
            -->
            <img :src="product.image" alt="product.name"
              class="w-full h-48 object-cover rounded-xl border border-gray-200">
            <h1 class="text-lg font-semibold text-gray-900 mt-4 ">{{ product.name }}</h1>
            <h1 class="text-xl font-bold text-yellow-600 mt-2 ">{{ product.price }}</h1>
            <div class="mt-4">
              <NuxtLink :to="product.link"
                class="border border-yellow-500 text-yellow-500 px-4 py-2 rounded-lg text-sm hover:bg-yellow-500 hover:text-white transition">
                View Details
              </NuxtLink>
            </div>
          </div>
        </a>
      </div>
    </UContainer>
  </div>
</template>
