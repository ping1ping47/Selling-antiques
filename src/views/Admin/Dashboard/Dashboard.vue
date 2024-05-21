<template>
  <div class="grid grid-cols-1 gap-4 p-4 md:grid-cols-2 lg:grid-cols-3">
    <!-- Total Revenue Card -->
    <div class="bg-white rounded-lg shadow-md p-6">
      <Employees />
    </div>

    <!-- New Employees Card -->
    <div class="bg-white rounded-lg shadow-md p-6">
      <Customer />
    </div>

    <!-- Total Expenses Card -->
    <div class="bg-white rounded-lg shadow-md p-6">
      <Report />
    </div>
  </div>
</template>

<script setup>
import Employees from "./Data/Cus.vue";
import Customer from "./Data/Emp.vue";
import Report from "./Data/Report.vue";
</script>

<style scoped>
/* Add any custom styles here */
</style>
