import store from "../../store/index.js";
import usrcard from "../../components/usr_card.vue";
import contentBox from "../../components/content_box.vue";
import message from "../../components/message_popup.vue";
// import * as api from "../../api/apiCalls.js";
import { Object } from "core-js";
export default {
  name: "Home",
  store: store,
  components: {
    usrcard,
    contentBox,
    message
  },
  data() {
    return {
      user: this.$store.state.usr_perfil.user,
      nome: this.$store.state.usr_perfil.nome,
      status: this.$store.state.usr_perfil.status,
      email: this.$store.state.usr_perfil.email,
      items: {},
      especialidades: this.$store.state.usr_perfil.especialidades,
      sess: false
    };
  },
  mounted() {
    var contribuicoes = this.$store.state.usr_perfil.contribuicoes;
    for (var x = 0; x < contribuicoes.length; x++) {
      this.items[Object.keys(contribuicoes[x]).toString()] = contribuicoes[x];
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
