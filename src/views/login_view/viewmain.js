import message from "../../components/message_popup.vue";
import * as helpers from "../../api/helperFuncs.js";
import * as api from "../../api/apiCalls.js";
import * as apiServices from "../../api/apiServices.js";
import store from "../../store/index.js";
import router from "../../router/index.js";

export default {
  name: "Iniciar Sessão",
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
      anim: false,
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
        "O login teve sucesso, a redirecionar em 4 segundos... ";
      this.show = true;
      this.log_tip = "good";
    },
    getPerfilUser() {
      api.callEndPoint(apiServices.hosts.userinfo, {
        name: "GetInfoUtilizador",
        params: [this.user, this.$store.state.usr_token],
      }).then((obj) => {
        //  Resolve a promessa da api.callEndPoints e carrega a token para o vueX
        //  Assim evita criar cookies. Itera pelos valores recebidos, verifica que açõe tomar
        obj.GetInfoUtilizador.forEach((result) => {
          //  Itera por todos as keys do objeto
          console.log(result);
          Object.keys(result).forEach((value) => {
            //  Se foi devolvida uma token
            if (value.toString() === "user") {
              this.$store.commit("storePerfilUser", result[value]);
              this.getRepos();
            } else {
              this.loginErro("Não foi possível buscar o perfil desse utilizador");
            }
          });
        });
      });
    },
    getRepos() {
      api.callEndPoint(apiServices.hosts.documentacao, {
        name: "BuscarUserRepos",
        params: [this.$store.state.usr_perfil.user, this.$store.state.usr_token.length > 1 ? this.$store.state.usr_token : "noToken"],
      }).then((obj) => {
        //  Resolve a promessa da api.callEndPoints e carrega a token para o vueX
        //  Assim evita criar cookies. Itera pelos valores recebidos, verifica que açõe tomar
        obj.BuscarUserRepos.forEach((result) => {
          console.log(result);
          //  Itera por todos as keys do objeto
          Object.keys(result).forEach((value) => {
            //  Se o número de repos encontrados for maior que 0 (encontrou algo)
            if (value.toString() === "encontrados" && result[value] <= 0) {
              console.log("-> ", value, result[value]);
            }
            // Atribui o valor dos repos encontrados a uma local variable
            if (value.toString() === "repos") {
              this.$store.commit("storeUrsRepos", result[value]);
            }
          });
        });
      });
    },
    initLogin() {
      this.show = false;
      if (this.validarInput(this.user, this.pass)) {
        this.md5_pass = helpers.toMD5(this.pass);
        api.callEndPoint(apiServices.hosts.autenticacao, {
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
                this.getPerfilUser(this.name);
                setTimeout(function () {
                  // Previne mudar de route se o user já mudou antes do timer
                  if (!(router.currentRoute.value.path !== "/")) {
                    router.push("/home");
                  }
                }, 4000);
              } else {
                this.loginErro(obj.Login[0].erro);
              }
            });
          });
        }).catch((error) => {
          this.loginErro("Erro ao fazer login, o servidor pode estar em baixo");
          return error;
        });
      }
    },
  },
};
