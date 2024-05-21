<template>
  <div id="app" class="text-black bg-gradient-to-r from-green-200 to-green-100 w-full min-h-screen flex flex-col">
    <div v-if="userRole === 'admin'" class="flex-grow">
      <nav class="sticky top-0 z-50 shadow-md">
        <BarAdmin />
      </nav>
      <main class="p-4">
        <router-view />
      </main>
    </div>

    <div v-else-if="userRole === 'employee'" class="flex-grow">
      <nav class="sticky top-0 z-50 shadow-md">
        <BarEmployee />
      </nav>
      <main class="p-4">
        <router-view />
      </main>
    </div>

    <div v-else class="flex-grow">
      <router-view />
    </div>

    <footer class="bg-green-800 text-white text-center py-4">
      &copy; {{ currentYear }} บริษัท ซีเอ็น กรีน แพลนเน็ต จํากัด
    </footer>
  </div>
  <Toast />
  <ConfirmDialog />
</template>

<script>
import { jwtDecode } from "jwt-decode";
import BarAdmin from "./components/Nav/Admin/BarAdmin.vue";
import BarEmployee from "./components/Nav/Emplotyee/BarEmp.vue";

export default {
  name: "App",
  components: {
    BarAdmin,
    BarEmployee,
  },
  computed: {
    isLoggedIn() {
      return this.$store.getters.logedIn;
    },
    userRole() {
      return this.$store.getters.role;
    },
    currentYear() {
      return new Date().getFullYear();
    },
  },
  created() {
    if (localStorage.getItem("token")) {
      const decode = jwtDecode(localStorage.getItem("token"));
      if (decode && decode.row) {
        const dataLogin = {
          logedIn: true,
          role: decode.row,
          id: decode._id,
          token: localStorage.getItem("token"),
        };
        this.$store.commit("setLogin", dataLogin);
      } else {
        localStorage.clear();
        this.$router.push("/");
      }
    } else {
      localStorage.clear();
      this.$router.push("/");
    }
  },
};
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
