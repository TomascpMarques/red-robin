import cntboxside from "../../components/content_box_side.vue";
import inpCombo from "../../components/input_combo.vue";
import popup from "../../components/message_popup.vue";
import store from "../../store/index.js";
import * as helpers from "../../api/helperFuncs.js";
import * as api from "../../api/apiCalls.js";
import * as apiServices from "../../api/apiServices";

export default {
  components: {
    cntboxside,
    inpCombo,
    popup
  },
  name: "Registar Novo User",
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
      timeoutPassword: null,
      showUserAcc: false,
      showUserInfo: false,
      log_mssUserAcc: "",
      log_titUserAcc: "",
      log_tipUserAcc: "",
      log_mssUserInf: "",
      log_titUserInf: "",
      log_tipUserInf: ""
    };
  },
  methods: {
    verificarUsrNameAval() {
      // 1,75 segundos depois do user parar de escrever, fza um request ao user_server,
      // para verificar se o username é válido.
      clearTimeout(this.timeoutUsrName);
      this.timeoutUsrName = setTimeout(() => {
        api.callEndPoint(apiServices.hosts.autenticacao, {
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
        api.callEndPoint(apiServices.hosts.userinfo, {
          name: "CriarRegistoUser",
          params: [{
            nome: this.nome,
            statusmss: "offline",
            user: this.usrName,
            email: this.email,
            especialidades: this.especialidades.split(", ")
          }, store.state.usr_token],
        }).then((obj) => {
          console.log("Lê OBJ: ", obj);
          if (obj.CriarRegistoUser[0].insserido) {
            this.showUserInfo = true;
            this.log_mssUserInf = "A informação do utilizador não foi insserida com sucesso, devido a sobreposição de dados";
            this.log_titUserInf = "Informação de User";
            this.log_tipUserInf = "bad";
          } else {
            this.showUserInfo = true;
            this.log_mssUserInf = "A informação do utilizador foi insserida com sucesso";
            this.log_titUserInf = "Informação de User";
            this.log_tipUserInf = "good";
            const passHash = helpers.toSHA256(this.password);
            api.callEndPoint(apiServices.hosts.autenticacao, {
              name: "Registar",
              params: [this.usrName, passHash, Number(this.permissoes), store.state.usr_token],
            }).then((obj) => {
              if (obj.Registar[0].token) {
                this.showUserAcc = true;
                this.log_mssUserAcc = "O utilizador foi criado com sucesso";
                this.log_titUserAcc = "Utilizador";
                this.log_tipUserAcc = "good";
              } else {
                this.showUserAcc = true;
                this.log_mssUserAcc = "O utilizador não foi criado, utilizador existente ou dados mal-formados";
                this.log_titUserAcc = "Erro";
                this.log_tipUserAcc = "bad";
              }
            });
          };
        });
      }
    },
  },
};
