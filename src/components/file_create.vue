<template>
  <div class="wrap">
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
          :place="'Localização do Ficheiro'"
          :tipo="'text'"
          v-model="localFicheiro"
        />
        {{ nomeFile }}
        <div class="buttons">
          <button @click="$emit('update:modelValue', false)">Cancelar</button>
          <button>Criar Ficheiro</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import inpCombo from "../components/input_combo.vue";

export default {
  name: "fileCreate",
  components: {
    inpCombo,
  },
  props: ["repoNome", "path", "modelValue"],
  data() {
    return {
      nomeFile: "",
      localFicheiro: this.path,
    };
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
  gap: 0.2rem 0.5rem;
}

.buttons button {
  border: 0px solid transparent;
  border-radius: 5px;
  font-size: 1rem;
  font-weight: bold;
  font-family: consolas;
  word-spacing: -3px;
  padding: 0.4rem 0rem;
  transition: 0.3s all ease-in-out;
}

.buttons button:hover {
  background-color: blueviolet;
  padding: 0.4rem 0.4rem;
  color: white;
}
</style>
