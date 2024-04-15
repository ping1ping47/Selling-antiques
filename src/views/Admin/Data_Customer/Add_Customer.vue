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
        <form @submit.prevent="AddCustomer" class="p-6">
          <!-- Modal header -->
          <div class="flex items-center justify-between pb-4 border-b">
            <h3 class="text-lg font-semibold">
              เพิ่มลูกค้า: {{ formData.fullname_th }}
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
                >หมายเลขบัตร</label
              >
              <input
                v-model="formData.id_card"
                type="text"
                name="id_card"
                id="id_card"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                placeholder="ป้อน หมายเลขบัตร"
                required
              />
            </div>

            <!-- Customer full name -->
            <div class="col-span-2">
              <label
                for="fullname_th"
                class="block mb-2 text-sm font-medium text-gray-900"
                >ชื่อ</label
              >
              <input
                v-model="formData.fullname_th"
                type="text"
                name="fullname_th"
                id="fullname_th"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                placeholder="ป้อน ชื่อลูกค้า"
                required
              />
            </div>

            <!-- Customer birthday -->
            <div class="col-span-2">
              <label
                for="birthday_th"
                class="block mb-2 text-sm font-medium text-gray-900"
                >วันเกิด</label
              >
              <input
                v-model="formData.birthday_th"
                type="text"
                name="birthday_th"
                id="birthday_th"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                placeholder="ป้อน วันเกิด"
                required
              />
            </div>

            <!-- Customer religion -->
            <div class="col-span-2">
              <label
                for="religion"
                class="block mb-2 text-sm font-medium text-gray-900"
                >ศาสนา</label
              >
              <input
                v-model="formData.religion"
                type="text"
                name="religion"
                id="religion"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                placeholder="ป้อน ศาสนา"
                required
              />
            </div>

            <!-- Customer address -->
            <div class="col-span-2">
              <label
                for="address"
                class="block mb-2 text-sm font-medium text-gray-900"
                >ที่อยู่</label
              >
              <input
                v-model="formData.address"
                type="text"
                name="address"
                id="address"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                placeholder="ป้อน ที่อยู่"
                required
              />
            </div>

            <!-- Customer date of issue -->
            <div class="col-span-2">
              <label
                for="date_of_issue"
                class="block mb-2 text-sm font-medium text-gray-900"
                >วันออกบัตร</label
              >
              <input
                v-model="formData.date_of_issue"
                type="text"
                name="date_of_issue"
                id="date_of_issue"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                placeholder="ป้อน วันออกบัตร"
                required
              />
            </div>

            <!-- Customer date of expiry -->
            <div class="col-span-2">
              <label
                for="date_of_expiry"
                class="block mb-2 text-sm font-medium text-gray-900"
                >วันหมดอายุ</label
              >
              <input
                v-model="formData.date_of_expiry"
                type="text"
                name="date_of_expiry"
                id="date_of_expiry"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                placeholder="ป้อน วันหมดอายุ"
                required
              />
            </div>

            <!-- Customer vehicle -->
            <div class="col-span-2">
              <label
                for="vehicle"
                class="block mb-2 text-sm font-medium text-gray-900"
                >รถ</label
              >
              <input
                v-model="formData.vehicle"
                type="text"
                name="vehicle"
                id="vehicle"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                placeholder="ป้อน รถ"
                required
              />
            </div>

            <!-- Customer vehicle detail -->
            <div class="col-span-2">
              <label
                for="vehicle_detail"
                class="block mb-2 text-sm font-medium text-gray-900"
                >รายละเอียดรถ</label
              >
              <input
                v-model="formData.vehicle_detail"
                type="text"
                name="vehicle_detail"
                id="vehicle_detail"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                placeholder="ป้อน รายละเอียดรถ"
                required
              />
            </div>

            <!-- Customer class -->
            <div class="col-span-2">
              <label
                for="class"
                class="block mb-2 text-sm font-medium text-gray-900"
                >ชนิด</label
              >
              <input
                v-model="formData.class"
                type="text"
                name="class"
                id="class"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                placeholder="ป้อน ชนิด"
                required
              />
            </div>

            <!-- Customer vendor track -->
            <div class="col-span-2">
              <label
                for="vendor_track"
                class="block mb-2 text-sm font-medium text-gray-900"
                >Vendor Track</label
              >
              <input
                v-model="formData.vendor_track"
                type="text"
                name="vendor_track"
                id="vendor_track"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                placeholder="ป้อน Vendor Track"
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
  data() {
    return {
      formData: {
        id_card: "",
        fullname_th: "",
        full_name_en: "",
        birthday_th: "",
        birthday_en: "",
        religion: "",
        address: "",
        date_of_issue: "",
        date_of_expiry: "",
        vehicle: "",
        vehicle_detail: "",
        class: "",
        vendor_track: "",
      },
    };
  },

  methods: {
    async AddCustomer() {
      try {
        // แสดงข้อความยืนยันการเพิ่มข้อมูลลูกค้า
        await Swal.fire({
          title: "ยืนยันการเพิ่ม",
          text: "คุณแน่ใจหรือไม่ที่จะเพิ่มข้อมูล?",
          icon: "info",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "เพิ่ม",
          cancelButtonText: "ยกเลิก",
        }).then(async (result) => {
          if (result.isConfirmed) {
            await axios.post(
              `${import.meta.env.VITE_API_CUSTOMER}`,
              this.formData
            );
            {
              await Swal.fire("เพิ่มข้อมูลสําเร็จ!", "", "success");
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
