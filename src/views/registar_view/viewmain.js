import cntboxside from "../../components/content_box_side.vue";
import inpCombo from "../../components/input_combo.vue";
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
    };
  },
  methods: {
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
