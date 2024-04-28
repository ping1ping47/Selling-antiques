<template>
  <div>
    <div class="flex justify-start z-10">
      <div class="relative">
        <div class="inline-block">
          <div class="dropdown relative">
            <button
              class="text-white bg-green-500 hover:bg-green-700 focus:ring-4 font-medium rounded-lg text-xl px-5 py-2.5 text-center inline-flex items-center transition-all duration-300 ease-in-out"
              type="button"
              @click.stop="toggleDropdown"
            >
              <span class="mr-2">เลือกประเภทสินค้า</span>
              <svg
                class="w-4 h-4 transition-transform duration-300 ease-in-out transform"
                :class="{ 'rotate-180': isOpen }"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M6 8l4 4 4-4"
                />
              </svg>
            </button>

            <div
              v-show="isOpen"
              class="dropdown-menu absolute z-10 bg-green-100 divide-y divide-gray-700 rounded-lg shadow-lg w-64 transition-all duration-300 ease-in-out transform origin-top-right"
              :class="{
                'scale-y-0 opacity-0': !isOpen,
                'scale-y-100 opacity-100': isOpen,
              }"
            >
              <ul
                class="py-2 text-sm text-black"
                aria-labelledby="dropdownButton"
              >
                <li v-for="category in categories" :key="category.name">
                  <a
                    href="#"
                    class="flex items-center justify-between w-full px-4 py-2 hover:bg-green-700 hover:text-white transition-colors duration-300 ease-in-out"
                    @click.prevent="toggleSubMenu(category.name)"
                  >
                    <span>{{ category.name }}</span>
                    <svg
                      class="w-4 h-4 ml-2 transition-transform duration-300 ease-in-out transform"
                      :class="{
                        'rotate-90': selectedPosition === category.name,
                      }"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 20 20"
                    >
                      <path
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </a>
                  <ul
                    v-if="selectedPosition === category.name"
                    class="absolute left-full top-0 pr-4 py-2 bg-green-100 rounded-r-lg transition-all duration-300 ease-in-out"
                    :class="{
                      'h-0 overflow-hidden': selectedPosition !== category.name,
                      'h-auto': selectedPosition === category.name,
                    }"
                  >
                    <li
                      v-for="subCategory in category.subCategories"
                      :key="subCategory.name"
                    >
                      <!-- เพิ่มคำอธิบายชื่อประเภทสินค้าย่อย -->
                      <span class="block px-4 py-2 font-semibold">{{
                        subCategory.name
                      }}</span>
                      <ul>
                        <li
                          v-for="product in subCategory.products"
                          :key="product.name"
                        >
                          <a
                            href="#"
                            class="block pl-8 pr-4 py-2 hover:bg-gray-700 hover:text-white transition-colors duration-300 ease-in-out"
                            @click="handleSelectProduct(product)"
                          >
                            {{ product.name }} - {{ product.price }}
                          </a>
                        </li>
                      </ul>
                    </li>
                  </ul>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="mt-6">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div
          v-for="(value, key) in selectedProduct"
          :key="key"
          class="bg-white rounded-lg shadow-md overflow-hidden"
        >
          <div class="p-4">
            <h3 class="text-lg font-semibold mb-2">{{ key }}</h3>
            <p class="text-gray-600">{{ value }}</p>
          </div>
          <div class="bg-gray-200 px-4 py-3">
            <button
              @click="selectProductValue(selectedProduct)"
              class="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded transition duration-300"
            >
              เพิ่มสินค้า
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";

export default {
  name: "Button_Type",
  data() {
    return {
      isOpen: false,
      positions: [],
      selectedPosition: null,
      selectedProduct: null,
      categories: [
        {
          name: "กระดาษ", // ชื่อประเภทสินค้า
          subCategories: [
            {
              name: "กระดาษแข็ง", // ชื่อย่อยของประเภทสินค้า
              products: [
                { name: "กระดาษแข็ง X", price: 20 }, // ชื่อสินค้าที่ต้องแสดง
                { name: "กระดาษแข็ง Y", price: 25 }, // ชื่อสินค้าที่ต้องแสดง
              ],
            },
            {
              name: "กระดาษอ่อน", // ชื่อย่อยของประเภทสินค้า
              products: [
                { name: "A4", price: 10 }, // ชื่อสินค้าที่ต้องแสดง
                { name: "กล่องกระดาษ", price: 15 }, // ชื่อสินค้าที่ต้องแสดง
              ],
            },
          ],
        },
        {
          name: "กระดาษอื่นๆ", // ชื่อประเภทสินค้า
          subCategories: [
            {
              name: "กระดาษอ่อนอื่นๆ", // ชื่อย่อยของย่อยของประเภทสินค้า
              products: [
                { name: "กระดาษอ่อน Z", price: 12 }, // ชื่อสินค้าที่ต้องแสดง
                { name: "กระดาษอ่อน W", price: 14 }, // ชื่อสินค้าที่ต้องแสดง
              ],
            },
            {
              name: "กระดาษแข็งอื่นๆ", // ชื่อย่อยของย่อยของประเภทสินค้า
              products: [
                { name: "กระดาษแข็ง M", price: 22 }, // ชื่อสินค้าที่ต้องแสดง
                { name: "กระดาษแข็ง N", price: 27 }, // ชื่อสินค้าที่ต้องแสดง
              ],
            },
          ],
        },
      ],
    };
  },
  mounted() {
    this.fetchPositions();
  },

  methods: {
    toggleDropdown() {
      this.isOpen = !this.isOpen;
      if (!this.isOpen) {
        this.selectedPosition = null;
      }
    },
    toggleSubMenu(position) {
      this.selectedPosition =
        this.selectedPosition === position ? null : position;
    },
    handleSelectProduct(product) {
      this.selectedProduct = product;
    },
    selectProductValue(product) {
      this.setSelectedProduct(product);
      console.log("เพิ่มสินค้า:", product);
    },
    fetchPositions() {
      this.positions = this.categories.map((category) => category.name);
    },
    ...mapMutations(["setSelectedProduct"]),
  },
  computed: {
    ...mapState(["selectedProduct"]),
    productsForPosition() {
      const category = this.categories.find(
        (category) => category.name === this.selectedPosition
      );
      if (category) {
        return category.subCategories.flatMap(
          (subCategory) => subCategory.products
        );
      }
      return [];
    },
  },
};
</script>

<style>
.dropdown-menu {
  transform-origin: top right;
}
</style>
