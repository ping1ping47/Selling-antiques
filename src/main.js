import "./assets/main.css";
import "./assets/index.css";

import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import routerAdmin from "./router/Admin";
import routerEmployee from "./router/Employee";
import store from "./store";
import { jwtDecode } from "jwt-decode";

const app = createApp(App);

app.use(store);

try {
  const token = localStorage.getItem("token");

  if (token) {
    const jwt_decode = jwtDecode(token);
    console.log("Role", jwt_decode);
    if (jwt_decode.row === "admin") {
      app.use(routerAdmin);
    } else if (jwt_decode.row === "employee") {
      app.use(routerEmployee);
    } else {
      app.use(router);
    }
    console.log("Role2:", jwt_decode.row);
  } else {
    console.error("No token found.");
    app.use(router);
  }
} catch (err) {
  console.error("Error decoding token:", err);
  app.use(router);
}

app.mount("#app");
