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
          <!-- Customer full name -->
          <div class="col-span-1 lg:col-span-4">
            <label
              for="fullname"
              class="block mb-2 text-sm font-medium text-gray-900"
              >ชื่อ-สกุล</label
            >
            <input
              v-model="formData.fullname"
              type="text"
              name="fullname"
              id="fullname"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
              placeholder="ป้อน ชื่อเต็ม"
              required
            />
          </div>

          <!-- Customer details -->
          <div class="grid gap-6 mb-6 md:grid-cols-2 lg:grid-cols-4">
            <!-- Customer full name -->
            <div class="col-span-1 lg:col-span-2">
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

            <div class="col-span-1 lg:col-span-2">
              <label
                for="tel"
                class="block mb-2 text-sm font-medium text-gray-900"
                >เบอร์โทรศัพท์</label
              >
              <input
                v-model="formData.tel"
                type="text"
                name="tel"
                id="tel"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                placeholder="ป้อน ระดับ"
                required
              />
            </div>

            <!-- Customer class -->
            <div class="col-span-1 lg:col-span-2">
              <label
                for="level"
                class="block mb-2 text-sm font-medium text-gray-900"
                >ระดับ</label
              >
              <select
                v-model="formData.level"
                name="level"
                id="level"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                required
              >
                <option value="" disabled selected>กรุณาเลือกระดับ</option>
                <option
                  v-for="level in [1, 2, 3, 4, 5]"
                  :key="level"
                  :value="level"
                >
                  {{ level }}
                </option>
              </select>
            </div>

            <!-- Customer vehicle code -->
            <div class="col-span-1 lg:col-span-2">
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

            <!-- Customer address -->
            <div class="col-span-1 lg:col-span-4">
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

            <!-- Province dropdown -->
            <div class="col-span-1 lg:col-span-2">
              <label
                for="province"
                class="block mb-2 text-sm font-medium text-gray-900"
                >จังหวัด</label
              >
              <select
                v-model="formData.province"
                name="province"
                id="province"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                required
              >
                <option value="" disabled selected>กรุณาเลือกจังหวัด</option>
                <option
                  v-for="province in provinces"
                  :value="province.id"
                  :key="province.id"
                >
                  {{ province.name_th }}
                </option>
              </select>
            </div>

            <!-- Amphure dropdown -->
            <div v-if="formData.province" class="col-span-1 lg:col-span-2">
              <label
                for="district"
                class="block mb-2 text-sm font-medium text-gray-900"
                >อำเภอ</label
              >
              <select
                v-model="formData.district"
                name="district"
                id="district"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                required
              >
                <option value="" disabled selected>กรุณาเลือกอำเภอ</option>
                <option
                  v-for="amphure in amphures"
                  :value="amphure.id"
                  :key="amphure.id"
                >
                  {{ amphure.name_th }}
                </option>
              </select>
            </div>

            <!-- Tambon dropdown -->
            <div v-if="formData.province" class="col-span-1 lg:col-span-2">
              <label
                for="subdistrict"
                class="block mb-2 text-sm font-medium text-gray-900"
                >ตำบล</label
              >
              <select
                v-model="formData.subdistrict"
                name="subdistrict"
                id="subdistrict"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                @change="updatePostcode"
                required
              >
                <option value="" disabled selected>กรุณาเลือกตำบล</option>
                <option
                  v-for="tambon in tambons"
                  :value="tambon.id"
                  :key="tambon.id"
                  :data-postcode="tambon.zip_code"
                >
                  {{ tambon.name_th }}
                </option>
              </select>
            </div>

            <!-- Customer postcode -->
            <div v-if="formData.province" class="col-span-1 lg:col-span-2">
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
                readonly
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
      empId: null,
      formData: {
        id_card: "",
        level: "",
        fullname: "",
        address: "",
        tel: "",
        subdistrict: "",
        district: "",
        province: "",
        postcode: "",
        vehicle_code: "",
        emp: null,
      },
      provinces: [],
      amphures: [],
      tambons: [],
      classOptions: [],
    };
  },

  methods: {
    updatePostcode() {
      const selectedTambon = this.tambons.find(
        (tambon) => tambon.id === this.formData.subdistrict
      );
      if (selectedTambon) {
        this.formData.postcode = selectedTambon.zip_code;
      }
    },

    async AddCustomer() {
      try {
        const { isConfirmed } = await Swal.fire({
          title: "ยืนยันการเพิ่ม",
          text: "คุณแน่ใจหรือไม่ที่จะเพิ่มข้อมูล?",
          icon: "info",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "เพิ่ม",
          cancelButtonText: "ยกเลิก",
        });

        if (isConfirmed) {
          await axios.post(
            `${import.meta.env.VITE_API_ALL}customer`,
            this.formData
          );
          Swal.fire("เพิ่มข้อมูลสําเร็จ!", "", "success");
          this.$emit("close");
          this.$emit("added");
        }
      } catch (error) {
        console.error("Error creating data:", error);
        Swal.fire("Error!", "Failed to create data", "error");
      }
    },

    async fetchClass() {
      try {
        const response = await axios.get(
          `http://147.50.183.57:9030/antiques/product/price`
        );
        this.classOptions = response.data.data;
        console.log(this.classOptions);
      } catch (error) {
        console.error("Error fetching class:", error);
      }
    },

    ModalClose() {
      this.$emit("close");
    },

    async fetchProvinces() {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_VUE_APP_PROVINCE}`
        );
        this.provinces = response.data;
      } catch (error) {
        console.error("Error fetching provinces:", error);
      }
    },

    async fetchAmphures() {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_VUE_APP_AMPHURE}`
        );
        const selectedProvinceId = this.formData.province;
        this.amphures = response.data.filter(
          (amphure) => amphure.province_id === selectedProvinceId
        );
      } catch (error) {
        console.error("Error fetching amphures:", error);
      }
    },

    async fetchTambons() {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_VUE_APP_TAMBON}`
        );
        const selectedAmphureId = this.formData.district;
        this.tambons = response.data.filter(
          (tambon) => tambon.amphure_id === selectedAmphureId
        );
      } catch (error) {
        console.error("Error fetching tambons:", error);
      }
    },

    onProvinceChange() {
      this.fetchAmphures();
    },

    onAmphureChange() {
      this.fetchTambons();
    },
  },

  watch: {
    // เมื่อมีการเลือกจังหวัดเกิดขึ้น
    "formData.province": "onProvinceChange",
    // เมื่อมีการเลือกอำเภอเกิดขึ้น
    "formData.district": "onAmphureChange",
  },

  mounted() {
    this.empId = this.$store.getters.id;
    this.formData.emp = this.empId;
    this.fetchProvinces();
    this.fetchClass();
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
