<template>
  <div class="container mx-auto p-4">
    <!-- Modal for adding a new category -->
    <add-category v-if="showModal" @close="closeModal" @added="fetchData" />

    <!-- Header -->
    <div class="mb-8 flex items-center justify-center">
      <img
        src="../../../assets/images/logo.png"
        alt="Product Logo"
        class="w-8 lg:w-10 mr-2"
      />
      <h1
        class="text-2xl lg:text-4xl font-bold text-green-600 hover:text-green-700"
      >
        จัดการสินค้าทั้งหมด
      </h1>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <!-- Categories -->
      <div>
        <div class="bg-white rounded-lg shadow-md p-4">
          <div class="flex items-center justify-between mb-4">
            <h2 class="text-lg lg:text-xl font-bold text-green-600">
              ประเภทหลัก
            </h2>
            <button
              class="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-3 rounded transition-colors duration-300"
              @click="openModal"
            >
              <i class="fas fa-plus mr-2"></i> เพิ่ม
            </button>
          </div>
          <input
            v-model="searchProvince"
            class="w-full px-2 py-1 mb-2 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
            placeholder="ค้นหาประเภทสินค้า"
          />
          <div class="border border-gray-300 rounded-lg p-2">
            <ul class="list-disc text-gray-700">
              <li
                v-for="(province, index) in filteredProvinces"
                :key="province.id"
                class="mb-2 cursor-pointer hover:text-green-600 transition-colors duration-300 flex items-center border border-gray-300 hover:bg-gray-200 rounded-lg p-2"
                @click="selectProvince(province)"
                :class="{ 'bg-gray-200': selectedProvince === province }"
              >
                <div class="flex-grow">{{ truncateName(province.name) }}</div>
                <div class="relative">
                  <button
                    @click.stop="toggleMenu(index, 'province')"
                    class="p-2 bg-green-500 text-white rounded"
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
                        d="M6 12h.01M12 12h.01M18 12h.01"
                      />
                    </svg>
                  </button>
                  <div
                    v-if="menuIndex === index && menuType === 'province'"
                    class="absolute right-0 mt-2 w-48 bg-white border rounded shadow-md z-10"
                  >
                    <ul class="py-1">
                      <li
                        @click="editProvinceModal(province)"
                        class="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                      >
                        แก้ไข
                      </li>
                      <li
                        @click="deleteProvinceConfirm(province)"
                        class="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                      >
                        ลบ
                      </li>
                    </ul>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <!-- Sub-Categories -->
      <div>
        <div class="bg-white rounded-lg shadow-md p-4">
          <div class="flex items-center justify-between mb-4">
            <h2 class="text-lg lg:text-xl font-bold text-green-600">
              ประเภทสินค้าย่อย
            </h2>
            <button
              class="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-3 rounded transition-colors duration-300"
              @click="addDistrict"
              :disabled="!selectedProvince"
            >
              <i class="fas fa-plus mr-2"></i> เพิ่ม
            </button>
          </div>
          <input
            v-model="newDistrictName"
            class="w-full px-2 py-1 mb-2 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
            placeholder="ชื่อประเภทสินค้าย่อย"
            :disabled="!selectedProvince"
            required
          />
          <div class="border border-gray-300 rounded-lg p-2">
            <ul class="list-disc text-gray-700">
              <li
                v-for="(district, index) in selectedDistricts"
                :key="district.id"
                class="mb-2 cursor-pointer hover:text-green-600 transition-colors duration-300 flex items-center border border-gray-300 hover:bg-gray-200 rounded-lg p-2"
                @click="selectDistrict(district)"
                :class="{ 'bg-gray-200': selectedDistrict === district }"
              >
                <div class="flex-grow flex items-center">
                  <span>{{ truncateName(district.name) }}</span>
                  <div class="relative ml-auto">
                    <button
                      @click.stop="toggleMenu(index, 'district')"
                      class="p-2 bg-green-500 text-white rounded"
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
                          d="M6 12h.01M12 12h.01M18 12h.01"
                        />
                      </svg>
                    </button>
                    <div
                      v-if="menuIndex === index && menuType === 'district'"
                      class="absolute right-0 mt-2 w-48 bg-white border rounded shadow-md z-10"
                    >
                      <ul class="py-1">
                        <li
                          @click="editDistrictModal(district)"
                          class="px-4 py2 hover:bg-gray-100 cursor-pointer"
                        >
                          แก้ไข
                        </li>
                        <li
                          @click="deleteDistrictConfirm(district)"
                          class="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                        >
                          ลบ
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <!-- Products -->
      <div>
        <div class="md:col-span-2 lg:col-span-1">
          <div class="bg-white rounded-lg shadow-md p-4">
            <div
              class="flex flex-col lg:flex-row items-center justify-between mb-4"
            >
              <h2
                class="text-lg lg:text-xl font-bold text-green-600 mb-2 lg:mb-0"
              >
                ชื่อสินค้า
              </h2>
              <button
                class="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-3 rounded transition-colors duration-300"
                @click="addSubdistrict"
                :disabled="!selectedDistrict"
              >
                <i class="fas fa-plus mr-2"></i> เพิ่ม
              </button>
            </div>
            <input
              v-model="newSubdistrictName"
              class="w-full px-2 py-1 mb-2 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
              placeholder="ชื่อสินค้า"
              :disabled="!selectedDistrict"
            />
            <div class="border border-gray-300 rounded-lg p-2">
              <ul class="list-disc text-gray-700">
                <li
                  v-for="(subdistrict, index) in selectedSubdistricts"
                  :key="subdistrict.id"
                  class="mb-2 cursor-pointer hover:text-green-600 transition-colors duration-300 flex items-center border border-gray-300 hover:bg-gray-200 rounded-lg p-2"
                  @click="selectSubdistrict(subdistrict)"
                  :class="{
                    'bg-gray-200': selectedSubdistrict === subdistrict,
                  }"
                >
                  <div class="flex-grow flex items-center">
                    <span>{{ truncateName(subdistrict.name) }}</span>
                    <div class="relative ml-auto">
                      <button
                        @click.stop="toggleMenu(index, 'subdistrict')"
                        class="p-2 bg-green-500 text-white rounded"
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
                            d="M6 12h.01M12 12h.01M18 12h.01"
                          />
                        </svg>
                      </button>
                      <div
                        v-if="menuIndex === index && menuType === 'subdistrict'"
                        class="absolute right-0 mt-2 w-48 bg-white border rounded shadow-md z-10"
                      >
                        <ul class="py-1">
                          <li
                            @click="editSubdistrictModal(subdistrict)"
                            class="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                          >
                            แก้ไข
                          </li>
                          <li
                            @click="deleteSubdistrictConfirm(subdistrict)"
                            class="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                          >
                            ลบ
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <!-- Price -->
      <div>
        <div class="md:col-span-2 lg:col-span-1">
          <div class="bg-white rounded-lg shadow-md p-4">
            <div
              class="flex flex-col lg:flex-row items-center justify-between mb-4"
            >
              <h2
                class="text-lg lg:text-xl font-bold text-green-600 mb-2 lg:mb-0"
              >
                ราคา/กก
              </h2>
              <button
                class="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-3 rounded transition-colors duration-300"
                @click="addPriceModal"
                :disabled="!selectedSubdistrict"
              >
                <i class="fas fa-plus mr-2"></i> เพิ่ม
              </button>
            </div>

            <div class="border border-gray-300 rounded-lg p-2">
              <ul class="list-disc text-gray-700">
                <li
                  v-for="(price, index) in selectedPrices"
                  :key="price.id"
                  class="mb-2 flex items-center justify-between border border-gray-300 rounded-lg p-2"
                  @click="selectPrice(price)"
                >
                  <div v-if="price.cate_id && price.type_id && price.detail_id">
                    <div>
                      <span>{{ `ราคา ระดับ 1: ${price.price_lv_1} บาท` }}</span>
                    </div>
                    <div>
                      <span>{{ `ราคา ระดับ 2: ${price.price_lv_2} บาท` }}</span>
                    </div>
                    <div>
                      <span>{{ `ราคา ระดับ 3: ${price.price_lv_3} บาท` }}</span>
                    </div>
                    <div>
                      <span>{{ `ราคา ระดับ 4: ${price.price_lv_4} บาท` }}</span>
                    </div>
                    <div>
                      <span>{{ `ราคา ระดับ 5: ${price.price_lv_5} บาท` }}</span>
                    </div>
                  </div>
                  <div v-else>
                    <span>ไม่มีข้อมูลราคา</span>
                  </div>

                  <div class="relative ml-auto">
                    <button
                      @click.stop="toggleMenu(index, 'price')"
                      class="p-2 bg-green-500 text-white rounded"
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
                          d="M6 12h.01M12 12h.01M18 12h.01"
                        />
                      </svg>
                    </button>
                    <div
                      v-if="menuIndex === index && menuType === 'price'"
                      class="absolute right-0 mt-2 w-48 bg-white border rounded shadow-md z-10"
                    >
                      <ul class="py-1">
                        <li
                          @click="editPriceModal(price)"
                          class="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                        >
                          แก้ไข
                        </li>
                        <li
                          @click="deletePriceConfirm(price)"
                          class="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                        >
                          ลบ
                        </li>
                      </ul>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import AddCategory from "./Add_Category.vue";
import Swal from "sweetalert2";

export default {
  components: {
    AddCategory,
  },
  data() {
    return {
      provinces: [],
      districts: [],
      subdistricts: [],
      prices: [],
      searchProvince: "",
      selectedProvince: null,
      selectedDistrict: null,
      selectedSubdistrict: null,
      newDistrictName: "",
      newSubdistrictName: "",
      showModal: false,
      empId: null,
      menuIndex: null,
      menuType: null,
    };
  },
  created() {
    this.fetchData();
  },

  computed: {
    filteredProvinces() {
      const search = this.searchProvince.toLowerCase();
      return this.provinces.filter((p) =>
        p.name.toLowerCase().includes(search)
      );
    },
    selectedDistricts() {
      return this.selectedProvince
        ? this.districts.filter(
            (d) => d.provinceId === this.selectedProvince.id
          )
        : [];
    },
    selectedSubdistricts() {
      return this.selectedDistrict
        ? this.subdistricts.filter(
            (s) => s.districtId === this.selectedDistrict.id
          )
        : [];
    },
    selectedPrices() {
      return this.selectedSubdistrict
        ? this.prices.filter(
            (p) =>
              p.cate_id === this.selectedProvince.id &&
              p.type_id === this.selectedDistrict.id &&
              p.detail_id === this.selectedSubdistrict.id
          )
        : [];
    },
  },

  methods: {
    truncateName(name) {
      return name.length > 20 ? name.substring(0, 15) + "..." : name;
    },

    selectProvince(province) {
      this.selectedProvince = province;
      this.selectedDistrict = null;
      this.selectedSubdistrict = null;
    },
    selectDistrict(district) {
      this.selectedDistrict = district;
      this.selectedSubdistrict = null;
    },
    selectSubdistrict(subdistrict) {
      this.selectedSubdistrict = subdistrict;
    },
    selectPrice(price) {
      this.selectedPrice = price;
    },
    fetchData() {
      this.empId = this.$store.getters.id;
      axios
        .get("http://147.50.183.57:9030/antiques/product/category")
        .then((response) => {
          this.provinces = response.data.data.map((item) => ({
            id: item._id,
            name: item.name,
            empId: this.empId,
          }));
        })
        .catch((error) => {
          console.error("Error fetching provinces:", error);
        });

      axios
        .get("http://147.50.183.57:9030/antiques/product/type")
        .then((response) => {
          this.districts = response.data.data.map((item) => ({
            id: item._id,
            provinceId: item.cate_id,
            name: item.name,
            empId: this.empId,
          }));
        })
        .catch((error) => {
          console.error("Error fetching districts:", error);
        });

      axios
        .get("http://147.50.183.57:9030/antiques/product/detail")
        .then((response) => {
          this.subdistricts = response.data.data.map((item) => ({
            id: item._id,
            districtId: item.type_id,
            name: item.name,
            empId: this.empId,
          }));
        })
        .catch((error) => {
          console.error("Error fetching subdistricts:", error);
        });

      axios
        .get("http://147.50.183.57:9030/antiques/product/price")
        .then((response) => {
          console.log("Response data:", response.data); // Log the raw response data
          this.prices = response.data.data.map((item) => ({
            id: item._id,
            cate_id: item.cate_id,
            type_id: item.type_id,
            detail_id: item.detail_id,
            price_lv_1: item.price_lv_1,
            price_lv_2: item.price_lv_3,
            price_lv_3: item.price_lv_3,
            price_lv_4: item.price_lv_4,
            price_lv_5: item.price_lv_5,
            emp: this.empId,
          }));
        })
        .catch((error) => {
          console.error("Error fetching prices:", error);
        });
    },

    addDistrict() {
      if (!this.selectedProvince) return;

      Swal.fire({
        title: "ยืนยันการเพิ่มประเภทสินค้าย่อย?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "ยืนยัน",
        cancelButtonText: "ยกเลิก",
      }).then((result) => {
        if (result.isConfirmed) {
          axios
            .post("http://147.50.183.57:9030/antiques/product/type", {
              name: this.newDistrictName,
              cate_id: this.selectedProvince.id,
              emp: this.empId,
            })
            .then((response) => {
              const newDistrict = {
                id: response.data._id,
                provinceId: response.data.cate_id,
                name: response.data.name,
                emp: response.data.emp == this.empId,
              };
              this.districts.push(newDistrict);
              this.newDistrictName = "";
              this.fetchData(); // Refresh data
              Swal.fire("เพิ่มประเภทสินค้าย่อยสำเร็จ!", "", "success");
            })
            .catch((error) => {
              console.error("Error adding district:", error);
              Swal.fire(
                "เกิดข้อผิดพลาด!",
                "ไม่สามารถเพิ่มประเภทสินค้าย่อยได้",
                "error"
              );
            });
        }
      });
    },
    addSubdistrict() {
      if (!this.selectedDistrict) return;
      Swal.fire({
        title: "ยืนยันการเพิ่มสินค้า?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "ยืนยัน",
        cancelButtonText: "ยกเลิก",
      }).then((result) => {
        if (result.isConfirmed) {
          axios
            .post("http://147.50.183.57:9030/antiques/product/detail", {
              name: this.newSubdistrictName,
              type_id: this.selectedDistrict.id,
              cate_id: this.selectedDistrict.provinceId,
              emp: this.empId,
            })
            .then((response) => {
              const newSubdistrict = {
                id: response.data._id,
                provinceId: response.data.cate_id,
                districtId: response.data.type_id,
                name: response.data.name,
                emp: response.data.emp == this.empId,
              };
              this.subdistricts.push(newSubdistrict);
              this.newSubdistrictName = "";
              this.fetchData(); // Refresh data
              Swal.fire("เพิ่มสินค้าสำเร็จ!", "", "success");
            })
            .catch((error) => {
              console.error("Error adding subdistrict:", error);
              Swal.fire("เกิดข้อผิดพลาด!", "ไม่สามารถเพิ่มสินค้าได้", "error");
            });
        }
      });
    },

    addPriceModal() {
      if (!this.selectedSubdistrict) return;

      Swal.fire({
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "ยืนยัน",
        cancelButtonText: "ยกเลิก",

        title: `
    <div>เพิ่มราคาสินค้า
    <div class="text-left">ประเภทหลัก: ${this.selectedProvince.name}</div>
    <div>ประเภทย่อย: ${this.selectedDistrict.name}</div>
    <div>สินค้า: ${this.selectedSubdistrict.name}</div>
    </div>`,
        html: `
    <div class="swal2-input-title">ระดับ1
    <input id="price_lv_1" class="swal2-input" placeholder="ราคา" type="text"></div>

    <div class="swal2-input-title">ระดับ2
    <input id="price_lv_2" class="swal2-input" placeholder="ราคา" type="text"></div>

    <div class="swal2-input-title">ระดับ3
    <input id="price_lv_3" class="swal2-input" placeholder="ราคา" type="text"></div>

    <div class="swal2-input-title">ระดับ4
    <input id="price_lv_4" class="swal2-input" placeholder="ราคา" type="text"></div>

    <div class="swal2-input-title">ระดับ5
    <input id="price_lv_5" class="swal2-input" placeholder="ราคา" type="text"></div>
  `,

        focusConfirm: false,
        preConfirm: () => {
          const priceLv1 = Swal.getPopup().querySelector("#price_lv_1").value;
          const priceLv2 = Swal.getPopup().querySelector("#price_lv_2").value;
          const priceLv3 = Swal.getPopup().querySelector("#price_lv_3").value;
          const priceLv4 = Swal.getPopup().querySelector("#price_lv_4").value;
          const priceLv5 = Swal.getPopup().querySelector("#price_lv_5").value;
          if (!priceLv1 || !priceLv2 || !priceLv3 || !priceLv4 || !priceLv5) {
            Swal.showValidationMessage("กรุณากรอกราคาทุกระดับ");
          }
          return { priceLv1, priceLv2, priceLv3, priceLv4, priceLv5 };
        },
      }).then((result) => {
        if (result.isConfirmed) {
          axios
            .post("http://147.50.183.57:9030/antiques/product/price", {
              cate_id: this.selectedProvince.id,
              type_id: this.selectedDistrict.id,
              detail_id: this.selectedSubdistrict.id,
              price_lv_1: result.value.priceLv1,
              price_lv_2: result.value.priceLv2,
              price_lv_3: result.value.priceLv3,
              price_lv_4: result.value.priceLv4,
              price_lv_5: result.value.priceLv5,
            })
            .then(() => {
              Swal.fire("เพิ่มราคาสำเร็จ!", "", "success");
              this.fetchData(); // Refresh data
            })
            .catch((error) => {
              console.error("Error adding price:", error);
              Swal.fire("เกิดข้อผิดพลาด!", "ไม่สามารถเพิ่มราคาได้", "error");
            });
        }
      });
    },

    editPriceModal(price) {
      Swal.fire({
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "ยืนยัน",
        cancelButtonText: "ยกเลิก",

        title: `
    <div>เพิ่มราคาสินค้า
    <div class="text-left">ประเภทหลัก: ${this.selectedProvince.name}</div>
    <div>ประเภทย่อย: ${this.selectedDistrict.name}</div>
    <div>สินค้า: ${this.selectedSubdistrict.name}</div>
    </div>`,
        html: `
    <div class="swal2-input-title">ระดับ1
    <input id="price_lv_1" class="swal2-input" placeholder="ราคา" type="text"></div>

    <div class="swal2-input-title">ระดับ2
    <input id="price_lv_2" class="swal2-input" placeholder="ราคา" type="text"></div>

    <div class="swal2-input-title">ระดับ3
    <input id="price_lv_3" class="swal2-input" placeholder="ราคา" type="text"></div>

    <div class="swal2-input-title">ระดับ4
    <input id="price_lv_4" class="swal2-input" placeholder="ราคา" type="text"></div>

    <div class="swal2-input-title">ระดับ5
    <input id="price_lv_5" class="swal2-input" placeholder="ราคา" type="text"></div>
  `,

        focusConfirm: false,
        preConfirm: () => {
          const priceLv1 = Swal.getPopup().querySelector("#price_lv_1").value;
          const priceLv2 = Swal.getPopup().querySelector("#price_lv_2").value;
          const priceLv3 = Swal.getPopup().querySelector("#price_lv_3").value;
          const priceLv4 = Swal.getPopup().querySelector("#price_lv_4").value;
          const priceLv5 = Swal.getPopup().querySelector("#price_lv_5").value;
          if (!priceLv1 || !priceLv2 || !priceLv3 || !priceLv4 || !priceLv5) {
            Swal.showValidationMessage("กรุณากรอกราคาทุกระดับ");
          }
          return { priceLv1, priceLv2, priceLv3, priceLv4, priceLv5 };
        },
      }).then((result) => {
        if (result.isConfirmed) {
          axios
            .put(
              `http://147.50.183.57:9030/antiques/product/price/${price.id}`,
              {
                cate_id: this.selectedProvince.id,
                type_id: this.selectedDistrict.id,
                detail_id: this.selectedSubdistrict.id,
                price_lv_1: result.value.priceLv1,
                price_lv_2: result.value.priceLv2,
                price_lv_3: result.value.priceLv3,
                price_lv_4: result.value.priceLv4,
                price_lv_5: result.value.priceLv5,
              }
            )
            .then(() => {
              Swal.fire("แก้ไขราคาสำเร็จ!", "", "success");
              this.fetchData(); // Refresh data
            })

            .catch((error) => {
              console.error("Error editing price:", error);
              Swal.fire("เกิดข้อผิดพลาด!", "ไม่สามารถแก้ไขราคาได้", "error");
            });
        }
      });
    },

    deletePriceConfirm(price) {
      Swal.fire({
        title: "ยืนยันการลบราคา?",
        text: "คุณแน่ใจหรือไม่ที่จะลบราคานี้?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "ยืนยัน",
        cancelButtonText: "ยกเลิก",
      }).then((result) => {
        if (result.isConfirmed) {
          axios
            .delete(
              `http://147.50.183.57:9030/antiques/product/price/${price.id}`
            )
            .then(() => {
              Swal.fire("ลบราคาสำเร็จ!", "", "success");
              this.fetchData(); // Refresh data
            })

            .catch((error) => {
              console.error("Error deleting price:", error);
              Swal.fire("เกิดข้อผิดพลาด!", "ไม่สามารถลบราคาได้", "error");
            });
        }
      });
    },

    addPriceField() {
      this.prices.push({ level: this.prices.length + 1, value: 0 });
    },

    removePrice(index) {
      this.prices.splice(index, 1);
      // Reassign levels to maintain order
      this.prices.forEach((price, i) => (price.level = i + 1));
    },

    editDistrictModal(district) {
      Swal.fire({
        title: "แก้ไขประเภทสินค้าย่อย",
        html: `
        <input id="district-input" class="swal2-input" placeholder="ชื่อประเภทสินค้าย่อย" value="${district.name}">
      `,
        confirmButtonText: "บันทึก",
        focusConfirm: false,
        preConfirm: () => {
          const newName =
            Swal.getPopup().querySelector("#district-input").value;
          if (!newName) {
            Swal.showValidationMessage("กรุณากรอกชื่อประเภทสินค้าย่อย");
          }
          return { newName };
        },
      }).then((result) => {
        if (result.isConfirmed) {
          axios
            .put(
              `http://147.50.183.57:9030/antiques/product/type/${district.id}`,
              {
                name: result.value.newName,
              }
            )
            .then(() => {
              district.name = result.value.newName;
              this.fetchData(); // Refresh data
              Swal.fire("แก้ไขประเภทสินค้าย่อยสำเร็จ!", "", "success");
            })
            .catch((error) => {
              console.error("Error editing district:", error);
              Swal.fire(
                "เกิดข้อผิดพลาด!",
                "ไม่สามารถแก้ไขประเภทสินค้าย่อยได้",
                "error"
              );
            });
        }
      });
    },

    deleteDistrictConfirm(district) {
      Swal.fire({
        title: "ยืนยันการลบประเภทสินค้าย่อย?",
        text: `คุณแน่ใจหรือไม่ที่จะลบประเภทสินค้าย่อย "${district.name}"?`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "ยืนยัน",
        cancelButtonText: "ยกเลิก",
      }).then((result) => {
        if (result.isConfirmed) {
          axios
            .delete(
              `http://147.50.183.57:9030/antiques/product/type/${district.id}`
            )
            .then(() => {
              this.districts = this.districts.filter(
                (d) => d.id !== district.id
              );
              this.fetchData(); // Refresh data
              Swal.fire("ลบประเภทสินค้าย่อยสำเร็จ!", "", "success");
            })
            .catch((error) => {
              console.error("Error deleting district:", error);
              Swal.fire(
                "เกิดข้อผิดพลาด!",
                "ไม่สามารถลบประเภทสินค้าย่อยได้",
                "error"
              );
            });
        }
      });
    },

    editSubdistrictModal(subdistrict) {
      Swal.fire({
        title: "แก้ไขสินค้า",
        html: `
        <input id="subdistrict-input" class="swal2-input" placeholder="ชื่อสินค้า" value="${subdistrict.name}">
      `,
        confirmButtonText: "บันทึก",
        focusConfirm: false,
        preConfirm: () => {
          const newName =
            Swal.getPopup().querySelector("#subdistrict-input").value;
          if (!newName) {
            Swal.showValidationMessage("กรุณากรอกชื่อสินค้า");
          }
          return { newName };
        },
      }).then((result) => {
        if (result.isConfirmed) {
          axios
            .put(
              `http://147.50.183.57:9030/antiques/product/detail/${subdistrict.id}`,
              {
                name: result.value.newName,
              }
            )
            .then(() => {
              subdistrict.name = result.value.newName;
              this.fetchData(); // Refresh data
              Swal.fire("แก้ไขสินค้าสำเร็จ!", "", "success");
            })
            .catch((error) => {
              console.error("Error editing subdistrict:", error);
              Swal.fire("เกิดข้อผิดพลาด!", "ไม่สามารถแก้ไขสินค้าได้", "error");
            });
        }
      });
    },
    deleteSubdistrictConfirm(subdistrict) {
      Swal.fire({
        title: "ยืนยันการลบสินค้า?",
        text: `คุณแน่ใจหรือไม่ที่จะลบสินค้า "${subdistrict.name}"?`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "ยืนยัน",
        cancelButtonText: "ยกเลิก",
      }).then((result) => {
        if (result.isConfirmed) {
          axios
            .delete(
              `http://147.50.183.57:9030/antiques/product/detail/${subdistrict.id}`
            )
            .then(() => {
              this.subdistricts = this.subdistricts.filter(
                (s) => s.id !== subdistrict.id
              );
              Swal.fire("ลบสินค้าสำเร็จ!", "", "success");
              this.fetchData(); // Refresh data
            })
            .catch((error) => {
              console.error("Error deleting subdistrict:", error);
              Swal.fire("เกิดข้อผิดพลาด!", "ไม่สามารถลบสินค้าได้", "error");
            });
        }
      });
    },
    openModal() {
      this.showModal = true;
    },
    closeModal() {
      this.showModal = false;
    },

    // ...existing methods
    toggleMenu(index, type) {
      if (this.menuIndex === index && this.menuType === type) {
        this.menuIndex = null;
        this.menuType = null;
      } else {
        this.menuIndex = index;
        this.menuType = type;
      }
    },
    editProvinceModal(province) {
      Swal.fire({
        title: "แก้ไขประเภทสินค้าหลัก",
        html: `
<input id="province-input" class="swal2-input" placeholder="ชื่อประเภทสินค้าหลัก" value="${province.name}">
`,
        confirmButtonText: "บันทึก",
        focusConfirm: false,
        preConfirm: () => {
          const newName =
            Swal.getPopup().querySelector("#province-input").value;
          if (!newName) {
            Swal.showValidationMessage("กรุณากรอกชื่อประเภทสินค้าหลัก");
          }
          return { newName };
        },
      }).then((result) => {
        if (result.isConfirmed) {
          axios
            .put(
              `http://147.50.183.57:9030/antiques/product/category/${province.id}`,
              {
                name: result.value.newName,
              }
            )
            .then(() => {
              province.name = result.value.newName;
              Swal.fire("แก้ไขประเภทสินค้าหลักสำเร็จ!", "", "success");
              this.fetchData(); // Refresh data
            })
            .catch((error) => {
              console.error("Error editing province:", error);
              Swal.fire(
                "เกิดข้อผิดพลาด!",
                "ไม่สามารถแก้ไขประเภทสินค้าหลักได้",
                "error"
              );
            });
        }
      });
    },

    deleteProvinceConfirm(province) {
      Swal.fire({
        title: "ยืนยันการลบประเภทสินค้าหลัก?",
        text: `คุณแน่ใจหรือไม่ที่จะลบประเภทสินค้าหลัก "${province.name}"?`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "ยืนยัน",
        cancelButtonText: "ยกเลิก",
      }).then((result) => {
        if (result.isConfirmed) {
          axios
            .delete(
              `http://147.50.183.57:9030/antiques/product/category/${province.id}`
            )
            .then(() => {
              this.provinces = this.provinces.filter(
                (p) => p.id !== province.id
              );
              Swal.fire("ลบประเภทสินค้าหลักสำเร็จ!", "", "success");
              this.fetchData(); // Refresh data
            })
            .catch((error) => {
              console.error("Error deleting province:", error);
              Swal.fire(
                "เกิดข้อผิดพลาด!",
                "ไม่สามารถลบประเภทสินค้าหลักได้",
                "error"
              );
            });
        }
      });
    },
  },
};
</script>
