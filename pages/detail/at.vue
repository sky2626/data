<template>
  <div class="pt-18">
    <div class="relative">
      <div
        class="h-[400px] mt-34 max-w-7xl mx-2 md:mx-auto rounded-[65px] absolute top-[-200px] inset-0 bg-[url('/at.png')] bg-cover">
        <div class="flex justify-between items-center p-8">
          <IconsMtn class="text-yellow-800 text-2xl" />
          <h2 class="text-2xl text-black font-semibold">AirtelTigo Data</h2>
          <NuxtLink to="/" class="text-black font-semibold px-6 hover:text-gray-800">
            New Product
          </NuxtLink>
        </div>
      </div>

      <div class="max-w-5xl mx-2 md:mx-auto mt-34 p-6 shadow-lg rounded-[60px] bg-gray-300/10 backdrop-blur-lg ">
        <div class="w-full flex flex-col md:flex-row justify-center gap-4 py-8">
          <div class="w-full">
            <h1 class="text-2xl font-bold text-gray-800">AirtelTigo ishare DATA</h1>
            <p class="text-gray-600 mt-2">AirtelTigo ishare non-expiry data available</p>
          </div>

          <div class="border-y-3 border-[#E40001] rounded-full w-full h-full p-4">
            <img src="/atlogo.png" alt="mtn" class="w-full object-cover rounded-full border border-gray-300/10" />
          </div>

          <div class="w-full">
            <h2 class="text-lg font-semibold mb-4 text-black">Available Bundle</h2>
            <div class="gap-2 grid grid-cols-3 md:grid-cols-4">
              <div v-for="(price, size) in sizes" :key="size" class="flex flex-col">
                <div @click="togglePrice(size, price)"
                  class="bg-gray-300/10 backdrop-blur-lg shadow-sm text-black font-semibold px-2 py-2 rounded-xl hover:bg-[#E40001]">
                  {{ size }} GB
                </div>
              </div>
            </div>
            <div>
              <h2 class="mt-4 text-lg font-semibold text-white">Selected Price:</h2>
              <p class="text-white mt-1 ">
                {{ selectedPrice ? `GH₵${selectedPrice}` : 'Select a size to see the price' }}
              </p>
            </div>
            <div class="mt-4">
              <label for="phone" aria-required="true" class='text-white'>Recipient Number</label>
              <input v-model="phoneNumber" type="tel"
                class="border border-black rounded-xl p-2 w-full focus:ring-[#E40001] focus:border-[#E40001]" id="phone"
                name="phone" placeholder="Recipient Number" required>
            </div>


            <!-- Paystack Payment Button -->
            <div class="mt-4">
              <button @click="payWithPaystack"
                class="bg-black text-[#E40001] px-6 py-2 rounded-xl text-lg hover:bg-gray-800 couser-pointer">
                Pay Now
              </button>
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
            <span v-if="product.sale"
              class="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full">
              Sale
            </span>
          </div>
          <div class="text-start mt-3">
            <h3 class="text-lg font-semibold text-gray-900">{{ product.name }}</h3>
            <p class="text-gray-500 text-sm">{{ product.category }}</p>
            <p class="text-xl font-bold text-yellow-600 mt-2">GH₵{{ product.price }}</p>
            <div class="mt-4">
              <NuxtLink to="#"
                class="border border-yellow-500 text-yellow-500 px-4 py-2 rounded-lg text-sm hover:bg-yellow-500 hover:text-white transition">
                View Details
              </NuxtLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const sizes = ref({
  1: 4.9, 2: 8.9, 3: 12.5, 4: 15.9, 5: 20, 6: 24.5, 7: 27.5, 8: 32, 10: 39.5, 15: 69
});

const selectedPrice = ref(null);
const phoneNumber = ref("");
const publicKey = "pk_test_eb3bc9ba87ba3fe7f19a2fe09d4a7132ea9d37b2"; // Replace with your Paystack public key

const togglePrice = (size, price) => {
  selectedPrice.value = selectedPrice.value === price ? null : price;
};

// Function to load Paystack script
const loadPaystack = () => {
  if (!window.PaystackPop) {
    const script = document.createElement("script");
    script.src = "https://js.paystack.co/v1/inline.js";
    script.async = true;
    script.onload = () => console.log("✅ Paystack script loaded successfully.");
    document.body.appendChild(script);
  }
};

// Function to initiate payment
const payWithPaystack = () => {
  if (!selectedPrice.value || !phoneNumber.value) {
    alert("Please select a data plan and enter your phone number.");
    return;
  }

  if (!window.PaystackPop) {
    alert("Paystack script is not loaded yet. Please try again.");
    return;
  }

  const handler = window.PaystackPop.setup({
    key: publicKey,
    email: `${phoneNumber.value}@example.com`, // Using phone as an email identifier
    amount: selectedPrice.value * 100, // Paystack expects amount in kobo
    currency: "GHS",
    callback: function (response) {
      alert("✅ Payment Successful! Ref: " + response.reference);
      console.log(response);

      // Send payment details to the backend
      useFetch("/api/payments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: {
          phone: phoneNumber.value,
          reference: response.reference,
          bundletype: "at",
          size: Number(Object.keys(sizes.value).find((key) => sizes.value[key] === selectedPrice.value)),
          amount: selectedPrice.value,
          status: response.status,
        },
      })

    },
    onClose: function () {
      alert("❌ Payment window closed.");
    },
  });

  handler.openIframe();
};

// Ensure Paystack script is loaded on component mount
onMounted(() => {
  loadPaystack();
});
</script>
