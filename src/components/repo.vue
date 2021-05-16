<template>
  <div class="repo">
    <div class="titulo">
      <h2>Titulo</h2>
    </div>
  </div>
</template>

<script>
export default {
  name: "repo",
};
</script>

<style scoped>
.repo {
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  justify-content: center;
  gap: 0.5rem;
  background-color: var(--white);
  border-radius: 7px;
  border-top: 10px solid var(--blue);
}

.titulo {
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  padding: 0.6rem 0.5rem;
  margin-top: auto;
}

.titulo img {
  width: 2rem;
}

h2 {
  padding: 0;
  margin: 0;
}
</style>
