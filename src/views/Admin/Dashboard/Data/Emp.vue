<template>
  <div class="bg-white p-4 rounded-md shadow">
    <h3 class="text-gray-800 font-semibold">สมาชิก</h3>
    <p class="text-sm text-gray-600">ทั้งหมด</p>
    <div class="flex items-center justify-between mt-2">
      <span class="text-2xl font-bold text-green-600"
        >{{ totalCustomers }} คน</span
      >
      <div class="flex items-center space-x-2">
        <svg
          class="w-5 h-5 text-green-600"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M5 15l7-7 7 7"
          />
        </svg>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      totalCustomers: 0,
    };
  },
  created() {
    this.fetchTotalCustomers();
  },
  methods: {
    async fetchTotalCustomers() {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_ALL}customer`
        );
        this.totalCustomers = response.data.data.length;
      } catch (error) {
        console.error("Error fetching total customers:", error);
      }
    },
  },
};
</script>
