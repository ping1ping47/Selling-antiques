<template>
  <div
    class="fixed inset-0 z-50 overflow-auto bg-black bg-opacity-50 flex items-center justify-center"
  >
    <div class="bg-white rounded-lg shadow-lg max-w-4xl mx-auto relative">
      <div class="flex justify-between items-center p-4 border-b">
        <h2 class="text-2xl font-bold">
          {{ category ? category.name : subcategory.name }}
        </h2>
        <button
          class="text-gray-500 hover:text-gray-700 focus:outline-none"
          @click="$emit('close')"
        >
          <svg
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
      <div
        v-if="subcategory"
        class="p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
      >
        <div
          v-for="product in subcategory.products"
          :key="product.id"
          class="bg-white rounded-lg shadow-md overflow-hidden"
        >
          <img
            :src="product.image"
            :alt="product.name"
            class="w-full h-48 object-cover"
          />
          <div class="p-4">
            <h3 class="text-lg font-semibold mb-2">{{ product.name }}</h3>
            <p class="text-gray-700 mb-2">{{ product.price }} บาท</p>
            <div class="flex items-center justify-between">
              <div class="flex items-center">
                <button
                  class="bg-gray-200 text-gray-700 rounded-l px-2 py-1 hover:bg-gray-300 focus:outline-none"
                  @click="decrementQuantity(product)"
                >
                  <svg
                    class="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M20 12H4"
                    />
                  </svg>
                </button>
                <input
                  type="number"
                  v-model="product.quantity"
                  class="w-12 text-center bg-gray-100 rounded-none"
                  min="1"
                />
                <button
                  class="bg-gray-200 text-gray-700 rounded-r px-2 py-1 hover:bg-gray-300 focus:outline-none"
                  @click="incrementQuantity(product)"
                >
                  <svg
                    class="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M12 4v16m8-8H4"
                    />
                  </svg>
                </button>
              </div>
              <button
                class="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 focus:outline-none"
                @click="addToCart(product)"
              >
                เพิ่มในรถเข็น
              </button>
            </div>
          </div>
        </div>
      </div>
      <div
        v-else
        class="p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
      >
        <div
          v-for="subcategory in category.subcategories"
          :key="subcategory.id"
          class="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer"
          @click="openSubcategory(subcategory)"
        >
          <img
            :src="subcategory.icon"
            :alt="subcategory.name"
            class="w-full h-48 object-cover"
          />
          <div class="p-4">
            <h3 class="text-lg font-semibold mb-2">{{ subcategory.name }}</h3>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    category: {
      type: Object,
      required: true,
    },
    subcategory: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {
      productQuantities: {},
    };
  },
  methods: {
    addToCart(product) {
      this.$emit("add-to-cart", {
        ...product,
        quantity: this.productQuantities[product.id] || 1,
      });
    },
    incrementQuantity(product) {
      this.$set(
        this.productQuantities,
        product.id,
        (this.productQuantities[product.id] || 0) + 1
      );
    },
    decrementQuantity(product) {
      if (
        this.productQuantities[product.id] &&
        this.productQuantities[product.id] > 1
      ) {
        this.$set(
          this.productQuantities,
          product.id,
          this.productQuantities[product.id] - 1
        );
      }
    },
    openSubcategory(subcategory) {
      this.$emit("open-subcategory", subcategory);
    },
  },
  watch: {
    subcategory: {
      handler(newSubcategory) {
        if (newSubcategory) {
          newSubcategory.products.forEach((product) => {
            this.$set(this.productQuantities, product.id, 1);
          });
        }
      },
      immediate: true,
    },
  },
};
</script>
