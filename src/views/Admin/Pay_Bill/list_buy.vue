<template>
  <div>
    <div class="px-3 py-4 flex justify-center text-2xl">
      <div class="overflow-auto col-span-12">
        <table class="w-full text-md bg-green-300 shadow-md rounded mb-4">
          <tbody class="border border-green-300">
            <tr class="border-b">
              <th class="text-left p-3 px-5">ลำดับ</th>
              <th class="text-left p-3 px-5">ชื่อสินค้า</th>
              <th class="text-left p-3 px-5">ราคา</th>
              <th class="text-left p-3 px-5">จำนวน</th>
              <th class="text-left p-3 px-5">ราคารวม</th>
              <th class="flex justify-center p-3 px-5">จัดการ</th>
            </tr>
            <tr
              v-for="(product, index) in displayedProducts"
              :key="product._id"
              class="border-b hover:bg-gray-300 bg-gray-100 border border-green-300"
            >
              <td class="p-3 px-5">{{ index + 1 }}</td>
              <td class="p-3 px-5">{{ product.name }}</td>
              <td class="p-3 px-5">{{ product.price }}</td>
              <td class="p-3 px-5">{{ product.quantity }}</td>
              <td class="p-3 px-5">{{ product.total }}</td>
              <td class="p-3 px-5 flex justify-center">
                <button
                  @click="removeProduct(product)"
                  type="button"
                  class="text-sm bg-red-500 hover:bg-red-700 text-white py-1 px-2 ml-3 rounded focus:outline-none focus:shadow-outline"
                >
                  ลบ
                </button>
              </td>
            </tr>
          </tbody>
        </table>
        <div
          id="cart-table-header"
          class="w-full text-primary font-semibold flex"
        >
          <div class="w-full lg:w-4/6 p-2 border border-l-0 border-t-0">
            Product
          </div>
          <div class="hidden lg:flex lg:w-1/6 p-2 border-b border-t-0">
            Quantity
          </div>
          <div class="hidden lg:flex lg:w-1/6 p-2 border border-r-0 border-t-0">
            Total
          </div>
        </div>
        <div
          id="cart-products-table"
          class="flex flex-auto flex-col overflow-auto"
        >
          <div class="text-primary flex">
            <div class="w-full text-center py-4 border-b">
              <h3>No products added...</h3>
            </div>
          </div>
        </div>
        <div id="cart-products-summary" class="flex">
          <table class="table ns-table w-full text-sm">
            <tr>
              <td width="200" class="border p-2">
                <a
                  class="cursor-pointer outline-none border-dashed py-1 border-b border-info-primary text-sm"
                  >Customer: N/A</a
                >
              </td>
              <td width="200" class="border p-2">Sub Total</td>
              <td width="200" class="border p-2 text-right">
                {{ subTotal }}
              </td>
            </tr>
            <!---->
            <tr>
              <td width="200" class="border p-2">
                <a
                  class="cursor-pointer outline-none border-dashed py-1 border-b border-info-primary text-sm"
                  >Type: N/A</a
                >
              </td>
              <td width="200" class="border p-2">
                <span>Discount</span>
                ><!----><!---->
              </td>
              <td width="200" class="border p-2 text-right">
                <a
                  class="cursor-pointer outline-none border-dashed py-1 border-b border-info-primary text-sm"
                  >USD0</a
                >
              </td>
            </tr>
            <!---->
            <tr class="success">
              <td width="200" class="border p-2"><!----></td>
              <td width="200" class="border p-2">Total</td>
              <td width="200" class="border p-2 text-right">{{ total }}</td>
            </tr>
          </table>
          <!---->
        </div>
        <div
          class="h-16 flex flex-shrink-0 border-t border-box-edge"
          id="cart-bottom-buttons"
        >
          <!---->
          <div
            id="pay-button"
            class="flex-shrink-0 w-1/4 flex items-center font-bold cursor-pointer justify-center bg-green-500 text-white hover:bg-green-600 border-r border-green-600 flex-auto"
            settings="[object Object]"
          >
            <i class="mr-2 text-2xl lg:text-xl las la-cash-register"></i
            ><span class="text-lg hidden md:inline lg:text-2xl">Pay</span>
          </div>
          <div
            id="hold-button"
            class="flex-shrink-0 w-1/4 flex items-center font-bold cursor-pointer justify-center bg-blue-500 text-white border-r hover:bg-blue-600 border-blue-600 flex-auto"
            settings="[object Object]"
          >
            <i class="mr-2 text-2xl lg:text-xl las la-pause"></i
            ><span class="text-lg hidden md:inline lg:text-2xl">Hold</span>
          </div>
          <div
            id="discount-button"
            class="flex-shrink-0 w-1/4 flex items-center font-bold cursor-pointer justify-center border-r border-box-edge flex-auto"
          >
            <i class="mr-2 text-2xl lg:text-xl las la-percent"></i
            ><span class="text-lg hidden md:inline lg:text-2xl">Discount</span>
          </div>
          <div
            id="void-button"
            class="flex-shrink-0 w-1/4 flex items-center font-bold cursor-pointer justify-center bg-red-500 text-white border-box-edge hover:bg-red-600 flex-auto"
          >
            <i class="mr-2 text-2xl lg:text-xl las la-trash"></i
            ><span class="text-lg hidden md:inline lg:text-2xl">Void</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import mitt from "mitt";

const emitter = mitt();

export default {
  name: "List_Buy",
  data() {
    return {
      products: [],
      selectedValues: {},
    };
  },
  created() {
    emitter.on("productSelected", ({ key, value }) => {
      const product = {
        _id: Date.now(), // กำหนดค่า _id ชั่วคราว
        name: key,
        price: value,
        quantity: 1,
        total: value,
      };
      this.products.push(product);
      this.calculateTotals();
    });
  },
  beforeUnmount() {
    emitter.off("productSelected");
  },
  computed: {
    displayedProducts() {
      return this.products;
    },
    subTotal() {
      return this.products.reduce((total, product) => total + product.total, 0);
    },
    total() {
      return this.subTotal; // ในที่นี้ยังไม่มีการคำนวณส่วนลด
    },
  },
  methods: {
    removeProduct(product) {
      const index = this.products.indexOf(product);
      if (index !== -1) {
        this.products.splice(index, 1);
        this.calculateTotals();
      }
    },
    calculateTotals() {
      this.products.forEach((product) => {
        product.total = product.price * product.quantity;
      });
    },
  },
};
</script>
