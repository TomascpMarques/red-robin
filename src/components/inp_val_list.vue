<template>
  <div>
    <div class="main-wrap">
      <div class="cont">
        <button @click="emmitDel()">apagar</button>
        <span>{{ nome }}</span>
        <div class="decor"></div>
        <textarea
          type="text"
          name="inp"
          :placeholder="plcholder || 'Separa com ;'"
          @input="sendValue()"
          v-model="conteudoInp"
          resizable="false"
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "inpValLista",
  props: ["titulo", "plcholder", "id", "cmpname"],
  data() {
    return {
      nome: this.titulo,
      conteudoInp: "",
    };
  },
  methods: {
    sendValue(event) {
      this.conteudoInp = this.conteudoInp.split(";");
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
  max-height: -webkit-min-content;
  max-height: -moz-min-content;
  max-height: min-content;
  align-items: baseline;
  width: 100%;
}

button {
  border: none;
  font-family: "Roboto";
  font-size: 0.9rem;
  letter-spacing: 0.5px;
  font-weight: bold;
  color: lightgray;
  transition: 0.3s all ease-in-out;
  padding: 0;
  margin: 0;
  margin-right: 0.5rem;
  height: fit-content;
  padding: 0.1rem;
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
  border: 2px solid gainsboro;
  margin: 0.1rem;
  box-shadow: 6px 6px 6px 0px gainsboro;
  border-radius: 7px;
  padding: 0.7rem 0.3rem;
}

.decor {
  width: 0.5rem;
  height: 0.5rem;
  padding: 0;
  margin: 0;
  border: none;
  border-top: 2px solid var(--orange);
  border-right: 2px solid var(--orange);
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

.main-wrap textarea {
  resize: none;
  padding: 0.13rem 0.2rem;
  border: none;
  outline: none;
  font-size: 0.9rem;
  font-family: "Roboto";
  color: #252525;
  width: 70%;
  height: 100px;
  transition: 1s all cubic-bezier(0.23, 1, 0.32, 1);
  border: 2px solid gainsboro;
  border-radius: 3px;
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
