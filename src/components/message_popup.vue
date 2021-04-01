<template>
  <div>
    <div class="pop-up">
      <div :class="checkTipo()"></div>
      <div class="info">
        <span> {{ titulo }} </span>
        <p>{{ menssagem }}</p>
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    titulo: String,
    menssagem: String,
    tipo: String,
  },
  methods: {
    checkTipo() {
      if (this.tipo === "good") {
        return "top-bar-green";
      }
      if (this.tipo === "warn") {
        return "top-bar-yellow";
      }
      if (this.tipo === "bad") {
        return "top-bar-red";
      }
    },
  },
};
</script>

<style scoped>
.pop-up {
  -webkit-animation: move-down-appear 1s infinite;
  animation: move-down-appear 1s infinite;
  opacity: 1;
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  place-items: center;
  margin: 4%;
  margin-top: 1rem;
  z-index: 9;
  width: max-content;
  max-width: 450px;
}

.top-bar-green {
  width: 100%;
  height: 0.9rem;
  border-top-left-radius: 9px;
  border-top-right-radius: 9px;
  background-color: #24c820;
}
.top-bar-red {
  width: 100%;
  height: 1rem;
  border-top-left-radius: 9px;
  border-top-right-radius: 9px;
  background-color: #e33e3e;
}
.top-bar-yellow {
  width: 100%;
  height: 1rem;
  border-top-left-radius: 9px;
  border-top-right-radius: 9px;
  background-color: #dbfc14;
}

.info {
  padding: 0.6rem 1rem;
  background-color: #eeeeee;
  border-radius: 0px 0px 8px 8px;
  box-shadow: 6px 6px 6px 0px lightgray;
  display: flex;
  flex-direction: column;
}

.info span {
  font-weight: bold;
  letter-spacing: 1px;
  font-size: 1.4rem;
}

.info p {
  margin-bottom: 0.25rem;
  margin-top: 0.7rem;
  font-size: 1.05rem;
  color: #232323;
}
</style>
