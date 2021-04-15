import cntboxside from "../../components/content_box_side.vue";
import inpCombo from "../../components/input_combo.vue";
import * as helpers from "../../api/helperFuncs.js";
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
      permissoes: 3,
      nome: "",
      email: "",
      especialidades: "",
      usrErro: false,
      passErro: false,
      repErro: false,
      permsErro: false,
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
          if (obj.VerificarUserExiste[0].existe) {
            this.usrErro = true;
          } else if (this.usrName.length > 4) {
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
      clearTimeout(this.timeoutPassword);
      this.timeoutPassword = setTimeout(() => {
        this.passeCoincide();
      }, 500);
    },
    passeCoincide() {
      if (this.repPassword !== this.password) {
        this.repErro = true;
      } else {
        this.repErro = false;
      }
    },
    verificarDadosBase() {
      this.passeCoincide();
      return !((this.passErro || this.usrErro || this.repErro));
    },
    init() {
      if (this.verificarDadosBase()) {
        const passHash = helpers.toMD5(this.password);

        api.callEndPoint("http://localhost:8081", {
          name: "Registar",
          params: [this.usrName, passHash, this.permissoes, store.state.usr_token],
        }).then((obj) => {
          if (obj.Registar[0].token) {
            console.log("SUCCESS!!!");
          } else {
            console.log("ERRO!!!");
          }
        });
      }
    },
  },
};
