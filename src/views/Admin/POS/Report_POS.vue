<template>
  <div
    class="popup-overlay fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
  >
    <div class="pos-screen bg-white rounded-lg shadow-lg max-w-md mx-auto p-6">
      <div class="popup-header flex justify-between items-center mb-4">
        <h2 class="text-2xl font-bold">เลือกวิธีการชำระเงิน</h2>
        <button
          @click="$emit('close')"
          type="button"
          class="inline-flex text-red-500 hover:text-red-700 border-2 border-red-500 hover:border-red-700 rounded-full p-1 focus:outline-none focus:ring-2 focus:ring-offset-2"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>
      <div class="button-grid grid grid-cols-2 gap-4 mb-6">
        <div
          v-for="(button, index) in buttons"
          :key="index"
          class="button-item bg-green-500 rounded-lg p-4"
          :style="{ backgroundColor: button.color }"
        >
          <button
            @click="selectPaymentMethod(button.label)"
            class="w-full flex flex-col items-center text-white font-bold"
          >
            <i :class="`fas fa-${button.icon} text-3xl mb-2`"></i>
            <span>{{ button.label }}</span>
          </button>
        </div>
      </div>
      <div class="total-display text-right font-bold mb-4">
        Total: {{ total.toFixed(2) }}
      </div>
      <div v-if="selectedPaymentMethod">
        <div v-if="selectedPaymentMethod === 'เงินสด'">
          <p class="text-2xl font-bold mb-2">
            จำนวนเงินที่ต้องจ่าย: {{ total.toFixed(2) }}
          </p>
          <input
            type="number"
            v-model="cashAmount"
            placeholder="กรอกจำนวนเงินสด"
            class="cash-input w-full border border-gray-300 rounded-lg px-4 py-2 mb-4 font-bold text-3xl"
          />
          <p class="text-xl font-bold">หมายเลขคิว: {{ queueNumber }}</p>
          <p v-if="cashAmount > total" class="text-xl font-bold">
            เงินทอน: {{ (cashAmount - total).toFixed(2) }}
          </p>
        </div>
        <div v-else-if="selectedPaymentMethod === 'โอนเงิน'">
          <p class="text-2xl font-bold">
            จำนวนเงินที่ต้องจ่าย: {{ total.toFixed(2) }}
          </p>
          <p class="text-xl font-bold">หมายเลขคิว: {{ queueNumber }}</p>
        </div>
      </div>
      <button
        class="enter-button w-full bg-green-500 text-white py-2 rounded-lg font-bold"
        @click="confirmPayment"
      >
        Enter
      </button>

      <!-- Modal for selecting next action -->
      <div
        v-if="showOptionModal"
        class="option-modal fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      >
        <div class="option-modal-content bg-white rounded-lg shadow-lg p-6">
          <h2 class="text-2xl font-bold mb-4">กรุณาเลือกทำรายการ</h2>
          <button
            @click="printReceipt"
            class="bg-green-500 text-white py-2 px-4 rounded-lg mr-2 mb-2"
          >
            พิมพ์ใบคิว
          </button>
          <button
            @click="continueTransaction"
            class="bg-green-500 text-white py-2 px-4 rounded-lg mr-2 mb-2"
          >
            ทำรายการต่อ
          </button>
          <button
            @click="goHome"
            class="bg-green-500 text-white py-2 px-4 rounded-lg mb-2"
          >
            หน้าหลัก
          </button>
        </div>
      </div>

      <!-- Modal for printing receipt -->
      <div
        v-if="showReceiptModal"
        class="receipt-modal fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      >
        <div class="receipt-modal-content bg-white rounded-lg shadow-lg p-6">
          <h2 class="text-2xl font-bold mb-4">ใบเสร็จรับเงิน</h2>
          <p class="mb-2">หมายเลขคิว: {{ queueNumber }}</p>
          <p class="mb-2">จำนวนเงินที่ชำระ: {{ total.toFixed(2) }}</p>
          <p v-if="selectedPaymentMethod === 'เงินสด'" class="mb-4">
            เงินทอน: {{ (cashAmount - total).toFixed(2) }}
          </p>
          <button
            @click="closeReceiptModal"
            class="bg-green-500 text-white py-2 px-4 rounded-lg"
          >
            ปิด
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Swal from "sweetalert2";

export default {
  name: "ReportPopup",
  props: {
    total: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      buttons: [
        { label: "เงินสด", icon: "money-bill-wave", color: "#4CAF50" },
        { label: "โอนเงิน", icon: "university", color: "#4CAF50" },
      ],
      selectedPaymentMethod: "เงินสด", // Set default payment method to cash
      cashAmount: null,
      queueNumber: null, // Initialize queue number to null
      nextQueueNumber: 0, // Initialize next queue number to 0
      showOptionModal: false,
      showReceiptModal: false,
    };
  },
  mounted() {
    this.generateQueueNumber(); // Generate initial queue number
  },
  methods: {
    selectPaymentMethod(method) {
      this.selectedPaymentMethod = method;
      if (method === "เงินสด") {
        this.cashAmount = null;
      }
      this.generateQueueNumber(); // Generate queue number when payment method is selected
    },
    generateQueueNumber() {
      this.queueNumber = this.nextQueueNumber.toString().padStart(6, "0"); // Convert to string and pad with leading zeros
      this.nextQueueNumber++; // Increment the next queue number
    },
    confirmPayment() {
      if (this.selectedPaymentMethod === "เงินสด") {
        if (this.cashAmount >= this.total) {
          Swal.fire({
            title: `ยืนยันการชำระเงิน ${this.total.toFixed(2)} บาท?`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "ยืนยัน",
            cancelButtonText: "ยกเลิก",
          }).then((result) => {
            if (result.isConfirmed) {
              // Code for completing cash payment
              Swal.fire({
                title: `ชำระเงินสำเร็จ เงินทอน: ${(
                  this.cashAmount - this.total
                ).toFixed(2)} บาท`,
                icon: "success",
              }).then(() => {
                this.showOptionModal = true;
                this.resetData();
              });
            }
          });
        } else {
          // If cash amount is not enough
          Swal.fire({
            title: "จำนวนเงินสดไม่เพียงพอ",
            icon: "error",
          });
        }
      } else if (this.selectedPaymentMethod === "โอนเงิน") {
        Swal.fire({
          title: `ยืนยันการโอนเงินจำนวน ${this.total.toFixed(2)} บาท?`,
          icon: "warning",
          showCancelButton: true,
          confirmButtonText: "ยืนยัน",
          cancelButtonText: "ยกเลิก",
        }).then((result) => {
          if (result.isConfirmed) {
            // Code for completing bank transfer payment
            Swal.fire({
              title: `กรุณาโอนเงินจำนวน ${this.total.toFixed(2)} บาท`,
              icon: "info",
            }).then(() => {
              this.showOptionModal = true;
            });
          }
        });
      } else {
        // If payment method is not selected
        Swal.fire({
          title: "กรุณาเลือกวิธีการชำระเงิน",
          icon: "warning",
        });
      }
    },

    resetData() {
      this.selectedPaymentMethod = "เงินสด";
      this.cashAmount = null;
      this.queueNumber = null;
    },
    printReceipt() {
      this.showReceiptModal = true; // Show modal for printing receipt
      this.showOptionModal = false; // Hide modal for selecting next action
    },
    continueTransaction() {
      // Code for continuing the transaction
      this.$swal({
        title: "ทำรายการตอไป",
        icon: "info",
      });
      this.showOptionModal = false; // Hide modal for selecting next action
    },
    goHome() {
      // Code for going to the home page
      this.$swal({
        title: "กลับสู่หน้าหลัก",
        icon: "info",
      });
      this.showOptionModal = false; // Hide modal for selecting next action
    },
    closeReceiptModal() {
      this.showReceiptModal = false; // Hide modal for printing receipt
    },
  },
};
</script>
