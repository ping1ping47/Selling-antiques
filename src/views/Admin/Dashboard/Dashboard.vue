<template>
  <div
    class="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5"
  >
    <Custommer />
  </div>

  <div
    class="mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5"
  >
    <!-- ====== Chart One Start -->
    <Custommer />
    <!-- ====== Chart One End -->

    <!-- ====== Chart Two Start -->
    <Report />
    <!-- ====== Chart Two End -->

    <!-- ====== Table One Start -->
    <div class="col-span-12 xl:col-span-8">
      <Employee />
    </div>
    <!-- ====== Table One End -->
  </div>
</template>

<script setup>
import Custommer from "@/views/Admin/Dashboard/Data/Cus.vue";
import Employee from "@/views/Admin/Dashboard/Data/Emp.vue";
import Report from "@/views/Admin/Dashboard/Data/report.vue";
</script>