<template>
  <div class="main-wrapp">
    <div class="title" @click="show_opt = !show_opt">
      <h4>Adicionar Video</h4>
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
          v-model="vid_tit"
        />
        <inputCombo
          :input_tit="'URL do video'"
          :place="'URL do Video'"
          :tipo="'text'"
          :spell="false"
          :estado="url_erro"
          :erro="url_erro"
          v-model="vid_url"
        />
        <inputCombo
          :input_tit="'Descrição do video'"
          :place="'Descrição do Video'"
          :estado="desc_erro"
          :erro="desc_erro"
          :tipo="'text'"
          v-model="vid_desc"
        />
        <inputCombo
          :input_tit="'Tema do video'"
          :place="'Tema do Video'"
          :estado="tema_erro"
          :erro="tema_erro"
          :tipo="'text'"
          v-model="vid_tema"
        />
        <button @click="initVideoCreate()">Criar Share</button>
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
  name: "addVideoShare",
  router: router,
  store: store,
  components: {
    inputCombo,
  },
  data() {
    return {
      msg: "",
      vid_tit: "",
      vid_url: "",
      vid_desc: "",
      vid_tema: "",
      url_erro: "",
      tit_erro: "",
      desc_erro: "",
      tema_erro: "",
      show_opt: false,
    };
  },
  methods: {
    addVideo() {
      var video = {
        url: this.vid_url,
        tema: this.vid_tema,
        titulo: this.vid_tit,
        descricao: this.vid_desc,
        criador: this.$store.state.usr_perfil.user,
      };
      console.log(video);
      api
        .callEndPoint(apiServices.hosts.videoshare, {
          name: "CriarVideoShare",
          params: [video, this.$store.state.usr_token],
        })
        .then((obj) => {
          if (obj.CriarVideoShare[0].sucesso === true) {
            this.msg = "Adicionado com sucesso";
            setTimeout(() => {
              router.go();
            }, 2000);
          } else if (obj.CriarVideoShare[0].err !== null) {
            this.msg = obj.CriarVideoShare[0].err;
          }
        });
    },
    checkInputs() {
      if (this.vid_tit.length < 4) {
        this.tit_erro = "Prenche isto aqui sff";
        return false;
      } else {
        this.tit_erro = "";
      }
      if (this.vid_url.length < 4) {
        this.url_erro = "Prenche isto aqui sff";
        return false;
      } else {
        this.url_erro = "";
      }
      if (this.vid_desc.length < 4) {
        this.desc_erro = "Prenche isto aqui sff";
        return false;
      } else {
        this.desc_erro = "";
      }
      if (this.vid_tema.length < 4) {
        this.tema_erro = "Prenche isto aqui sff";
        return false;
      } else {
        this.tema_erro = "";
      }
      return true;
    },
    initVideoCreate() {
      if (!this.checkInputs()) {
        return null;
      }
      this.addVideo();
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
