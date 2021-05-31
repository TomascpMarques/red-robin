<template>
  <div class="main-wrap">
    <div class="title">
      <h3>Novo Valor</h3>
      <button @click="show = !show">Show!</button>
    </div>
    <div class="body" v-if="show">
      <div class="opcoes">
        <select v-model="option">
          <option value="InpSimples">Simples</option>
        </select>
        <input type="text" placeholder="Valor Propriedade" v-model="key" />
        <button class="but-class" @click="criarComponenteRunTime(option)">
          Criar Opção
        </button>
        <button class="but-class">Criar Item</button>
      </div>
      {{ valores }}
      <span class="desc">
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
export default {
  name: "inpCategorie",
  components: {
    InpSimples,
  },
  data() {
    return {
      temp: Object,
      key: "",
      option: "",
      valores: {},
      componentes: [],
      show: false,
    };
  },
  methods: {
    criarComponenteRunTime(opt) {
      if (!this.key || !this.option.length) {
        console.log("sem key para o novo elemento");
        return null;
      }
      this.componentes.push({
        name: opt,
        id: this.componentes.length - 1 + 1,
        key: this.key,
      });
    },
    setComponentValueInArray(conteudo) {
      console.log("->", conteudo);
      this.valores[conteudo.key] = conteudo.cont;
    },
    apagarInput(vals) {
      console.log(vals);
      console.log(this.componentes);
      this.componentes.forEach((x) => {
        if (x.id === vals.id) {
          console.log("<<", this.valores);
          this.componentes.splice(this.componentes.indexOf(x), 1);
          console.log("<<>>", vals.key, x);
          this.valores[x.key] = null;
          delete this.valores[x.key];
          console.log("<<", this.valores);
        }
      });
    },
  },
};
</script>

<style scoped>
.exp {
  max-height: min-content;
}

.desc {
  color: lightgray;
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
  transition: 0.3s all cubic-bezier(0.215, 0.61, 0.355, 1);
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
}
</style>
