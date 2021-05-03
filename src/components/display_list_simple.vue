<template>
  <div class="main">
    <h3>{{ titulo }}:</h3>
    <ul v-for="item in lista" :key="item">
      <div class="info">
        <span class="icon"></span>
        <li>{{ item }}</li>
      </div>
    </ul>
  </div>
</template>

<style scoped>
h3 {
  margin: 0.2rem 0rem;
  padding: 0;
  color: var(--blue);
  letter-spacing: 1px;
}

ul {
  margin: 0.2rem;
  padding: 0.15rem 0.3rem;
  list-style: none;
  font-weight: bold;
}

li {
  min-width: 100%;
  border-bottom: 2px solid lightgray;
  padding-bottom: 0.2rem;
}

.main {
  padding: 0.2rem;
  margin: 0.1rem;
  margin-bottom: 0.7rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.info {
  display: flex;
  flex-direction: row;
  place-items: center;
}

.icon {
  margin-right: 0.45rem;
  width: 2rem;
  height: 1rem;
  border: 3px solid var(--orange);
  background-color: var(--orange);
  border-radius: 2.5px;
}
</style>

<script>
export default {
  name: "display_list_simple",
  props: ["titulo", "lista"],
};
</script>
