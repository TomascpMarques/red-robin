import { createStore } from "vuex";
import createPersistedState from "vuex-persistedstate";

// Use sessionStorage.clear(); when user logs out manually
export default createStore({
  plugins: [createPersistedState({
    storage: window.sessionStorage,
  })],
  state: {
    usr_token: "",
    usr_perfil: {},
    usr_repos: []
  },
  mutations: {
    storeJWToken(state, token) {
      state.usr_token = token;
    },
    storePerfilUser(state, perfil) {
      state.usr_perfil = perfil;
    },
    storeUrsRepos(state, repo) {
      state.usr_repos = repo;
    },
    apagarJWToken(state) {
      state.usr_token = "";
    },
    apagarUserProfile(state) {
      state.usr_perfil = "";
    },
    limparSessionStorage() {
      window.sessionStorage.clear();
    }
  },
  actions: {},
  modules: {},
});
