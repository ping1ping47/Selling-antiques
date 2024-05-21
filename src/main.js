import { createApp } from 'vue'
import App from './App.vue'
import store from './store/index.js'
import { jwtDecode } from "jwt-decode"

import router from "./router";
import routerAdmin from "./router/Admin";
import routerEmployee from "./router/Employee";

import "./assets/main.css";
import "./assets/index.css";

import PrimeVue from "primevue/config"
import "primeicons/primeicons.css" //icons
import "primevue/resources/primevue.min.css" //core css
import "primevue/resources/themes/lara-light-purple/theme.css" //theme
//prime flex
import "primeflex/primeflex.css"

import Toast from "primevue/toast"
import ToastService from "primevue/toastservice"
import ConfirmDialog from "primevue/confirmdialog"
import ConfirmationService from "primevue/confirmationservice"

const app = createApp(App);

app.use(PrimeVue)
app.use(ToastService)
app.use(ConfirmationService)

app.use(store);

try {
  const token = localStorage.getItem("token");
  if (token) {
    const jwt_decode = jwtDecode(token);
    if (jwt_decode.row === "admin") {
      app.use(routerAdmin);
    } else if (jwt_decode.row === "employee") {
      app.use(routerEmployee);
    } else {
      app.use(router);
    }
  } else {
    app.use(router);
  }
} catch (err) {
  app.use(router);
}

app.component("Toast", Toast)
app.component("ConfirmDialog", ConfirmDialog)

app.mount("#app");
