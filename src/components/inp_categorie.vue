<template>
  <div class="main-wrap">
    <div class="title">
      <h3>Criar Item</h3>
      <button @click="show = !show">Go!</button>
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
        <button
          class="but-class"
          @click="test()"
          :disabled="!componentes.length"
        >
          Criar Item
        </button>
      </div>

      <div class="valor-pre">
        <span @click="mostrarPreView = !mostrarPreView">Mostrar Preview</span>
        <div v-if="mostrarPreView">
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
        <br />
        Novos Valores: <i v-if="!componentes.length">Empty</i>
      </span>

      <component
        v-for="cmpnt in componentes"
        :key="cmpnt"
        v-bind:is="cmpnt.name"
        :cmpname="cmpnt.name"
        :titulo="key"
        :id="cmpnt.id"
        @conteudo="setComponentValueInArray"
        @delete="apagarInput"
      />
    </div>
  </div>
</template>

<script>
import InpSimples from "./inp_val_simples.vue";
import InpLista from "./inp_val_list.vue";
import InpObjeto from "./inp_val_obj.vue";
import InpReferencia from "./inp_val_othrreg.vue";
export default {
  name: "inpCategorie",
  components: {
    InpSimples,
    InpLista,
    InpObjeto,
    InpReferencia,
  },
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
    test() {
      console.log("aaaaaaaaaaaaaaaaaaaaa");
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
}

.valor-pre {
  display: flex;
  flex-direction: column;
  flex-flow: column;
  justify-content: left;
  padding: 0.5rem 0.4rem;
  max-width: 100%;
}

.valor-pre span {
  user-select: none;
  cursor: pointer;
  border-bottom: 2px solid blueviolet;
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
  background-color: #404040;
  color: #ffffff;
  border-radius: 6px;
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
}
</style>
