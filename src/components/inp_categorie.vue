<template>
  <div class="main-wrap">
    <div class="title">
      <h3>Criar Item</h3>
      <button @click="(show = !show), setupMetaReg(), (mss = '')">
        Maximizar
      </button>
    </div>
    <div class="body" v-if="show">
      <div class="opcoes">
        <select v-model="option">
          <option value="InpSimples">Simples</option>
          <option value="InpLista">Lista</option>
          <option value="InpObjeto">Estrutura</option>
          <option value="InpReferencia">Registo</option>
        </select>
        <input
          type="text"
          placeholder="Valor Propriedade"
          v-model="key"
          @input="mss = ''"
        />
        <button class="but-class" @click="criarComponenteRunTime(option)">
          Novo Valor
        </button>
        <!-- disabled="!componentes.length" -->
        <button class="but-class" @click="apiCriarItem()">Criar Item</button>
        <button class="but-class" @click="(componentes = []), (valores = {})">
          Limpar Conteudo
        </button>
      </div>

      <div class="valor-pre">
        <span @click="mostrarPreView = !mostrarPreView">Mostrar Preview</span>
        <div v-if="mostrarPreView" :value="valores">
          {{ JSON.stringify(valores, null, 4) }}
        </div>
      </div>

      <span class="desc">
        <transition
          enter-active-class="animate__animated animate__zoomIn"
          leave-active-class="animate__animated animate__zoomOut"
        >
          <span class="message" v-if="mss"> {{ mss }}</span>
        </transition>
        <span> Valores do Registo:</span>
        <component
          v-for="componente in componentes"
          :key="componente"
          v-bind:is="componente.name"
          :cmpname="componente.name"
          :titulo="chooseTitle(componente.key)"
          :id="componente.id"
          @conteudo="setComponentValueInArray"
          @delete="apagarInput"
        />
      </span>
    </div>
  </div>
</template>

<script>
import InpSimples from "./inp_val_simples.vue";
import InpLista from "./inp_val_list.vue";
import InpObjeto from "./inp_val_obj.vue";
import InpReferencia from "./inp_val_othrreg.vue";

import route from "../router/index.js";

import * as api from "../api/apiCalls.js";
import * as apiServices from "../api/apiServices.js";

export default {
  name: "inpCategorie",
  components: {
    InpSimples,
    InpLista,
    InpObjeto,
    InpReferencia,
  },
  route: route,
  data() {
    return {
      temp: Object,
      key: "",
      keys: [],
      option: "",
      valores: {},
      componentes: [],
      show: false,
      mss: "",
      mostrarPreView: false,
    };
  },
  methods: {
    chooseTitle(keyParam) {
      return this.key ? this.key : keyParam.toString();
    },
    setupMetaReg() {
      this.key = "";
      this.componentes = [];
      // Add quantidade prefeito para a metadata
      this.componentes.push({
        name: "InpSimples",
        key: "quantidade",
        id: 0,
      });
      this.componentes.push({
        name: "InpSimples",
        key: "tipo",
        id: 1,
      });
      this.componentes.push({
        name: "InpSimples",
        key: "estado",
        id: 2,
      });
      this.componentes.push({
        name: "InpSimples",
        key: "nome",
        id: 3,
      });
    },
    addItemAoSistema(registo) {
      api
        .callEndPoint(apiServices.hosts.equipamento, {
          name: "AdicionarRegisto",
          params: [
            registo.meta,
            registo.body,
            this.$store.state.usr_token.length > 1
              ? this.$store.state.usr_token
              : "noToken",
          ],
        })
        .then((obj) => {
          if (obj.AdicionarRegisto[0].sucesso !== null) {
            this.mss = "Registo Adicionado ";
            setTimeout(() => {
              route.go();
            }, 1500);
          } else {
            this.mss = obj.AdicionarRegisto[0].erro;
          }
        });
    },
    apiCriarItem() {
      var registo = {
        meta: {},
        body: {},
      };
      var keysObg = ["quantidade", "tipo", "estado"];
      Object.keys(this.valores).forEach((x) => {
        var lowerKey = x.toLowerCase();
        if (keysObg.includes(lowerKey)) {
          if (x.toString() === "quantidade") {
            registo.meta[lowerKey] = Number(this.valores[x]);
          } else {
            registo.meta[lowerKey] = this.valores[x];
          }
        } else {
          registo.body[lowerKey] = this.valores[x];
        }
      });
      if (!Object.keys(registo.body).length) {
        this.mss = "O registo não têm conteudo sufeciente";
        return null;
      }
      this.addItemAoSistema(registo);
    },
    criarComponenteRunTime(opt) {
      if (this.keys.includes(this.key)) {
        this.mss = "Essa propriedade já existe";
        return null;
      }
      if (!this.key || !this.option.length) {
        this.mss = "Sem key para a nova propriedade";
        return null;
      }
      this.componentes.push({
        name: opt,
        id: this.componentes.length - 1 + 1,
        key: this.key,
      });
      this.keys.push(this.key);
    },
    setComponentValueInArray(conteudo) {
      this.valores[conteudo.key] = conteudo.cont;
    },
    apagarInput(vals) {
      this.componentes.forEach((x) => {
        if (x.id === vals.id) {
          this.componentes.splice(this.componentes.indexOf(x), 1);
          this.valores[x.key] = null;
          delete this.valores[x.key];
          this.keys.splice(this.keys.indexOf(x.key), 1);
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

.message::first-letter {
  text-transform: capitalize;
}

.exp {
  max-height: min-content;
}

.desc {
  color: var(--blue);
  margin: 0;
  padding: 0;
  font-size: 1rem;
  font-weight: bold;
  margin-top: 1rem;
  margin-left: 0.5rem;
}

input[type="text"] {
  background-color: transparent;
  border: 2px solid gainsboro;
  outline: none;
  box-shadow: none;
  padding: 0.2rem 0.4rem;
  border-radius: 6px;
  font-family: "Roboto";
  font-size: 0.9rem;
  margin-right: 0.5rem;
}

input[type="text"]::placeholder {
  color: darkgray;
  font-size: 0.9rem;
  transition: 0.5s all cubic-bezier(0.165, 0.84, 0.44, 1);
}

input:focus::placeholder {
  transform: translatey(-105%);
}

select {
  background-color: transparent;
  border: 2px solid gainsboro;
  outline: none;
  box-shadow: none;
  padding: 0.15rem 0.3rem;
  border-radius: 6px;
  font-family: "Roboto";
  font-size: 0.9rem;
  margin-right: 0.5rem;
}

.main-wrap {
  margin: 0.6rem 0;
  padding: 0.5rem 0.4rem;
  border: 2px solid gainsboro;
  border-radius: 6px;
  display: flex;
  flex-direction: row;
  align-content: center;
  justify-content: left;
  flex-wrap: wrap;
  gap: 0.5rem;
  width: 97%;
}

h3 {
  margin: 0;
  padding: 0;
  width: fit-content;
}

.title {
  margin-left: 0.2rem;
  display: flex;
  flex-direction: row;
  place-items: center;
  align-content: flex-start;
  gap: 0.7rem;
}

.title button {
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
.title button:hover {
  padding: 0.25rem 1rem;
  background-color: blueviolet;
  color: white;
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
  margin: 0.5rem 0.1rem;
}

.but-class:hover {
  background-color: #9e3bfa;
}

.body {
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  height: min-content;
  width: 100%;
}

.valor-pre {
  display: flex;
  flex-direction: column;
  flex-flow: column;
  justify-content: left;
  padding: 0.5rem 0.4rem;
  max-width: 95%;
}

.valor-pre span {
  user-select: none;
  cursor: pointer;
  border-bottom: 2px solid lightgray;
  padding: 0.3rem 0.5rem;
  transition: 0.2s all ease-in;
  font-family: "Roboto";
}

.valor-pre span:hover {
  color: var(--blue);
}

.valor-pre div {
  margin: 0.3rem;
  /* background-color: rgb(231, 231, 231); */
  /* color: black; */
  background-color: #282c34;
  color: #ffffff;
  border-radius: 4px;
  padding: 0.3rem 0.5rem;
  padding-bottom: 0.5rem;
  font-family: consolas;
  word-spacing: -4px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  place-items: center;
  justify-content: flex-start;
  white-space: pre-wrap;
  transition: 0.3s all ease-in-out;
  max-height: 20vw;
  overflow-y: scroll;
}

.valor-pre div::-webkit-scrollbar {
  width: 7px;
}

/* Track */

.valor-pre div::-webkit-scrollbar-track {
  background-color: #323232;
  margin-right: 4px;
  border-radius: 7px;
}

/* Handle */

.valor-pre div::-webkit-scrollbar-thumb {
  background-color: #656565;

  margin-top: 10px;
}
</style>
