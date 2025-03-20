/* pages/payments.vue */
<template>
  <div class="mt-24 p-6 max-w-4xl mx-auto">
    <div v-for="account in accounts" :key="accounts.id"
    class="flex items-center gap-4 mb-4">
      <h2 class="text-indigo-600 hover:text-indigo-500">{{ account.email }}</h2>
    </div>
    <div>
      <h1>Admin Accounts</h1>
      <ul v-if="accounts.length">
        <li v-for="account in accounts" :key="account.id">{{ account.email }}</li>
      </ul>
      <p v-if="errorMessage" class="text-red-500">{{ errorMessage }}</p>
    </div>

    <h1 class="text-2xl font-bold mb-4">Payments</h1>
    <div class="flex gap-4 mb-4">
      <input
        v-model="search"
        type="text"
        placeholder="Search by phone or reference"
        class="p-2 border rounded w-full"
      />
      
      <select v-model="status" class="p-2 border rounded">
        <option value="">All</option>
        <option value="pending">Pending</option>
        <option value="completed">Completed</option>
      </select>
    </div>

    <table class="w-full border-collapse border border-gray-300">
      <thead>
        <tr class="bg-gray-900">
          <th class="border p-2">Phone</th>
          <th class="border p-2">Reference</th>
          <th class="border p-2">Size</th>
          <th class="border p-2">Amount</th>
          <th class="border p-2">Status</th>
          <th class="border p-2">Created At</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="payment in filteredPayments" :key="payment.id" class="odd:bg-gray-50">
          <td class="border p-2">{{ payment.phone }}</td>
          <td class="border p-2">{{ payment.reference }}</td>
          <td class="border p-2">{{ payment.size }}</td>
          <td class="border p-2">{{ payment.amount }}</td>
          <td class="border p-2">{{ payment.status }}</td>
          <td class="border p-2">{{ new Date(payment.createdAt).toLocaleString() }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
const accounts = ref([]);
const errorMessage = ref(''); 

const fetchAccounts = async () => {
  try {
    const { data, error } = await useFetch('/prisma');
    if (error.value) throw new Error(error.value.statusMessage);
    accounts.value = data.value.data;
  } catch (error) {
    errorMessage.value = error.message;
  }
};

onMounted(fetchAccounts);


const payments = ref([]);
const search = ref('');
const status = ref('');

//const fetchPayments = async () => {
//  const res = await fetch('/utils/prisma');
//  payments.value = await res.json();
//};

//onMounted(fetchPayments);

const filteredPayments = computed(() => {
  return payments.value.filter(payment => {
    return (
      (!search.value || payment.phone.includes(search.value) || payment.reference.includes(search.value)) &&
      (!status.value || payment.status === status.value)
    );
  });
});
</script>
