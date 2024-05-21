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
        <form @submit.prevent="editEmployee" class="p-6">
          <!-- Modal header -->
          <div class="flex items-center justify-between pb-4 border-b">
            <h3 class="text-2xl font-semibold">
              แก้ไขพนักงาน: {{ formData.employee_name }}
            </h3>
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
          <!-- Employee details -->
          <div class="grid gap-6 mb-6 md:grid-cols-4">
            <!-- Loop through employee details -->
            <template v-for="(field, label) in formFields">
              <div
                v-if="label !== 'employee_status'"
                :key="label"
                :class="getFieldClass(label)"
              >
                <label
                  :for="label"
                  class="block mb-2 text-2xl font-medium text-gray-900"
                  >{{ field.label }}</label
                >
                <input
                  v-model="formData[label]"
                  :type="field.type"
                  :name="label"
                  class="input-style"
                  :placeholder="field.placeholder"
                  :required="field.required"
                  :minlength="field.minlength"
                  :maxlength="field.maxlength"
                  @input="
                    label === 'employee_phone' ? validatePhoneNumber : null
                  "
                />
              </div>
            </template>
            <!-- Switch for employee status -->
            <div class="col-span-2 flex items-center">
              <label
                for="employee_status"
                class="block mr-2 text-2xl font-medium text-gray-900"
                >เลือกสถานะ</label
              >
              <label class="switch">
                <input
                  type="checkbox"
                  v-model="formData.employee_status"
                  class="hidden"
                />
                <div class="slider round"></div>
              </label>
              <span
                class="text-2xl ml-2 font-medium text-gray-900"
                v-text="formData.employee_status ? 'เปิด' : 'ปิด'"
              ></span>
            </div>
          </div>
          <!-- Save and cancel buttons -->
          <div class="p-3 mt-2 text-center space-x-4 md:block">
            <button type="submit" class="button-style bg-indigo-500">
              บันทึก
            </button>
            <button @click.prevent="modalClose" class="button-style bg-red-500">
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
      formFields: {
        employee_name: {
          label: "ชื่อ",
          type: "text",
          placeholder: "ป้อน ชื่อพนักงาน",
          required: true,
        },
        employee_phone: {
          label: "เบอร์โทร",
          type: "text",
          placeholder: "ป้อน เบอร์โทร 10 หลัก",
          required: true,
          minlength: 10,
          maxlength: 10,
        },
        employee_position: {
          label: "เลือกตำแหน่ง",
          type: "select",
          placeholder: "กรุณาเลือกตำแหน่ง",
          required: true,
        },
        employee_username: {
          label: "ชื่อผู้ใช้",
          type: "text",
          placeholder: "ป้อน ชื่อผู้ใช้",
          required: true,
        },
        employee_password: {
          label: "รหัสผ่าน",
          type: "password",
          placeholder: "ป้อน รหัสผ่าน 6 ตัวอักษรขึ้นไป",
          required: true,
          minlength: 6,
        },
      },
    };
  },
  created() {
    this.formData = { ...this.employee };
  },
  methods: {
    async editEmployee() {
      try {
        const result = await Swal.fire({
          title: "ยืนยันการแก้ไข",
          text: "คุณแน่ใจหรือไม่ที่จะแก้ไขข้อมูล?",
          icon: "info",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "บันทึก",
          cancelButtonText: "ยกเลิก",
        });
        if (result.isConfirmed) {
          await axios.put(
            `${import.meta.env.VITE_API_ALL}/employee/${this.employee._id}`,
            this.formData
          );
          await Swal.fire("แก้ไขข้อมูลสําเร็จ!", "", "success");
          this.$emit("close");
          this.$emit("edited");
        }
      } catch (error) {
        console.error("Error updating data:", error);
        Swal.fire("Error!", "Failed to update data", "error");
      }
    },
    modalClose() {
      this.$emit("close");
    },
    validatePhoneNumber() {
      if (this.formData.employee_phone.length >= 10) {
        this.formData.employee_phone = this.formData.employee_phone.slice(
          0,
          10
        );
      }
      const regex = /^[0-9]*$/;
      if (!regex.test(this.formData.employee_phone)) {
        this.formData.employee_phone = this.formData.employee_phone.replace(
          /\D/g,
          ""
        );
      }
    },
    getFieldClass(label) {
      return { "col-span-2": label !== "employee_status" };
    },
  },
};
</script>

<style scoped>
.popup-content {
  max-width: 800px;
  width: 90%;
}
.input-style {
  background-color: #f7fafc;
  border: 1px solid #e4e7eb;
  color: #374151;
  font-size: 20px;
  padding: 10px;
  border-radius: 8px;
  transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
  width: 100%;
}
.input-style:focus {
  border-color: #3b82f6;
  outline: 2px solid transparent;
  outline-offset: 2px;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.25);
}

.button-style {
  border: 1px solid #3b82f6;
  color: #ffffff;
  font-size: 20px;
  padding: 10px 20px;
  border-radius: 8px;
  transition: background-color 0.15s ease-in-out, border-color 0.15s ease-in-out,
    box-shadow 0.15s ease-in-out;
}
.button-style:hover {
  background-color: #3b82f6;
}
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
