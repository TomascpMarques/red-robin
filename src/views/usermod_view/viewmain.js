import store from "../../store/index.js";
import cntboxside from "../../components/content_box_side.vue";
import contentBox from "../../components/content_box.vue";
export default {
  name: "ModificarUser",
  store: store,
  components: {
    cntboxside,
    contentBox,
  },
  data() {
    return {
      nome: store.state.usr_perfil.nome,
    };
  },
};
