<template>
  <div>
    <div class="repo" @click="toPageCriarRepo('asdasd')">
      <div class="titulo">
        <!-- <img src="../assets/files.svg" alt="" /> -->
        <span class="decor"></span>
        <h4>Criar Um Novo Repositório</h4>
      </div>
    </div>
  </div>
</template>

<script>
import router from "../router/index.js";

export default {
  name: "newRepo",
  methods: {
    toPageCriarRepo(nome) {
      router.push({
        name: "Vizualisar Ficheiro(s)",
        params: { tipo: "Repo", valor: "/repo/" + nome },
      });
    },
  },
};
</script>

<style scoped>
.repo {
  display: flex;
  flex-direction: column;
  place-items: center;
  background-color: var(--white);
  border-radius: 7px;
  border-left: 10px solid lightgray;
  box-shadow: 8px 8px 18px 0px #dfdfdf;
  transition: 0.33s all ease-in-out, 0.2s translateY ease-in-out;
  margin: auto;
  padding: 0.6rem 0.5rem;
}

.repo:hover {
  box-shadow: 8px 8px 18px 0px #d1d1d1;
  transform: translateX(5px);
}

.repo:hover h4 {
  color: darkgrey;
  text-decoration: underline;
  text-decoration-thickness: 2px;
  text-decoration-color: lightgray;
}

.repo:hover .decor {
  border-color: darkgrey;
}

.titulo {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-content: center;
  place-items: center;
  gap: 0.7rem;
  margin-right: 0.5rem;
  width: fit-content;
  transition: 0.2s all ease-in;
}

.titulo:hover {
  color: blueviolet;
  cursor: pointer;
}
.titulo:hover h4 {
  cursor: pointer;
}

.decor {
  border: 2px dashed lightgray;
  width: 0.8rem;
  height: 0.8rem;
  transform: rotateZ(-45deg);
  transition: 0.3s all ease-in-out;
}

h2 {
  padding: 0;
  margin: 0;
  color: gray;
}

.titulo img {
  width: 2rem;
}

h4 {
  margin: 0;
  padding: 0;
  font-family: consolas;
  font-weight: 600;
  color: gainsboro;
  font-style: italic;
  text-decoration: underline;
  text-decoration-thickness: 2px;
  text-decoration-color: transparent;
  transition: 0.4s all ease-in-out;
}
</style>
