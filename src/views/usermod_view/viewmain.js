import store from "../../store/index.js";
import cntboxside from "../../components/content_box_side.vue";
import contentBox from "../../components/content_box.vue";
import infoDisp from "../../components/info_disp.vue";
export default {
  name: "Modificar User",
  store: store,
  components: {
    cntboxside,
    contentBox,
    infoDisp
  },
  data() {
    return {
      nome: store.state.usr_perfil.nome,
    };
  },
};
