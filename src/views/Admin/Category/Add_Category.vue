<template>
  <div class="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
    <div class="bg-white p-8 rounded-lg shadow-xl w-96">
      <h2 class="text-2xl font-bold mb-4 text-gray-800">เพิ่มประเภทสินค้า</h2>
      <input v-model="categoryName"
        class="w-full px-3 py-2 mb-4 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
        placeholder="ชื่อประเภทสินค้า" :required="true" />

      <div class="flex justify-end">
        <button class="bg-green-500 hover:bg-green-800 text-white font-bold py-2 px-4 rounded" @click="addCategory">
          เพิ่ม
        </button>
        <button class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded ml-2"
          @click="closeModal">
          ยกเลิก
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import Swal from "sweetalert2";
import axios from "axios";

export default {
  data() {
    return {
      categoryName: "",
      emp: null,
    };
  },
  methods: {
    async addCategory() {
      if (!this.categoryName.trim()) return;

      const { isConfirmed } = await Swal.fire({
        title: "ยืนยันการเพิ่มประเภทสินค้า?",
        text: `คุณต้องการเพิ่มประเภทสินค้า "${this.categoryName.trim()}" ใช่หรือไม่?`,
        icon: "question",
        showCancelButton: true,
        confirmButtonText: "ใช่",
        cancelButtonText: "ไม่",
        cancelButtonColor: "#d33",
        confirmButtonColor: "#3085d6",
      });

      if (isConfirmed) {
        try {
          await axios.post(
            "http://147.50.183.57:9030/antiques/product/category",
            { name: this.categoryName.trim(), emp: this.empId }
          );

          this.$emit("added", this.categoryName.trim());
          console.log(this.empId);
        } catch (error) {
          Swal.fire("ไม่สามารถเพิ่มประเภทสินค้าได้", error, "error");
        }

        this.closeModal();
      }
    },

    closeModal() {
      this.$emit("close");
    },
  },
  mounted() {
    this.empId = this.$store.getters.id; // กำหนดค่า empId จาก store เมื่อคอมโพเนนต์ถูกโหลด
  },
};
</script>
