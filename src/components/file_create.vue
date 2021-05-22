<template>
  <div v-bind:class="['wrap', result === true ? 'wrap-good' : 'wrap-erro']">
    <div class="padd">
      <div class="title">
        <h2>Ficheiro</h2>
        <span>Criação & Nomeação</span>
      </div>
      <div class="hr"></div>
      <div class="body">
        <h3>
          Repositório: <span class="repo">{{ repoNome }}</span>
        </h3>
        <inpCombo
          :input_tit="'Nome do Ficheiro'"
          :place="'Nome Do Ficheiro'"
          :tipo="'text'"
          v-model="nomeFile"
        />

        <inpCombo
          :input_tit="'Localização do Ficheiro'"
          :place="localFicheiro"
          v-model="localFicheiro"
          :spell="false"
          :tipo="'text'"
        />
        <div class="buttons">
          <button @click="$emit('update:modelValue', false)">Saír</button>
          <button @click="verifFileExiste(localFicheiro)">
            Criar Ficheiro
          </button>
          <span class="opMessage">{{ operacao }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import inpCombo from "../components/input_combo.vue";

import store from "../store/index.js";

import * as api from "../api/apiCalls.js";
import * as apiServices from "../api/apiServices.js";

export default {
  name: "fileCreate",
  components: {
    inpCombo,
  },
  store: store,
  props: ["repoNome", "path", "modelValue"],
  data() {
    return {
      nomeFile: "",
      localFicheiro: this.path,
      operacao: "",
      result: Boolean,
    };
  },
  methods: {
    criarFicheiroMeta() {
      var file = {
        nome: this.nomeFile,
        autor: this.$store.state.usr_perfil.user,
        reponome: this.localFicheiro.split("/")[2],
        path: (this.localFicheiro += "/" + this.nomeFile).split("/").slice(1),
      };
      console.log(file);
      api
        .callEndPoint(apiServices.hosts.documentacao, {
          name: "CriarFicheiroMetaData",
          params: [
            file,
            this.$store.state.usr_token.length > 1
              ? this.$store.state.usr_token
              : "noToken",
          ],
        })
        .then((obj) => {
          //  Resolve a promessa da api.callEndPoints e carrega a token para o vueX
          //  Assim evita criar cookies. Itera pelos valores recebidos, verifica que açõe tomar
          obj.CriarFicheiroMetaData.forEach((result) => {
            console.log("-> ", result);
            //  Itera por todos as keys do objeto
            Object.keys(result).forEach((value) => {
              console.log("result[value] -<>", result[value]);
              console.log("value -<>", value);
              if (result[value] === true && value.toString() === "sucesso") {
                console.log("Sucesso ao criar o ficheiro");
                this.operacao = "Sucesso";
                this.result = false;
                this.nomeFile = "";
                this.localFicheiro = "";
                setTimeout(() => {
                  this.$router.push({
                    path: "/docs",
                  });
                }, 2000);
              }
              if (value.toString() === "erro") {
                this.operacao = result[value];
                this.result = true;
              }
            });
          });
        });
    },
    verifFileExiste(str) {
      if (!this.nomeFile) {
        this.operacao = "O nome é inválido";
        this.result = true;
        return;
      }
      var file = {
        path: (str += "/" + this.nomeFile).split("/").slice(1),
      };
      api
        .callEndPoint(apiServices.hosts.documentacao, {
          name: "VerificarFicheiroExiste",
          params: [
            file,
            this.$store.state.usr_token.length > 1
              ? this.$store.state.usr_token
              : "noToken",
          ],
        })
        .then((obj) => {
          //  Resolve a promessa da api.callEndPoints e carrega a token para o vueX
          //  Assim evita criar cookies. Itera pelos valores recebidos, verifica que açõe tomar
          obj.VerificarFicheiroExiste.forEach((result) => {
            console.log("-> ", result);
            //  Itera por todos as keys do objeto
            Object.keys(result).forEach((value) => {
              console.log("result[value] -<>", result[value]);
              console.log("value -<>", value);
              if (value.toString() !== "erro") {
                console.log("Sucesso");
                this.criarFicheiroMeta();
              } else {
                console.log("Erro");
              }
            });
          });
        });
    },
  },
};
</script>

<style scoped>
.wrap {
  display: flex;
  flex-direction: column;
  border-radius: 9px;
  border-left: 12px solid var(--blue);
  background-color: var(--white);
  box-shadow: 6px 6px 6px 0px lightgray;
  min-width: 30vw;
}

.wrap-error {
  border-left: 12px solid tomato;
}
.wrap-good {
  border-left: 12px solid limegreen;
}

h2 {
  padding: 0;
  margin: 0;
}

h3 {
  margin: 0;
  padding: 0;
  margin-bottom: 0.5rem;
}

.padd {
  padding: 0.7rem 1rem;
}

.title {
  font-weight: bold;
  letter-spacing: 1px;
  display: flex;
  flex-direction: row;
  flex-flow: row;
  flex-wrap: wrap;
  place-items: center;
  justify-content: space-between;
  gap: 0.4rem 0.6rem;
}

.title span {
  margin-top: 0.4rem;
  font-size: 0.9rem;
  font-style: italic;
  color: lightgray;
}

.body {
}

.hr {
  background-color: lightgray;
  border-color: lightgray;
  border: 1.5px solid transparent;
  width: 100%;
  border-radius: 2000px;
  margin: 0.5rem 0;
}

.repo {
  color: blueviolet;
}

.buttons {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-content: flex-end;
  place-items: center;
  gap: 0.2rem 1rem;
}

.buttons button {
  border: 0px solid transparent;
  border-radius: 5px;
  font-size: 1rem;
  font-weight: bold;
  font-family: consolas;
  word-spacing: -3px;
  padding: 0.4rem 0rem;
  margin-top: 0.3rem;
  transition: 0.3s all ease-in-out;
}

.buttons button:hover {
  background-color: blueviolet;
  padding: 0.4rem 0.4rem;
  color: white;
}

.opMessage {
  font-family: "Roboto";
  font-size: 1rem;
}
</style>
