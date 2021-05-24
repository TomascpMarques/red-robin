<template>
  <div class="main-wrapp">
    <div class="title" @click="show_opt = !show_opt">
      <h4>Procurar Video</h4>
    </div>
    <transition
      enter-active-class="animate__animated animate__fadeIn"
      leave-active-class="animate__animated animate__fadeOut"
    >
      <div class="body" v-if="show_opt">
        <inputCombo
          :input_tit="'Titulo do video'"
          :place="'Titulo do Video'"
          :estado="tit_erro"
          :erro="tit_erro"
          :tipo="'text'"
          v-model="vid.titulo"
        />
        <inputCombo
          :input_tit="'Descrição do video'"
          :place="'Descrição do Video'"
          :estado="desc_erro"
          :erro="desc_erro"
          :tipo="'text'"
          v-model="vid.descricao"
        />
        <inputCombo
          :input_tit="'Tema do video'"
          :place="'Tema do Video'"
          :estado="tema_erro"
          :erro="tema_erro"
          :tipo="'text'"
          v-model="vid.tema"
        />
        <inputCombo
          v-model="quantidade"
          :tipo="'number'"
          :step="1"
          :min="0"
          :place="'Numero de Videos'"
          :input_tit="'Numero de Videos'"
        />
        <button @click="initVideoSearch()">Procurar Video</button>
        <button @click="allSearch()">Mostrar Todos</button>
        <br />
        <div class="msg" v-if="msg">
          <h4>Operação:</h4>
          <span>{{ msg }}</span>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import * as api from "../api/apiCalls.js";
import * as apiServices from "../api/apiServices.js";

import router from "../router/index.js";
import store from "../store/index.js";

import inputCombo from "./input_combo.vue";
export default {
  name: "searchVideoShare",
  router: router,
  store: store,
  components: {
    inputCombo,
  },
  data() {
    return {
      msg: "",
      vid: {},
      vid_tit: "",
      vid_desc: "",
      vid_tema: "",
      url_erro: "",
      tit_erro: "",
      desc_erro: "",
      quantidade: 0,
      tema_erro: "",
      show_opt: false,
      videos: {},
    };
  },
  methods: {
    allSearch() {
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
            console.log("videos search all: ", obj.GetVideoShares[0].shares);
            this.$emit("videoSearchResultAll", obj.GetVideoShares[0].shares);
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
              this.msg = obj.GetVideoShares[0].aviso;
            }
          }
        });
    },
    verifSearchParam(param) {
      var struct = {};
      Object.keys(param).forEach((key) => {
        if (param[key].length > 1) {
          struct[key] = param[key];
        }
      });
      console.log(struct);
      return struct;
    },
    searchVideo() {
      var struct = {
        params: this.verifSearchParam(this.vid),
        quanti: this.quantidade,
      };
      // criador: this.$store.state.usr_perfil.user,
      console.log("|->", struct);
      api
        .callEndPoint(apiServices.hosts.videoshare, {
          name: "GetVideoShares",
          params: [struct, this.$store.state.usr_token],
        })
        .then((obj) => {
          if (obj.GetVideoShares[0].sucesso === true) {
            console.log("vid search singular: ", obj.GetVideoShares[0].shares);
            this.$emit("videoSearchResult", obj.GetVideoShares[0].shares);
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
              this.msg = obj.GetVideoShares[0].aviso;
            }
          }
        });
    },
    initVideoSearch() {
      this.searchVideo();
    },
  },
};
</script>

<style scoped>
.msg {
  display: flex;
  flex-direction: row;
  align-content: flex-start;
  padding: 0.3rem;
  flex-wrap: wrap;
}

button {
  margin-bottom: 0.4rem;
  background-color: #e6e6e6;
  padding: 0.3rem 0.4rem;
  border: none;
  border-radius: 5px;
  font-weight: bold;
  font-size: 0.96rem;
  font-family: "Roboto";
  letter-spacing: 1px;
  transition: 0.3s all ease-in-out,
    0.5s padding cubic-bezier(0.65, 0.15, 0.13, 0.95);
}

button:hover {
  padding: 0.3rem 2rem;
  background-color: blueviolet;
  color: white;
}

.body {
  display: flex;
  flex-direction: column;
  align-content: center;
  place-items: center;
  transition: 0.3s all ease-in-out;
}

.title {
  text-align: center;
  cursor: pointer;
}

.main-wrapp {
  display: flex;
  flex-direction: column;
  align-content: space-around;
  background-color: white;
  border-radius: 7px;
  padding: 0.8rem;
  box-shadow: 7px 7px 7px 1px lightgray;
  margin-right: 0.7rem;
  height: min-content;
  border: 2px solid transparent;
  transition: 0.3s all ease-in-out;
}

h3 {
  padding: 0;
  margin: 0;
  letter-spacing: 1px;
  color: var(--blue);
  margin-bottom: 0.3rem;
  font-size: 1.4rem;
}

h4 {
  padding: 0;
  margin: 0;
  letter-spacing: 1px;
  color: var(--blue);
  margin-bottom: 0.3rem;
  font-size: 1rem;
  font-family: Consolas;
  word-spacing: -2px;
  transition: 0.3s all ease-in-out;
}

.main-wrapp:hover {
  border: 2px solid lightgray;
}

.main-wrapp:hover h4 {
  cursor: pointer;
}
</style>
