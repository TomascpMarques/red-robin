import { createRouter, createWebHistory } from "vue-router";

import Home from "../views/home_view/Home.vue";
import Login from "../views/login_view/Login.vue";
import NoPerm from "../views/noPerm_view/NoPerm.vue";
import NoRepo from "../views/norepo/NoRepo.vue";
import RegistarUser from "../views/registar_view/RegistarUser.vue";
import ModUser from "../views/usermod_view/UserMod.vue";
import Docs from "../views/docs_view/Docs.vue";
import EditFiles from "../views/fileEdit_view/fileEdit.vue";
import VideoShare from "../views/videos_view/VideoShare.vue";
import GerirEquipamento from "../views/equipamento_view/gerirEquipamento.vue";

import * as api from "../api/apiCalls.js";
import * as apiServices from "../api/apiServices.js";

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
      api.callEndPoint(apiServices.hosts.autenticacao, {
        name: "VerificarTokenUser",
        // assim envia a string "empty", se o utilizador não estiver autenticado
        params: [store.state.usr_token ? store.state.usr_token : "empty"],
      }).then((obj) => {
        if (obj.VerificarTokenUser[0] === "OK") {
          next();
        } else next({ path: "/bery_bad_baddie", name: "Sem permissões" });
      });
    },
  },
  {
    name: "Registar Novo User",
    path: "/registar",
    component: RegistarUser,
    beforeEnter(to, from, next) {
      api.callEndPoint(apiServices.hosts.autenticacao, {
        name: "VerificarTokenUser",
        // assim envia a string "empty", se o utilizador não estiver autenticado
        params: [store.state.usr_token ? store.state.usr_token : "empty"],
      }).then((obj) => {
        if (obj.VerificarTokenUser[0] === "OK") {
          next();
        } else next({ path: "/bery_bad_baddie", name: "Sem permissões" });
      });
    },
  },
  {
    name: "Modificar Utilizador",
    path: "/usermod",
    component: ModUser,
    beforeEnter(to, from, next) {
      api.callEndPoint(apiServices.hosts.autenticacao, {
        name: "VerificarTokenUser",
        // assim envia a string "empty", se o utilizador não estiver autenticado
        params: [store.state.usr_token ? store.state.usr_token : "empty"],
      }).then((obj) => {
        if (obj.VerificarTokenUser[0] === "OK") {
          next();
        } else next({ path: "/bery_bad_baddie", name: "Sem permissões" });
      });
    },
  },
  {
    name: "Documentação",
    path: "/docs",
    component: Docs,
    beforeEnter(to, from, next) {
      api.callEndPoint(apiServices.hosts.autenticacao, {
        name: "VerificarTokenUser",
        // assim envia a string "empty", se o utilizador não estiver autenticado
        params: [store.state.usr_token ? store.state.usr_token : "empty"],
      }).then((obj) => {
        if (obj.VerificarTokenUser[0] === "OK") {
          next();
        } else next({ path: "/bery_bad_baddie", name: "Sem permissões" });
      });
    },
  },
  {
    name: "Vizualisar Ficheiro(s)",
    path: "/file/:tipo/:usr/:valor",
    component: EditFiles,
    beforeEnter(to, from, next) {
      api.callEndPoint(apiServices.hosts.autenticacao, {
        name: "VerificarTokenUser",
        // assim envia a string "empty", se o utilizador não estiver autenticado
        params: [store.state.usr_token ? store.state.usr_token : "empty"],
      }).then((obj) => {
        if (obj.VerificarTokenUser[0] === "OK") {
          next();
        } else next({ path: "/no_repo", name: "O Repositório Não Existe" });
      });
    },
  },
  {
    name: "Partilha de Video",
    path: "/videoshare",
    component: VideoShare,
    beforeEnter(to, from, next) {
      api.callEndPoint(apiServices.hosts.autenticacao, {
        name: "VerificarTokenUser",
        // assim envia a string "empty", se o utilizador não estiver autenticado
        params: [store.state.usr_token ? store.state.usr_token : "empty"],
      }).then((obj) => {
        if (obj.VerificarTokenUser[0] === "OK") {
          next();
        } else next({ path: "/bery_bad_baddie", name: "Sem permissões" });
      });
    },
  },
  {
    name: "Gestão de Equipamento",
    path: "/equipamento",
    component: GerirEquipamento,
    beforeEnter(to, from, next) {
      api.callEndPoint(apiServices.hosts.autenticacao, {
        name: "VerificarTokenUser",
        // assim envia a string "empty", se o utilizador não estiver autenticado
        params: [store.state.usr_token ? store.state.usr_token : "empty"],
      }).then((obj) => {
        /* const repoSearched = to.params.valor.split("/").lastItem;
        const repos = store.state.usr_perfil.contribuicoes.map(x => x.reponome); */
        if (obj.VerificarTokenUser[0] === "OK"/*  && repos.find(x => x === repoSearched) */) {
          next();
        } else next({ path: "/bery_bad_baddie", name: "Sem permissões" });
      });
    },
  },
  {
    path: "/no_repo",
    name: "O Repositório Não Existe",
    component: NoRepo
  },
  {
    path: "/bery_bad_baddie",
    name: "Sem permissões",
    component: NoPerm,
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router;
