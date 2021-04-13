import cntboxside from "../../components/content_box_side.vue";
import inpCombo from "../../components/input_combo.vue";
import * as api from "../../api/apiCalls.js";
import store from "../../store/index.js";
export default {
  components: {
    cntboxside,
    inpCombo
  },
  name: "RegistarUser",
  store: store,
  data() {
    return {
      usrName: "",
      password: "",
      repPassword: "",
      nome: "",
      email: "",
      especialidades: "",
      usrErro: false,
      passErro: false,
      repErro: false,
      nomeErro: false,
      emailErro: false,
      especErro: false,
      timeoutUsrName: null
    };
  },
  methods: {
    verificarUsrNameAval() {
      clearTimeout(this.timeoutUsrName);
      this.timeoutUsrName = setTimeout(() => {
        api.callEndPoint("http://localhost:8081", {
          name: "VerificarUserExiste",
          params: [this.usrName ? this.usrName : "*", store.state.usr_token],
        }).then((obj) => {
          console.log(obj.VerificarUserExiste[0].existe);
          if (obj.VerificarUserExiste[0].existe) {
            this.usrErro = true;
          } else {
            this.usrErro = false;
          }
        });
      }, 1750);
    },
    verificarPasseCoincide() {
      /* Se as passes não coincidirem, devolve false */
      return this.repPassword === this.password;
    },
    verificarDadosBase() {
      console.log("test da VerDadosBase");
      return !this.usrName || !this.password;
    },
    init() {
      console.log(this.usrName, this.password, this.repPassword, this.nome, this.email, this.especialidades);
      this.repErro = !this.verificarPasseCoincide();
    },
  },
};
