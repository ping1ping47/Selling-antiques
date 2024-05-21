import { createRouter, createWebHistory } from "vue-router";

let routes = [];
routes = [
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
    path: "/Report1",
    name: "Report1",
    component: () => import("../views/Admin/Report/Table_Report1.vue"),
  },
  {
    path: "/Report2",
    name: "Report2",
    component: () => import("../views/Admin/Report/Table_Report2.vue"),
  },
  {
    path: "/POS",
    name: "POS",
    component: () => import("../views/Admin/POS/Form_POS.vue"),
  },
  {
    path: "/Pay",
    name: "Pay",
    component: () => import("../views/Admin/Pay/Pay.vue"),
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
