<template>
  <div class="main-wrap">
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
</template>

<script>
export default {
  name: "inpValSimples",
  props: ["titulo", "plcholder"],
  data() {
    return {
      nome: this.titulo,
      conteudoInp: "",
    };
  },
  methods: {
    sendValue(event) {
      console.log(this.conteudoInp);
      this.$emit("conteudo", { cont: this.conteudoInp, key: this.titulo });
    },
  },
};
</script>

<style scoped>
.main-wrap {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
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
  max-width: fit-content;
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
  width: 60%;
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
