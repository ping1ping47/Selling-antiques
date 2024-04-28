<template>
  <div
    class="popup-overlay fixed top-0 left-0 z-50 w-full h-full bg-black bg-opacity-50 flex justify-center items-center"
  >
    <!-- Popup content -->
    <div
      class="popup-content bg-white border border-black rounded-lg overflow-auto max-h-[80vh]"
    >
      <div>
        <!-- Form for adding a product category -->
        <form @submit.prevent="addCategory" class="p-6" v-if="!editing">
          <!-- Modal header -->
          <div class="flex items-center justify-between pb-4 border-b">
            <h3 class="text-2xl font-semibold">เพิ่มประเภทสินค้า</h3>

            <!-- Close button -->
            <button
              @click.prevent="modalClose"
              class="text-red-500 hover:text-red-700 border-2 border-red-500 hover:border-red-700 rounded-full p-1"
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

          <!-- Category details -->
          <div class="grid gap-6 mb-6 md:grid-cols-1">
            <!-- Category name -->
            <div>
              <label
                for="category_name"
                class="block mb-2 text-2xl font-medium text-gray-900"
                >ชื่อประเภทสินค้า</label
              >
              <input
                v-model="categoryData.name"
                type="text"
                name="category_name"
                id="category_name"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-2xl rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                placeholder="ป้อน ชื่อประเภทสินค้า"
                required
              />
            </div>
          </div>

          <!-- Save and cancel buttons -->
          <div class="p-3 mt-2 text-center space-x-4 md:block">
            <button
              type="submit"
              class="mb-2 md:mb-0 bg-indigo-500 border px-5 py-2 text-2xl shadow-sm font-medium tracking-wider text-white rounded-md hover:shadow-lg hover:bg-indigo-600"
            >
              เพิ่ม
            </button>
            <button
              @click.prevent="modalClose"
              class="mb-2 md:mb-0 bg-red-500 border px-5 py-2 text-2xl shadow-sm font-medium tracking-wider text-white rounded-md hover:shadow-lg hover:bg-red-600"
            >
              ยกเลิก
            </button>
          </div>
        </form>

        <!-- Category list -->
        <div v-else>
          <h3 class="text-2xl font-semibold mb-4">รายการประเภทสินค้า</h3>
          <ul>
            <li v-for="(category, index) in categories" :key="index">
              {{ category.name }}
              <button @click="editCategory(category)" class="ml-2">
                แก้ไข
              </button>
              <button @click="deleteCategory(category.id)" class="ml-2">
                ลบ
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Swal from "sweetalert2";

export default {
  name: "AddCategory",
  data() {
    return {
      categoryData: {
        name: "",
      },
      categories: [
        { id: 1, name: "เครื่องใช้ไฟฟ้า" },
        { id: 2, name: "ของเล่น" },
        { id: 3, name: "อาหารและเครื่องดื่ม" },
      ], // Array to store categories
      editing: false, // Flag to control form display
    };
  },

  mounted() {
    //this.fetchCategories();
  },

  methods: {
    async fetchCategories() {
      try {
        // const response = await axios.get(
        //   `${import.meta.env.VITE_API_PRODUCT_CATEGORIES}`
        // );
        // this.categories = response.data;
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    },

    async addCategory() {
      try {
        await Swal.fire({
          title: "ยืนยันการเพิ่ม",
          text: "คุณแน่ใจหรือไม่ที่จะเพิ่มประเภทสินค้า?",
          icon: "info",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "เพิ่ม",
          cancelButtonText: "ยกเลิก",
        }).then(async (result) => {
          if (result.isConfirmed) {
            // await axios.post(
            //   `${import.meta.env.VITE_API_PRODUCT_CATEGORIES}`,
            //   this.categoryData
            // );
            {
              await Swal.fire("เพิ่มประเภทสินค้าสําเร็จ!", "", "success");
              this.$emit("close");
              //this.fetchCategories(); // Fetch categories again after adding
            }
          }
        });
      } catch (error) {
        console.error("Error adding category:", error);
        Swal.fire("Error!", "Failed to add category", "error");
      }
    },

    async editCategory(category) {
      // Set editing flag to true
      this.editing = true;
      // Assign category data to form data
      this.categoryData = { ...category };
    },

    async deleteCategory(categoryId) {
      try {
        await Swal.fire({
          title: "ยืนยันการลบ",
          text: "คุณแน่ใจหรือไม่ที่จะลบประเภทสินค้านี้?",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#d33",
          cancelButtonColor: "#3085d6",
          confirmButtonText: "ลบ",
          cancelButtonText: "ยกเลิก",
        }).then(async (result) => {
          if (result.isConfirmed) {
            // await axios.delete(
            //   `${import.meta.env.VITE_API_PRODUCT_CATEGORIES}/${categoryId}`
            // );
            await Swal.fire("ลบประเภทสินค้าสําเร็จ!", "", "success");
            //this.fetchCategories(); // Fetch categories again after deleting
          }
        });
      } catch (error) {
        console.error("Error deleting category:", error);
        Swal.fire("Error!", "Failed to delete category", "error");
      }
    },

    async modalClose() {
      // Reset form data and editing flag when closing the modal
      this.categoryData = { name: "" };
      this.editing = false;
      this.$emit("close");
    },
  },
};
</script>

<style scoped>
.popup-content {
  max-width: 800px;
  width: 90%;
}
</style>
