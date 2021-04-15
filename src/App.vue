<template>
  <div class="nav-bar">
    <div class="tit">
      <h2>Robin</h2>
      <img src="./assets/logo.svg" alt="" />
    </div>
    <div class="menu">
      <div class="arrow-wrapper">
        <div class="arrow-icon"></div>
        <div class="links-menu">
          <div class="item-menu">
            <span>
              <router-link class="span-link" to="/">Login</router-link>
            </span>
          </div>
          <div class="item-menu" v-if="loggedIn">
            <span>
              <router-link class="span-link" to="/home"> Inicío </router-link>
            </span>
          </div>
          <div class="item-menu" v-if="loggedIn">
            <span>
              <router-link class="span-link" to="/registar">
                Registar
              </router-link>
            </span>
          </div>
        </div>
      </div>
      <div class="wrapper-title">MENU</div>
    </div>
  </div>
  <transition
    mode="in-out"
    enter-active-class="animate__animated animate__backInDown"
    leave-active-class="animate__animated animate__backOutLeft"
  >
    <router-view />
  </transition>
  <!-- <ul>
      <li>
        <router-link v-if="loggedIn" to="/home">Inicío</router-link>
      </li>
      <li>
        <router-link v-if="loggedIn" to="/registar"> Registar </router-link>
      </li>
      <li><router-link to="/">Login</router-link></li>
    </ul> -->
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

<style >
*::-webkit-scrollbar {
  width: 0.75rem;
  transition: 0.3s all ease-in-out;
}

/* Track */

*::-webkit-scrollbar-track {
  background-color: lightgray;
}

/* Handle */

*::-webkit-scrollbar-thumb {
  background-color: var(--orange);
  border-radius: 100px;
  margin-top: 10px;
}

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

.menu {
  display: flex;
  flex-direction: row-reverse;
  justify-content: center;
  place-items: center;
  padding: 1rem;
}

.wrapper-title {
  margin: 0;
  font-family: "Nunito";
  font-weight: 600;
  font-size: 1.3rem;
  letter-spacing: 2px;
  color: var(--font-color);
}

.arrow-wrapper {
  padding: 0.5rem;
  margin-left: 0.4rem;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  place-items: flex-end;
  height: min-content;
}

.arrow-icon {
  width: 0.7rem;
  height: 0.7rem;
  border-left: 3px solid var(--orange);
  border-top: 3px solid var(--orange);
  transform: rotateZ(-45deg);
  transition: 0.18s all ease-in-out;
}

.arrow-wrapper:hover .arrow-icon {
  transform: rotateZ(-135deg);
}

.links-menu {
  opacity: 0;
  position: fixed;
  top: 6%;
  visibility: hidden;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  place-items: center;
  padding: 0.7rem;
  margin: 0.6rem;
  margin-top: 0.7rem;
  margin-right: 0;
  border-radius: 7px;
  background-color: var(--white);
  border: 2px solid lightgray;
  box-shadow: var(--wrapper-shadow);
  transition: 0.3s all ease-in-out;
}

.arrow-wrapper:hover .links-menu {
  opacity: 1;
  visibility: visible;
  position: fixed;
  top: 6%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: right;
  padding: 0.7rem;
  margin-top: 0.7rem;
  border-radius: 7px;
  border-left: none;
  border-bottom: none;
  background-color: #ffff;
  border: 2px solid lightgray;
}

.item-menu {
  display: flex;
  place-items: center;
  justify-content: flex-end;
  flex-direction: row;
  min-width: 11.5vh;
}

.icon-menu {
  width: 0.6rem;
  height: 0.6rem;
  margin-left: 0.6rem;
  border: 2px dashed white;
  transform: rotateZ(-45deg);
}

.item-menu:hover .icon {
  animation: spin 5s linear infinite normal;
}

.links-menu span {
  padding: 0.3rem;
  width: fit-content;
  text-align: right;
  transition: 0.3s border ease-in-out, 0.35s transform ease-in-out;
}

.span-link {
  text-decoration: none;
  font-weight: bold;
  color: var(--orange);
  letter-spacing: 1px;
  font-family: "Nunito";
  font-size: 1.1rem;
  border-bottom: 2px solid transparent;
  transition: 0.2s all ease-in-out;
}

.span-link:hover {
  border-bottom: 2px solid var(--blue);
}
</style>
