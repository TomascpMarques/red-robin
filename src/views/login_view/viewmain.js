import * as helpers from "../../api/helperFuncs.js";
// import * as api from "../api/pingAPI.js";
import * as api from "../../api/apiCalls.js";
import store from "../../store/index.js";
import message from "../../components/message_popup.vue";
export default {
  components: {
    message,
  },
  data() {
    return {
      user: "",
      pass: "",
      md5_pass: "",
      login: false,
      params_errados: false,
      show: false,
      log_tit: "",
      log_mss: "",
      log_tip: "",
    };
  },
  store: store,
  watch: {
    user: {
      immediate: true,
      handler() {
        this.verificarParaLimpar(this.user);
      },
    },
    pass: {
      immediate: true,
      handler() {
        this.verificarParaLimpar(this.pass);
      },
    },
  },
  methods: {
    mutate() {
      this.show = !this.show;
    },
    verificarParaLimpar(valor) {
      if (valor.length !== 0) {
        this.params_errados = false;
      }
    },
    // Se o utilizador e a palavra-passe forem nulas não deixa executar o pedido de login
    validarInput(usr, psswd) {
      if (usr.length > 1 && psswd.length > 1) {
        this.params_errados = false;
        this.login = true;
        return true;
      }
      this.login = false;
      this.params_errados = true;
      return false;
    },
    initLogin() {
      this.show = false;
      if (this.validarInput(this.user, this.pass)) {
        this.md5_pass = helpers.toMD5(this.pass);
        api
          .callEndPoints("http://localhost:8081/auth", {
            name: "Login",
            params: [this.user, this.md5_pass],
          })
          .then((obj) => {
            //  Resolve a promessa da api.callEndPoints e carrega a token para o vueX
            //  Assim evita criar cookies. Itera pelos valores recebidos, verifica que açõe tomar
            obj.Login.forEach((x) => {
              //  Itera por todos as keys do objeto
              Object.keys(x).forEach((y) => {
                //  Se foi devolvida uma token
                if (y.toString() === "token") {
                  this.$store.commit("storeJWToken", obj.Login[0].token);
                  this.log_tit = "Login";
                  this.log_mss =
                    "O login teve sucesso, podes aceder à plataforma agora :)";
                  this.show = true;
                  this.log_tip = "good";
                  console.log("Sucesso");
                } else {
                  this.log_tit = "Login";
                  this.log_mss = obj.Login[0].erro;
                  this.show = true;
                  this.log_tip = "bad";
                  this.login = false;
                  this.params_errados = true;
                  console.log("Erro");
                  console.log(this.md5_pass);
                  console.log(this.pass);
                }
              });
            });
          });
      }
    },
  },
};
