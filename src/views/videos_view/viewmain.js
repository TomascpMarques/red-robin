import videoShow from "../../components/video_show.vue";
import newVideoShare from "../../components/add_video_share.vue";
import searchVideoShare from "../../components/search_video_share.vue";

export default {
  name: "VideoShare",
  components: {
    videoShow,
    newVideoShare,
    searchVideoShare
  },
  methods: {
    updateparent(variable) {
      this.teste = variable;
    },
  },
  data() {
    return {
      teste: "",
    };
  }
};
