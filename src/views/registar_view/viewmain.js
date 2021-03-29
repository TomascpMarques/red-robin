import store from "../../store/index.js";
export default {
  name: "RegistarUser",
  store: store,
  beforeRouteEnter(to, from, next) {
    if (store.state.usr_token.length > 1) next();
    else next({ path: "/bey_dab_baddie", name: "NoPerm" });
  },
};
