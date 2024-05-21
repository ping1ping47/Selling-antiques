<template>
  <div class="container mx-auto">
    <!-- Search and Customer Management Section -->
    <div class="text-xl font-bold tracking-wide text-green-800 animate__animated animate__bounceIn mb-8">
      <div class="flex justify-start space-x-6 flex-wrap py-6">
        <div class="flex space-x-4">
          <button @click="openCustomerPopup()"
            class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-300 ease-in-out">
            ลูกค้า
          </button>
          <SelectCustomer v-if="showCustomerPopup" @close="closeCustomerPopup" @select-customer="selectCustomer"
            :customers="customers" />
        </div>

        <div class="flex space-x-4">
          <button @click="openAddPopup()"
            class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-300 ease-in-out">
            เพิ่มลูกค้า
          </button>
          <AddCustomer v-if="showAddPopup" @close="closeAddPopup" @add="addCustomer" />
        </div>
      </div>
      <!-- -------------------------------------- -->

      <!-- Date Section -->

      <div class="flex justify-end mb-4 md:mb-0 text-center md:text-left">
        <section class="mb-6 flex items-center justify-center md:justify-start">
          <div class="flex items-center justify-start">
            <h1 class="text-3xl font-light leading-tight" ref="dateDisplay">
              วว/ดด/ปป
            </h1>
          </div>
        </section>
      </div>
      <!-- Customer Information Section -->
      <div
        class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 p-6 bg-white rounded-lg shadow animate__animated animate__fadeInUp">
        <div class="flex flex-col">
          <label for="full-name" class="text-lg text-black mb-2">ชื่อ-นามสกุล</label>
          <input type="text" id="full-name" v-model="selectedCustomer.fullname"
            class="border border-green-300 text-lg text-gray-900 rounded-lg focus:ring-green-500 focus:border-green-500 px-2 py-1 transition duration-300 ease-in-out"
            readonly />
        </div>
        <div class="flex flex-col">
          <label for="customer-code" class="text-lg text-black mb-2">เบอร์โทรศัพท์</label>
          <input type="text" id="customer-code" v-model="selectedCustomer.tel"
            class="border border-green-300 text-lg text-gray-900 rounded-lg focus:ring-green-500 focus:border-green-500 px-2 py-1 transition duration-300 ease-in-out"
            readonly />
        </div>

        <div class="flex flex-col">
          <label for="phone-number" class="text-lg text-black mb-2">ป้ายทะเบียน</label>
          <input type="text" id="phone-number" v-model="selectedCustomer.vehicle_code"
            class="border border-green-300 text-lg text-gray-900 rounded-lg focus:ring-green-500 focus:border-green-500 px-2 py-1 transition duration-300 ease-in-out"
            readonly />
        </div>
        <div class="flex flex-col">
          <label for="customer-code" class="text-lg text-black mb-2">ระดับ</label>
          <input type="text" id="customer-code" v-model="selectedCustomer.level"
            class="border border-green-300 text-lg text-gray-900 rounded-lg focus:ring-green-500 focus:border-green-500 px-2 py-1 transition duration-300 ease-in-out"
            readonly />
        </div>
      </div>
    </div>

    <!-- Main Content Section -->
    <div class="flex flex-col md:flex-row bg-white rounded-lg shadow max-w-full animate__animated animate__fadeInUp"
      style="height: calc(100vh - 8rem)">
      <!-- Categories and Products Section -->
      <div class="w-full md:w-3/4 md:pr-4 mb-6 overflow-y-auto border-r-green-300 border-r-4">
        <!-- Category Selection -->
        <div v-if="!categorySelected && !subcategorySelected" class="m-6 p-6">
          <h2 class="font-bold mb-6 text-2xl text-green-800 animate__animated animate__fadeInDown">
            <ol class="flex items-center">
              <li>
                <a href="#" @click.prevent="resetSelection"
                  class="text-green-500 hover:text-green-700 transition duration-300 animate__animated animate__pulse animate__infinite animate__slower">ประเภทสินค้าหลัก</a>
              </li>
            </ol>
          </h2>

          <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            <button v-for="category in categories" :key="category._id" @click="selectCategory(category)"
              class="bg-white rounded-lg p-4 flex flex-col items-center shadow hover:shadow-lg transition duration-300 animate__animated animate__zoomIn">
              <span class="text-3xl font-bold animate__animated animate__bounceIn">{{ category.name }}</span>
            </button>
          </div>
        </div>
        <!-- Subcategory Selection -->
        <div v-else-if="categorySelected && !subcategorySelected" class="m-6 p-6">
          <h2 class="font-bold mb-6 text-2xl text-green-800">
            <ol class="flex items-center">
              <li>
                <a href="#" @click.prevent="resetSelection"
                  class="text-green-500 hover:text-green-700 transition duration-300">ประเภทสินค้าย่อย</a>
              </li>
              <!-- <li class="mx-4 font-bold text-black text-xl">/</li>
              <li>
                <a
                  href="#"
                  @click.prevent="resetSubcategorySelection"
                  class="text-green-500 hover:text-green-700 transition duration-300"
                  >{{ selectedCategory.name }}</a
                >
              </li> -->
            </ol>
          </h2>
          <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            <button v-for="subcategory in selectedCategory.subcategories" :key="subcategory._id"
              @click="selectSubcategory(subcategory)"
              class="bg-white rounded-lg p-4 flex flex-col items-center shadow hover:shadow-lg transition duration-300 animate__animated animate__zoomIn">
              <span class="text-3xl font-bold">{{ subcategory.name }}</span>
            </button>
          </div>
        </div>

        <!-- Product Selection -->
        <div v-else-if="categorySelected && subcategorySelected" class="m-6 p-6">
          <h2 class="font-bold mb-6 text-2xl text-green-800 animate__animated animate__fadeInDown">
            <ol class="flex items-center">
              <li>
                <a href="#" @click.prevent="resetSelection"
                  class="text-green-500 hover:text-green-700 transition duration-300">ชื่อสินค้า</a>
              </li>
            </ol>
          </h2>
          <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            <div v-for="product in selectedSubcategory.products" :key="product._id"
              class="bg-white text-black hover:bg-green-100 rounded-lg p-4 flex flex-col items-center shadow hover:shadow-lg transition duration-300 animate__animated animate__zoomIn">
              <div class="flex flex-col justify-center items-center w-full">
                <h3 class="text-2xl font-bold mb-2 tracking-wide text-black animate__animated animate__bounceIn">
                  {{ product.name }}
                </h3>

                <div>
                  <p class="animate__animated animate__fadeInUp text-xl font-bold">
                    ราคา: {{ getProductPrice(product) }} บาท
                  </p>
                  <p class="animate__animated animate__fadeInUp text-xl font-bold">
                    ระดับ: {{ getProductLevel(product) }}
                  </p>

                  <button @click="openQuantityPopup(product)"
                    class="bg-green-400 text-white font-bold py-1 px-3 rounded hover:bg-green-700 transition duration-300 animate__animated animate__pulse animate__infinite animate__slower">
                    <i
                      class="fas fa-shopping-cart mr-2 animate__animated animate__shake animate__infinite animate__slower"></i>
                    เพิ่มลงใน
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div v-if="showQuantityPopup"
        class="fixed inset-0 flex items-center justify-center z-50 animate__animated animate__fadeIn">
        <div class="bg-white rounded-lg shadow p-6 relative animate__animated animate__zoomIn w-full md:w-1/2 lg:w-1/3">
          <div class="flex justify-end">
            <button @click.stop="closeQuantityPopup" type="button"
              class="inline-flex text-red-500 hover:text-red-700 border-2 border-red-500 hover:border-red-700 rounded-full p-1 focus:outline-none focus:ring-2 focus:ring-offset-2 transition duration-300 ease-in-out">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"
                stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <div class="flex flex-col items-center">
            <h2 class="font-bold mb-6 text-2xl text-green-800 animate__animated animate__fadeInDown">
              รายละเอียดสินค้า
            </h2>

            <p class="animate__animated animate__fadeInUp text-xl font-bold">
              ชื่อสินค้า: {{ selectedProduct.name }}
            </p>
            <p class="animate__animated animate__fadeInUp text-xl font-bold">
              ราคา/กก: {{ getProductPrice(selectedProduct) }} บาท
            </p>
            <p class="animate__animated animate__fadeInUp text-xl font-bold">
              รวม:
              {{
            (getProductPrice(selectedProduct) * quantityInput).toFixed(2)
          }}
              บาท
            </p>

            <h2 class="font-bold mb-6 text-2xl text-green-800 animate__animated animate__fadeInDown text-center">
              จำนวนน้ำหนักสินค้า

              <div class="flex items-center justify-between animate__animated animate__fadeInUp">
                <button
                  class="bg-green-500 text-white font-bold py-1 px-3 rounded transition duration-300 ease-in-out hover:bg-green-700"
                  @click="decrementQuantity">
                  -
                </button>
                <input type="number" v-model.number="quantityInput" step="0.001"
                  class="mx-2 w-66 text-center border border-green-500 rounded transition duration-300 ease-in-out" />
                <button
                  class="bg-green-500 text-white font-bold py-1 px-3 rounded transition duration-300 ease-in-out hover:bg-green-700"
                  @click="incrementQuantity">
                  +
                </button>
              </div>
            </h2>
            <button
              class="mt-4 bg-green-500 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out hover:bg-green-700 animate__animated animate__bounceIn"
              @click="addToCartWithQuantity">
              คำนวน
            </button>
          </div>
        </div>
      </div>

      <!-- Cart Section -->
      <div class="w-full xl:w-2/5 md:w-2/4 sm:w-4/4 shadow rounded overflow-y-auto animate__animated animate__fadeInUp">
        <h2
          class="text-lg font-bold mb-4 flex items-center animate__animated animate__fadeInDown bg-green-500 text-white px-4 py-2 rounded-t">
          <i
            class="fas fa-shopping-cart mr-2 text-white animate__animated animate__pulse animate__infinite animate__slower"></i>
          สินค้า
        </h2>
        <ul v-if="cartItems.length > 0" class="divide-y divide-green-500 animate__animated animate__fadeInUp px-2">
          <li v-for="(item, index) in cartItems" :key="item._id"
            class="flex flex-col sm:flex-row justify-between items-center mb-2 text-green-800 animate__animated animate__zoomIn">
            <div class="flex items-center py-2 font-bold">
              <div>
                <div class="flex items-center">
                  <!-- <img
                    :src="item.productImage"
                    alt="Product Image"
                    class="w-16 h-16 mr-2"
                  /> -->
                  <p class="text-lg mr-2">{{ item.name }}</p>
                </div>
                <div class="flex items-center py-1">
                  <p class="text-green-600">
                    ราคา/กก: {{ getProductPrice(item) }} บาท
                  </p>
                </div>
                <div class="flex items-center py-1">
                  <p>น้ำหนัก: {{ item.quantity.toFixed(2) }}</p>
                </div>
                <div class="flex items-center py-1">
                  <p class="text-green-600">
                    เป็น:
                    {{ (getProductPrice(item) * item.quantity).toFixed(2) }} บาท
                  </p>
                </div>
              </div>
            </div>

            <div
              class="flex items-center border-green-300 animate__animated animate__pulse animate__infinite animate__slower">
              <div>
                <button @click="toggleCamera(index)"
                  class="text-lg font-bold py-1 px-2 rounded bg-green-500 text-white hover:bg-green-700 transition duration-300 ease-in-out">
                  ถ่ายรูป
                </button>
                <div v-if="item.showCamera" class="relative">
                  <video ref="videoPlayer" :width="videoWidth" :height="videoHeight" autoplay></video>
                  <button @click="captureImage(index)"
                    class="text-lg font-bold py-1 px-2 rounded bg-green-500 text-white hover:bg-green-700 transition duration-300 ease-in-out mt-2">
                    ถ่ายภาพ
                  </button>
                </div>
                <div v-if="item.capturedImages && item.capturedImages.length > 0" class="mt-2 flex flex-wrap">
                  <img v-for="(image, imageIndex) in item.capturedImages" :key="imageIndex" :src="image"
                    alt="Captured Image" class="w-32 h-24 mr-2 mb-2" />
                </div>
              </div>
            </div>

            <div class="flex items-center mt-2 sm:mt-0">
              <button @click="removeFromCart(index)"
                class="text-red-500 hover:text-red-700 transition duration-300 border-2 rounded p-1 border-red-500 animate__animated animate__bounce">
                <i class="fas fa-times"></i>
              </button>
            </div>
          </li>
        </ul>
        <p v-else class="text-lg text-green-600 animate__animated animate__bounceIn p-4">
          สินค้าของคุณว่างเปล่า
        </p>
        <div class="text-right p-4 animate__animated animate__fadeInUp">
          <span class="text-lg text-green-800 font-bold">รวม: {{ total.toFixed(2) }} บาท</span>
        </div>

        <div class="p-4">
          <button @click="openQueue" :disabled="fetchQueue"
            class="w-full bg-green-500 text-white font-bold py-2 rounded hover:bg-green-700 transition duration-300 animate__animated animate__rubberBand">
            <i class="fas fa-print mr-2"></i>
            <span v-if="!fetchQueue">พิมบัตรคิว</span>
            <span v-else @click="!fetchQueue ? (showReport = true) : null">กำลังดึงข้อมูล...</span>
          </button>
          <ReportPopup v-if="showReport" :cartItems="cartItems" :total="total" @close="closeReport" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios"; // นำเข้า Axios
import AddCustomer from "../Data_Customer/Add_Customer.vue";
import SelectCustomer from "./SelectCustomer.vue";
import ReportPopup from "./ReportPopup.vue";

export default {
  name: "PosScreen",
  components: {
    AddCustomer,
    SelectCustomer,
    ReportPopup,
  },
  data() {
    return {
      categories: [],
      subcategories: [],
      products: [],

      customers: {
        class: "",
        id_card: "",
        fullname: "",
        vehicle_code: "",
      },
      selectedCustomer: {
        class: "",
        id_card: "",
        fullname: "",
        vehicle_code: "",
        level: 1, // เพิ่มบรรทัดนี้
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
      showCamera: false,
      stream: null,
      videoPlayer: null,
      capturedImage: null,
      videoWidth: 640, // Set the desired width of the video player
      videoHeight: 480, // Set the desired height of the video player
      fetchQueue: false,
    };
  },
  mounted() {
    this.startCamera();
  },

  computed: {
    total() {
      return this.cartItems.reduce((total, item) => {
        const price = this.getProductPrice(item);
        return total + price * item.quantity;
      }, 0);
    },
  },
  methods: {
    getProductPrice(product) {
      if (
        !this.selectedSubcategory ||
        !this.selectedCustomer.level ||
        !this.selectedSubcategory.prices
      ) {
        this.selectedCustomer.level = 1;
        return 0;
      }

      const prices = this.selectedSubcategory.prices || [];
      const price = prices.find((p) => p.detail_id === product._id);

      if (!price) {
        return 0;
      }

      const levelKey = `price_lv_${this.selectedCustomer.level}`;
      return price[levelKey] || 0;
    },

    getProductLevel(product) {
      if (
        !this.selectedSubcategory ||
        !this.selectedCustomer.level ||
        !this.selectedSubcategory.prices
      ) {
        this.selectedCustomer.level = 1;
        return 0;
      }

      const price = (this.selectedSubcategory.prices || []).find(
        (p) => p.detail_id === product._id
      );

      return price?.level || 0;
    },
    toggleCamera(index) {
      this.cartItems[index].showCamera = !this.cartItems[index].showCamera;
      if (this.cartItems[index].showCamera) {
        this.openCamera(index);
      } else {
        this.stopCamera(index);
      }
    },
    openCamera(index) {
      const constraints = {
        video: {
          width: this.videoWidth,
          height: this.videoHeight,
        },
      };

      navigator.mediaDevices
        .getUserMedia(constraints)
        .then((stream) => {
          this.cartItems[index].stream = stream;
          this.$nextTick(() => {
            const videoPlayer = this.$refs.videoPlayer?.[index];
            if (videoPlayer) {
              videoPlayer.srcObject = stream;
            }
          });
        })
        .catch((error) => {
          console.error("Error accessing camera:", error);
        });
    },
    stopCamera(index) {
      if (this.cartItems[index].stream) {
        this.cartItems[index].stream
          .getTracks()
          .forEach((track) => track.stop());
        this.cartItems[index].stream = null;
      }
    },
    captureImage(index) {
      const videoPlayer = this.$refs.videoPlayer?.[index];
      if (videoPlayer && videoPlayer.readyState === 4) {
        const canvas = document.createElement("canvas");
        canvas.width = videoPlayer.videoWidth;
        canvas.height = videoPlayer.videoHeight;
        const ctx = canvas.getContext("2d");
        ctx.drawImage(videoPlayer, 0, 0, canvas.width, canvas.height);
        const capturedImage = canvas.toDataURL("image/png");

        // การเข้าถึงโดยตรงและกำหนดค่าโดยตรง
        if (this.cartItems[index]) {
          this.cartItems[index].capturedImages = [
            ...(this.cartItems[index].capturedImages || []),
            capturedImage,
          ];
        }
      }
    },

    async fetchCategories() {
      try {
        const response = await fetch(`${process.env.VITE_API_ALL}product/category`);
        const data = await response.json();
        this.categories = data.data;
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    },

    async fetchTypes(categoryId) {
      try {
        const response = await fetch(
          `${process.env.VITE_API_ALL}product/type`
        );
        const data = await response.json();
        const category = this.categories.find((c) => c._id === categoryId);

        if (category) {
          category.subcategories = data.data.filter(
            (subcategory) => subcategory.cate_id === categoryId
          );
        }
      } catch (error) {
        console.error("Error fetching types:", error);
      }
    },

    async fetchDetails(categoryId, typeId) {
      try {
        const response = await fetch(
          `${process.env.VITE_API_ALL}product/detail`
        );
        const data = await response.json();
        const category = this.categories.find((c) => c._id === categoryId);

        if (category) {
          const subcategory = category.subcategories.find(
            (s) => s._id === typeId
          );

          if (subcategory) {
            subcategory.products = data.data.filter(
              (product) =>
                product.cate_id === categoryId && product.type_id === typeId
            );
          }
        }
      } catch (error) {
        console.error("Error fetching details:", error);
        // Add your error handling logic here
      }
    },

    async fetchPrices(categoryId, typeId, detailId) {
      try {
        const response = await fetch(
          `${process.env.VITE_API_ALL}product/price`
        );
        const { data } = await response.json();
        const category = this.categories.find((c) => c._id === categoryId);

        if (category) {
          const subcategory = category.subcategories.find(
            (s) => s._id === typeId
          );

          if (subcategory) {
            subcategory.prices = data.filter(
              (price) =>
                price.cate_id === categoryId && price.type_id === typeId
            );
          }
        }
      } catch (error) {
        console.error("Error fetching prices:", error);
      }
    },

    async openQueue() {
      try {
        const { data } = await axios.post(
          `${process.env.VITE_API_ALL}queue`,
          {
            customer_id: this.selectedCustomer?.id_card || "",
            product_detail: this.cartItems.map((item) => ({
              price_id: this.cartItems?.[0]._id,
              qty: item.totalPrice,
              image: item.capturedImages?.[0] || "",
            })),
          }
        );
        console.log("ข้อมูลคอร์สได้รับ:", this.cartItems);
      } catch (error) {
        console.error("ไม่สามารถดึงข้อมูลคอร์สได้:", error);
      }
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

    selectCategory(category) {
      this.categorySelected = true;
      this.subcategorySelected = false;
      this.selectedCategory = category;
      this.selectedSubcategory = null;
      this.fetchTypes(category._id);
    },

    selectSubcategory(subcategory) {
      this.subcategorySelected = true;
      this.selectedSubcategory = subcategory;
      this.fetchDetails(this.selectedCategory._id, subcategory._id);
      this.fetchPrices(this.selectedCategory._id, subcategory._id); // เพิ่มบรรทัดนี้
      if (this.selectedSubcategory) {
        this.showProductPopup = true;
      }
    },

    openQeue() {
      this.showReport = true;
    },

    selectCustomer(customer) {
      this.selectedCustomer = { ...customer };
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
      console.log("Selected customer:", customer);
    },

    closeReport() {
      this.showReport = false;
    },
    removeFromCart(index) {
      this.cartItems.splice(index, 1);
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
      this.categorySelected = false;
      this.subcategorySelected = false;
      this.selectedCategory = null;
      this.selectedSubcategory = null;
    },
    openQuantityPopup(product) {
      this.selectedProduct = product;
      this.quantityInput = 1;
      this.showQuantityPopup = true;
    },
    closeQuantityPopup() {
      this.showQuantityPopup = false;
    },
    incrementQuantity() {
      this.quantityInput += 0.1;
    },
    decrementQuantity() {
      if (this.quantityInput > 0.0) {
        this.quantityInput -= 0.1;
      }
    },
    addToCartWithQuantity() {
      const existingItem = this.cartItems.find(
        (item) => item._id === this.selectedProduct._id
      );
      const price = this.getProductPrice(this.selectedProduct);
      const totalPrice = (price * this.quantityInput).toFixed(2);

      const newItem = {
        ...this.selectedProduct,
        quantity: this.quantityInput,
        totalPrice: totalPrice,
      };

      if (existingItem) {
        existingItem.quantity += this.quantityInput;
      } else {
        this.cartItems.push(newItem);
      }
      console.log(this.cartItems);

      this.closeQuantityPopup();
    },
    startCamera() {
      navigator.mediaDevices
        .getUserMedia({ video: true })
        .then((stream) => {
          this.stream = stream;
          this.$nextTick(() => {
            const videoPlayer = this.$refs.videoPlayer;
            if (videoPlayer) {
              videoPlayer.srcObject = stream;
            } else {
              console.error("videoPlayer reference is undefined.");
            }
          });
        })
        .catch((error) => {
          console.error("Error accessing camera:", error);
        });
    },
    stopCamera() {
      if (this.stream) {
        this.stream.getTracks().forEach((track) => track.stop());
        this.stream = null;
      }
    },
  },

  created() {
    this.fetchCategories();
    this.updateDate();
    setInterval(this.updateDate, 1000); // Update date every second
  },

  watch: {
    showQuantityPopup(newValue) {
      if (newValue) {
        this.startCamera();
      } else {
        this.stopCamera();
      }
    },
  },
};
</script>
<style>
@import "https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@5.15.4/css/all.min.css";
</style>
