<template>
  <div class="repo">
    <div class="titulo" @click="show = !show">
      <!-- <img src="../assets/files.svg" alt="" /> -->
      <span class="decor"></span>
      <h4>Criar Um Novo Repositório</h4>
    </div>
    <div class="body" v-if="show">
      <h3>Novo Repositório</h3>
      <inputCombo
        :input_tit="'Nome do Repositorio'"
        :place="'Nome do Repositório'"
        :tipo="'text'"
        v-model="nomeRepo"
      />
      <inputCombo
        :input_tit="'Tema do Repositorio'"
        :place="'Tema do Repositório'"
        :tipo="'text'"
        :erro="msg"
        v-model="tema"
        @input="msg = ''"
      />
      <button @click="criarRepo()">Criar Repo</button>
    </div>
  </div>
</template>

<script>
import * as api from "../api/apiCalls.js";
import * as apiServices from "../api/apiServices.js";
import store from "../store/index.js";

import inputCombo from "../components/input_combo.vue";
import router from "../router/index.js";
export default {
  name: "newRepo",
  components: {
    inputCombo,
  },
  data() {
    return {
      show: false,
      nomeRepo: "",
      tema: "",
      msg: "",
    };
  },
  store: store,
  router: router,
  methods: {
    criarRepo() {
      this.nomeRepo.replace(/\W+/gm, "");
      if (!this.nomeRepo.length) {
        console.log("O nome do repo não deve ser null");
        this.nomeRepo = "Prenche isto aqui sff";
        return null;
      }
      if (!this.tema.length) {
        console.log("O tema do repo não deve ser null");
        this.tema = "Prenche isto aqui sff";
        return null;
      }
      var repo = {
        nome: this.nomeRepo,
        tema: this.tema,
        autor: this.$store.state.usr_perfil.user,
      };
      console.log(repo);
      api
        .callEndPoint(apiServices.hosts.documentacao, {
          name: "CriarRepositorio",
          params: [repo, this.$store.state.usr_token],
        })
        .then((obj) => {
          //  Resolve a promessa da api.callEndPoints e carrega a token para o vueX
          //  Assim evita criar cookies. Itera pelos valores recebidos, verifica que açõe tomar
          obj.CriarRepositorio.forEach((result) => {
            //  Itera por todos as keys do objeto
            console.log(result);
            Object.keys(result).forEach((value) => {
              if (value.toString() === "resultado" && result[value] !== null) {
                this.nomeRepo = "";
                this.tema = "";
                this.show = !this.show;
                router.go();
                return null;
              }
              if (value.toString() === "erro" && result[value] !== null) {
                console.log(result[value]);
                this.msg = result[value].toString();
                return null;
              }
            });
          });
        });
    },
  },
};
</script>

<style scoped>
button {
  margin: 0.4rem 0.2rem;
  font-family: "Roboto";
  font-size: 1rem;
  font-weight: bold;
  background-color: gainsboro;
  border-radius: 5px;
  border: none;
  letter-spacing: 1px;
  padding: 0.4rem 0.7rem;
  transition: 0.3s all ease-in,
    0.83s padding cubic-bezier(0.76, 0.2, 0.07, 1.07);
}

button:hover {
  background-color: blueviolet;
  color: white;
  cursor: pointer;
  padding: 0.4rem 26%;
  border-radius: 3px;
}

.body {
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  place-items: center;
  justify-content: left;
  text-align: left;
}

h3 {
  margin: 0;
  margin-top: 1rem;
  padding: 0;
}

.repo {
  display: flex;
  flex-direction: column;
  place-items: center;
  background-color: var(--white);
  border-radius: 7px;
  border-left: 10px solid lightgray;
  box-shadow: 8px 8px 18px 0px #dfdfdf;
  transition: 0.33s all ease-in-out, 0.2s translateY ease-in-out;
  margin: auto;
  padding: 0.6rem 0.5rem;
}

.repo:hover {
  box-shadow: 8px 8px 18px 0px #d1d1d1;
  transform: translateX(5px);
}

.repo:hover h4 {
  color: darkgrey;
  text-decoration: underline;
  text-decoration-thickness: 2px;
  text-decoration-color: lightgray;
}

.repo:hover .decor {
  border-color: darkgrey;
}

.titulo {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-content: center;
  place-items: center;
  gap: 0.7rem;
  margin-right: 0.5rem;
  width: fit-content;
  transition: 0.2s all ease-in;
}

.titulo:hover {
  color: blueviolet;
  cursor: pointer;
}
.titulo:hover h4 {
  cursor: pointer;
}

.decor {
  border: 2px dashed lightgray;
  width: 0.8rem;
  height: 0.8rem;
  transform: rotateZ(-45deg);
  transition: 0.3s all ease-in-out;
}

h2 {
  padding: 0;
  margin: 0;
  color: gray;
}

.titulo img {
  width: 2rem;
}

h4 {
  margin: 0;
  padding: 0;
  font-family: consolas;
  font-weight: 600;
  color: gainsboro;
  font-style: italic;
  text-decoration: underline;
  text-decoration-thickness: 2px;
  text-decoration-color: transparent;
  transition: 0.4s all ease-in-out;
}
</style>
