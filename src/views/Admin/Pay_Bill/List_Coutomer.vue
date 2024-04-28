<template>
  <div
    class="fixed z-10 inset-0 overflow-y-auto"
    aria-labelledby="modal-title"
    role="dialog"
    aria-modal="true"
  >
    <div
      class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0"
    >
      <div
        class="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
        aria-hidden="true"
      ></div>

      <span
        class="hidden sm:inline-block sm:align-middle sm:h-screen"
        aria-hidden="true"
        >&#8203;</span
      >

      <div
        class="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-5xl sm:w-full sm:p-6"
      >
        <div class="sm:flex sm:items-start">
          <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
            <div class="flex justify-end">
              <button
                @click="$emit('close')"
                type="button"
                class="inline-flex text-red-500 hover:text-red-700 border-2 border-red-500 hover:border-red-700 rounded-full p-1 focus:outline-none focus:ring-2 focus:ring-offset-2 sm:mt-0 sm:w-auto sm:text-sm"
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
            <h3
              class="text-lg leading-6 font-medium text-gray-900"
              id="modal-title"
            >
              รายการลูกค้า
            </h3>
            <div class="mt-2">
              <table class="min-w-full divide-y divide-gray-200">
                <thead class="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      รหัสลูกค้า
                    </th>
                    <th
                      scope="col"
                      class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      รหัสสมาชิก
                    </th>
                    <th
                      scope="col"
                      class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      ชื่อ-นามสกุล
                    </th>
                    <th
                      scope="col"
                      class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      เบอร์โทร
                    </th>
                    <th
                      scope="col"
                      class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      เลือก
                    </th>
                  </tr>
                </thead>
                <tbody class="bg-white divide-y divide-gray-200 text-black">
                  <tr v-for="customer in customers" :key="customer.id">
                    <td class="px-6 py-4 whitespace-nowrap">
                      {{ customer.id }}
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap">
                      {{ customer.member_id }}
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap">
                      {{ customer.fullname }}
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap">
                      {{ customer.phone }}
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap">
                      <button
                        @click="handleSelectCustomer(customer)"
                        class="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded"
                      >
                        เลือก
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ListCustomerPopup",
  props: {
    customers: {
      type: Array,
      required: true,
    },
  },
  methods: {
    handleSelectCustomer(customer) {
      this.$emit("select-customer", customer);
    },
  },
};
</script>
