import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/home_view/Home.vue";
import Login from "../views/login_view/Login.vue";
import NoPerm from "../views/noPerm_view/NoPerm.vue";
import RegistarUser from "../views/registar_view/RegistarUser.vue";
import store from "../store/index.js";

const routes = [
  {
    path: "/",
    name: "Login",
    component: Login
  },
  {
    path: "/home",
    name: "Home",
    get component() {
      if (store.state.usr_token !== 0) {
        return Home;
      }
      return NoPerm;
    }
  },
  {
    path: "/registar",
    name: "Registar",
    get component() {
      if (store.state.usr_token !== 0) {
        return RegistarUser;
      }
      return NoPerm;
    }
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router;
