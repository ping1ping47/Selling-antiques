<template>
  <div class="relative bg-gray-100 min-h-screen flex flex-col">
    <div class="flex-grow flex items-center justify-center relative">
      <!-- Login Form -->
      <div
        class="relative z-10 bg-white p-10 rounded-md shadow-lg form-animation sm:w-3/3 md:w-2/3 lg:w-1/3"
        style="opacity: 0.9"
      >
        <h1 class="text-xl font-bold mb-10 text-center">เข้าสู่ระบบ</h1>
        <form @submit.prevent="submit" class="space-y-4">
          <div class="mb-4">
            <label class="block font-semibold text-gray-700 mb-2" for="email">
              ชื่อผู้ใช้
            </label>
            <input
              class="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="email"
              type="text"
              placeholder="กรอกชื่อผู้ใช้"
              required
              v-model="username"
            />
          </div>
          <div class="mb-4">
            <label
              class="block font-semibold text-gray-700 mb-2"
              for="password"
            >
              รหัสผ่าน
            </label>
            <input
              class="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              type="password"
              placeholder="กรอกรหัสผ่าน"
              required
              v-model="password"
            />
          </div>
          <div class="mb-6">
            <button
              class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
              type="submit"
            >
              เข้าสู่ระบบ
            </button>
          </div>
        </form>
      </div>

      <img
        src="@/assets/images/001CN1.jpg"
        alt="Background"
        class="absolute w-full h-full max-h-full object-cover z-0 inset-0"
      />
    </div>
    <footer class="bg-lime-900 text-white px-4 py-2 text-center z-10">
      This is the footer content.
    </footer>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      username: "",
      password: "",
    };
  },
  methods: {
    async submit() {
      try {
        console.log(this.username, this.password);
        const response = await axios.post(`${import.meta.env.VITE_API_LOGIN}`, {
          username: this.username,
          password: this.password,
        });

        const data = response.data;
        if (data.status) {
          // เข้าสู่ระบบสำเร็จ
          // ทำสิ่งที่ต้องการหลังจากเข้าสู่ระบบ
          this.isLoggedIn = true;
          console.log("เข้าสู่ระบบสำเร็จ");

          // เก็บ token ไปยัง local storage
          localStorage.setItem("token", data.token);

          // เรียก mutation เพื่อเปลี่ยนสถานะ logedIn เป็น true
          this.$store.commit("setLogin", {
            logedIn: true,
            token: data.token,
            role: data.role,
            id: data.id,
          });

          // Redirect to home page
          window.location.assign("/");
        } else {
          this.error = data.message; // Set error message received from API
        }
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>

<style>
.form-animation {
  animation: formAppear 1s ease-in-out;
}

@keyframes formAppear {
  0% {
    opacity: 0;
    transform: translateY(-20px);
  }
  100% {
    opacity: 0.9;
    transform: translateY(0);
  }
}
</style>
