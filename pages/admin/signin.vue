<template>
  <div class="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8 h-screen">
    <div class="sm:mx-auto sm:w-full sm:max-w-sm">
      <h2 class="mt-10 text-center text-2xl font-bold text-white">Sign in to Admin account</h2>
    </div>

    <div class="mt-6 sm:mx-auto sm:w-full sm:max-w-sm">
      <form class="space-y-6" @submit.prevent="handleSignIn">
        <div>
          <label for="email" class="block text-sm font-medium text-gray-900">Email address</label>
          <div class="mt-2">
            <input v-model="email" type="email" id="email" autocomplete="email" required
              class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline-indigo-600">
          </div>
        </div>

        <div>
          <div class="flex items-center justify-between">
            <label for="password" class="block text-sm font-medium text-gray-900">Password</label>
          </div>
          <div class="mt-2">
            <input v-model="password" type="password" id="password" autocomplete="current-password" required
              class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline-indigo-600">
          </div>
        </div>

        <div class="mb-2">
          <button type="submit"
            class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold text-white hover:bg-indigo-500">Sign
            in</button>
        </div>
      </form>

      <p v-if="errorMessage" class="mt-2 text-center text-sm text-red-500">{{ errorMessage }}</p>
      <p v-if="successMessage" class="mt-2 text-center text-sm text-green-500">{{ successMessage }}</p>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";

definePageMeta({
  layout: "admin"
})

const email = ref("");
const password = ref("");
const errorMessage = ref("");
const successMessage = ref("");
const router = useRouter();

const handleSignIn = async () => {
  errorMessage.value = "";
  successMessage.value = "";

  try {
    const response = await $fetch("/api/auth/login", {
      method: "POST",
      body: { 
        email: email.value, 
        password: password.value 
      }, 
    });

    successMessage.value = "Sign-in successful! Redirecting...";
    localStorage.setItem("token", response.token); // Store token if provided

    setTimeout(() => {
      router.push("/admin"); // Redirect after success
    }, 1500);
  } catch (error) {
    errorMessage.value = error.data?.message || "Sign-in failed";
  }
};
</script>
