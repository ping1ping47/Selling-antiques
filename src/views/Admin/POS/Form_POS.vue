<template>
  <div class="container mx-auto px-4 py-6">
    <!-- Search and Customer Management Section -->
    <div
      class="text-xl font-bold tracking-wide text-green-800 animate__animated animate__bounceIn mb-4"
    >
      <div class="flex justify-start space-x-4 flex-wrap">
        <div class="relative max-w-sm">
          <input
            type="text"
            v-model="searchText"
            placeholder="ค้นหาลูกค้า..."
            class="px-4 py-2 border border-green-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent w-full"
            @input="searchPostById"
          />
          <div
            class="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none"
          >
            <svg
              class="h-5 w-5 text-green-400"
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

        <div class="flex space-x-2">
          <button
            @click="openCustomerPopup()"
            class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            สมาชิก
          </button>
          <SelectCustomer
            v-if="showCustomerPopup"
            @close="closeCustomerPopup"
            @select-customer="selectCustomer"
            :customers="customers"
          />
        </div>

        <div class="flex space-x-2">
          <button
            @click="openAddPopup()"
            class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            เพิ่มสมาชิก
          </button>
          <AddCustomer
            v-if="showAddPopup"
            @close="closeAddPopup"
            @add="addCustomer"
          />
        </div>
      </div>

      <!-- Customer Information Section -->
      <div
        class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-4 p-4"
      >
        <div class="flex flex-col">
          <label for="customer-code" class="text-black mb-1">รหัสลูกค้า</label>
          <input
            type="text"
            id="customer-code"
            v-model="selectedCustomer.id"
            class="border border-green-300 text-gray-900 rounded-md focus:ring-green-500 focus:border-green-500 px-3 py-2"
            readonly
          />
        </div>
        <div class="flex flex-col text-black font-bold">
          <label for="member-code" class="text-black mb-1">รหัสสมาชิก</label>
          <input
            type="text"
            id="customer-code"
            v-model="selectedCustomer.id"
            class="border border-green-300 text-gray-900 rounded-md focus:ring-green-500 focus:border-green-500 px-3 py-2"
            readonly
          />
        </div>
        <div class="flex flex-col">
          <label for="full-name" class="text-black mb-1">ชื่อ-นามสกุล</label>
          <input
            type="text"
            id="full-name"
            v-model="selectedCustomer.fullname"
            class="border border-green-300 text-gray-900 rounded-md focus:ring-green-500 focus:border-green-500 px-3 py-2"
            readonly
          />
        </div>
        <div class="flex flex-col">
          <label for="phone-number" class="text-black mb-1">เบอร์โทร</label>
          <input
            type="text"
            id="phone-number"
            v-model="selectedCustomer.phone"
            class="border border-green-300 text-gray-900 rounded-md focus:ring-green-500 focus:border-green-500 px-3 py-2"
            readonly
          />
        </div>
      </div>
    </div>

    <!-- Main Content Section -->
    <div
      class="flex flex-col md:flex-row bg-white rounded-lg shadow-md max-w-full"
      style="height: 65vh"
    >
      <!-- Categories and Products Section -->
      <div
        class="w-full md:w-3/4 md:pr-2 mb-4 overflow-y-auto border-r-green-300 border-r-4"
      >
        <!-- Category Selection -->
        <div v-if="!categorySelected && !subcategorySelected" class="m-4 p-4">
          <h2
            class="font-bold mb-4 text-green-800 animate__animated animate__fadeInDown"
          >
            <ol class="flex items-center">
              <li>
                <a
                  href="#"
                  @click.prevent="resetSelection"
                  class="text-green-500 hover:text-green-700 transition duration-300 animate__animated animate__pulse animate__infinite animate__slower"
                  >หมวดหมู่สินค้า</a
                >
              </li>
            </ol>
          </h2>

          <div
            class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
          >
            <button
              v-for="category in categories"
              :key="category.id"
              @click="selectCategory(category)"
              class="bg-white text-green-800 rounded-md p-4 flex flex-col items-center shadow hover:shadow-lg transition duration-300 animate__animated animate__zoomIn"
            >
              <img
                :src="category.icon"
                alt="Category Icon"
                class="w-20 h-20 object-cover mb-2 rounded"
              />
              <span class="text-lg animate__animated animate__bounceIn">{{
                category.name
              }}</span>
            </button>
          </div>
        </div>

        <!-- Subcategory Selection -->
        <div
          v-else-if="categorySelected && !subcategorySelected"
          class="m-4 p-4"
        >
          <h2 class="font-bold mb-4 text-green-800">
            <ol class="flex items-center">
              <li>
                <a
                  href="#"
                  @click.prevent="resetSelection"
                  class="text-green-500 hover:text-green-700 transition duration-300"
                  >หมวดหมู่สินค้า</a
                >
              </li>
              <li class="mx-2 font-bold text-black text-xl">/</li>
              <li>
                <a
                  href="#"
                  @click.prevent="resetSubcategorySelection"
                  class="text-green-500 hover:text-green-700 transition duration-300"
                  >{{ selectedCategory.name }}</a
                >
              </li>
            </ol>
          </h2>
          <div
            class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
          >
            <button
              v-for="subcategory in selectedCategory.subcategories"
              :key="subcategory.id"
              @click="selectSubcategory(subcategory)"
              class="bg-white text-green-800 rounded-md p-4 flex flex-col items-center shadow hover:shadow-lg transition duration-300"
            >
              <img
                :src="subcategory.icon"
                alt="Subcategory Icon"
                class="w-20 h-20 object-cover mb-2 rounded"
              />
              <span class="text-lg">{{ subcategory.name }}</span>
            </button>
          </div>
        </div>

        <!-- Product Selection -->
        <div
          v-else-if="categorySelected && subcategorySelected"
          class="m-4 p-4"
        >
          <div
            v-if="showProductPopup"
            class="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50"
          >
            <transition
              name="scale"
              enter-active-class="transition-all duration-300 ease-out"
              leave-active-class="transition-all duration-200 ease-in"
              enter-from-class="opacity-0 transform scale-75"
              enter-to-class="opacity-100 transform scale-100"
              leave-from-class="opacity-100 transform scale-100"
              leave-to-class="opacity-0 transform scale-75"
            >
              <div
                class="bg-white rounded-lg shadow-lg p-6 relative"
                @click.stop
              >
                <button
                  class="absolute top-3 right-3 text-red-500 hover:text-red-700 border-2 border-red-500 hover:border-red-700 rounded-full p-1 focus:outline-none focus:ring-2 focus:ring-offset-2 sm:mt-0 sm:w-auto sm:text-sm"
                  @click.prevent="resetSelection"
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

                <h2
                  class="font-bold mb-4 text-green-800 animate__animated animate__fadeInDown"
                >
                  <ol class="flex items-center">
                    <li>
                      <a
                        href="#"
                        @click.prevent="resetSelection"
                        class="text-green-500 hover:text-green-700 transition duration-300"
                        >หมวดหมู่สินค้า</a
                      >
                    </li>
                    <li class="mx-2 font-bold text-black text-xl">/</li>
                    <li>
                      <a
                        href="#"
                        @click.prevent="resetSubcategorySelection"
                        class="text-green-500 hover:text-green-700 transition duration-300"
                        >{{ selectedCategory.name }}</a
                      >
                    </li>
                    <li class="mx-2 font-bold text-black text-xl">/</li>
                    <li class="text-green-800">
                      {{ selectedSubcategory.name }}
                    </li>
                  </ol>
                </h2>

                <div
                  class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
                >
                  <div
                    v-for="product in selectedSubcategory.products"
                    :key="product.id"
                    class="bg-white text-black hover:bg-green-100 rounded-md p-4 flex flex-col items-center shadow hover:shadow-lg transition duration-300 animate__animated animate__zoomIn"
                  >
                    <img
                      :src="product.image"
                      :alt="product.name"
                      class="w-20 h-20 object-cover mb-2 rounded"
                    />
                    <div
                      class="flex flex-col justify-center items-center w-full"
                    >
                      <h3
                        class="text-xl font-bold mb-2 tracking-wide text-black animate__animated animate__bounceIn"
                      >
                        {{ product.name }}
                      </h3>

                      <div>
                        <!-- Quantity Popup -->
                        <div
                          v-if="showQuantityPopup"
                          class="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50"
                        ></div>

                        <p
                          class="text-black text-xl font-bold mb-2 animate__animated animate__fadeInUp"
                        >
                          ราคา: {{ product.price }} บาท
                        </p>

                        <button
                          @click="openQuantityPopup(product)"
                          class="bg-green-400 text-white font-bold py-1 px-3 rounded-full hover:bg-green-700 transition duration-300 animate__animated animate__pulse animate__infinite animate__slower"
                        >
                          <i
                            class="fas fa-shopping-cart mr-2 animate__animated animate__shake animate__infinite animate__slower"
                          ></i>
                          เพิ่มลงใน
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </transition>
          </div>
        </div>
      </div>

      <!-- Quantity Popup -->
      <div
        v-if="showQuantityPopup"
        class="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50 text-2xl"
      >
        <div
          class="bg-white rounded-lg shadow-lg p-6 relative text-black font-bold"
        >
          <div class="flex justify-end">
            <button
              @click="closeQuantityPopup"
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
          <h2 class="font-bold mb-4 text-green-800">รายละเอียดสินค้า</h2>
          <img
            :src="selectedProduct.image"
            class="w-20 h-20 object-cover mb-2 rounded"
          />
          <p>ชื่อสินค้า: {{ selectedProduct.name }}</p>
          <p>ราคา: {{ selectedProduct.price }} บาท</p>

          <h2 class="font-bold mb-4 text-green-800">จำนวนสินค้า</h2>
          <div class="flex items-center">
            <button
              class="bg-green-500 text-white font-bold py-1 px-3 rounded"
              @click="decrementQuantity"
            >
              -
            </button>
            <input
              type="number"
              v-model="quantityInput"
              class="mx-2 w-20 text-center border border-green-500 rounded"
            />
            <button
              class="bg-green-500 text-white font-bold py-1 px-3 rounded"
              @click="incrementQuantity"
            >
              +
            </button>
          </div>

          <button
            class="mt-4 bg-green-500 text-white font-bold py-2 px-4 rounded"
            @click="addToCartWithQuantity"
          >
            เพิ่มลงใน
          </button>
        </div>
      </div>

      <!-- Cart Section -->
      <div
        class="w-full xl:w-1/4 md:w-2/4 sm:w-4/4 shadow-md rounded-lg overflow-y-auto animate__animated animate__fadeInDown"
        style="max-height: 65vh"
      >
        <h2
          class="text-2xl font-bold mb-4 flex items-center animate__animated animate__fadeInDown bg-green-500 text-white px-4 py-2"
        >
          <i
            class="fas fa-shopping-cart mr-2 text-white animate__animated animate__pulse animate__infinite animate__slower"
          ></i>
          สินค้า
        </h2>
        <ul
          v-if="cartItems.length > 0"
          class="divide-y divide-green-500 animate__animated animate__fadeInUp p-4"
        >
          <li
            v-for="(item, index) in cartItems"
            :key="item.id"
            class="flex flex-col sm:flex-row justify-between items-center mb-2 text-green-800 animate__animated animate__zoomIn"
          >
            <div class="flex items-center py-2">
              <img
                :src="item.image"
                :alt="item.name"
                class="w-16 h-16 object-cover mr-2 rounded animate__animated animate__pulse animate__infinite animate__slower"
              />
              <div>
                <p class="text-lg">{{ item.name }}</p>
                <div class="flex items-center py-1">
                  <p class="text-green-600">ชิ้นละ: {{ item.price }} บาท</p>
                </div>
                <div class="flex items-center py-1">
                  <p>จํานวน: {{ item.quantity }}</p>
                </div>
                <div class="flex items-center py-1">
                  <p class="text-green-600">
                    เป็น: {{ (item.price * item.quantity).toFixed(2) }} บาท
                  </p>
                </div>
              </div>
            </div>

            <div class="border-solid border-2 border-green-300">กล้อง</div>

            <div class="flex items-center mt-2 sm:mt-0">
              <button
                @click="removeFromCart(index)"
                class="text-red-500 hover:text-red-700 transition duration-300 border-4 rounded-md p-1 border-red-500 text-2xl"
              >
                <i class="fas fa-times"></i>
              </button>
            </div>
          </li>
        </ul>
        <p
          v-else
          class="text-lg text-green-600 animate__animated animate__bounceIn p-4"
        >
          สินค้าของคุณว่างเปล่า
        </p>
        <div class="text-right p-4 animate__animated animate__fadeInUp">
          <span class="text-xl text-green-800 font-bold"
            >รวม: {{ total.toFixed(2) }} บาท</span
          >
        </div>
        <div class="p-4">
          <button
            @click="checkout"
            class="w-full bg-green-500 text-white text-lg font-bold py-2 rounded-md hover:bg-green-700 transition duration-300 animate__animated animate__rubberBand"
          >
            <i class="fas fa-shopping-cart mr-2"></i>
            รอชำระเงิน
          </button>
          <Report_POS
            v-if="showReport"
            :cartItems="cartItems"
            :total="total"
            @close="closeReport"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AddCustomer from "../Data_Customer/Add_Customer.vue";
import SelectCustomer from "./List_Coutomer.vue";
import Report_POS from "./Report_POS.vue";

export default {
  name: "PosScreen",
  components: {
    AddCustomer,
    SelectCustomer,
    Report_POS,
  },

  data() {
    return {
      categories: [
        {
          id: 1,
          name: "อิเล็กทรอนิกส์",
          icon: "https://media.istockphoto.com/id/1447190789/th/%E0%B9%80%E0%B8%A7%E0%B8%84%E0%B9%80%E0%B8%95%E0%B8%AD%E0%B8%A3%E0%B9%8C/%E0%B8%81%E0%B8%B2%E0%B8%A3%E0%B9%8C%E0%B8%95%E0%B8%B9%E0%B8%99%E0%B8%9B%E0%B8%A5%E0%B8%B2%E0%B9%82%E0%B8%A5%E0%B8%A1%E0%B8%B2%E0%B8%95%E0%B8%A5%E0%B8%81%E0%B9%81%E0%B8%A2%E0%B8%81%E0%B8%9A%E0%B8%99%E0%B8%9E%E0%B8%B7%E0%B9%89%E0%B8%99%E0%B8%AB%E0%B8%A5%E0%B8%B1%E0%B8%87%E0%B8%AA%E0%B8%B5%E0%B8%82%E0%B8%B2%E0%B8%A7.jpg?s=612x612&w=is&k=20&c=Q2T6W0onAL4k1P5gJWTy_9J1ODIkT0XqOb9bLIGusOY=",
          subcategories: [
            {
              id: 1,
              name: "แล็ปท็อป",
              icon: "https://media.istockphoto.com/id/1125201704/th/%E0%B9%80%E0%B8%A7%E0%B8%84%E0%B9%80%E0%B8%95%E0%B8%AD%E0%B8%A3%E0%B9%8C/%E0%B8%81%E0%B8%B2%E0%B8%A3%E0%B9%8C%E0%B8%95%E0%B8%B9%E0%B8%99%E0%B8%9B%E0%B8%A5%E0%B8%B2%E0%B9%82%E0%B8%A5%E0%B8%A1%E0%B8%B2%E0%B8%99%E0%B9%88%E0%B8%B2%E0%B8%A3%E0%B8%B1%E0%B8%81.jpg?s=1024x1024&w=is&k=20&c=GYblGm9McxEQqYyf_pVLJBLTBR3hR9pv4oRK2prG6WM=",
              products: [
                {
                  id: 1,
                  name: "MacBook Pro",
                  price: 1999,
                  image:
                    "https://png.pngtree.com/png-clipart/20190516/original/pngtree-hand-painted-dolphins-cartoon-dolphin-q-version-of-dolphin-lovely-png-image_3821859.jpg",
                },
                {
                  id: 2,
                  name: "Dell XPS",
                  price: 1499,
                  image:
                    "https://www.shutterstock.com/image-vector/cute-dolphin-cartoon-icon-vector-260nw-2426380235.jpg",
                },
              ],
            },
            {
              id: 2,
              name: "สมาร์ทโฟน",
              icon: "https://i.ytimg.com/vi/cz-dJgbb3ZU/hqdefault.jpg",
              products: [
                {
                  id: 3,
                  name: "iPhone 12",
                  price: 999,
                  image: "https://i.ytimg.com/vi/SO7gzvEhOdE/hqdefault.jpg",
                },
                {
                  id: 4,
                  name: "Samsung Galaxy S21",
                  price: 899,
                  image:
                    "https://e7.pngegg.com/pngimages/446/468/png-clipart-monster-ickis-drawing-monster-blue-cartoon-thumbnail.png",
                },
              ],
            },
          ],
        },
        {
          id: 2,
          name: "เสื้อผ้า",
          icon: "https://img.pikbest.com/png-images/qiantu/thai-culture-buddha-statue-hand-drawn_2720796.png!sw801",
          subcategories: [
            {
              id: 3,
              name: "ผู้ชาย",
              icon: "fas fa-male",
              products: [
                {
                  id: 5,
                  name: "เสื้อโปโล",
                  price: 39.99,
                  image: "https://example.com/polo-shirt.jpg",
                },
                {
                  id: 6,
                  name: "กางเกงยีนส์",
                  price: 59.99,
                  image: "https://example.com/jeans.jpg",
                },
              ],
            },
            {
              id: 4,
              name: "ผู้หญิง",
              icon: "fas fa-female",
              products: [
                {
                  id: 7,
                  name: "เดรส",
                  price: 49.99,
                  image: "https://example.com/dress.jpg",
                },
                {
                  id: 8,
                  name: "กระโปรง",
                  price: 39.99,
                  image: "https://example.com/skirt.jpg",
                },
              ],
            },
          ],
        },
      ],
      customers: [
        {
          id: "CUS001",
          member_id: "MEM1234",
          fullname: "สมชาย เรืองรอง",
          phone: "0812345678",
        },
        {
          id: "CUS002",
          member_id: "MEM5678",
          fullname: "สมหญิง มั่งมี",
          phone: "0898765432",
        },
        {
          id: "CUS003",
          member_id: "MEM9012",
          fullname: "นายก้อน ก้อนใหญ่",
          phone: "0345678901",
        },
        {
          id: "CUS004",
          member_id: "MEM3456",
          fullname: "นางสาวแพร มาลีวัลย์",
          phone: "0612345678",
        },
      ],
      selectedCustomer: {
        id: "",
        member_id: "",
        fullname: "",
        phone: "",
      },
      categorySelected: false,
      subcategorySelected: false,
      selectedCategory: null,
      selectedSubcategory: null,
      cartItems: [],
      showAddPopup: false,
      showCustomerPopup: false,
      showReport: false,
      showQuantityPopup: false,
      showProductPopup: false,
      quantityInput: 1,
      selectedProduct: null,
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
    selectCustomer(customer) {
      this.selectedCustomer = { ...customer }; // อัปเดตข้อมูลลูกค้าที่เลือก
      this.closeCustomerPopup();
    },
    openAddPopup() {
      this.showAddPopup = true;
    },
    closeAddPopup() {
      this.showAddPopup = false;
    },

    addCustomer(customer) {
      this.customers.push(customer);
      this.closeAddPopup();
    },

    openCustomerPopup() {
      this.showCustomerPopup = true;
    },
    closeCustomerPopup() {
      this.showCustomerPopup = false;
    },
    showCustomer(customer) {
      // ทำอะไรกับข้อมูลลูกค้าที่เลือก
      console.log("Selected customer:", customer);
    },

    checkout() {
      this.showReport = true;
    },
    closeReport() {
      this.showReport = false;
    },
    removeFromCart(index) {
      this.cartItems.splice(index, 1);
    },
    selectCategory(category) {
      this.categorySelected = true;
      this.subcategorySelected = false;
      this.selectedCategory = category;
      this.selectedSubcategory = null;
    },
    selectSubcategory(subcategory) {
      this.subcategorySelected = true;
      this.selectedSubcategory = subcategory;
      this.openProductPopup(); // เปิด popup เมื่อเลือกประเภทสินค้าย่อย
    },
    resetCategorySelection() {
      this.categorySelected = false;
      this.subcategorySelected = false;
      this.selectedCategory = null;
      this.selectedSubcategory = null;
    },
    resetSubcategorySelection() {
      this.subcategorySelected = false;
      this.selectedSubcategory = null;
    },
    resetSelection() {
      if (this.subcategorySelected) {
        this.resetSubcategorySelection();
      } else if (this.categorySelected) {
        this.resetCategorySelection();
      }
    },
    // Your methods here
    addToCart(product, quantity) {
      const existingItem = this.cartItems.find(
        (item) => item.id === product.id
      );

      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        this.cartItems.push({
          ...product,
          quantity,
        });
      }
    },

    incrementQuantity(index) {
      this.cartItems[index].quantity++;
    },
    decrementQuantity(index) {
      if (this.cartItems[index].quantity > 1) {
        this.cartItems[index].quantity--;
      }
    },
    openQuantityPopup(product) {
      this.selectedProduct = product;
      this.showQuantityPopup = true;
    },
    closeQuantityPopup() {
      this.showQuantityPopup = false;
      this.quantityInput = 1;
      this.selectedProduct = null;
    },
    incrementQuantity() {
      this.quantityInput++;
    },
    decrementQuantity() {
      if (this.quantityInput > 1) {
        this.quantityInput--;
      }
    },
    addToCartWithQuantity() {
      const existingItem = this.cartItems.find(
        (item) => item.id === this.selectedProduct.id
      );

      if (existingItem) {
        existingItem.quantity += this.quantityInput;
      } else {
        this.cartItems.push({
          ...this.selectedProduct,
          quantity: this.quantityInput,
        });
      }

      this.closeQuantityPopup();
    },
    openProductPopup() {
      this.showProductPopup = true;
    },
    closeProductPopup() {
      this.showProductPopup = false;
    },
  },
};
</script>
<style>
@import "https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@5.15.4/css/all.min.css";
</style>
