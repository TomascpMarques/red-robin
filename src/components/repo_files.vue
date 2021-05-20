<template>
  <div class="main-wrapp" v-if="repo.length > 0">
    <div class="titulo">
      <div class="decor"></div>
      <h2>Ficheiros</h2>
      <h4>Documentos do repo</h4>
    </div>
    <br />
    <div class="body">
      <div v-for="file in repo" :key="file">
        <div class="file">
          <div class="item">
            <div class="nome">
              <span class="ficheiro">{{ file.nome }}</span>
            </div>
            <span class="hr-guide"></span>
            <div class="sub-body">
              <div class="legendas">
                <span class="legenda">Hash</span>
                <span class="fich-autor">{{ file.hash.slice(0, 12) }}</span>
              </div>
            </div>
          </div>
          <div class="inner-body">
            <div class="combo">
              <span class="titl">Localização: </span>
              <span class="valr">{{ file.path.join("/") }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "repoFiles",
  props: ["repo"],
  data() {
    return {};
  },
};
</script>

<style scoped>
.main-wrapp::-webkit-scrollbar {
  width: 0.3rem;
  transition: 0.3s all ease-in-out;
}

/* Track */
.main-wrapp::-webkit-scrollbar-track {
  background-color: lightgray;
}

/* Handle */

.main-wrapp::-webkit-scrollbar-thumb {
  background-color: #bdbdbd;
  margin-top: 10px;
}

h2 {
  margin: 0;
  padding: 0;
}

h4 {
  margin: 0;
  padding: 0;
  margin-top: 0.2rem;
  margin-left: 0.3rem;
  font-size: 0.9rem;
  color: lightgray;
  letter-spacing: 1px;
  border-bottom: 2px solid lightgray;
}

.main-wrapp {
  z-index: 1;
  border-radius: 7px;
  border-left: 10px solid lightgray;
  background-color: var(--white);
  padding: 0.5rem 1rem;
  padding-bottom: 1rem;
  max-height: 40vh;
  overflow: scroll;
  overflow-x: hidden;
}

.titulo {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  place-items: center;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.decor {
  width: 0.9rem;
  height: 0.9rem;
  border: 2px dashed var(--blue);
  transform: rotatez(45deg);
  margin-right: 0.3rem;
  margin-left: 0.2rem;
}

.body {
  display: flex;
  flex-direction: column;
  flex-flow: column;
  flex-shrink: initial;
  flex-wrap: nowrap;
  justify-content: flex-start;
  gap: 1rem;
}

.item {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  place-items: center;
}

.nome {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  place-items: center;
  align-content: flex-start;
  min-width: fit-content;
}

.hr-guide {
  width: 100%;
  border-top: 6px dotted #e0e0e0;
  margin-right: 0.8rem;
  margin-left: 0.8rem;
}

.ficheiro {
  font-weight: bold;
  letter-spacing: 0.6px;
  color: var(--blue);
}

.sub-body {
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  gap: 0.2rem;
  letter-spacing: 0.3px;
  font-style: italic;
  min-width: fit-content;
}

.legendas {
  display: flex;
  flex-direction: row-reverse;
  justify-content: flex-start;
  place-items: center;
  min-width: fit-content;
  gap: 0.3rem;
}

.legenda {
  font-size: 0.8rem;
  letter-spacing: 0.4px;
  color: #b8b8b8;
}

.file {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.inner-body {
  padding: 0.4rem 1rem;
  padding-top: 0.6rem;
}

.combo {
  padding-bottom: 0.35rem;
}

.titl {
  font-weight: bold;
  letter-spacing: 0.8px;
  margin-right: 0.2rem;
}

.fich-autor {
  font-family: consolas;
  letter-spacing: 0.1px;
  font-weight: bold;
  color: gray;
  font-size: 0.9rem;
}
</style>
