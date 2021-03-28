import { createStore } from "vuex";
import createPersistedState from "vuex-persistedstate";

// Use sessionStorage.clear(); when user logs out manually
export default createStore({
  plugins: [createPersistedState({
    storage: window.sessionStorage,
  })],
  state: {
    usr_token: "",
    usr_perfil: {}
  },
  mutations: {
    storeJWToken(state, token) {
      state.usr_token = token;
    },
    storePerfilUser(state, perfil) {
      state.usr_perfil = perfil;
    }
  },
  actions: {},
  modules: {},
});
