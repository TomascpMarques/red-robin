import videoShow from "../../components/video_show.vue";
import newVideoShare from "../../components/add_video_share.vue";
import searchVideoShare from "../../components/search_video_share.vue";

import * as api from "../../api/apiCalls.js";
import * as apiServices from "../../api/apiServices.js";

// import router from "../../router/index.js";
export default {
  name: "VideoShare",
  components: {
    videoShow,
    newVideoShare,
    searchVideoShare
  },
  data() {
    return {
      videos: "",
    };
  },
  methods: {
    updateparent(variable) {
      this.videos = variable;
    },
    getAllVideos() {
      // Struct vazia devolve todos os resultados na bd
      var struct = {
        params: {},
        quanti: 0,
      };
      // criador: this.$store.state.usr_perfil.user,
      console.log(struct);
      api
        .callEndPoint(apiServices.hosts.videoshare, {
          name: "GetVideoShares",
          params: [struct, this.$store.state.usr_token],
        })
        .then((obj) => {
          if (obj.GetVideoShares[0].sucesso === true) {
            this.videos = obj.GetVideoShares[0].shares;
            console.log("videos all: ", this.videos);
            return null;
          }

          // No caso de ocorrer um na procura erro
          try {
            if (obj.GetVideoShares[0].error !== null) {
              this.msg = obj.GetVideoShares[0].error;
            }
          } finally {
            if (obj.GetVideoShares[0].aviso !== null) {
              console.log(obj.GetVideoShares[0].aviso);
            }
          }
        });
    }
  },
  created() {
    this.getAllVideos();
  }
};
