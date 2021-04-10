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
      especialidades: ""
    };
  },
  methods: {
    verificarPasseCoincide() {
      console.log("test da PasseCoincide");
      return this.repPassword === this.password;
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
