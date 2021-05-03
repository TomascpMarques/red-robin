import store from "../../store/index.js";
import cntboxside from "../../components/content_box_side.vue";
import contentBox from "../../components/content_box.vue";
import infoDisp from "../../components/info_disp.vue";
import listSimple from "../../components/display_list_simple.vue";
import listDisplay from "../../components/display_list.vue";
import inpCombo from "../../components/input_combo.vue";
import * as api from "../../api/apiCalls.js";
import * as apiServices from "../../api/apiServices";

export default {
  name: "Modificar User",
  store: store,
  components: {
    cntboxside,
    contentBox,
    infoDisp,
    listDisplay,
    listSimple,
    inpCombo
  },
  data() {
    return {
      nome: store.state.usr_perfil.nome,
      email: store.state.usr_perfil.email,
      usrName: store.state.usr_perfil.usrName,
      password: "",
      usrErro: false,
      passErro: false,
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
  },
};
