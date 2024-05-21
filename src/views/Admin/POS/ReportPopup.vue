<template>
  <div class="receipt-container pos-container">
    <h1 class="text-center text-3xl font-bold mb-4">บัตรคิว</h1>
    <div class="flex justify-between mb-4">
      <div>
        <h1 class="font-bold text-2xl">เลขที่บัตรคิว:</h1>
        <p>{{ queueNumber }}</p>
        <p>{{ formattedDate }}</p>
      </div>
    </div>
    <div class="border-b-2 border-green-500 mb-4"></div>
    <div>
      <p class="font-bold">รายการสินค้า:</p>
      <ul>
        <li v-for="(item, index) in cartItems" :key="index">
          <span>{{ item.name }}</span>
          <span>{{ item.quantity }} กก.</span>
          <span>{{ item.totalPrice }} บาท</span>
        </li>
      </ul>
    </div>
    <div class="mt-4 border-t-2 border-green-500 pt-4 flex justify-end">
      <p class="font-bold">รวมทั้งสิ้น: {{ formattedTotal }} บาท</p>
    </div>
    <div class="flex justify-center mt-4 border-2 border-red-500 p-2">
      <button @click="printReceipt">พิมพ์</button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    cartItems: {
      type: Array,
      required: true,
    },
  },
  computed: {
    formattedTotal() {
      return this.cartItems
        .reduce((acc, item) => acc + parseFloat(item.totalPrice), 0)
        .toFixed(2);
    },
    formattedDate() {
      const options = {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      };
      return new Date().toLocaleDateString("th-TH", options);
    },
  },
  methods: {
    printReceipt() {
      const receiptContent = `สินค้า:
${this.cartItems
  .map((item) => `${item.name} จำนวน ${item.quantity}`)
  .join("\n")}

รวม: ${this.formattedTotal} THB`;

      const printWindow = window.open("", "", "height=800,width=800");
      printWindow.document.write(`
    <html>
      <head>
        <title>บัตรคิว</title>
        <style>
          body { font-family: Arial, sans-serif; margin: 0; padding: 0; }
          .receipt-container {
            width: 8in;
            height: 8in;
            padding: 0.5in;
            box-sizing: border-box;
            border: 1px solid #000;
          }
          .receipt-header, .receipt-footer {
            text-align: center;
            margin-bottom: 1em;
          }
          .receipt-items {
            border-top: 1px solid #000;
            border-bottom: 1px solid #000;
            margin-bottom: 1em;
            padding: 0.5em 0;
          }
          .receipt-item {
            display: flex;
            justify-content: space-between;
            margin-bottom: 0.5em;
          }
          @media print {
            body, html { margin: 0; padding: 0; }
            .receipt-container {
              width: 8in;
              height: 8in;
              margin: 0 auto;
              padding: 0;
              box-shadow: none;
              border: none;
            }
          }
        </style>
      </head>
      <body>
        <div class="receipt-container">
          <div class="receipt-header">
            <h1>บัตรคิว</h1>
          </div>
          <div class="receipt-items">
            ${this.cartItems
              .map(
                (item) => `
              <div class="receipt-item">
                <span>${item.name}</span>
                <span>จำนวน ${item.quantity}</span>
              </div>
            `
              )
              .join("")}
          </div>
          <div class="receipt-footer">
            <h2>รวม: ${this.formattedTotal} THB</h2>
          </div>
        </div>

      </body>
    </html>
  `);

      printWindow.document.close();
      printWindow.focus();
      printWindow.print();
      printWindow.close();
    },
  },
};
</script>

<style scoped>
.receipt-container {
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  border: 2px solid #4caf50;
  border-radius: 8px;
  font-family: Arial, sans-serif;
}

.receipt-container h1 {
  color: #4caf50;
}

.receipt-container p {
  margin: 5px 0;
}

.receipt-container ul {
  padding: 0;
  margin: 5px 0;
}

.receipt-container li {
  list-style: none;
  margin-bottom: 5px;
  display: flex;
  justify-content: space-between;
}

.receipt-container .border-b-2 {
  border-bottom: 2px solid #4caf50;
}

.receipt-container .border-t-2 {
  border-top: 2px solid #4caf50;
}
</style>
