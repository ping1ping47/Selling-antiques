<template>
  <div class="popup-overlay">
    <div class="pos-screen" :style="{ backgroundColor: bgColor }">
      <div class="popup-header">
        <h2 class="text-2xl">เลือกวิธีการชำระเงิน</h2>
        <button
          @click="$emit('close')"
          type="button"
          class="inline-flex text-red-500 hover:text-red-700 border-2 border-red-500 hover:border-red-700 rounded-full p-1 focus:outline-none focus:ring-2 focus:ring-offset-2 sm:mt-0 sm:w-auto sm:text-sm"
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
      <div class="button-grid">
        <div
          v-for="(button, index) in buttons"
          :key="index"
          class="button-item"
          :style="{ backgroundColor: button.color }"
        >
          <button @click="selectPaymentMethod(button.label)">
            <i
              :class="`fas fa-${button.icon}`"
              :style="{ color: iconColor }"
            ></i>
            <span :style="{ color: textColor }">{{ button.label }}</span>
          </button>
        </div>
      </div>
      <div class="total-display" :style="{ color: textColor }">
        Total: {{ total.toFixed(2) }}
      </div>
      <div v-if="selectedPaymentMethod">
        <div v-if="selectedPaymentMethod === 'เงินสด'">
          <p class="text-2xl font">
            จำนวนเงินที่ต้องจ่าย: {{ total.toFixed(2) }}
          </p>
          <input
            type="number"
            v-model="cashAmount"
            placeholder="กรอกจำนวนเงินสด"
            class="cash-input h-15 w-full border border-gray-300 rounded-lg px-4 py-2 mb-4 font-bold text-3xl"
          />
        </div>
        <div v-else-if="selectedPaymentMethod === 'โอนเงิน'">
          <p class="text-2xl font">
            จำนวนเงินที่ต้องจ่าย: {{ total.toFixed(2) }}
          </p>
        </div>
      </div>
      <button
        class="enter-button"
        :style="{ backgroundColor: accentColor, color: textColor }"
        @click="confirmPayment"
      >
        Enter
      </button>
    </div>
  </div>
</template>

<script>
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
      bgColor: "#FFFFFF", // เปลี่ยนสีพื้นหลังเป็นเขียว
      textColor: "#FFFFFF", // เปลี่ยนสีข้อความเป็นขาว
      accentColor: "#B6C81D", // เปลี่ยนสีเน้นเป็นเขียว
      buttonBgImage: "button-bg",
      buttons: [
        { label: "เงินสด", icon: "money-bill-wave", color: "#4CAF50" },
        { label: "โอนเงิน", icon: "university", color: "#4CAF50" },
      ],
      selectedPaymentMethod: null,
      cashAmount: null,
    };
  },
  methods: {
    selectPaymentMethod(method) {
      this.selectedPaymentMethod = method;
      if (method === "เงินสด") {
        this.cashAmount = null;
      }
    },
    confirmPayment() {
      if (this.selectedPaymentMethod === "เงินสด") {
        if (this.cashAmount >= this.total) {
          alert(
            `ชำระเงินสำเร็จ เงินทอน: ${(this.cashAmount - this.total).toFixed(
              2
            )}`
          );
        } else {
          alert("จำนวนเงินสดไม่เพียงพอ");
        }
      } else if (this.selectedPaymentMethod === "โอนเงิน") {
        alert(`กรุณาโอนเงินจำนวน ${this.total.toFixed(2)} บาท`);
      } else {
        alert("กรุณาเลือกวิธีการชำระเงิน");
      }
    },
    getRandomRotation() {
      return Math.random() * 20 - 10;
    },
    getRandomSkew() {
      return Math.random() * 10;
    },
  },
};
</script>

<style scoped>
.popup-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(5px);
  display: flex;
  justify-content: center;
  align-items: center;
}

.pos-screen {
  padding: 2rem;
  border-radius: 1rem;
  box-shadow: 0 0 1rem rgba(0, 0, 0, 0.2);
  max-width: 600px;
  width: 100%;
  background-color: white;
}

.popup-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.button-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
  margin-bottom: 2rem;
}

.button-item {
  padding: 1rem;
  border-radius: 0.5rem;
  background-size: cover;
  background-position: center;
}

.button-item button {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: none;
  border: none;
  font-size: 1.2rem;
  font-weight: bold;
  cursor: pointer;
}

.total-display {
  font-size: 1.5rem;
  font-weight: bold;
  text-align: right;
  margin-bottom: 1rem;
}

.enter-button {
  width: 100%;
  padding: 1rem;
  border: none;
  border-radius: 0.5rem;
  font-size: 1.2rem;
  font-weight: bold;
  cursor: pointer;
}

.close-button {
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
}

.close-button i {
  color: #333;
  font-size: 1.5rem;
}

.close-button i:hover {
  color: #000;
}
</style>
