<template>
  <div
    class="popup-overlay fixed top-0 left-0 z-50 w-full h-full bg-black bg-opacity-5 flex justify-center items-center text-2xl"
  >
    <!-- Popup content -->
    <div
      class="popup-content bg-white border border-black rounded-lg overflow-auto max-h-[80vh]"
    >
      <div>
        <!-- Form for adding an employee -->
        <form @submit.prevent="EditEmployee" class="p-6">
          <!-- Modal header -->
          <div class="flex items-center justify-between pb-4 border-b">
            <h3 class="text-2xl font-semibold">
              แก้ไขพนักงาน: {{ formData.employee_name }}
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
              <input
                v-model="formData.employee_name"
                type="text"
                name="employee_name"
                id="employee_name"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-2xl rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                placeholder="ป้อน ชื่อพนักงาน"
                required
              />
            </div>

            <!-- Employee phone -->
            <div class="col-span-2">
              <label
                for="employee_phone"
                class="block mb-2 text-2xl font-medium text-gray-900"
                >เบอร์โทร</label
              >
              <input
                v-model="formData.employee_phone"
                name="employee_phone"
                id="employee_phone"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-2xl rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                placeholder="ป้อน เบอร์โทร 10 หลัก"
                required
                minlength="10"
                maxlength="10"
                @input="validatePhoneNumber"
              />
            </div>

            <!-- Employee position -->
            <div class="col-span-2">
              <label
                for="employee_position"
                class="block mb-2 text-2xl font-medium text-gray-900"
                >เลือกตำแหน่ง</label
              >
              <select
                v-model="formData.employee_position"
                name="employee_position"
                id="employee_position"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-2xl rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                required
              >
                <option value="" disabled selected>กรุณาเลือกตำแหน่ง</option>
                <option value="owner">เจ้าของ</option>
                <option value="cashier">พนักงานขาย</option>
                <option value="employee">พนักงานทั่วไป</option>
              </select>
            </div>

            <!-- Employee status -->
            <div class="col-span-2 flex items-center">
              <label
                for="employee_status"
                class="block mr-2 text-2xl font-medium text-gray-900"
                >เลือกสถานะ</label
              >

              <!-- Switch for employee status -->
              <label class="switch">
                <input
                  type="checkbox"
                  v-model="formData.employee_status"
                  class="hidden"
                />
                <div class="slider round"></div>
              </label>

              <!-- Text indicating status -->
              <span
                class="text-2xl ml-2 font-medium text-gray-900"
                v-text="formData.employee_status ? 'เปิด' : 'ปิด'"
              ></span>
            </div>

            <!-- Employee username -->
            <div class="col-span-2">
              <label
                for="employee_username"
                class="block mb-2 text-2xl font-medium text-gray-900"
                >ชื่อผู้ใช้</label
              >
              <input
                v-model="formData.employee_username"
                type="text"
                name="employee_username"
                id="employee_username"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-2xl rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                placeholder="ป้อน ชื่อผู้ใช้"
                required
              />
            </div>

            <!-- Employee password -->
            <div class="col-span-2">
              <label
                for="employee_password"
                class="block mb-2 text-2xl font-medium text-gray-900"
                >รหัสผ่าน</label
              >
              <input
                v-model="formData.employee_password"
                type="password"
                name="employee_password"
                id="employee_password"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-2xl rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                placeholder="ป้อน รหัสผ่าน 6 ตัวอักษรขึ้นไป"
                required
                minlength="6"
              />
            </div>
          </div>

          <!-- Save and cancel buttons -->
          <div class="p-3 mt-2 text-center space-x-4 md:block">
            <button
              type="submit"
              class="mb-2 md:mb-0 bg-indigo-500 border px-5 py-2 text-2xl shadow-sm font-medium tracking-wider text-white rounded-md hover:shadow-lg hover:bg-indigo-600"
            >
              บันทึก
            </button>

            <button
              @click.prevent="ModalClose"
              class="mb-2 md:mb-0 bg-red-500 border px-5 py-2 text-2xl shadow-sm font-medium tracking-wider text-white rounded-md hover:shadow-lg hover:bg-red-600"
            >
              ยกเลิก
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Swal from "sweetalert2";

export default {
  name: "EditPopup",
  props: {
    employee: Object,
  },
  data() {
    return {
      formData: {
        employee_name: "",
        employee_phone: "",
        employee_position: "",
        employee_status: "",
        employee_username: "",
        employee_password: "",
      },
    };
  },

  created() {
    // กำหนดค่าให้ formData ตามข้อมูล Employee
    this.formData = { ...this.employee };
  },

  methods: {
    async EditEmployee() {
      try {
        await Swal.fire({
          title: "ยืนยันการแก้ไข",
          text: "คุณแน่ใจหรือไม่ที่จะแก้ไขข้อมูล?",
          icon: "info",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "บันทึก",
          cancelButtonText: "ยกเลิก",
        }).then(async (result) => {
          if (result.isConfirmed) {
            await axios.put(
              `${import.meta.env.VITE_API_EMPLOYEE}${this.employee._id}`,
              this.formData
            );
            {
              await Swal.fire("แก้ไขข้อมูลสําเร็จ!", "", "success");
              this.$emit("close");
            }
            await window.location.reload();
          }
        });
      } catch (error) {
        console.error("Error updating data:", error);
        Swal.fire("Error!", "Failed to update data", "error");
      }
    },

    ModalClose() {
      this.$emit("close");
    },

    validatePhoneNumber() {
      // ตรวจสอบความยาวของเบอร์โทรไม่เกิน 10 ตัว
      if (this.formData.employee_phone.length >= 10) {
        this.formData.employee_phone = this.formData.employee_phone.slice(
          0,
          10
        );
      }
      // ตรวจสอบว่าเป็นตัวเลขหรือไม่
      const regex = /^[0-9]*$/;
      if (!regex.test(this.formData.employee_phone)) {
        // ถ้าไม่ใช่ตัวเลข ลบตัวอักษรที่ไม่ใช่ตัวเลขทิ้ง
        this.formData.employee_phone = this.formData.employee_phone.replace(
          /\D/g,
          ""
        );
      }
    },

    toggleCheckbox() {
      this.formData.employee_status = !this.formData.employee_status;
    },
  },
};
</script>

<style scoped>
.popup-content {
  max-width: 800px;
  width: 90%;
}

/* Switch styling */
.switch {
  position: relative;
  display: inline-block;
  width: 60px;
  height: 34px;
}

.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgb(255, 0, 0);
  transition: background-color 0.4s;
}

.slider:before {
  content: "";
  position: absolute;
  height: 26px;
  width: 26px;
  left: 4px;
  bottom: 4px;
  background-color: rgb(206, 199, 199);
  transition: transform 0.4s;
}

.switch input:checked + .slider {
  background-color: #15ff00;
}

.switch input:focus + .slider {
  box-shadow: 0 0 1px #ffffff;
}

.switch input:checked + .slider:before {
  transform: translateX(26px);
}
</style>

