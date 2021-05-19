<template>
  <div class="contribuicoes">
    <div class="contribuicoes-titulo">
      <section class="decor"></section>
      <h2 class="titulo">{{ titulo }}</h2>
    </div>
    <div class="contribuicoes-conteudo">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "cntBox",
  props: ["titulo"],
};
</script>

<style scoped>
.prefil {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  place-items: center;
  justify-content: center;
}

.contribuicoes {
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  margin: 1rem;
  margin-bottom: 0;
  height: min-content;
  box-shadow: 8px 8px 5px 0px lightgray;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
}

.contribuicoes-conteudo {
  margin: 0;
  padding: 0.1rem 0.7rem;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
}

.decor {
  margin-left: 0.7rem;
  width: 4.7vh;
  height: 1.6vh;
  background-color: tomato;
  border-radius: 100px;
  box-shadow: var(--circle-inner-shadow);
}
.contribuicoes-titulo {
  display: flex;
  flex-direction: row;
  place-items: center;
  background-color: #1e3045;
  padding: 0.5rem 0;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  width: 100%;
}

.contribuicoes-titulo h2 {
  color: white;
  font-size: 1.5rem;
  margin: 0 0.7rem;
  letter-spacing: 0.8px;
}

.contribuicoes-conteudo {
  background-color: white;
  padding: 0.5rem 0.5rem;
}
</style>
