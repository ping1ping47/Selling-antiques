<template>
  <div class="container mx-auto p-4">
    <div class="flex flex-col md:flex-row justify-between mb-4">
      <div class="flex items-center mb-4 md:mb-0">
        <div class="mr-4">
          <span class="text-gray-700 font-semibold mr-2">เลือกเดือน:</span>
          <select
            v-model="selectedMonth"
            class="px-2 py-1 border rounded bg-white w-full md:w-auto focus:outline-none focus:ring-2 focus:ring-blue-600"
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
            class="px-2 py-1 border rounded bg-white w-full md:w-auto focus:outline-none focus:ring-2 focus:ring-blue-600"
          >
            <option value="">ทั้งหมด</option>
            <option v-for="year in uniqueYears" :key="year" :value="year">
              {{ year }}
            </option>
          </select>
        </div>
        <button
          @click="clearFilter"
          class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-300 ease-in-out"
        >
          <i class="fas fa-filter-circle-xmark mr-2"></i>
          ล้างการกรอง
        </button>
      </div>

      <div class="mb-4 md:mb-0 text-center md:text-left">
        <section class="mb-6 flex items-center justify-center md:justify-start">
          <div class="flex items-center justify-start">
            <h1 class="text-3xl font-light leading-tight" ref="dateDisplay">
              วว/ดด/ปป
            </h1>
          </div>
        </section>
      </div>

      <div class="bg-white shadow-md rounded-lg p-4">
        <div class="flex items-center justify-between mb-2">
          <i
            class="fas fa-money-bill-wave text-green-500 mr-2 mb-2 md:mb-0"
          ></i>
          <span class="font-bold text-gray-700 mr-2">รายได้รวมทั้งหมด:</span>
          <span class="ml-2 text-green-600 font-semibold">{{
            formatCurrency(totalRevenue)
          }}</span>
        </div>
      </div>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div class="bg-white shadow-md rounded-lg p-4 overflow-y-auto">
        <div class="flex items-center justify-between mb-2">
          <h3 class="text-lg font-semibold text-gray-700">
            <i class="fas fa-calendar-day mr-2 text-blue-500"></i>
            รายได้รายวัน <span class="text-red-500">(31 วันล่าสุด)</span>
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
            รายได้รายเดือน <span class="text-red-500">(12 เดือนล่าสุด)</span>
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
          รายได้รายปี <span class="text-red-500">(10 ปีล่าสุด)</span>
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
  data() {
    return {
      selectedMonth: "",
      selectedYear: "",
      months: [
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
      ],
    };
  },
  computed: {
    revenueData() {
      return [
        // { date: "09/09/2023", amount: 1000000 },
        { date: "2024-09-27", amount: 1 },
        { date: "2024-10-28", amount: 1 },
        { date: "2024-11-29", amount: 1 },
        { date: "2024-08-31", amount: 1 },
        { date: "2024-08-30", amount: 1 },
        { date: "2024-08-29", amount: 1 },
        { date: "2024-08-28", amount: 1 },
        { date: "2024-08-27", amount: 1 },
        { date: "2024-08-26", amount: 1 },
        { date: "2024-08-25", amount: 1 },
        { date: "2024-08-24", amount: 1 },
        { date: "2024-08-23", amount: 1 },
        { date: "2024-08-22", amount: 1 },
        { date: "2024-08-21", amount: 1 },
        { date: "2024-08-20", amount: 1 },
        { date: "2024-08-19", amount: 1 },
        { date: "2024-08-18", amount: 1 },
        { date: "2024-08-17", amount: 1 },
        { date: "2024-03-16", amount: 1 },
        { date: "2024-02-15", amount: 1 },
        { date: "2024-08-14", amount: 1 },
        { date: "2024-12-13", amount: 1 },
        { date: "2024-11-12", amount: 1 },
        { date: "2024-10-11", amount: 1 },
        { date: "2024-09-10", amount: 1 },
        { date: "2024-01-09", amount: 1 },
        { date: "2024-08-08", amount: 1 },
        { date: "2024-07-07", amount: 1 },
        { date: "2024-06-06", amount: 1 },
        { date: "2024-05-05", amount: 1 },
        { date: "2020-04-04", amount: 1 },
        { date: "2021-03-03", amount: 1 },
        { date: "2022-02-02", amount: 1 },
        { date: "2023-04-01", amount: 1 },
      ];
    },
    uniqueYears() {
      return Array.from(
        new Set(
          this.revenueData.map((item) => new Date(item.date).getFullYear())
        )
      );
    },
    sortedDailyRevenue() {
      return this.revenueData
        .filter(
          (revenue) =>
            (this.selectedMonth
              ? new Date(revenue.date).getMonth() + 1 ===
                parseInt(this.selectedMonth)
              : true) &&
            (this.selectedYear
              ? new Date(revenue.date).getFullYear() ===
                parseInt(this.selectedYear)
              : true)
        )
        .sort((a, b) => new Date(b.date) - new Date(a.date));
    },
    dailyRevenueTotal() {
      return this.sortedDailyRevenue.reduce(
        (total, revenue) => total + revenue.amount,
        0
      );
    },
    sortedMonthlyRevenue() {
      const groupedByMonth = this.revenueData.reduce((acc, revenue) => {
        const date = new Date(revenue.date);
        if (
          (date.getMonth() + 1 === parseInt(this.selectedMonth) ||
            this.selectedMonth === "") &&
          (date.getFullYear() === parseInt(this.selectedYear) ||
            this.selectedYear === "")
        ) {
          const month = date.getMonth() + 1;
          const year = date.getFullYear();
          const key = `${month}/${year}`;
          if (!acc[key]) {
            acc[key] = {
              month: `${this.months[month - 1]}/${year}`,
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
          new Date(yearB, this.months.indexOf(monthB)) -
          new Date(yearA, this.months.indexOf(monthA))
        );
      });
    },
    monthlyRevenueTotal() {
      return this.sortedMonthlyRevenue.reduce(
        (total, revenue) => total + revenue.amount,
        0
      );
    },
    sortedYearlyRevenue() {
      const groupedByYear = this.revenueData.reduce((acc, revenue) => {
        const year = new Date(revenue.date).getFullYear();
        if (this.selectedYear === "" || year === parseInt(this.selectedYear)) {
          if (!acc[year]) {
            acc[year] = { year, amount: 0 };
          }
          acc[year].amount += revenue.amount;
        }
        return acc;
      }, {});
      return Object.values(groupedByYear).sort((a, b) => b.year - a.year);
    },
    totalRevenue() {
      return this.revenueData.reduce(
        (total, revenue) => total + revenue.amount,
        0
      );
    },
  },
  methods: {
    formatCurrency(amount) {
      return amount.toLocaleString("th-TH", {
        style: "currency",
        currency: "THB",
      });
    },
    clearFilter() {
      this.selectedMonth = "";
      this.selectedYear = "";
    },
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
  mounted() {
    this.updateDate();
    this.intervalId = setInterval(this.updateDate, 1000);
  },
  beforeDestroy() {
    clearInterval(this.intervalId);
  },
};
</script>

<style>
@import "https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@5.15.4/css/all.min.css";

/* Custom styles for responsiveness */
@media (max-width: 767px) {
  .container {
    padding: 1rem;
  }

  .flex-col.md\:flex-row {
    flex-direction: column;
  }

  .md\:mb-0 {
    margin-bottom: 1rem;
  }

  .md\:text-left {
    text-align: center;
  }

  .md\:justify-start {
    justify-content: center;
  }

  .md\:w-auto {
    width: 100%;
  }
}
</style>
