<template>
  <div
    class="flex flex-col md:flex-row justify-center items-start space-x-8 mt-12 px-4"
  >
    <!-- Cart Section -->
    <div
      class="w-full md:w-1/3 lg:w-1/4 shadow-md rounded-lg overflow-hidden animate__animated animate__fadeInDown"
    >
      <!-- Product Section -->
      <div
        class="bg-green-500 text-white px-4 py-3 flex items-center justify-between animate__animated animate__fadeInDown"
      >
        <h2 class="text-2xl font-bold">
          <i
            class="fas fa-shopping-cart mr-2 animate__animated animate__pulse animate__infinite animate__slower"
          ></i>
          สินค้า
        </h2>
        <i
          class="fas fa-basket-shopping text-2xl animate__animated animate__pulse animate__infinite animate__slower"
        ></i>
      </div>
      <ul
        v-if="cartItems.length > 0"
        class="divide-y divide-green-300 animate__animated animate__fadeInUp p-4"
      >
        <!-- Cart items -->
        <li
          v-for="(item, index) in cartItems"
          :key="item.id"
          class="flex py-4 animate__animated animate__zoomIn"
        >
          <img
            :src="item.image"
            :alt="item.name"
            class="w-16 h-16 object-cover mr-4 rounded animate__animated animate__pulse animate__infinite animate__slower"
          />
          <div>
            <p class="text-lg font-semibold">{{ item.name }}</p>
            <p class="text-green-600">ชิ้นละ: {{ item.price }} บาท</p>
            <p>จำนวน: {{ item.quantity }}</p>
            <p class="text-green-600">
              เป็น: {{ (item.price * item.quantity).toFixed(2) }} บาท
            </p>
          </div>
        </li>
      </ul>
      <p
        v-else
        class="text-lg text-green-600 animate__animated animate__bounceIn p-4"
      >
        สินค้าของคุณว่างเปล่า
      </p>
      <div
        class="bg-green-100 px-4 py-3 flex justify-between items-center animate__animated animate__fadeInUp"
      >
        <span class="text-xl text-green-800 font-bold"
          >รวม: {{ total.toFixed(2) }} บาท</span
        >
        <i
          class="fas fa-money-bill-wave text-2xl text-green-600 animate__animated animate__pulse animate__infinite animate__slower"
        ></i>
      </div>
    </div>
    <!-- Payment Section -->
    <div
      class="mt-8 md:mt-0 bg-white rounded-lg shadow-md p-6 animate__animated animate__fadeInUp"
    >
      <h2 class="text-2xl font-bold mb-4 text-green-800 flex items-center">
        <i
          class="fas fa-credit-card mr-2 animate__animated animate__pulse animate__infinite animate__slower"
        ></i>
        ชำระเงิน
      </h2>
      <div class="mt-4">
        <!-- Receipt number input -->
        <label class="block font-bold mb-2">เลขที่ใบเสร็จ:</label>
        <input
          type="text"
          v-model="receiptNumber"
          class="border border-green-500 rounded px-4 py-2 w-full bg-gray-100 focus:outline-none focus:ring-2 focus:ring-green-500"
          placeholder="กรอกเลขที่ใบเสร็จ"
        />
      </div>
      <div class="mt-4">
        <!-- Received amount input -->
        <label class="block font-bold mb-2">รับเงิน:</label>
        <div class="flex items-center">
          <input
            type="number"
            v-model="receivedAmount"
            class="border border-green-500 rounded-l px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-green-500"
            placeholder="กรอกจำนวนเงิน"
          />
          <button
            @click="showChangePopup"
            class="bg-green-500 text-white font-bold py-2 px-4 rounded-r hover:bg-green-700 transition duration-300"
          >
            คำนวณทอน
          </button>
        </div>
      </div>
      <div class="mt-4">
        <label class="block font-bold mb-2">ทอนเหรียญ:</label>
        <!-- Change coins display -->
        <div class="flex items-center">
          <input
            type="text"
            v-model="changeCoins"
            class="border border-green-500 rounded px-4 py-2 w-full bg-gray-100 focus:outline-none focus:ring-2 focus:ring-green-500"
            readonly
          />
          <span class="ml-2 text-green-600">บาท</span>
        </div>
      </div>
      <div class="mt-4">
        <label class="block font-bold mb-2">ทอนแบงค์:</label>
        <!-- Change banknotes display -->
        <div class="flex items-center">
          <input
            type="text"
            v-model="changeBanknotes"
            class="border border-green-500 rounded px-4 py-2 w-full bg-gray-100 focus:outline-none focus:ring-2 focus:ring-green-500"
            readonly
          />
          <span class="ml-2 text-green-600">บาท</span>
        </div>
      </div>
      <div class="mt-6">
        <!-- Confirm payment button -->
        <button
          @click="confirmPayment"
          class="w-full bg-green-500 text-white font-bold py-3 rounded hover:bg-green-700 transition duration-300 flex items-center justify-center"
        >
          <i
            class="fas fa-check-circle mr-2 animate__animated animate__pulse animate__infinite animate__slower"
          ></i>
          ยืนยันการชำระเงิน
        </button>
      </div>

      <!-- Change Popup -->
      <div
        v-if="showPopup"
        class="fixed z-10 inset-0 overflow-y-auto"
        aria-labelledby="modal-title"
        role="dialog"
        aria-modal="true"
      >
        <div
          class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0"
        >
          <div class="fixed inset-0 transition-opacity" aria-hidden="true">
            <div class="absolute inset-0 bg-gray-500 opacity-75"></div>
          </div>
          <span
            class="hidden sm:inline-block sm:align-middle sm:h-screen"
            aria-hidden="true"
            >&#8203;</span
          >
          <div
            class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
          >
            <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
              <div class="sm:flex sm:items-start">
                <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                  <h3
                    class="text-lg leading-6 font-medium text-gray-900"
                    id="modal-title"
                  >
                    เลือกจำนวนเงินทอน
                  </h3>
                  <div class="mt-2">
                    <div class="grid grid-cols-4 gap-4">
                      <button
                        v-for="amount in changeAmounts"
                        :key="amount"
                        @click="showChangeAmountInput(amount)"
                        class="bg-green-500 text-white font-bold py-2 px-4 rounded hover:bg-green-700 transition duration-300 flex items-center justify-center"
                      >
                        <span>{{ amount }}</span>
                        <i
                          class="fas fa-coins ml-2 animate__animated animate__pulse animate__infinite animate__slower"
                        ></i>
                      </button>
                    </div>
                    <div class="mt-4" v-if="showChangeAmountInput">
                      <label class="block font-bold mb-2"
                        >จำนวนที่เลือก: {{ selectedChangeAmount }} บาท</label
                      >
                      <div class="flex items-center">
                        <input
                          type="number"
                          v-model="enteredChangeAmount"
                          class="border border-green-500 rounded-l px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-green-500"
                          placeholder="กรอกจำนวน"
                        />
                        <button
                          @click="confirmChangeAmount"
                          class="bg-green-500 text-white font-bold py-2 px-4 rounded-r hover:bg-green-700 transition duration-300"
                        >
                          ยืนยัน
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse">
              <button
                type="button"
                class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-600 text-base font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:ml-3 sm:w-auto sm:text-sm"
                @click="showPopup = false"
              >
                ปิด
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "PaymentScreen",
  data() {
    return {
      cartItems: [], // Your cart items data here
      receiptNumber: "", // Receipt number data
      receivedAmount: 0,
      changeCoins: 0,
      changeBanknotes: 0,
      showPopup: false,
      changeAmounts: [1, 2, 5, 10, 20, 50, 100, 500, 1000],
      selectedChangeAmount: 0,
      enteredChangeAmount: 0,
      showChangeAmountInput: false,
    };
  },
  computed: {
    total() {
      return this.cartItems.reduce((total, item) => {
        return total + item.price * item.quantity;
      }, 0);
    },
  },
  methods: {
    showChangePopup() {
      this.showPopup = true;
    },
    showChangeAmountInput(amount) {
      this.selectedChangeAmount = amount;
      this.showChangeAmountInput = true;
    },
    confirmChangeAmount() {
      const change = this.receivedAmount - this.total;
      if (this.enteredChangeAmount > change) {
        alert("จำนวนเงินทอนที่ใส่มากเกินไป");
      } else if (this.enteredChangeAmount < change) {
        alert("จำนวนเงินทอนที่ใส่น้อยเกินไป");
      } else {
        this.calculateChange(this.enteredChangeAmount);
        this.showPopup = false;
        this.showChangeAmountInput = false;
        this.enteredChangeAmount = 0;
      }
    },
    calculateChange(changeAmount) {
      const change = changeAmount;
      const coinsToReturn = [1, 2, 5, 10];
      const banknotesToReturn = [20, 50, 100, 500, 1000];
      let remainingChange = change;
      let coinsChange = 0;
      let banknotesChange = 0;

      for (const coin of coinsToReturn.reverse()) {
        const coinCount = Math.floor(remainingChange / coin);
        coinsChange += coinCount * coin;
        remainingChange -= coinCount * coin;
      }

      for (const banknote of banknotesToReturn.reverse()) {
        const banknoteCount = Math.floor(remainingChange / banknote);
        banknotesChange += banknoteCount * banknote;
        remainingChange -= banknoteCount * banknote;
      }

      this.changeCoins = coinsChange;
      this.changeBanknotes = banknotesChange;
    },
    confirmPayment() {
      // Handle payment confirmation logic here
      console.log("Payment confirmed!");
      // Reset payment data
      this.receivedAmount = 0;
      this.changeCoins = 0;
      this.changeBanknotes = 0;
      this.selectedChangeAmount = 0;
      this.enteredChangeAmount = 0;
      this.showChangeAmountInput = false;
    },
  },
};
</script>

<style>
@import "https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@5.15.4/css/all.min.css";
</style>
