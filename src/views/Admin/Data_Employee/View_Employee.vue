<template>
  <div
    class="popup-overlay fixed top-0 left-0 z-50 w-full h-full bg-black bg-opacity-5 flex justify-center items-center"
  >
    <!-- Popup content -->
    <div
      class="popup-content bg-white border border-black rounded-lg overflow-auto max-h-[80vh]"
    >
      <div>
        <!-- Form for adding an employee -->
        <form class="p-6">
          <!-- Modal header -->
          <div class="flex items-center justify-between pb-4 border-b">
            <h3 class="text-2xl font-semibold">
              ข้อมูลพนักงาน: {{ formData.employee_name }}
            </h3>

            <!-- Close button -->
            <button
              @click.prevent="ModalClose"
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

          <!-- Employee details -->
          <div class="grid gap-6 mb-6 md:grid-cols-4">
            <!-- Employee name -->
            <div class="col-span-2">
              <label
                for="employee_name"
                class="block mb-2 text-2xl font-medium text-gray-900"
                >ชื่อ</label
              >
              <span
                class="bg-gray-50 border border-gray-300 text-gray-900 text-2xl rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
              >
                {{ formData.employee_name }}
              </span>
            </div>

            <!-- Employee phone -->
            <div class="col-span-2">
              <label
                for="employee_phone"
                class="block mb-2 text-2xl font-medium text-gray-900"
                >เบอร์โทร</label
              >
              <span
                class="bg-gray-50 border border-gray-300 text-gray-900 text-2xl rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
              >
                {{ formData.employee_phone }}
              </span>
            </div>

            <!-- Employee position -->
            <div class="col-span-2">
              <label
                for="employee_position"
                class="block mb-2 text-2xl font-medium text-gray-900"
                >ตำแหน่ง</label
              >
              <span
                class="bg-gray-50 border border-gray-300 text-gray-900 text-2xl rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
              >
                {{ formData.employee_position }}
              </span>
            </div>

            <!-- Employee username -->
            <div class="col-span-2">
              <label
                for="employee_username"
                class="block mb-2 text-2xl font-medium text-gray-900"
                >ชื่อผู้ใช้</label
              >
              <span
                class="bg-gray-50 border border-gray-300 text-gray-900 text-2xl rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
              >
                {{ formData.employee_username }}
              </span>
            </div>
          </div>

          <!-- cancel buttons -->
          <div class="p-3 mt-2 text-center space-x-4 md:block">
            <button
              @click.prevent="ModalClose"
              class="mb-2 md:mb-0 bg-red-500 border px-5 py-2 text-2xl shadow-sm font-medium tracking-wider text-white rounded-md hover:shadow-lg hover:bg-red-600"
            >
              ปิด
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "EditPopup",
  props: {
    employee: Object,
  },

  created() {
    // กำหนดค่าให้ formData ตามข้อมูล Employee
    this.formData = { ...this.employee };
  },

  methods: {
    ModalClose() {
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
