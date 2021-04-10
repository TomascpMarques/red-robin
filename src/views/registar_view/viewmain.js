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
      nome: "",
      email: "",
      especialidades: ""
    };
  },
  methods: {
    init() {
      console.log(this.usrName, this.password, this.nome, this.email, this.especialidades);
    },
  },
};
