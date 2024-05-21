import { createRouter, createWebHistory } from "vue-router";

let routes = [];
routes = [
  {
    path: "/",
    name: "login",
    component: () => import("../components/Login/Login.vue"),
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
