import { createRouter, createWebHistory } from "vue-router";
import employee from "../views/Employee/aa.vue";

const routerEmployee = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "employee",
      component: employee,
    },
  ],
});

export default routerEmployee;
