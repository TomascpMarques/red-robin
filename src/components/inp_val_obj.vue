<template>
  <div>
    <div class="main-wrap1">
      <div class="cont">
        <div class="rows">
          <button @click="emmitDel()">apagar</button>
          <span>{{ nome }}</span>
          <div class="decor"></div>
          <div class="inputs">
            <input
              type="text"
              :placeholder="plcholder || 'Nome, Nº propriedade'"
              v-model="temp"
            />
          </div>
          <button @click="createInput()">Criar Valor</button>
          <button @click="apagarUltimo()">Apagar Ultimo</button>
        </div>
        <span class="title-inp">Valores:</span>
        {{ conteudoInp }}
        <div class="inp-wrapper">
          <div v-for="x in tempProps" :key="x">
            <span class="propriedade">Propriedade: {{ x.nome }}</span>
            <div v-for="(y, j) in x.num" :key="y">
              <div class="inps">
                <input
                  type="text"
                  name="inp"
                  :placeholder="'Nome'"
                  v-model="tempK[j]"
                />
                <input
                  type="text"
                  name="inp"
                  :placeholder="'Valor'"
                  v-model="tempV[j]"
                  @input="createValue(x.nome, tempK[j], tempV[j])"
                />
                <span
                  class="apagar-prop"
                  @click="apagarProp(x.nome, tempK[j], j, x.id)"
                  v-if="tempK[j]"
                >
                  Apagar
                </span>
              </div>
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
      tempK: [],
      tempV: [],
      nome: this.titulo,
      conteudoInp: {},
      numeroInps: [],
      temp: "",
      tempProps: [],
    };
  },
  methods: {
    sendValue(event) {
      console.log(this.conteudoInp);
      this.$emit("conteudo", { cont: this.conteudoInp, key: this.nome });
    },
    emmitDel() {
      this.tempProps = [];
      this.conteudoInp = {};
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
      this.conteudoInp[id][key] = value;
      this.sendValue();
    },
    createInput() {
      if (this.temp.split(",").length < 2) {
        return null;
      }
      this.tempK.push([]);
      this.tempV.push([]);
      this.numeroInps.push({
        id: this.temp.split(",")[0].trim(),
      });
      this.tempProps.push({
        id: this.tempProps.length,
        nome: this.temp.split(",")[0].trim(),
        num: Array(Number(this.temp.split(",")[1].trim())),
      });
      this.setUpOBJ(this.tempProps[this.tempProps.length - 1].nome);
      this.temp = "";
    },
    apagarProp(id, key, inpKeys, inNum) {
      this.$emit("dropProp", {
        cont: this.conteudoInp[id][key],
        key: key,
      });
      this.conteudoInp[id][key] = null;
      delete this.conteudoInp[id][key];
      this.tempProps[inNum].num.splice(inpKeys, 1);
    },
    apagarUltimo() {
      this.numeroInps.pop();
      delete this.conteudoInp[
        Object.keys(this.conteudoInp)[Object.keys(this.conteudoInp).length - 1]
      ];
      this.tempProps.pop();
    },
  },
};
</script>

<style scoped>
.inp-wrapper {
  margin: 0.2rem;
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
  border-left: 3px dashed gainsboro;
  gap: 0.3rem;
  padding: 0.2rem 0.4rem;
  margin-bottom: 0.7rem;
  margin-top: 0.5rem;
}

.cont {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  place-items: center;
  gap: 0.3rem;
  margin-left: 0.3rem;
  flex-wrap: wrap;
  word-wrap: break-word;
  word-break: break-all;
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
  margin-right: 0.3rem;
  height: fit-content;
}

button:hover {
  cursor: pointer;
  color: blueviolet;
}

.main-wrap1 {
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
  width: fit-content;
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

.propriedade {
  color: var(--blue);
  margin: 0.3rem 0;
}

.main-wrap1 input {
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

.apagar-prop {
  font-style: italic;
  color: tomato;
  margin: auto;
  cursor: pointer;
  transition: 0.16s all ease-out;
}

.apagar-prop:hover {
  color: salmon;
}
</style>
