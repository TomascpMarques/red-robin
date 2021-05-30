import * as api from "../../api/apiCalls.js";
import * as apiServices from "../../api/apiServices.js";

import store from "../../store/index.js";
import inpCategorie from "../../components/inp_categorie.vue";
export default {
  name: "equipamento",
  components: {
    inpCategorie,
  },
  store: store,
  data() {
    return {
      test: ""
    };
  },
  methods: {
    getAllRepos() {
      api.callEndPoint(apiServices.hosts.gestao, {
        name: "BuscarTodosOsRegistosBD",
        params: ["equipamento", this.$store.state.usr_token.length > 1 ? this.$store.state.usr_token : "noToken"],
      }).then((obj) => {
        console.log(obj.BuscarTodosOsRegistosBD);
        if (obj.BuscarTodosOsRegistosBD[0].registos.length > 0) {
          this.test = obj.BuscarTodosOsRegistosBD[0].registos;
        }
        if (obj.BuscarTodosOsRegistosBD[0].erro !== null) {
          console.log(obj.BuscarTodosOsRegistosBD[0].erro);
        }
      });
    },
  }
};
