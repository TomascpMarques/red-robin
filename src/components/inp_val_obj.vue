<template>
  <div>
    <div class="main-wrap">
      <div class="cont">
        <div class="rows">
          <button @click="emmitDel()">apagar</button>
          <span>{{ nome }}</span>
          <div class="decor"></div>
          <div class="inputs">
            <input
              class="number"
              type="text"
              placeholder="Nome do valor"
              v-model="temp"
            />
            <button @click="createInput()">Criar Valor</button>
          </div>
        </div>
        <!-- {{ numeroInps }}
          {{ conteudoInp }} -->
        <span class="title-inp">Valores</span>
        <div class="inp-wrapper">
          <div v-for="n in numeroInps" :key="n">
            <div class="inps">
              <span>Propriedade: {{ n.id }}</span>

              <input
                type="text"
                name="inp"
                :placeholder="'Nome'"
                v-model="tempKey[n.id]"
                @input="createValue(n.id, tempKey[n.id], tempVal[n.id])"
              />
              <input
                type="text"
                name="inp"
                :placeholder="'Valor'"
                v-model="tempVal[n.id]"
                @input="createValue(n.id, tempKey[n.id], tempVal[n.id])"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "inpValObjeto",
  props: ["titulo", "plcholder", "id", "cmpname"],
  data() {
    return {
      nome: this.titulo,
      conteudoInp: {},
      numeroInps: [],
      temp: "",
      tempVal: [],
      tempKey: [],
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
    setUpOBJ(id) {
      this.conteudoInp[id] = {};
    },
    createValue(id, key, value) {
      this.tempVal[id] = value;
      this.tempKey[id] = key;
      this.conteudoInp[id] = {
        [key]: value,
      };
      this.sendValue();
    },
    createInput() {
      this.numeroInps.push({
        id: this.temp,
      });
      this.setUpOBJ(this.temp);
      this.temp = "";
    },
  },
};
</script>

<style scoped>
.inp-wrapper {
  margin: 0.3rem;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}

.title-inp {
  margin-right: 0.5rem;
}

.rows {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: flex-start;
  place-items: center;
  gap: 0.4rem;
}

.inps {
  display: flex;
  flex-direction: column;
  justify-content: left;
  flex-wrap: wrap;
  border-left: 3px solid gainsboro;
  gap: 0.3rem;
  padding: 0.2rem 0.4rem;
  margin-bottom: 0.7rem;
}

.cont {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  place-items: center;
  gap: 0.3rem;
  margin-left: 0.3rem;

  align-items: baseline;
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
  height: fit-content;
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
  padding: 0;
  margin: 0;
  border: 5px solid var(--blue);
  background-color: var(--blue);
  border-radius: 100px;
  margin-right: 0.1rem;
  margin-left: 0.3rem;
}

.cont span {
  font-size: 1rem;
  letter-spacing: 0.6px;
  font-family: "Roboto";
  font-kerning: auto;
  width: fit-content;
  font-weight: bold;
}

.main-wrap input {
  border: none;
  outline: none;
  font-size: 1rem;
  font-family: "Roboto";
  color: #252525;
  transition: 1s all cubic-bezier(0.23, 1, 0.32, 1);
  width: fit-content;
  border-bottom: 2px solid lightgray;
}

input[type="text"] {
  margin: 0.2rem;
}
input[type="text"]:focus {
  border-color: var(--blue);
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
