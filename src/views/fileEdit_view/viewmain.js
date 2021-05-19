import store from "../../store/index.js";

import contentBox from "../../components/content_box.vue";
import cntboxside from "../../components/content_box_side.vue";

export default {
  name: "Editar Ficheiro",
  store: store,
  components: {
    contentBox,
    cntboxside
  },
  data() {
    return {};
  },
  created() {
    console.log(this.$route.params);
  }
};
