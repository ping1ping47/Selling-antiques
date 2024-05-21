<template>
  <div class="text-2xl">
    <div class="p-4">
      <h1 class="text-3xl">พนักงาน</h1>
    </div>

    <div class="flex justify-end py-2 px-3">
      <div class="mr-4">
        <input
          v-model="searchTerm"
          type="text"
          class="border border-gray-300 rounded-md py-2 px-4"
          placeholder="ค้นหาชื่อหรือเบอร์โทร"
        />
      </div>
    </div>

    <div class="flex justify-end py-2 px-3">
      <button
        @click="openAddPopup()"
        class="focus:ring-2 focus:ring-offset-2 mt-4 sm:mt-0 inline-flex items-start justify-start px-6 py-3 bg-indigo-600 hover:bg-indigo-500 focus:outline-none rounded"
      >
        <p class="text-sm font-medium leading-none text-white">เพิ่มพนักงาน</p>
      </button>
      <AddEmployee
        v-if="showAddPopup"
        @close="closeAddPopup"
        @add="addEmployee"
        @added="fetchEmployees"
      />
    </div>

    <div class="px-4 flex justify-center">
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
              <td class="p-3 px-5">{{ index + 1 }}</td>
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
                  ข้อมูล
                </button>
                <ViewEmployee
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
                <EditEmployee
                  v-if="showEditPopup"
                  :employee="selectedEmployee"
                  @close="closeEditPopup"
                  @update="updateEmployee"
                  @edited="fetchEmployees"
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
</template>

<script>
import axios from "axios";
import Swal from "sweetalert2";
import AddEmployee from "./Add_Employee.vue";
import EditEmployee from "./Edit_Employee.vue";
import ViewEmployee from "./View_Employee.vue";

export default {
  components: {
    AddEmployee,
    EditEmployee,
    ViewEmployee,
  },

  data() {
    return {
      employees: [],
      showAddPopup: false,
      showEditPopup: false,
      showViewPopup: false,
      selectedEmployee: null,
      searchTerm: "",
    };
  },

  created() {
    this.fetchEmployees();
  },

  computed: {
    displayedEmployees() {
      const filtered = this.employees.filter(
        (employee) =>
          employee.employee_name
            .toLowerCase()
            .includes(this.searchTerm.toLowerCase()) ||
          employee.employee_phone
            .toLowerCase()
            .includes(this.searchTerm.toLowerCase())
      );
      return filtered;
    },
  },

  methods: {
    async fetchEmployees() {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_ALL}/employee`);
        if (res.status === 200 && res.data && Array.isArray(res.data.data)) {
          this.employees = res.data.data;
        } else {
          console.error(
            "Invalid response format or empty data array:",
            res.data
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
          const res = await axios.delete(
            `${import.meta.env.VITE_API_ALL}/employee/${_id}`
          );
          if (res.status === 200) {
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

    updateEmployee(updatedEmployee) {
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
