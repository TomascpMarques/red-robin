<template>
  <div class="homebody">
    <div class="usr-perfil">
      <div class="top-bar">
        <section class="bolas">
          <div class="circle-green"></div>
          <div class="circle-yellow"></div>
          <div class="circle-red"></div>
        </section>
        <h2 class="titulo">Robin</h2>
      </div>
      <div class="usr-pefil-body">
        <div class="icon">
          <div class="outer">
            <div class="inner">
              <img src="../assets/logo.svg" alt="" />
            </div>
          </div>
        </div>
        <div class="user">
          <span class="nome"> {{ nome }}</span>
          <span class="nome_sis"> {{ user }}</span>
        </div>
        <span class="correio">{{ email }}</span>
        <div class="status">
          <div class="status-top-bar"></div>
          <div class="status-menss">
            <p>{{ status }}</p>
          </div>
        </div>
        <router-link to="/usermod">
          <button class="menss">Modificar</button>
        </router-link>
        <span class="legenda">Alterar e Modificar Dados</span>
      </div>
    </div>
  </div>
</template>

<script>
import store from "../store/index.js";
export default {
  name: "usrCard",
  store: store,
  props: ["user", "nome", "status", "email"],
};
</script>

<style scoped>
.correio {
  margin: 0;
  margin-top: 0.5rem;
  font-size: 0.9rem;
  color: rgb(192, 192, 192);
  font-weight: bold;
}

.usr-perfil {
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  justify-content: space-between;
  place-items: center;
  border-radius: 4px;
  margin: 1rem;
  padding: 1rem;
  padding-top: 0.3rem;
  background-color: #f5f5f5;
  max-width: 380px;
  box-shadow: var(--wrapper-shadow);
}

.top-bar {
  width: 100%;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  align-items: center;
  justify-content: space-between;
}

h2 {
  margin: 0;
  font-size: 2rem;
  letter-spacing: 1px;
  color: #3d3d3d;
  font-weight: 400;
  font-family: "Oleo Script", cursive;
}

.bolas {
  display: flex;
  flex-wrap: nowrap;
  justify-content: space-evenly;
}

.circle-red {
  width: 1.5vh;
  height: 3.5vh;
  box-shadow: var(--circle-inner-shadow);
  border-radius: 500px;
  transform: rotatez(25deg);
  margin: 5px 5px;
  margin-right: 7px;
  background-color: #f33d3d;
}

.circle-yellow {
  width: 1.5vh;
  height: 3.5vh;
  box-shadow: var(--circle-inner-shadow);
  border-radius: 500px;
  transform: rotatez(25deg);
  margin: 5px 5px;
  margin-right: 7px;
  background-color: #dbff00;
}

.circle-green {
  width: 1.5vh;
  height: 3.5vh;
  box-shadow: var(--circle-inner-shadow);
  border-radius: 500px;
  transform: rotatez(25deg);
  margin: 5px 5px;
  margin-right: 7px;
  background-color: #24c820;
}

.usr-pefil-body {
  display: flex;
  flex-direction: column;
  place-items: center;
}

.icon {
  display: flex;
  flex-direction: column;
  margin: 1rem 3.5rem;
  place-items: center;
  justify-content: center;
}

.outer {
  width: 12rem;
  height: 12rem;
  background-color: #e4e4e4;
  border: 8px solid #eeeeee;
  border-radius: 200%;
  box-shadow: 0px 7px 10px 2px lightgray;
}

.inner {
  width: 12rem;
  height: 12rem;
  border-radius: 200%;
  box-shadow: inset 0px 0px 10px 4px #d3d3d3;
  display: flex;
  flex-direction: column;
  place-items: center;
  justify-content: center;
}

.inner img {
  width: 60%;
  transition: 0.5s all ease-in-out;
}

img:hover {
  filter: blur(2px);
  opacity: 0.7;
}

.user {
  display: flex;
  flex-direction: column;
  place-items: center;
  justify-content: center;
  margin: 0.5rem;
  margin-bottom: 1rem;
}

.nome {
  font-size: 1.3em;
  font-weight: 600;
  padding: 0.4rem 1.2rem;
  border-radius: 5px;
  box-shadow: 0px 4px 6px 2px lightgray;
  justify-content: center;
  margin-bottom: 0.5rem;
}

.nome::first-letter {
  font-size: 1.5rem;
}

.nome_sis {
  color: rgb(192, 192, 192);
  font-weight: bold;
  font-size: 1rem;
}

.status {
  display: flex;
  flex-direction: column;
  place-items: center;
  justify-content: center;
  box-shadow: 4px 5px 6px 0px lightgray;
  margin-bottom: 2rem;
  margin-top: 1rem;
  border-bottom-left-radius: 4px;
  border-bottom-right-radius: 4px;
  max-width: 84%;
}

.status-top-bar {
  width: 100%;
  height: 0.4rem;
  background-color: tomato;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
}

.status-menss {
  padding: 0px 15px;
}

.status-menss p {
  font-size: 1.05rem;
  font-weight: 500;
  margin: 0.7rem 0;
  text-align: center;
}

.menss {
  padding: 0.5rem;
  border-radius: 4px;
  font-size: 1.1rem;
  border: 2px solid transparent;
  background-color: #1e6ce1;
  box-shadow: 0px 5px 3px 0px lightgray;
  color: white;
  margin-bottom: 0.2rem;
  transition: 0.3s all ease-in-out;
  outline: blue;
}

.menss:hover {
  transform: translateY(-3px);
  cursor: pointer;
}

.menss:active {
  border: 2px solid blue;
}

.legenda {
  font-size: 0.85rem;
  margin-top: 0.2rem;
  color: rgb(189, 189, 189);
  letter-spacing: 1px;
  font-weight: bold;
}
</style>
