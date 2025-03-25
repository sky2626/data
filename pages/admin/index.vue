/* pages/payments.vue */
<template>
  <div class="mt-24 p-6 max-w-4xl mx-auto">
    <div>
      <button @click="logout" class="px-4 py-2 bg-red-500 text-white rounded">
        Logout
      </button>
      <div>
        <h1>Admin Accounts</h1>
        <ul v-if="accounts.length">
          <li v-for="account in accounts" :key="account.id" class="text-blue-600">{{ account.email }}</li>
        </ul>
        <p v-if="errorMessage" class="text-red-500">{{ errorMessage }}</p>
      </div>
    </div>


    <h1 class="text-2xl font-bold mb-4">Payments</h1>
    <div class="flex gap-4 mb-4">
      <input v-model="search" type="text" placeholder="Search by phone or reference"
        class="p-2 border rounded w-full" />

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
  <div class="max-w-6xl mx-auto p-6">
    <h1 class="text-3xl font-bold text-gray-800 mb-4">Payment Records</h1>

    <!-- Filters -->
    <div class="flex gap-4 mb-6">
      <button v-for="option in filterOptions" :key="option.value" @click="applyFilter(option.value)" :class="['px-4 py-2 rounded-lg font-semibold',
        selectedFilter === option.value ? 'bg-gray-800 text-white' : 'bg-gray-300 hover:bg-gray-400']">
        {{ option.label }}
      </button>

      <button @click="exportToCSV" class="ml-auto px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
        Export to CSV
      </button>
    </div>

    <!-- Loading & Error -->
    <div v-if="loading" class="text-center text-gray-500">Loading payments...</div>
    <div v-else-if="error" class="text-center text-red-500">Failed to load payments.</div>

    <!-- Payments Table -->
    <table v-else class="w-full bg-white shadow-lg rounded-lg overflow-hidden">
      <thead class="bg-gray-800 text-white">
        <tr>
          <th class="p-4">#</th>
          <th class="p-4">Phone</th>
          <th class="p-4">Reference</th>
          <th class="p-4">Size (GB)</th>
          <th class="p-4">Amount (GHS)</th>
          <th class="p-4">Status</th>
          <th class="p-4">Date</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(payment, index) in filteredPayments" :key="payment.id" class="border-b">
          <td class="p-4">{{ index + 1 }}</td>
          <td class="p-4">{{ payment.phone }}</td>
          <td class="p-4">{{ payment.reference }}</td>
          <td class="p-4">{{ payment.size || 'N/A' }}</td>
          <td class="p-4">GH₵{{ payment.amount.toFixed(2) }}</td>
          <td class="p-4">
            <span :class="statusClass(payment.status)">
              {{ payment.status }}
            </span>
          </td>
          <td class="p-4">{{ formatDate(payment.createdAt) }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
const accounts = ref([]);
const errorMessage = ref(''); 

definePageMeta({
  layout: "admin",
  middleware: 'auth'
})

const fetchAccounts = async () => {
  try {
    const { data, error } = await useFetch('/api/accounts');
    if (error.value) throw new Error(error.value.statusMessage);
    accounts.value = data.value.data;
  } catch (error) {
    errorMessage.value = error.message;
  }
};

onMounted(fetchAccounts);


//const payments = ref([]);
const search = ref('');
const status = ref('');

//const fetchPayments = async () => {
//  const res = await fetch('/utils/prisma');
//  payments.value = await res.json();
//};

//onMounted(fetchPayments);

//const filteredPayments = computed(() => {
//  return payments.value.filter(payment => {
//    return (
//      (!search.value || payment.phone.includes(search.value) || payment.reference.includes(search.value)) &&
//      (!status.value || payment.status === status.value)
//    );
//  });
//});

// Logout 
import { useRouter } from 'vue-router';

const router = useRouter();

const logout = () => {
  localStorage.removeItem('token'); // Remove token
  router.push('/admin/signin'); // Redirect to login
};


/// new added

import { saveAs } from 'file-saver';

// State variables
const payments = ref([]);
const loading = ref(true);
const error = ref(null);
const selectedFilter = ref("all");

// Filter options
const filterOptions = [
  { label: "All", value: "all" },
  { label: "Today", value: "day" },
  { label: "This Week", value: "week" },
  { label: "This Month", value: "month" }
];

// Fetch payments from API
const fetchPayments = async () => {
  try {
    const response = await useFetch("/api/payments");

    if (response.data.success) {
      payments.value = repesponse.data;
    } else {
      throw new Error("Failed to load payments");
    }
  } catch (err) {
    error.value = err.message;
  } finally {
    loading.value = false;
  }
};

// Date helper functions
const isSameDay = (date1, date2) => {
  return date1.toDateString() === date2.toDateString();
};

const isSameWeek = (date1, date2) => {
  const startOfWeek = new Date();
  startOfWeek.setDate(startOfWeek.getDate() - startOfWeek.getDay()); // Start of week (Sunday)
  return date1 >= startOfWeek && date1 <= date2;
};

const isSameMonth = (date1, date2) => {
  return date1.getFullYear() === date2.getFullYear() && date1.getMonth() === date2.getMonth();
};

// Computed property to filter payments
const filteredPayments = computed(() => {
  if (selectedFilter.value === "all") return payments.value;

  const now = new Date();
  return payments.value.filter(payment => {
    const paymentDate = new Date(payment.createdAt);
    if (selectedFilter.value === "day") return isSameDay(paymentDate, now);
    if (selectedFilter.value === "week") return isSameWeek(paymentDate, now);
    if (selectedFilter.value === "month") return isSameMonth(paymentDate, now);
  });
});

// Apply filter
const applyFilter = (filter) => {
  selectedFilter.value = filter;
};

// Format date
const formatDate = (dateString) => {
  return new Date(dateString).toLocaleString();
};

// Status color class
const statusClass = (status) => {
  return status === "success" ? "text-green-600 font-bold" : "text-red-500 font-bold";
};

// Export data to CSV
const exportToCSV = async () => {
  if (!payments.value.length) {
    alert("No data to export.");
    return;
  }

  const csvContent = [
    ["ID", "Phone", "Reference", "Size", "Amount", "Status", "Created At"],
    ...payments.value.map((payment) => [
      payment.id,
      payment.phone,
      payment.reference,
      payment.size,
      payment.amount,
      payment.status,
      new Date(payment.createdAt).toLocaleString(),
    ]),
  ]
    .map((row) => row.join(","))
    .join("\n");

  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });

  if (process.client) {
    const { saveAs } = await import("file-saver");
    saveAs(blob, "payments.csv");
  }
};

// Fetch data on component mount
onMounted(fetchPayments);
</script>
