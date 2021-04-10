<template>
  <div class="nav-bar">
    <div class="tit">
      <h2>Robin</h2>
      <img src="./assets/logo.svg" alt="" />
    </div>
    <ul>
      <li>
        <router-link v-if="loggedIn" to="/home">Inicío</router-link>
      </li>
      <li>
        <router-link v-if="loggedIn" to="/registar"> Registar </router-link>
      </li>
      <li><router-link to="/">Login</router-link></li>
    </ul>
  </div>
  <transition
    mode="in-out"
    enter-active-class="animate__animated animate__backInDown"
    leave-active-class="animate__animated animate__backOutLeft"
  >
    <router-view />
  </transition>
</template>

<script>
import store from "./store/index.js";
export default {
  el: "#app",
  store: store,
  data() {
    return {
      logado: false,
    };
  },
  computed: {
    loggedIn() {
      return store.state.usr_token.length;
    },
  },
  watch: {
    // A func LoggedIn computed busca o tamanho da usr_token
    // E no grupo watch, ele escuta por mudanças dessa func,
    // e muda o estado dos links apartir dessa mudança
    loggedIn(newLen, oldLen) {
      this.logado = newLen > 0;
    },
  },
};
</script>

<style>
:root {
  --black: #303030;
  --drk-blue: #1e3045;
  --white: #efefef;
  --orange: #e1871e;
  --blue: #3882f2;
  --font-color: hsl(0, 0%, 19%);
  --circle-radius: 2.4vh;
  --circle-inner-shadow: inset 3px 5px 3px #00000046;
  --wrapper-shadow: 6px 6px 6px 0px lightgray;
}

body {
  font-family: "Roboto", sans-serif;
  margin: 0;
  padding: 0;
  background-color: #e4e4e4;
  scroll-behavior: smooth;
}

#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  place-items: center;
}

.tit {
  display: flex;
  flex-wrap: nowrap;
  flex-direction: row-reverse;
  margin-left: 1rem;
}

.tit img {
  width: 7vh;
}

.nav-bar {
  width: 100%;
  margin-top: 0;
  background-color: white;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  flex-wrap: wrap;
  box-shadow: 0px 6px 8px #9797971c;
  z-index: 10;
}

.nav-bar h2 {
  margin: 0px;
  margin-left: 1rem;
  padding: 0px;
  font-family: "Oleo Script", cursive;
  font-weight: 400;
  color: #252525;
  font-size: 3.3rem;
  text-shadow: 2px 2px 0px #d8d8d8;
}

.nav-bar ul {
  list-style: none;
  color: #383838;
  display: flex;
  place-items: center;
  padding-left: 0;
  margin-left: 1rem;
}

.nav-bar a {
  z-index: 0;
  font-size: 1.1rem;
  text-decoration: none;
  color: var(--blue);
  font-weight: 600;
  padding: 10px;
  padding-top: 0.7rem;
  padding-bottom: 0.7rem;
  margin-right: 1rem;
  transition: 0.4s all ease-in-out;
}

.nav-bar a:hover {
  border-radius: 5px;
  box-shadow: 0px 0px 8px 4px #c7c7c7bd;
}
</style>
