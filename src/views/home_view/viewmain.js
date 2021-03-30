import store from "../../store/index.js";
import usrcard from "../../components/usr_card.vue";
import contentBox from "../../components/content_box.vue";
import message from "../../components/message_popup.vue";
import { Object } from "core-js";
export default {
  name: "Home",
  store: store,
  beforeRouteEnter(to, from, next) {
    if (store.state.usr_token.length > 1) next();
    else next({ path: "/bey_dab_baddie", name: "NoPerm" });
  },
  components: {
    usrcard,
    contentBox,
    message
  },
  data() {
    return {
      user: this.$store.state.usr_perfil.user,
      nome: this.$store.state.usr_perfil.nome,
      items: {},
      especialidades: this.$store.state.usr_perfil.especialidades,
      sess: false
    };
  },
  mounted() {
    var xx = this.$store.state.usr_perfil.contribuicoes;
    for (var x = 0; x < xx.length; x++) {
      console.log(Object.keys(xx[x]).toString());
      this.items[Object.keys(xx[x]).toString()] = xx[x];
    };
  },
  methods: {
    initLogOut() {
      this.sess = !this.sess;
    },
    logOut() {
      store.commit("apagarUserProfile");
      store.commit("apagarJWToken");
      store.commit("limparSessionStorage");
      location.reload();
    },
  },
};
