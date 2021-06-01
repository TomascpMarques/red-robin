<template>
  <div class="page-wrap1">
    <div class="page-tit">
      <h3>Apagar Registo</h3>
      <button @click="(show = !show), (mss = '')">Go!</button>
      <span class="message" v-if="mss"> Mensagem: {{ mss }}</span>
    </div>
    <div class="page-body" v-if="show">
      <InpSimples
        :titulo="'ID'"
        :plcholder="'ID do registo'"
        @conteudo="setupID"
      />
      <InpSimples
        :titulo="'Coleção'"
        :plcholder="'Coleção do registo'"
        @conteudo="setupColecao"
      />
      <button @click="delRecord()" class="but-class">Apagar</button>
    </div>
  </div>
</template>

<script>
import * as api from "../api/apiCalls.js";
import * as apiServices from "../api/apiServices.js";

import route from "../router/index.js";

import InpSimples from "./inp_val_simples.vue";
export default {
  name: "delRegistoEquip",
  components: {
    InpSimples,
  },
  route: route,
  data() {
    return {
      show: false,
      mss: "",
      conteudo: {
        key: "",
        colecao: "",
      },
    };
  },
  methods: {
    setupID(obj) {
      this.conteudo.key = obj.cont;
    },
    setupColecao(obj) {
      this.conteudo.colecao = obj.cont.toUpperCase();
      console.log(this.conteudo);
    },
    delRecord(obj) {
      api
        .callEndPoint(apiServices.hosts.equipamento, {
          name: "ApagarRegistoDeItem",
          params: [
            this.conteudo.colecao,
            this.conteudo.key,
            this.$store.state.usr_token.length > 1
              ? this.$store.state.usr_token
              : "noToken",
          ],
        })
        .then((obj) => {
          console.log(obj.ApagarRegistoDeItem[0]);
          if (obj.ApagarRegistoDeItem[0].registo_apagado !== null) {
            if (obj.ApagarRegistoDeItem[0].registo_apagado.DeletedCount < 1) {
              this.mss = "Nenhum registo foi apagado";
              return null;
            }
            this.mss = "Registo Apagado ";
            setTimeout(() => {
              route.go();
            }, 1500);
          } else {
            this.mss = obj.ApagarRegistoDeItem[0];
          }
        });
    },
  },
};
</script>

<style scoped>
.message {
  color: var(--orange);
  letter-spacing: 0.1px;
  word-spacing: -3px;
  font-family: consolas;
}

.but-class {
  font-family: "Roboto";
  border: none;
  font-size: 0.9rem;
  font-weight: bold;
  padding: 0.25rem 0.4rem;
  background-color: #8a2be2;
  border-radius: 3px;
  color: white;
  letter-spacing: 1px;
  transition: 0.3s all cubic-bezier(0.215, 0.61, 0.355, 1);
  margin: 0.5rem 0.5rem;
}

.but-class:hover {
  background-color: #9e3bfa;
}

.page-wrap1 {
  padding: 0.3rem 0.4rem;
  border: 2px solid gainsboro;
  border-radius: 6px;
  display: flex;
  flex-direction: column;
  align-content: left;
  justify-content: left;
  flex-wrap: wrap;
  margin-bottom: 0.6rem;
  gap: 0.5rem;
}

h3 {
  margin: 0;
  padding: 0;
  width: fit-content;
  border: none;
}

.page-tit button {
  padding: 0.25rem 0.5rem;
  font-family: "Roboto";
  border: none;
  font-size: 0.9rem;
  font-weight: bold;
  letter-spacing: 2px;
  background-color: #e0e0e0;
  border-radius: 4px;
  transition: 0.8s all cubic-bezier(0.165, 0.84, 0.44, 1);
}

.page-tit button:hover {
  padding: 0.25rem 1rem;
  background-color: blueviolet;
  color: white;
}

.page-tit {
  display: flex;
  flex-direction: row;
  place-items: center;
  justify-content: flex-start;
  gap: 0.7rem;
  padding: 0.2rem 0.2rem;
}

.page-body {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: flex-start;
  padding: 0.2rem 0;
}
</style>
