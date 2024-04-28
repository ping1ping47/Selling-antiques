<template>
  <div
    class="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
  >
    <div class="bg-white rounded-lg shadow-lg p-6 max-w-md w-full">
      <div class="mb-4">
        <h2 class="text-2xl font-bold text-center">ขายสินค้า POS</h2>
      </div>
      <div class="grid grid-cols-2 gap-4 mb-6">
        <div
          v-for="(button, index) in buttons"
          :key="index"
          class="bg-cover bg-center rounded-lg p-4 transform hover:scale-105 transition-transform"
          :style="{
            backgroundImage: `url(${buttonBgImage})`,
            transform: `rotate(${getRandomRotation()}deg) skew(${getRandomSkew()}deg, ${getRandomSkew()}deg)`,
          }"
        >
          <button
            @click="handleButtonClick(button.action)"
            class="w-full flex flex-col items-center focus:outline-none"
          >
            <i :class="`fas fa-${button.icon} text-4xl text-gray-800 mb-2`"></i>
            <span class="text-gray-800 font-semibold">{{ button.label }}</span>
          </button>
        </div>
      </div>
      <div class="text-right text-xl font-bold mb-4">Total: 0.00</div>
      <button
        class="w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition-colors"
      >
        Enter
      </button>
    </div>
  </div>
  <div
    v-if="showCashInput"
    class="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
  >
    <div class="bg-white rounded-lg shadow-lg p-6 max-w-md w-full">
      <h2 class="text-2xl font-bold mb-4">รับเงินสด</h2>
      <input
        v-model="cashAmount"
        type="number"
        class="w-full border border-gray-300 rounded-lg py-2 px-4 mb-4"
        placeholder="จำนวนเงินสด"
      />
      <div class="flex justify-end">
        <button
          @click="showCashInput = false"
          class="bg-red-500 text-white py-2 px-4 rounded-lg mr-2 hover:bg-red-600 transition-colors"
        >
          ยกเลิก
        </button>
        <button
          @click="goToCashPage"
          class="bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 transition-colors"
        >
          ตกลง
        </button>
      </div>
    </div>
  </div>
  <div
    v-if="showTransferInput"
    class="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
  >
    <div class="bg-white rounded-lg shadow-lg p-6 max-w-md w-full">
      <h2 class="text-2xl font-bold mb-4">โอนเงิน</h2>
      <input
        v-model="transferAmount"
        type="number"
        class="w-full border border-gray-300 rounded-lg py-2 px-4 mb-4"
        placeholder="จำนวนเงินที่ต้องโอน"
      />
      <div class="flex justify-end">
        <button
          @click="showTransferInput = false"
          class="bg-red-500 text-white py-2 px-4 rounded-lg mr-2 hover:bg-red-600 transition-colors"
        >
          ยกเลิก
        </button>
        <button
          @click="goToPaymentPage"
          class="bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 transition-colors"
        >
          ตกลง
        </button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "PosScreen",
  data() {
    return {
      bgColor: "#FFF7BC",
      textColor: "#333",
      accentColor: "#FE9B72",
      buttonBgImage: "https://example.com/button-bg.png",
      buttons: [
        { label: "เงินสด", icon: "money-bill-wave", action: "cash" },
        { label: "โอนเงิน", icon: "university", action: "transfer" },
        { label: "บัตรเครดิต", icon: "credit-card", action: "credit" },
        { label: "อื่นๆ", icon: "ellipsis-h", action: "other" },
      ],
      showCashInput: false,
      cashAmount: null,
      showTransferInput: false,
      transferAmount: null,
    };
  },
  methods: {
    getRandomRotation() {
      return Math.random() * 20 - 10;
    },
    getRandomSkew() {
      return Math.random() * 10;
    },
    handleButtonClick(action) {
      if (action === "cash") {
        this.showCashInput = true;
      } else if (action === "transfer") {
        this.showTransferInput = true;
      }
    },
    goToCashPage() {
      // ไปหน้า Cash.vue พร้อมกับส่งข้อมูลจำนวนเงินสดที่รับไว้
      this.$router.push({ name: "Cash", params: { amount: this.cashAmount } });
      this.showCashInput = false;
      this.cashAmount = null;
    },
    goToPaymentPage() {
      // ไปหน้า Payment.vue พร้อมกับส่งข้อมูลจำนวนเงินที่ต้องโอน
      this.$router.push({
        name: "Payment",
        params: { amount: this.transferAmount },
      });
      this.showTransferInput = false;
      this.transferAmount = null;
    },
  },
};
</script>
<style>
/* Import Tailwind CSS */
@import "tailwindcss/base";
@import "tailwindcss/components";
@import "tailwindcss/utilities";
</style>
