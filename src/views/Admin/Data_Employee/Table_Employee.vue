<template>
  <!-- component -->
  <div>
    <div class="p-4 flex">
      <h1 class="text-3xl">พนักงาน</h1>
    </div>

    <div class="flex justify-end py-2 px-3">
      <button
        @click="openAddPopup()"
        class="focus:ring-2 focus:ring-offset-2 mt-4 sm:mt-0 inline-flex items-start justify-start px-6 py-3 bg-indigo-600 hover:bg-indigo-500 focus:outline-none rounded"
      >
        <p class="text-sm font-medium leading-none text-white">เพิ่มพนักงาน</p>
      </button>
      <Add v-if="showAddPopup" @close="closeAddPopup" @add="addEmployee" />
    </div>
    <div class="px-3 py-4 flex justify-center">
      <div class="overflow-x-auto w-full">
        <table class="w-full text-md bg-green-300 shadow-md rounded mb-4">
          <tbody class="border border-green-300">
            <tr class="border-b">
              <th class="text-left p-3 px-5">ลำดับ</th>
              <th class="text-left p-3 px-5">ชื่อ</th>
              <th class="text-left p-3 px-5">เบอร์โทร</th>
              <th class="text-left p-3 px-5">ตำแหน่ง</th>
              <th class="text-left p-3 px-5">สถานะ</th>
              <th class="flex justify-center p-3 px-5">จัดการ</th>
            </tr>
            <tr
              v-for="(employee, index) in displayedEmployees"
              :key="employee._id"
              class="border-b hover:bg-gray-300 bg-gray-100 border border-green-300"
            >
              <td class="p-3 px-5">
                {{ (currentPage - 1) * perPage + index + 1 }}
              </td>
              <td class="p-3 px-5">{{ employee.employee_name }}</td>
              <td class="p-3 px-5">{{ employee.employee_phone }}</td>
              <td class="p-3 px-5">{{ employee.employee_position }}</td>
              <td class="p-3 px-5">
                {{ employee.employee_status ? "เปิด" : "ปิด" }}
              </td>
              <td class="p-3 px-5 flex justify-center">
                <button
                  @click="viewEmployee(employee)"
                  type="button"
                  class="text-sm bg-green-500 hover:bg-green-700 text-white py-1 px-2 ml-3 rounded focus:outline-none focus:shadow-outline"
                >
                  ข้อมูล</button
                ><!-- View Employee Popup -->
                <View
                  v-if="showViewPopup"
                  :employee="selectedEmployee"
                  @close="closeViewPopup"
                />

                <button
                  @click="editEmployee(employee)"
                  type="button"
                  class="text-sm bg-blue-500 hover:bg-blue-700 text-white py-1 px-2 ml-3 rounded focus:outline-none focus:shadow-outline"
                >
                  แก้ไข
                </button>
                <!-- Edit Employee Popup -->
                <Edit
                  v-if="showEditPopup"
                  :employee="selectedEmployee"
                  @close="closeEditPopup"
                  @update="updateEmployee"
                />

                <button
                  @click="deleteEmployee(employee._id)"
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

  <!-- Pagination Controls -->
  <div
    class="fixed bottom-0 left-0 right-0 px-3 bg-white border-t border-gray-300"
  >
    <div class="container md:mb-8 pt-8 mx-auto flex justify-center select-none">
      <a
        @click="prevPage"
        :class="{ 'cursor-not-allowed text-gray-400': currentPage === 1 }"
        class="block border border-r-0 rounded-l px-4 py-2 hover:bg-gray-200 text-gray-600"
        href="#"
        rel="prev"
      >
        &larr; ก่อนหน้า
      </a>

      <a
        v-for="page in lastPage"
        :key="page"
        @click="goToPage(page)"
        :class="{
          'bg-indigo-500 text-white': page === currentPage,
          'hover:bg-gray-200 text-gray-600': page !== currentPage,
        }"
        class="block border border-l-0 border-r-0 px-4 py-2 cursor-pointer"
        href="#"
      >
        {{ page }}
      </a>

      <a
        @click="nextPage"
        :class="{
          'cursor-not-allowed text-gray-400': currentPage === lastPage,
        }"
        class="block border border-l-0 rounded-r px-4 py-2 hover:bg-gray-200 text-gray-600"
        href="#"
        rel="next"
      >
        ถัดไป &rarr;
      </a>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Swal from "sweetalert2";
import Add from "./Add_Employee.vue";
import Edit from "./Edit_Employee.vue";
import View from "./View_Employee.vue";

export default {
  components: {
    Add,
    Edit,
    View,
  },

  data() {
    return {
      employees: [],
      showAddPopup: false,
      showEditPopup: false,
      showViewPopup: false,
      selectedEmployee: null,
      // ข้อมูล pagination
      currentPage: 1,
      perPage: 10, // จำนวนรายการต่อหน้า
    };
  },
  created() {
    this.fetchEmployees();
  },

  computed: {
    totalEmployees() {
      return this.employees.length;
    },
    lastPage() {
      return Math.ceil(this.totalEmployees / this.perPage);
    },
    displayedEmployees() {
      const start = (this.currentPage - 1) * this.perPage;
      const end = start + this.perPage;
      return this.employees.slice(start, end);
    },
  },

  methods: {
    prevPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
      }
    },
    nextPage() {
      if (this.currentPage < this.lastPage) {
        this.currentPage++;
      }
    },

    async fetchEmployees() {
      try {
        const response = await axios.get(import.meta.env.VITE_API_EMPLOYEE);
        if (
          response.status === 200 &&
          response.data &&
          Array.isArray(response.data.data)
        ) {
          this.employees = response.data.data;
        } else {
          console.error(
            "Invalid response format or empty data array:",
            response.data
          );
        }
      } catch (error) {
        console.error("Error fetching employees:", error);
        this.employees = [];
      }
    },

    async deleteEmployee(_id) {
      const confirmResult = await Swal.fire({
        icon: "warning",
        title: "คุณแน่ใจหรือไม่?",
        text: "คุณต้องการลบพนักงานคนนี้หรือไม่?",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#3085d6",
        confirmButtonText: "ใช่, ลบเลย!",
        cancelButtonText: "ยกเลิก",
      });

      if (confirmResult.isConfirmed) {
        try {
          const response = await axios.delete(
            import.meta.env.VITE_API_EMPLOYEE + `${_id}`
          );
          if (response.status === 200) {
            this.fetchEmployees();
            Swal.fire({
              icon: "success",
              title: "ลบพนักงานสำเร็จ",
              showConfirmButton: true,
            });
          } else {
            Swal.fire({
              icon: "error",
              title: "เกิดข้อผิดพลาดในการลบพนักงาน",
              text: "กรุณาลองใหม่อีกครั้ง",
            });
          }
        } catch (error) {
          console.error("Error deleting employee:", error);
          Swal.fire({
            icon: "error",
            title: "เกิดข้อผิดพลาดในการลบพนักงาน",
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

    addEmployee(employee) {
      this.employees.push(employee);
      this.closeAddPopup();
    },

    viewEmployee(employee) {
      this.selectedEmployee = employee;
      this.showViewPopup = true;
    },

    closeViewPopup() {
      this.showViewPopup = false;
    },

    editEmployee(employee) {
      this.selectedEmployee = employee;
      this.showEditPopup = true;
    },

    closeEditPopup() {
      this.showEditPopup = false;
    },

    async updateEmployee(updatedEmployee) {
      const index = this.employees.findIndex(
        (emp) => emp._id === updatedEmployee._id
      );
      if (index !== -1) {
        this.employees.splice(index, 1, updatedEmployee);
      }
      this.closeEditPopup();
    },
  },
};
</script>
