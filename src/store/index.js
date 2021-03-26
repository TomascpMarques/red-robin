import { createStore } from "vuex";

export default createStore({
  state: {
    usr_token: ""
  },
  mutations: {
    storeJWToken(state, token) {
      state.usr_token = token;
    }
  },
  actions: {},
  modules: {}
});
