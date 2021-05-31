<template>
  <div class="main-wrap">
    <div class="cont">
      <span>{{ nome }}</span>
      <div class="decor"></div>
      <input
        type="text"
        name="inp"
        :placeholder="plcholder || 'Edit me!'"
        @input="sendValue()"
        v-model="conteudoInp"
      />
    </div>
    <button @click="emmitDel()">apagar</button>
  </div>
</template>

<script>
export default {
  name: "inpValSimples",
  props: ["titulo", "plcholder", "id", "cmpname"],
  data() {
    return {
      nome: this.titulo,
      conteudoInp: "",
    };
  },
  methods: {
    sendValue(event) {
      console.log(this.conteudoInp);
      this.$emit("conteudo", { cont: this.conteudoInp, key: this.nome });
    },
    emmitDel() {
      this.$emit("delete", {
        name: this.cmpname,
        id: this.id,
        key: this.titulo,
      });
    },
  },
};
</script>

<style scoped>
.cont {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  justify-content: flex-start;
  place-items: center;
  gap: 0.3rem;
  margin-left: 0.3rem;
  width: 80%;
  max-height: min-content;
}

button {
  border: none;
  font-family: "Roboto";
  font-size: 0.9rem;
  letter-spacing: 0.5px;
  font-weight: bold;
  color: gainsboro;
  transition: 0.3s all ease-in-out;
}

button:hover {
  cursor: pointer;
  color: gray;
}

.main-wrap {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-content: flex-start;
  place-items: center;
  gap: 0.3rem;
  padding: 0.15rem 0rem;
  border: none;
  border-bottom: 2px solid gainsboro;
  margin: 0.1rem;
  box-shadow: 6px 6px 6px 0px gainsboro;
  padding: 0.5rem;
  border-radius: 7px;
  max-height: min-content;
}

.decor {
  width: 0.5rem;
  height: 0.5rem;
  padding: 0;
  margin: 0;
  border: none;
  border-top: 2px solid var(--blue);
  border-right: 2px solid var(--blue);
  transform: rotateZ(45deg);
  margin-right: 0.1rem;
}

.main-wrap span {
  font-size: 1rem;
  letter-spacing: 0.6px;
  font-family: "Roboto";
  font-kerning: auto;
  width: fit-content;
  font-weight: bold;
}

.main-wrap input {
  padding: 0.13rem 0.2rem;
  border: none;
  outline: none;
  font-size: 1rem;
  font-family: "Roboto";
  color: #252525;
  width: 100%;
  transition: 1s all cubic-bezier(0.23, 1, 0.32, 1);
}

input:focus::placeholder {
  transform: translatey(-105%);
}

input::placeholder {
  font-family: "Roboto";
  color: gray;
  letter-spacing: 1px;
  transition: 1s all cubic-bezier(0.23, 1, 0.32, 1);
}
</style>
