import store from "../../store/index.js";
import message from "../../components/message_popup.vue";
import repo from "../../components/repo.vue";

import * as api from "../../api/apiCalls.js";
import * as apiServices from "../../api/apiServices.js";

export default {
  name: "Documentação & Notas",
  store: store,
  components: {
    message,
    repo
  },
  data() {
    return {
      repos: Array,
    };
  },
  methods: {
    getRepos() {
      api.callEndPoint(apiServices.hosts.documentacao, {
        name: "BuscarUserRepos",
        params: [this.$store.state.usr_perfil.user, this.$store.state.usr_token],
      }).then((obj) => {
        //  Resolve a promessa da api.callEndPoints e carrega a token para o vueX
        //  Assim evita criar cookies. Itera pelos valores recebidos, verifica que açõe tomar
        obj.BuscarUserRepos.forEach((result) => {
          //  Itera por todos as keys do objeto
          Object.keys(result).forEach((value) => {
            //  Se o número de repos encontrados for maior que 0 (encontrou algo)
            if (value.toString() === "encontrados" && result[value] <= 0) {
              console.log("-> ", value, result[value]);
            }
            // Atribui o valor dos repos encontrados a uma local variable
            if (value.toString() === "repos") {
              this.repos = result[value];
            }
          });
        });
      });
    }
  },
  created() {
    this.getRepos();
  }
};
