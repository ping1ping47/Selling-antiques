<template>
  <div
    class="fixed inset-0 z-50 overflow-auto bg-black bg-opacity-50 flex items-center justify-center"
  >
    <div class="bg-white rounded-lg shadow-lg max-w-4xl mx-auto relative">
      <div class="flex justify-between items-center p-4 border-b">
        <h2 class="text-2xl font-bold">{{ category.name }}</h2>
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
        class="p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
      >
        <div
          v-for="subcategory in category.subcategories"
          :key="subcategory.id"
          class="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer"
          @click="selectSubcategory(subcategory)"
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
  },
  methods: {
    selectSubcategory(subcategory) {
      this.$emit("select-subcategory", subcategory);
    },
  },
};
</script>
