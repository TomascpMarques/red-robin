<template>
  <div class="nav-bar">
    <h2>Robin</h2>
    <ul>
      <li><router-link to="/">Inicío</router-link></li>
      <li><router-link to="/login">Login</router-link></li>
    </ul>
  </div>
  <router-view />
</template>

<script>
import store from "./store/index.js";
export default {
  el: "#app",
  store: store,
};
</script>

<style>
:root {
  --black: #303030;
  --white: #efefef;
  --orange: #e1871e;
  --blue: #3882f2;
  --font-color: hsl(0, 0%, 19%);
  --circle-radius: 2.4vh;
  --circle-inner-shadow: inset 3px 5px 3px #00000046;
  --wrapper-shadow: 0.7rem 1.1rem 12px rgba(0, 0, 0, 0.199);
}

html,
body {
  font-family: "Roboto", sans-serif;
  margin: 0;
  padding: 0;
  background-color: #d4d4d4;
}

#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  place-items: center;
}

.nav-bar {
  width: 100vw;
  margin-top: 0;
  background-color: white;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  flex-wrap: wrap;
  box-shadow: 0px 6px 8px #9797971c;
}

.nav-bar h2 {
  margin: 0px;
  margin-left: 1rem;
  padding: 0px;
  font-family: "Oleo Script", cursive;
  font-weight: 400;
  color: #303030;
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
  border-radius: 7px;
  box-shadow: 0px 0px 8px 4px #c7c7c7bd;
}
</style>
