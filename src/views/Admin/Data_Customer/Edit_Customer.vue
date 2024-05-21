<template>
  <div
    class="popup-overlay fixed top-0 left-0 z-50 w-full h-full bg-black bg-opacity-50 flex justify-center items-center"
  >
    <!-- Popup content -->
    <div
      class="popup-content bg-white border border-black rounded-lg overflow-auto max-h-[80vh]"
    >
      <div>
        <!-- Form for adding a customer -->
        <form @submit.prevent="editCustomer" class="p-6">
          <!-- Modal header -->
          <div class="flex items-center justify-between pb-4 border-b">
            <h3 class="text-lg font-semibold">
              เพิ่มลูกค้า: {{ formData.fullname }}
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

          <!-- Customer details -->
          <div class="grid gap-6 mb-6 md:grid-cols-4">
            <!-- Customer full name -->
            <div class="col-span-2">
              <label
                for="id_card"
                class="block mb-2 text-sm font-medium text-gray-900"
                >บัตรประชาชน</label
              >
              <input
                v-model="formData.id_card"
                type="text"
                name="id_card"
                id="id_card"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                placeholder="ป้อน บัตรประชาชน"
                required
              />
            </div>

            <!-- Customer full name -->
            <div class="col-span-2">
              <label
                for="level"
                class="block mb-2 text-sm font-medium text-gray-900"
                >ระดับ</label
              >
              <input
                v-model="formData.level"
                type="text"
                name="level"
                id="level"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                placeholder="ป้อน ระดับ"
                required
              />
            </div>

            <!-- Customer birthday -->
            <div class="col-span-2">
              <label
                for="fullname"
                class="block mb-2 text-sm font-medium text-gray-900"
                >ชื่อเต็ม</label
              >
              <input
                v-model="formData.fullname"
                type="text"
                name="fullname"
                id="fullname"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                placeholder="ป้อน วันเกิด"
                required
              />
            </div>

            <!-- Customer religion -->
            <div class="col-span-2">
              <label
                for="address"
                class="block mb-2 text-sm font-medium text-gray-900"
                >ที่อยู่</label
              >
              <input
                v-model="formData.address"
                type="text"
                name="adress"
                id="adress"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                placeholder="ป้อน ที่อยู่"
                required
              />
            </div>

            <!-- Customer address -->
            <div class="col-span-2">
              <label
                for="subdistrict"
                class="block mb-2 text-sm font-medium text-gray-900"
                >ตำบล</label
              >
              <input
                v-model="formData.subdistrict"
                type="text"
                name="subdistrict"
                id="subdistrict"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                placeholder="ป้อน ตำบล"
                required
              />
            </div>

            <!-- Customer date of issue -->
            <div class="col-span-2">
              <label
                for="district"
                class="block mb-2 text-sm font-medium text-gray-900"
                >อำเภอ</label
              >
              <input
                v-model="formData.district"
                type="text"
                name="district"
                id="district"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                placeholder="ป้อน อำเภอ"
                required
              />
            </div>

            <!-- Customer date of expiry -->
            <div class="col-span-2">
              <label
                for="province"
                class="block mb-2 text-sm font-medium text-gray-900"
                >จังหวัด</label
              >
              <input
                v-model="formData.province"
                type="text"
                name="province"
                id="province"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                placeholder="ป้อน จังหวัด"
                required
              />
            </div>

            <!-- Customer vehicle -->
            <div class="col-span-2">
              <label
                for="postcode"
                class="block mb-2 text-sm font-medium text-gray-900"
                >รหัสไปรษณีย์</label
              >
              <input
                v-model="formData.postcode"
                type="text"
                name="postcode"
                id="postcode"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                placeholder="ป้อน รหัสไปรษณีย์"
                required
              />
            </div>

            <!-- Customer vehicle detail -->
            <div class="col-span-2">
              <label
                for="vehicle_code"
                class="block mb-2 text-sm font-medium text-gray-900"
                >ป้ายทะเบียน</label
              >
              <input
                v-model="formData.vehicle_code"
                type="text"
                name="vehicle_code"
                id="vehicle_code"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                placeholder="ป้อน ป้ายทะเบียน"
                required
              />
            </div>

            <!-- Customer class -->
            <div class="col-span-2">
              <label
                for="emp"
                class="block mb-2 text-sm font-medium text-gray-900"
                >พนักงาน</label
              >
              <input
                v-model="formData.emp"
                type="text"
                name="emp"
                id="emp"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                placeholder="ป้อน พนักงาน"
                required
              />
            </div>
          </div>

          <!-- Save and cancel buttons -->
          <div class="p-3 mt-2 text-center space-x-4 md:block">
            <button
              type="submit"
              class="mb-2 md:mb-0 bg-indigo-500 border px-5 py-2 text-sm shadow-sm font-medium tracking-wider text-white rounded-md hover:shadow-lg hover:bg-indigo-600"
            >
              เพิ่ม
            </button>
            <button
              @click.prevent="ModalClose"
              class="mb-2 md:mb-0 bg-red-500 border px-5 py-2 text-sm shadow-sm font-medium tracking-wider text-white rounded-md hover:shadow-lg hover:bg-red-600"
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
    customer: Object,
  },
  data() {
    return {
      formData: {
        id_card: "",
        level: "",
        fullname: "",
        address: "",
        subdistrict: "",
        district: "",
        province: "",
        postcode: "",
        vehicle_code: "",
        emp: "",
      },
    };
  },

  created() {
    // กำหนดค่าให้ formData ตามข้อมูล Employee
    this.formData = { ...this.customer };
  },

  methods: {
    async editCustomer() {
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
              `${import.meta.env.VITE_API_ALL}customer/${this.customer._id}`,
              this.formData
            );
            {
              await Swal.fire("แก้ไขข้อมูลสําเร็จ!", "", "success");
              this.$emit("close");
              this.$emit("edited");
            }
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
