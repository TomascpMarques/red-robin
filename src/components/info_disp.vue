<template>
  <div class="wrapper">
    <h3>{{ titulo }}</h3>
    <section>
      <span class="icon"></span>
      <p>{{ info }}</p>
    </section>
  </div>
</template>

<style scoped>
h3 {
  margin: 0.2rem 0rem;
  padding: 0;
  color: var(--blue);
  letter-spacing: 1px;
}

section {
  margin: 0rem;
  margin-top: 0.2rem;
  font-weight: 600;
  padding-left: 0.2rem;
  padding-bottom: 0.2rem;
  display: flex;
  flex-direction: row;
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

p {
  margin: 0;
  padding: 0;
  padding-bottom: 0.2rem;
  border-bottom: 2px solid #dbdbdb;
  width: 100%;
}

.wrapper {
  padding: 0.2rem;
  margin: 0.1rem;
  margin-bottom: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
</style>

<script>
export default {
  name: "infoDisp",
  props: ["titulo", "info"],
};
</script>
