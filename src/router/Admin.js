import { createRouter, createWebHistory } from "vue-router";

const routerAamin = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "Dashboard",
      component: () => import("../views/Admin/Dashboard/Dashboard.vue"),
    },

    {
      path: "/Employee",
      name: "Employee",
      component: () =>
        import("../views/Admin/Data_Employee/Table_Employee.vue"),
    },

    {
      path: "/Profile",
      name: "Profile",
      component: () => import("../views/Admin/Profile/Profile.vue"),
    },
    {
      path: "/Customer",
      name: "Customer",
      component: () =>
        import("../views/Admin/Data_Customer/Table_Customer.vue"),
    },
    {
      path: "/Category",
      name: "Category",
      component: () => import("../views/Admin/Category/Table_Category.vue"),
    },
    {
      path: "/Report",
      name: "Report",
      component: () => import("../views/Admin/Report/Table_Report.vue"),
    },
    {
      path: "/POS",
      name: "POS",
      component: () => import("../views/Admin/POS/Form_POS.vue"),
    },
  ],
});

export default routerAamin;
