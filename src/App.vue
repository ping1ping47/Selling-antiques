<template >
  <div id="app" class="text-gray-900 bg-green-200 h-screen">
    <div v-if="userRole === 'admin'">
      <nav>
        <BarAdmin />
      </nav>
      <router-view />
    </div>

    <div v-if="userRole === 'employee'">
      <nav>
        <BarEmployee />
      </nav>
      <router-view />
    </div>

    <div v-else-if="!isLoggedIn">
      <router-view />
    </div>
  </div>
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
  },
  created() {
    console.log(this.$store.getters.logedIn);
    if (localStorage.getItem("token")) {
      const decode = jwtDecode(localStorage.getItem("token"));
      console.log("Decoded token:", decode);
      if (decode && decode.row) {
        console.log("Token user_id:", decode._id);
        const data_login = {
          logedIn: true,
          role: decode.row,
          id: decode._id,
          token: localStorage.getItem("token"),
        };
        this.$store.commit("setLogin", data_login);
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