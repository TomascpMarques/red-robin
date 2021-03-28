import message from "../../components/message_popup.vue";
import * as helpers from "../../api/helperFuncs.js";
import * as api from "../../api/apiCalls.js";
import store from "../../store/index.js";
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
    loginErro(errMss) {
      this.log_tit = "Login";
      this.log_mss = errMss;
      this.show = true;
      this.log_tip = "bad";
      this.login = false;
      this.params_errados = true;
    },
    loginSucesso(token) {
      this.$store.commit("storeJWToken", token);
      this.log_tit = "Login";
      this.log_mss =
        "O login teve sucesso, podes aceder à plataforma agora :)";
      this.show = true;
      this.log_tip = "good";
    },
    initLogin() {
      this.show = false;
      if (this.validarInput(this.user, this.pass)) {
        this.md5_pass = helpers.toMD5(this.pass);
        api.callEndPoints("http://localhost:8081/auth", {
          name: "Login",
          params: [this.user, this.md5_pass],
        }).then((obj) => {
          //  Resolve a promessa da api.callEndPoints e carrega a token para o vueX
          //  Assim evita criar cookies. Itera pelos valores recebidos, verifica que açõe tomar
          obj.Login.forEach((x) => {
            //  Itera por todos as keys do objeto
            Object.keys(x).forEach((y) => {
              //  Se foi devolvida uma token
              if (y.toString() === "token") {
                this.loginSucesso(obj.Login[0].token);
              } else {
                this.loginErro(obj.Login[0].erro);
              }
            });
          });
        });
      }
    },
  },
};
