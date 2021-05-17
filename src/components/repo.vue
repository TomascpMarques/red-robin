<template>
  <div class="repo">
    <div class="titulo">
      <!-- <img src="../assets/files.svg" alt="" /> -->
      <h2>{{ titulo }}</h2>
      <h4>Repo Nome</h4>
    </div>
    <div class="descr">
      <div class="grid-container">
        <div class="Criacao nv">
          Criação
          <div class="hr-guide"></div>
        </div>
        <div class="Tema nv">
          Tema
          <div class="hr-guide"></div>
        </div>
        <div class="Autor nv">
          Autor
          <div class="hr-guide"></div>
        </div>
        <div class="Contribuidores nv">
          Contribuidores
          <div class="hr-guide"></div>
        </div>
        <div class="cri-val">{{ criacao }}</div>
        <div class="tem-val">{{ tema }}</div>
        <div class="aut-val">{{ autor }}</div>
        <div class="cnt-val">{{ contrib }}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "repo",
  props: ["criacao", "contrib", "autor", "tema", "titulo"],
};
</script>

<style scoped>
.repo {
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  justify-content: center;
  background-color: var(--white);
  border-radius: 7px;
  border-top: 10px solid var(--blue);
  padding-bottom: 1rem;
  box-shadow: 8px 8px 18px 0px #dfdfdf;
  transition: 0.33s all ease-in-out, 0.2s translateY ease-in-out;
}

.repo:hover {
  border-top: 10px solid var(--orange);
  box-shadow: 8px 8px 18px 0px #d1d1d1;
  transform: translateY(3px);
}

.repo:hover h4 {
  text-decoration: underline;
  text-decoration-thickness: 2px;
  text-decoration-color: lightgray;
}

.titulo {
  display: flex;
  flex-direction: row;
  justify-content: left;
  padding: 0.6rem 0.6rem;
  margin-top: auto;
  gap: 0.7rem;
  margin-right: 0.5rem;
}

h2 {
  padding: 0;
  margin: 0;
}

.titulo img {
  width: 2rem;
}

h4 {
  margin: 0;
  margin-top: 0.5rem;
  padding: 0;
  font-family: consolas;
  font-weight: 600;
  color: lightgray;
  font-style: italic;
  text-decoration: underline;
  text-decoration-thickness: 2px;
  text-decoration-color: transparent;
  transition: 0.3s all ease-in-out;
}

.descr {
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
  border-left: 2px solid tomato;
  padding: 0.1rem 0.7rem;
  padding-top: 0.8rem;
  padding-bottom: 0.15rem;
  margin-left: 1rem;
  width: fit-content;
}

.grid-container {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: 1fr 1fr 1fr 1fr;
  gap: 0.4rem 1rem;
  grid-template-areas:
    "Autor aut-val"
    "Tema tem-val"
    "Criacao cri-val"
    "Contribuidores cnt-val";
}
.Criacao {
  grid-area: Criacao;
}
.Tema {
  grid-area: Tema;
}
.Autor {
  grid-area: Autor;
}
.Contribuidores {
  grid-area: Contribuidores;
}
.cri-val {
  grid-area: cri-val;
}
.tem-val {
  grid-area: tem-val;
}
.aut-val {
  grid-area: aut-val;
}
.cnt-val {
  grid-area: cnt-val;
}

.nv {
  text-align: left;
  font-weight: bold;
  letter-spacing: 1px;
  font-size: 1.05rem;
  display: flex;
  flex-direction: row;
  place-items: center;
  gap: 0.35rem;
  width: 105%;
}

.hr-guide {
  width: 100%;
  border-top: 5px dotted #e0e0e0;
}
</style>
