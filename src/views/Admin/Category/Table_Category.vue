<template>
  <!-- component -->
  <div class="text-2xl">
    <div class="p-4">
      <h1 class="text-3xl">สินค้า</h1>
    </div>

    <div class="flex justify-end py-2 px-3">
      <div class="flex justify-start space-x-4">
        <div class="relative max-w-sm">
          <input
            type="text"
            v-model="searchText"
            placeholder="ค้นหาสินค้า..."
            class="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent w-full"
            @input="searchPostById"
          />
          <div
            class="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none"
          >
            <svg
              class="h-5 w-5 text-gray-400"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
          </div>
        </div>
      </div>
      <button
        @click="openAddPopup()"
        class="focus:ring-2 focus:ring-offset-2 mt-4 sm:mt-0 inline-flex items-start justify-start px-6 py-3 bg-indigo-600 hover:bg-indigo-500 focus:outline-none rounded"
      >
        <p class="text-sm font-medium leading-none text-white">
          เพิ่มประเภทสินค้า
        </p>
      </button>
      <Add v-if="showAddPopup" @close="closeAddPopup" @add="addCategory" />

      <button
        @click="openAddPopup2()"
        class="focus:ring-2 focus:ring-offset-2 mt-4 sm:mt-0 inline-flex items-start justify-start px-6 py-3 bg-orange-600 hover:bg-orange-500 focus:outline-none rounded"
      >
        <p class="text-sm font-medium leading-none text-white">
          เพิ่มประเภทสินค้าย่อย
        </p>
      </button>
      <Add2 v-if="showAddPopup2" @close="closeAddPopup2" @add="addCategory2" />
    </div>

    <div class="px-4 flex justify-center">
      <div class="overflow-x-auto w-full">
        <table class="w-full text-md bg-green-300 shadow-md rounded mb-4">
          <thead>
            <tr class="border-b">
              <th class="text-left p-3 px-5">ลำดับ</th>
              <th class="text-left p-3 px-5">ชื่อสินค้า</th>
              <th class="text-left p-3 px-5">ประเภทสินค้า</th>
              <th class="text-left p-3 px-5">ประเภทย่อยสินค้า</th>
              <th class="text-left p-3 px-5">ราคาต่อหน่วย/กก.</th>
              <th class="flex justify-center p-3 px-5">จัดการ</th>
            </tr>
          </thead>
          <tbody class="border border-green-300">
            <tr class="border-b">
              <td class="border border-gray-300 px-4 py-2">
                <input
                  type="text"
                  name="ลำดับ"
                  id="ลำดับ"
                  class="p-2 rounded border bg-white"
                />
              </td>
              <td class="border border-gray-300 px-4 py-2">
                <input
                  type="text"
                  name="ชื่อสินค้า"
                  id="ชื่อสินค้า"
                  class="p-2 rounded border bg-white"
                />
              </td>
              <td class="border border-gray-300 px-4 py-2">
                <input
                  type="text"
                  name="ประเภทสินค้า"
                  id="ประเภทสินค้า"
                  placeholder="เลือกประเภทสินค้า"
                  class="p-2 rounded border bg-white"
                />
              </td>
              <td class="border border-gray-300 px-4 py-2">
                <input
                  type="text"
                  name="ประเภทย่อยสินค้า"
                  id="ประเภทย่อยสินค้า"
                  placeholder="เลือกประเภทสินค้าย่อย"
                  class="p-2 rounded border bg-white"
                />
              </td>
              <td class="border border-gray-300 px-4 py-2">
                <input
                  type="number"
                  name="ราคาต่อหน่วย"
                  id="ราคาต่อหน่วย"
                  class="p-2 rounded border bg-white"
                />
              </td>
              <td class="border border-gray-300 px-4 py-2">
                <button
                  @click="addProduct"
                  class="p-2 rounded border bg-blue-400 hover:bg-blue-700"
                >
                  เพิ่ม
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>

  <!-- Pagination Controls -->
  <div class="fixed bottom-0 left-0 right-0 px-3 bg-green-200">
    <div class="container md:mb-8 pt-8 mx-auto flex justify-center select-none">
      <a
        @click="prevPage"
        :class="{ 'cursor-not-allowed text-gray-500': currentPage === 1 }"
        class="block border border-y-amber-900 rounded-l px-4 py-2 hover:bg-gray-200 text-gray-900"
        href="#"
        rel="prev"
      >
        &larr; ก่อนหน้า
      </a>

      <a
        v-for="page in lastPage"
        :key="page"
        @click="goToPage(page)"
        :class="{
          'bg-indigo-500 text-white': page === currentPage,
          'hover:bg-gray-500 text-gray-600': page !== currentPage,
        }"
        class="block border border-l-0 border-r-0 px-4 py-2 cursor-pointer"
        href="#"
      >
        {{ page }}
      </a>

      <a
        @click="nextPage"
        :class="{
          'cursor-not-allowed text-gray-500': currentPage === lastPage,
        }"
        class="block border border-y-amber-900 px-4 py-2 hover:bg-gray-200 text-gray-900"
        href="#"
        rel="next"
      >
        ถัดไป &rarr;
      </a>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Swal from "sweetalert2";
import Add from "./Add_Category.vue";
import Add2 from "./Add_Category2.vue";
import Edit from "./Edit_Category.vue";

export default {
  components: {
    Add,
    Add2,
    Edit,
  },

  data() {
    return {
      products: [],
      showAddPopup: false,
      showAddPopup2: false,
      showEditPopup: false,
      selectedProduct: null,
      // ข้อมูล pagination
      currentPage: 1,
      perPage: 10, // จำนวนรายการต่อหน้า
    };
  },
  created() {
    this.fetchProducts();
  },

  computed: {
    totalProducts() {
      return this.products.length;
    },
    lastPage() {
      return Math.ceil(this.totalProducts / this.perPage);
    },
    displayedProducts() {
      const start = (this.currentPage - 1) * this.perPage;
      const end = start + this.perPage;
      return this.products.slice(start, end);
    },
  },

  methods: {
    prevPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
      }
    },
    nextPage() {
      if (this.currentPage < this.lastPage) {
        this.currentPage++;
      }
    },

    async fetchProducts() {
      try {
        const response = await axios.get(import.meta.env.VITE_API_PRODUCTS);
        if (
          response.status === 200 &&
          response.data &&
          Array.isArray(response.data.data)
        ) {
          this.products = response.data.data;
        } else {
          console.error(
            "Invalid response format or empty data array:",
            response.data
          );
        }
      } catch (error) {
        console.error("Error fetching products:", error);
        this.products = [];
      }
    },

    async deleteProduct(_id) {
      const confirmResult = await Swal.fire({
        icon: "warning",
        title: "คุณแน่ใจหรือไม่?",
        text: "คุณต้องการลบสินค้านี้หรือไม่?",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#3085d6",
        confirmButtonText: "ใช่, ลบเลย!",
        cancelButtonText: "ยกเลิก",
      });

      if (confirmResult.isConfirmed) {
        try {
          const response = await axios.delete(
            import.meta.env.VITE_API_PRODUCTS + `${_id}`
          );
          if (response.status === 200) {
            this.fetchProducts();
            Swal.fire({
              icon: "success",
              title: "ลบสินค้าสำเร็จ",
              showConfirmButton: true,
            });
          } else {
            Swal.fire({
              icon: "error",
              title: "เกิดข้อผิดพลาดในการลบสินค้า",
              text: "กรุณาลองใหม่อีกครั้ง",
            });
          }
        } catch (error) {
          console.error("Error deleting product:", error);
          Swal.fire({
            icon: "error",
            title: "เกิดข้อผิดพลาดในการลบสินค้า",
            text: "กรุณาลองใหม่อีกครั้ง",
          });
        }
      }
    },

    openAddPopup() {
      this.showAddPopup = true;
    },

    closeAddPopup() {
      this.showAddPopup = false;
    },
    openAddPopup2() {
      this.showAddPopup2 = true;
    },

    closeAddPopup2() {
      this.showAddPopup2 = false;
    },

    addCategory(product) {
      this.products.push(product);
      this.closeAddPopup();
    },
    addCategory2(product) {
      this.products.push(product);
      this.closeAddPopup2();
    },

    editProduct(product) {
      this.selectedProduct = product;
      this.showEditPopup = true;
    },

    closeEditPopup() {
      this.showEditPopup = false;
    },

    async updateProduct(updatedProduct) {
      const index = this.products.findIndex(
        (prod) => prod._id === updatedProduct._id
      );
      if (index !== -1) {
        this.products.splice(index, 1, updatedProduct);
      }
      this.closeEditPopup();
    },
  },
};
</script>
