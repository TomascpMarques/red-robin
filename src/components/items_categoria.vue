<template>
  <div class="main-wrap">
    <div class="title">
      <div
        @click="showBody = !showBody"
        v-bind:class="[showBody ? 'decor-down' : 'decor-up']"
      ></div>
      <h2 class="blue">{{ categoria }}</h2>
      <span>{{ items.length }} items</span>
    </div>
    <transition
      enter-active-class="animate__animated animate__zoomIn"
      leave-active-class="animate__animated animate__zoomOut"
    >
      <div class="body" v-if="showBody">
        <div v-for="item in items" :key="item">
          <test :titulo="item.body.nome">
            <ul v-for="x in item" :key="x">
              <li>{{ x }}</li>
            </ul>
          </test>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import test from "./content_box.vue";
export default {
  name: "itemsCategoria",
  components: {
    test,
  },
  props: ["categoria", "items"],
  data() {
    return {
      showBody: false,
    };
  },
};
</script>

<style scoped>
.main-wrap {
  display: flex;
  flex-direction: column;
  justify-content: left;
  margin-bottom: 1.5rem;
}

.title {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-content: center;
  place-items: center;
  align-items: center;
  gap: 0.5rem;
  background-color: white;
  border-left: 10px solid var(--blue);
  color: #202020;
  padding: 0.55rem 0.3rem;
  border-radius: 6px;
  box-shadow: 0px 6px 4px 0px gainsboro;
  z-index: 5;
}

.title span {
  margin-top: 0.3rem;
  cursor: default;
  color: lightgray;
  font-weight: bold;
}

.decor-up {
  z-index: 3;
  margin-left: 0.4rem;
  margin-right: 0.3rem;
  width: 0.7rem;
  height: 0.7rem;
  border-top: 3px solid lightgray;
  border-right: 3px solid lightgray;
  border-color: #c3c3c3;
  transform: rotateZ(45deg);
  transition: 0.25s all ease-in-out;
  -webkit-transform-origin: 50% 50%;
}

.decor-down {
  z-index: 3;
  margin-left: 0.4rem;
  margin-right: 0.3rem;
  width: 0.7rem;
  height: 0.7rem;
  border-top: 3px solid lightgray;
  border-right: 3px solid lightgray;
  border-color: #c3c3c3;
  transform: rotateZ(135deg);
  transition: 0.25s all ease-in-out;
  -webkit-transform-origin: 50% 50%;
}

.decor:hover {
  border-color: var(--blue);
  cursor: pointer;
}

h2 {
  padding: 0;
  margin: 0;
  letter-spacing: 0.6px;
  cursor: default;
}

.body {
  padding: 0.2rem 0.1rem;
  display: flex;
  flex-direction: row;
  justify-content: left;
  flex-wrap: wrap;
  gap: 0.1rem;
  margin-left: 6px;
}

.blue {
  color: var(--blue);
  letter-spacing: 0px;
}

.blue::after {
  content: " utilização";
  color: darkgray;
  font-size: 1.1rem;
  letter-spacing: 0.25px;
}
</style>
