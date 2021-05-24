// Vue e componentes
import store from "../../store/index.js";
import usrcard from "../../components/usr_card.vue";
import contentBox from "../../components/content_box.vue";
import message from "../../components/message_popup.vue";

// Api helpers
import * as api from "../../api/apiCalls.js";
import * as apiServices from "../../api/apiServices.js";

import { Object } from "core-js";
export default {
  name: "Perfil de Utilizador",
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
      especialidades: this.$store.state.usr_perfil.especialidades,
      sess: false
    };
  },
  mounted() {
    this.getPerfilUser();
  },
  methods: {
    initLogOut() {
      this.sess = !this.sess;
    },
    logOut() {
      store.commit("apagarUserProfile");
      store.commit("apagarJWToken");
      store.commit("apagarUsrCreds");
      store.commit("apagarOtherUrsRepos");
      store.commit("apagarUsrRepos");
      store.commit("limparSessionStorage");
      location.reload();
    },
    getPerfilUser() {
      api.callEndPoint(apiServices.hosts.userinfo, {
        name: "GetInfoUtilizador",
        params: [this.user, this.$store.state.usr_token],
      }).then((obj) => {
        //  Resolve a promessa da api.callEndPoints e carrega a token para o vueX
        //  Assim evita criar cookies. Itera pelos valores recebidos, verifica que açõe tomar
        obj.GetInfoUtilizador.forEach((result) => {
          //  Itera por todos as keys do objeto
          console.log(result);
          Object.keys(result).forEach((value) => {
            //  Se foi devolvida uma token
            if (value.toString() === "user") {
              this.$store.commit("storePerfilUser", result[value]);
            } else {
              this.loginErro("Não foi possível buscar o perfil desse utilizador");
            }
          });
        });
      });
    },
  },
};
