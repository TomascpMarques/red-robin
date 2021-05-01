import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/home_view/Home.vue";
import Login from "../views/login_view/Login.vue";
import NoPerm from "../views/noPerm_view/NoPerm.vue";
import RegistarUser from "../views/registar_view/RegistarUser.vue";
import ModUser from "../views/usermod_view/UserMod.vue";
import * as api from "../api/apiCalls.js";
import store from "../store/index.js";

const routes = [
  {
    name: "Iniciar Sessão",
    path: "/",
    component: Login
  },
  {
    name: "Perfil de Utilizador",
    path: "/home",
    component: Home,
    beforeEnter(to, from, next) {
      api.callEndPoint("http://localhost:8081/", {
        name: "VerificarTokenUser",
        // assim envia a string "empty", se o utilizador não estiver autenticado
        params: [store.state.usr_token ? store.state.usr_token : "empty"],
      }).then((obj) => {
        if (obj.VerificarTokenUser[0] === "OK") {
          next();
        } else next({ path: "/bery_bad_baddie", name: "NoPerm" });
      });
    },
  },
  {
    name: "Registar Novo User",
    path: "/registar",
    component: RegistarUser,
    beforeEnter(to, from, next) {
      api.callEndPoint("http://localhost:8081/", {
        name: "VerificarTokenUser",
        // assim envia a string "empty", se o utilizador não estiver autenticado
        params: [store.state.usr_token ? store.state.usr_token : "empty"],
      }).then((obj) => {
        if (obj.VerificarTokenUser[0] === "OK") {
          next();
        } else next({ path: "/bery_bad_baddie", name: "NoPerm" });
      });
    },
  },
  {
    name: "Modificar Utilizador",
    path: "/usermod",
    component: ModUser,
    beforeEnter(to, from, next) {
      api.callEndPoint("http://localhost:8081/", {
        name: "VerificarTokenUser",
        // assim envia a string "empty", se o utilizador não estiver autenticado
        params: [store.state.usr_token ? store.state.usr_token : "empty"],
      }).then((obj) => {
        if (obj.VerificarTokenUser[0] === "OK") {
          next();
        } else next({ path: "/bery_bad_baddie", name: "NoPerm" });
      });
    },
  },
  {
    path: "/bery_bad_baddie",
    name: "NoPerm",
    component: NoPerm,
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router;
