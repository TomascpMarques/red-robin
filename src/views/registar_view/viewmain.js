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
      timeoutUsrName: null,
      timeoutPassword: null
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
    verificarPasseValida() {
      clearTimeout(this.timeoutPassword);
      this.timeoutPassword = setTimeout(() => {
        if (this.password.match(/^.*(?=.{8,})(?=.*[a-zA-Z])(?=.*\d)(?=.*[!#$%&?"]).*$/gm)) {
          this.passErro = false;
        } else {
          this.passErro = true;
        }
      }, 1000);
    },
    verificarPasseCoincide() {
      if (this.repPassword !== this.password) {
        this.repErro = true;
      } else {
        this.repErro = false;
      }
    },
    verificarDadosBase() {
      console.log("test da VerDadosBase");
      return !this.usrName || !this.password;
    },
    init() {
      console.log(this.usrName, this.password, this.repPassword, this.nome, this.email, this.especialidades);
    },
  },
};
