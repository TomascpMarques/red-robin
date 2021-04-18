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
      permissoes: null,
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
      // 1,75 segundos depois do user parar de escrever, fza um request ao user_server,
      // para verificar se o username é válido.
      clearTimeout(this.timeoutUsrName);
      this.timeoutUsrName = setTimeout(() => {
        api.callEndPoint("http://localhost:8081", {
          name: "VerificarUserExiste",
          // envia uma token vazia simbolizada por "*", ou a token se esta existir
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
      // 1s depois do usr parar de escrever verifica se a palavra-passe é válida
      clearTimeout(this.timeoutPassword);
      this.timeoutPassword = setTimeout(() => {
        /**
         * 8 caracteres+
         * simbolos
         * digitos
        */
        if (this.password.match(/^.*(?=.{8,})(?=.*[a-zA-Z])(?=.*\d)(?=.*[!#$%&?"]).*$/gm)) {
          this.passErro = false;
        } else {
          this.passErro = true;
        }
      }, 1000);
    },
    verificarPasseCoincide() {
      // a cada .5s o sistema verifica se as palavras-passe coincidem
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
      // Se algum dado contiver erros, a func devolve falsso
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
