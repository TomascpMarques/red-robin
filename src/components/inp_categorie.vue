<template>
  <div class="main-wrap">
    <span>Novo Valor</span>
    {{ valores }}
    <div class="opcoes">
      <select v-model="option">
        <option value="InpSimples">Simples</option>
      </select>
      <input type="text" placeholder="Valor Propriedade" v-model="key" />
      <button @click="criarComponenteRunTime(option)">Criar Opção</button>
    </div>
    <div class="exp" v-for="cmpnt in componentes" :key="cmpnt">
      <component
        v-bind:is="cmpnt.name"
        :titulo="key"
        @conteudo="setComponentValueInArray"
      ></component>
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
    };
  },
  methods: {
    criarComponenteRunTime(opt) {
      this.componentes.push({
        name: opt,
        id: this.componentes.length + 1,
      });
    },
    setComponentValueInArray(conteudo) {
      console.log("->", conteudo);
      this.valores[conteudo.key] = conteudo.cont;
    },
  },
};
</script>

<style scoped>
</style>
