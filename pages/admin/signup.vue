<template>
  <div class="flex min-h-screen flex-col justify-center px-6 py-12 lg:px-8">
    <div class="sm:mx-auto sm:w-full sm:max-w-md">
      <h2 class="mt-6 text-center text-2xl font-bold text-gray-900">Create an Account</h2>
    </div>

    <div class="mt-6 sm:mx-auto sm:w-full sm:max-w-md">
      <form @submit.prevent="register" class="space-y-4">

        <!-- Email -->
        <div>
          <label for="email" class="block text-sm font-medium text-gray-700">Email</label>
          <input 
            id="email" 
            v-model="email" 
            type="email" 
            class="block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 px-3 py-2"
            placeholder="Enter email"
            required />
        </div>

        <!-- Password -->
        <div>
          <label for="password" class="block text-sm font-medium text-gray-700">Password</label>
          <input 
            id="password" 
            v-model="password" 
            type="password" 
            class="block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 px-3 py-2"
            placeholder="Enter password"
            required />
        </div>

        <!-- Submit Button -->
        <div>
          <button 
            type="submit" 
            class="w-full flex justify-center rounded-md bg-indigo-600 py-2 px-4 text-white font-semibold hover:bg-indigo-500">
            Sign Up
          </button>
        </div>
      </form>

      <p class="mt-6 text-center text-sm text-gray-600">
        Already have an account? 
        <NuxtLink to="/admin/signin" class="font-semibold text-indigo-600 hover:text-indigo-500">Sign in</NuxtLink>
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref, inject } from 'vue'
import { useFetch, navigateTo } from '#app'

definePageMeta({
  layout: "admin",
})


definePageMeta({
  layout: "auth",
  auth: {
    unauthenticatedOnly: true,
    navigateAuthenticatedTo: '/',
  }
})

const email = ref('')
const password = ref('')

const register = async () => {
  const { data, error } = await useFetch(`/api/auth/register`, {
    method: "POST",
    headers: { 'Content-Type': 'application/json' },
    body: {
      email: email.value,
      password: password.value
    }
  })

  if (error.value) {
      alert(error.value.statusMessage, 'error')
      return
  }
  alert(data.value.message)
  await navigateTo('/admin/signin')
}

</script>
