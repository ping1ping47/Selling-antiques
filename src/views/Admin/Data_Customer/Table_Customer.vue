<template>
  <!-- component -->
  <div>
    <div class="p-4 flex">
      <h1 class="text-3xl">ลูกค้า</h1>
    </div>

    <div class="flex justify-end py-2 px-3">
      <button
        @click="openAddPopup()"
        class="focus:ring-2 focus:ring-offset-2 mt-4 sm:mt-0 inline-flex items-start justify-start px-6 py-3 bg-indigo-600 hover:bg-indigo-500 focus:outline-none rounded"
      >
        <p class="text-sm font-medium leading-none text-white">เพิ่มลูกค้า</p>
      </button>
      <Add v-if="showAddPopup" @close="closeAddPopup" @add="addCustomer" />
    </div>
    <div class="px-3 py-4 flex justify-center">
      <div class="overflow-x-auto w-full">
        <table class="w-full text-md bg-green-300 shadow-md rounded mb-4">
          <tbody class="border border-green-300">
            <tr class="border-b">
              <th class="text-left p-3 px-5">ลำดับ</th>
              <th class="text-left p-3 px-5">ชื่อ</th>
              <th class="text-left p-3 px-5">วันเกิด</th>
              <th class="text-left p-3 px-5">ศาสนา</th>
              <th class="text-left p-3 px-5">ที่อยู่</th>
              <th class="text-left p-3 px-5">วันออกบัตร</th>
              <th class="text-left p-3 px-5">วันหมดอายุ</th>
              <th class="text-left p-3 px-5">รถ</th>
              <th class="text-left p-3 px-5">รายละเอียดรถ</th>
              <th class="text-left p-3 px-5">ชนิด</th>
              <th class="text-left p-3 px-5">Vendor Track</th>
              <th class="text-left p-3 px-5">จัดการ</th>
            </tr>
            <tr
              v-for="(customer, index) in customers"
              :key="customer._id"
              class="border-b hover:bg-gray-300 bg-gray-100 border border-green-300"
            >
              <td class="p-3 px-5">{{ index + 1 }}</td>
              <td class="p-3 px-5">{{ customer.fullname_th }}</td>
              <td class="p-3 px-5">{{ customer.birthday_th }}</td>
              <td class="p-3 px-5">{{ customer.religion }}</td>
              <td class="p-3 px-5">{{ customer.address }}</td>
              <td class="p-3 px-5">{{ customer.date_of_issue }}</td>
              <td class="p-3 px-5">{{ customer.date_of_expiry }}</td>
              <td class="p-3 px-5">{{ customer.vehicle }}</td>
              <td class="p-3 px-5">{{ customer.vehicle_detail }}</td>
              <td class="p-3 px-5">{{ customer.class }}</td>
              <td class="p-3 px-5">{{ customer.vendor_track }}</td>
              <td class="p-3 px-5 flex justify-center">
                <button
                  @click="viewCustomer(customer)"
                  type="button"
                  class="text-sm bg-green-500 hover:bg-green-700 text-white py-1 px-2 ml-3 rounded focus:outline-none focus:shadow-outline"
                >
                  ข้อมูล
                </button>
                <!-- View Customer Popup -->
                <View
                  v-if="
                    showViewPopup &&
                    selectedCustomer &&
                    selectedCustomer._id === customer._id
                  "
                  :customer="selectedCustomer"
                  @close="closeViewPopup"
                />

                <button
                  @click="editCustomer(customer)"
                  type="button"
                  class="text-sm bg-blue-500 hover:bg-blue-700 text-white py-1 px-2 ml-3 rounded focus:outline-none focus:shadow-outline"
                >
                  แก้ไข
                </button>
                <!-- Edit Customer Popup -->
                <Edit
                  v-if="
                    showEditPopup &&
                    selectedCustomer &&
                    selectedCustomer._id === customer._id
                  "
                  :customer="selectedCustomer"
                  @close="closeEditPopup"
                  @update="updatedCustomer"
                />

                <button
                  @click="deleteCustomer(customer._id)"
                  type="button"
                  class="text-sm bg-red-500 hover:bg-red-700 text-white py-1 px-2 ml-3 rounded focus:outline-none focus:shadow-outline"
                >
                  ลบ
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Swal from "sweetalert2";
import Add from "./Add_Customer.vue";
import Edit from "./Edit_Customer.vue";
import View from "./View_Customer.vue";

export default {
  components: {
    Add,
    Edit,
    View,
  },

  data() {
    return {
      customers: [],
      showAddPopup: false,
      showEditPopup: false,
      showViewPopup: false,
      selectedCustomer: null,
    };
  },
  created() {
    this.fetchCustomers();
  },

  methods: {
    async fetchCustomers() {
      try {
        const response = await axios.get(import.meta.env.VITE_API_CUSTOMER);
        if (
          response.status === 200 &&
          response.data &&
          Array.isArray(response.data.data)
        ) {
          this.customers = response.data.data;
        } else {
          console.error(
            "Invalid response format or empty data array:",
            response.data
          );
        }
      } catch (error) {
        console.error("Error fetching customers:", error);
        this.customers = [];
      }
    },

    async deleteCustomer(_id) {
      const confirmResult = await Swal.fire({
        icon: "warning",
        title: "คุณแน่ใจหรือไม่?",
        text: "คุณต้องการลบลูกค้าคนนี้หรือไม่?",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#3085d6",
        confirmButtonText: "ใช่, ลบเลย!",
        cancelButtonText: "ยกเลิก",
      });

      if (confirmResult.isConfirmed) {
        try {
          const response = await axios.delete(
            import.meta.env.VITE_API_CUSTOMER + `${_id}`
          );
          if (response.status === 200) {
            this.fetchCustomers();
            Swal.fire({
              icon: "success",
              title: "ลบลูกค้าสำเร็จ",
              showConfirmButton: true,
            });
          } else {
            Swal.fire({
              icon: "error",
              title: "เกิดข้อผิดพลาดในการลบลูกค้า",
              text: "กรุณาลองใหม่อีกครั้ง",
            });
          }
        } catch (error) {
          console.error("Error deleting customer:", error);
          Swal.fire({
            icon: "error",
            title: "เกิดข้อผิดพลาดในการลบลูกค้า",
            text: "กรุณาลองใหม่อีกครั้ง",
          });
        }
      }
    },

    openAddPopup() {
      this.showAddPopup = true;
    },

    closeAddPopup() {
      this.showAddPopup = false;
    },

    addCustomer(customer) {
      this.customers.push(customer);
      this.closeAddPopup();
    },

    viewCustomer(customer) {
      this.selectedCustomer = customer;
      this.showViewPopup = true;
    },

    closeViewPopup() {
      this.showViewPopup = false;
    },

    editCustomer(customer) {
      this.selectedCustomer = customer;
      this.showEditPopup = true;
    },

    closeEditPopup() {
      this.showEditPopup = false;
    },

    async updatedCustomer(updatedCustomer) {
      const index = this.customers.findIndex(
        (cus) => cus._id === updatedCustomer._id
      );
      if (index !== -1) {
        this.customers.splice(index, 1, updatedCustomer);
      }
      this.closeEditPopup();
    },
  },
};
</script>
