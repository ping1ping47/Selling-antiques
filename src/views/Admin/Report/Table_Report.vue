<template>
  <div class="container mx-auto p-4">
    <div class="flex justify-between mb-4">
      <div class="flex items-center">
        <div class="mr-4">
          <span class="text-gray-700 font-semibold mr-2">เลือกเดือน:</span>
          <select
            v-model="selectedMonth"
            class="px-2 py-1 border rounded bg-white"
          >
            <option value="">ทั้งหมด</option>
            <option
              v-for="(month, index) in months"
              :key="index"
              :value="index + 1"
            >
              {{ month }}
            </option>
          </select>
        </div>
        <div class="mr-4">
          <span class="text-gray-700 font-semibold mr-2">เลือกปี:</span>
          <select
            v-model="selectedYear"
            class="px-2 py-1 border rounded bg-white"
          >
            <option value="">ทั้งหมด</option>
            <option v-for="year in uniqueYears" :key="year" :value="year">
              {{ year }}
            </option>
          </select>
        </div>
        <button
          @click="clearFilter"
          class="bg-blue-500 hover:bg-blue-700 flex items-center text-white font-bold py-3 border border-blue-700 rounded shadow-auto focus:outline-none focus:shadow-outline"
        >
          <i class="fas fa-filter-circle-xmark"></i>
          ล้างการกรอง
        </button>
      </div>

      <div>
        <section class="mb-6 flex items-center justify-center">
          <div class="flex items-center justify-start">
            <h1 class="text-3xl font-light leading-tight">รายได้ประจำวัน-</h1>
            <h1 class="text-3xl font-light leading-tight" ref="dateDisplay">
              วว/ดด/ปป
            </h1>
          </div>
        </section>
      </div>

      <div class="text-right flex items-center">
        <i class="fas fa-money-bill-wave text-green-500 mr-2"></i>
        <span class="font-bold text-gray-700">รายได้รวม:</span>
        <span class="ml-2 text-green-600 font-semibold">{{
          formatCurrency(totalRevenue)
        }}</span>
      </div>
    </div>

    <div class="grid grid-cols-3 gap-4" style="height: 80vh">
      <div class="bg-white shadow-md rounded-lg p-4 overflow-y-auto">
        <div class="flex items-center justify-between mb-2">
          <h3 class="text-lg font-semibold text-gray-700">
            <i class="fas fa-calendar-day mr-2 text-blue-500"></i>
            รายได้รายวัน
          </h3>
          <span class="text-blue-500 font-bold">{{
            formatCurrency(dailyRevenueTotal)
          }}</span>
        </div>
        <ul class="divide-y divide-gray-200">
          <li
            v-for="(revenue, index) in sortedDailyRevenue.slice(0, 31)"
            :key="index"
            class="py-2"
          >
            {{
              new Intl.DateTimeFormat("th-TH-u-ca-buddhist", {
                month: "long",
                day: "numeric",
              }).format(new Date(revenue.date))
            }}
            <span class="float-right font-semibold text-gray-700">{{
              formatCurrency(revenue.amount)
            }}</span>
          </li>
        </ul>
      </div>

      <div class="bg-white shadow-md rounded-lg p-4">
        <div class="flex items-center justify-between mb-2">
          <h3 class="text-lg font-semibold text-gray-700">
            <i class="fas fa-calendar-alt mr-2 text-green-500"></i>
            รายได้รายเดือน
          </h3>
          <span class="text-green-500 font-bold">{{
            formatCurrency(monthlyRevenueTotal)
          }}</span>
        </div>
        <ul class="divide-y divide-gray-200">
          <li
            v-for="(revenue, index) in sortedMonthlyRevenue.slice(0, 12)"
            :key="index"
            class="py-2"
          >
            {{ revenue.month }}
            <span class="float-right font-semibold text-gray-700">{{
              formatCurrency(revenue.amount)
            }}</span>
          </li>
        </ul>
      </div>
      <div class="bg-white shadow-md rounded-lg p-4">
        <h3 class="text-lg font-semibold text-gray-700 mb-2">
          <i class="fas fa-calendar mr-2 text-yellow-500"></i>
          รายได้รายปี
        </h3>
        <ul class="divide-y divide-gray-200">
          <li
            v-for="revenue in sortedYearlyRevenue"
            :key="revenue.year"
            class="py-2"
          >
            ปี {{ new Date(revenue.year, 0).getFullYear() }}
            <span class="float-right font-semibold text-gray-700">
              มีรายได้ทั้งหมด: {{ formatCurrency(revenue.amount) }}</span
            >
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, ref } from "vue";

export default {
  setup() {
    const selectedMonth = ref("");
    const selectedYear = ref("");

    const months = computed(() => {
      return [
        "มกราคม",
        "กุมภาพันธ์",
        "มีนาคม",
        "เมษายน",
        "พฤษภาคม",
        "มิถุนายน",
        "กรกฎาคม",
        "สิงหาคม",
        "กันยายน",
        "ตุลาคม",
        "พฤศจิกายน",
        "ธันวาคม",
      ];
    });

    // ข้อมูลรายได้ตัวอย่าง (ควรนำเข้าข้อมูลจริงจากแหล่งข้อมูลของคุณ)
    const revenueData = [
      // { date: "09/09/2023", amount: 1000000 },
      { date: "2024-09-27", amount: 200 },
      { date: "2024-10-28", amount: 200 },
      { date: "2024-11-29", amount: 200 },
      { date: "2024-08-31", amount: 200 },
      { date: "2024-08-30", amount: 200 },
      { date: "2024-08-29", amount: 200 },
      { date: "2024-08-28", amount: 200 },
      { date: "2024-08-27", amount: 200 },
      { date: "2024-08-26", amount: 200 },
      { date: "2024-08-25", amount: 200 },
      { date: "2024-08-24", amount: 200 },
      { date: "2024-08-23", amount: 200 },
      { date: "2024-08-22", amount: 200 },
      { date: "2024-08-21", amount: 200 },
      { date: "2024-08-20", amount: 200 },
      { date: "2024-08-19", amount: 200 },
      { date: "2024-08-18", amount: 200 },
      { date: "2024-08-17", amount: 200 },
      { date: "2024-03-16", amount: 200 },
      { date: "2024-02-15", amount: 200 },
      { date: "2024-08-14", amount: 200 },
      { date: "2024-12-13", amount: 200 },
      { date: "2024-11-12", amount: 200 },
      { date: "2024-10-11", amount: 200 },
      { date: "2024-09-10", amount: 200 },
      { date: "2024-01-09", amount: 200 },
      { date: "2024-08-08", amount: 200 },
      { date: "2024-07-07", amount: 200 },
      { date: "2024-06-06", amount: 200 },
      { date: "2024-05-05", amount: 200 },
      { date: "2020-04-04", amount: 200 },
      { date: "2021-03-03", amount: 200 },
      { date: "2022-02-02", amount: 200 },
      { date: "2023-04-01", amount: 200 },
    ];

    const uniqueYears = computed(() => {
      return Array.from(
        new Set(revenueData.map((item) => new Date(item.date).getFullYear()))
      );
    });

    const sortedDailyRevenue = computed(() => {
      return revenueData
        .filter(
          (revenue) =>
            (selectedMonth.value
              ? new Date(revenue.date).getMonth() + 1 === selectedMonth.value
              : true) &&
            (selectedYear.value
              ? new Date(revenue.date).getFullYear() === selectedYear.value
              : true)
        )
        .sort((a, b) => new Date(b.date) - new Date(a.date));
    });

    const dailyRevenueTotal = computed(() => {
      return sortedDailyRevenue.value.reduce(
        (total, revenue) => total + revenue.amount,
        0
      );
    });

    const sortedMonthlyRevenue = computed(() => {
      const groupedByMonth = revenueData.reduce((acc, revenue) => {
        const date = new Date(revenue.date);
        if (
          (date.getMonth() + 1 === selectedMonth.value ||
            selectedMonth.value === "") &&
          (date.getFullYear() === selectedYear.value ||
            selectedYear.value === "")
        ) {
          const month = date.getMonth() + 1;
          const year = date.getFullYear();
          const key = `${month}/${year}`;
          if (!acc[key]) {
            acc[key] = {
              month: `${months.value[month - 1]}/${year}`,
              amount: 0,
            };
          }
          acc[key].amount += revenue.amount;
        }
        return acc;
      }, {});
      return Object.values(groupedByMonth).sort((a, b) => {
        const [monthA, yearA] = a.month.split("/");
        const [monthB, yearB] = b.month.split("/");
        return (
          new Date(yearB, months.value.indexOf(monthB)) -
          new Date(yearA, months.value.indexOf(monthA))
        );
      });
    });

    const monthlyRevenueTotal = computed(() => {
      return sortedMonthlyRevenue.value.reduce(
        (total, revenue) => total + revenue.amount,
        0
      );
    });
    const sortedYearlyRevenue = computed(() => {
      const groupedByYear = revenueData.reduce((acc, revenue) => {
        const year = new Date(revenue.date).getFullYear();
        if (selectedYear.value === "" || year === selectedYear.value) {
          if (!acc[year]) {
            acc[year] = { year, amount: 0 };
          }
          acc[year].amount += revenue.amount;
        }
        return acc;
      }, {});
      return Object.values(groupedByYear).sort((a, b) => b.year - a.year);
    });

    const totalRevenue = computed(() => {
      return revenueData.reduce((total, revenue) => total + revenue.amount, 0);
    });

    const formatCurrency = (amount) => {
      return amount.toLocaleString("th-TH", {
        style: "currency",
        currency: "THB",
      });
    };

    const clearFilter = () => {
      selectedMonth.value = "";
      selectedYear.value = "";
    };

    return {
      selectedMonth,
      selectedYear,
      uniqueYears,
      sortedDailyRevenue,
      sortedMonthlyRevenue,
      sortedYearlyRevenue,
      totalRevenue,
      formatCurrency,
      clearFilter,
      months,
      dailyRevenueTotal,
      monthlyRevenueTotal,
    };
  },

  mounted() {
    // Update the date immediately
    this.updateDate();

    // Update the date every second
    this.intervalId = setInterval(this.updateDate, 1000);
  },
  beforeDestroy() {
    // Clear the interval when the component is destroyed
    clearInterval(this.intervalId);
  },
  methods: {
    updateDate() {
      const dateElement = this.$refs.dateDisplay;
      if (dateElement) {
        const currentDate = new Date();
        const options = {
          weekday: "long",
          year: "numeric",
          month: "long",
          day: "numeric",
          hour: "numeric",
          minute: "numeric",
          second: "numeric",
        };
        const formattedDate = new Intl.DateTimeFormat("th-TH", options).format(
          currentDate
        );
        dateElement.innerText = formattedDate;
      }
    },
  },
};
</script>

<style>
@import "https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@5.15.4/css/all.min.css";
</style>
