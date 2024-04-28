<template>
  <Disclosure as="nav" class="bg-[#378552]" v-slot="{ open }">
    <div class="mx-auto max-w-auto px-2 sm:px-6 lg:px-8">
      <div class="relative flex h-16 items-center justify-between">
        <div class="absolute inset-y-0 left-0 flex items-center sm:hidden">
          <!-- Mobile menu button -->
          <DisclosureButton
            class="p-2 text-white hover:bg-green-600 hover:text-black focus:outline-none focus:ring-2 focus:ring-inset focus:ring-black"
          >
            <span class="absolute -inset-0.5" />
            <span class="sr-only">Open main menu</span>
            <svg
              v-if="!open"
              class="block h-6 w-6"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 6h16M4 12h16m-7 6h7"
              />
            </svg>
            <svg
              v-else
              class="block h-6 w-6"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </DisclosureButton>
        </div>
        <div
          class="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start"
        >
          <div class="flex-shrink-0 flex items-center">
            <img
              src="../../../assets/images/logo1.png"
              alt="logo1"
              @click="navigateTo('/')"
              class="block h-12 w-auto bg-green-100 rounded-lg hover:bg-green-300"
            />
          </div>
          <div class="hidden sm:ml-6 sm:flex">
            <div class="flex space-x-4">
              <a
                v-for="item in navigation"
                :key="item.name"
                :href="item.href"
                :class="[
                  currentPage === item.href
                    ? 'bg-[#115D33] text-white'
                    : 'text-gray-300 hover:bg-[#459843] hover:text-white',
                  'px-3 py-2 rounded-md text-xl font-semibold tracking-wide',
                ]"
                :aria-current="currentPage === item.href ? 'page' : undefined"
                >{{ item.name }}</a
              >
            </div>
          </div>
        </div>
        <div
          class="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0"
        >
          <div class="ml-3 relative">
            <div>
              <button
                type="button"
                class="max-w-xs bg-gray-800 rounded-full flex items-center text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                id="user-menu"
                aria-haspopup="true"
                @click="userMenuOpen = !userMenuOpen"
              >
                <span class="sr-only">Open user menu</span>
                <img
                  class="h-8 w-8 rounded-full"
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                  alt=""
                />
              </button>
            </div>
            <transition
              enter-active-class="transition ease-out duration-100 transform"
              enter-from-class="opacity-0 scale-95"
              enter-to-class="opacity-100 scale-100"
              leave-active-class="transition ease-in duration-75 transform"
              leave-from-class="opacity-100 scale-100"
              leave-to-class="opacity-0 scale-95"
            >
              <div
                v-if="userMenuOpen"
                class="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-50"
                role="menu"
                aria-orientation="vertical"
                aria-labelledby="user-menu"
              >
                <a
                  href="/profile"
                  class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  role="menuitem"
                  >โปรไฟล์</a
                >
                <a
                  href="#"
                  class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  role="menuitem"
                  >ตั้งค่า</a
                >
                <a
                  href="#"
                  class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  role="menuitem"
                  @click="signOut"
                  >ออกจากระบบ</a
                >
              </div>
            </transition>
          </div>
        </div>
      </div>
    </div>
    <DisclosurePanel class="sm:hidden">
      <div class="px-2 pt-2 pb-3 space-y-1">
        <a
          v-for="item in navigation"
          :key="item.name"
          :href="item.href"
          :class="[
            item.href === currentPage
              ? 'bg-gray-900 text-white'
              : 'text-gray-300 hover:bg-gray-700 hover:text-white',
            'block px-3 py-2 rounded-md text-xl font-semibold tracking-wide',
          ]"
          :aria-current="item.href === currentPage ? 'page' : undefined"
          >{{ item.name }}</a
        >
      </div>
    </DisclosurePanel>
  </Disclosure>
</template>

<script setup>
import { Disclosure, DisclosureButton, DisclosurePanel } from "@headlessui/vue";
import { ref, computed } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();
const currentPage = computed(() => route.path);

const navigation = [
  { name: "หน้าหลัก", href: "/", current: true },
  {
    name: "พนักงาน",
    href: "/Employee",
    current: false,
  },
  { name: "ลูกค้า", href: "/Customer", current: false },
  { name: "หมวดหมู่", href: "/Category", current: false },
  { name: "รายงาน", href: "/Report", current: false },
  { name: "ขายสินค้า", href: "/POS", current: false },
  { name: "ชำระเงิน", href: "/POS", current: false },
];

const userMenuOpen = ref(false);

const signOut = () => {
  // ลบ token ออกจาก localStorage
  localStorage.removeItem("token");
  // รีเฟรชหน้า
  window.location.reload();
};
</script>

<style scoped>
.active {
  background-color: green;
}

.focus {
  color: black;
}
</style>
