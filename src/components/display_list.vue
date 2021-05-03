<template>
  <div>
    <div class="main-wrapper">
      <h3>{{ titulo }}:</h3>
      <div
        v-for="contribuicoes in list"
        :key="contribuicoes"
        class="list-wrapper"
      >
        <h3>{{ getTituloLista(contribuicoes) }}</h3>
        <div class="displays">
          <span class="icon"></span>
          <ul
            v-for="items in contribuicoes[getTituloLista(contribuicoes)]"
            :key="items"
          >
            {{
              items
            }}
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.main-wrapper {
  padding: 0.3rem 0.3rem;
}

.list-wrapper {
  margin: 0.7rem;
}

h3 {
  margin: 0.2rem 0rem;
  padding: 0;
  color: var(--blue);
  letter-spacing: 1px;
}

.displays {
  display: flex;
  flex-wrap: wrap;
  place-items: center;
}

.icon {
  margin-right: 0.45rem;
  width: 0.15rem;
  height: 1rem;
  border: 2px solid var(--orange);
  background-color: var(--orange);
  border-radius: 2.5px;
}

ul {
  margin: 0;
  margin-right: 0.5rem;
  padding: 0.2rem 0.7rem;
  box-shadow: 4px 4px 6px 0px lightgray;
  border-radius: 5px;
  list-style: none;
  font-weight: bold;
}
</style>

<script>
export default {
  name: "listDisplay",
  props: ["list", "titulo"],
  methods: {
    getTituloLista(obj) {
      return Object.keys(obj).toString();
    },
  },
};
</script>
