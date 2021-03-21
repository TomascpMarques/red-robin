<template>
  <div class="log">
    <div class="conteudo-wrapper">
      <div class="sidebar">
        <div class="circle-red"></div>
        <div class="circle-yellow"></div>
        <div class="circle-green"></div>
        <h3>Robin</h3>
      </div>
      <div class="login-form">
        <div class="inner-log-form">
          <input
            type="text"
            v-bind:class="[params_errados === true ? 'erro' : 'user']"
            placeholder="Utilizador"
            v-model="user"
          />
          <input
            type="password"
            v-bind:class="[params_errados === true ? 'erro' : 'paswwd']"
            placeholder="Password"
            v-model="pass"
          />
          <button
            :class="{ login: login, 'login-button': true }"
            @click.prevent="initLogin()"
          >
            Login
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

/**
  Função - Ao carregar no butão, verificar o nome de utilizador e pass
           se dé certo, corre a animção de focus, e de seguida faz o request.
           Se isso tudo der certo, guarda a token nas cookies e dá redirect ao perfil do usuário.
           Se não der certo correr animação de falha-login e pedir credeênciais de novo.
*/

<script>
import * as helpers from "../helpers/funcs.js";
export default {
  data() {
    return {
      user: "",
      pass: "",
      md5_pass: "",
      login: false,
      params_errados: false,
    };
  },
  watch: {
    user: {
      immediate: true,
      handler() {
        this.verificarParaLimpar(this.user);
      },
    },
    pass: {
      immediate: true,
      handler() {
        this.verificarParaLimpar(this.pass);
      },
    },
  },
  methods: {
    verificarParaLimpar(valor) {
      if (valor.length !== 0) {
        this.params_errados = false;
      }
    },
    // Se o utilizador e a palavra-passe forem nulas não deixa executar o pedido de login
    validarInput(usr, psswd) {
      if (usr.length > 1 && psswd.length > 1) {
        this.params_errados = false;
        this.login = true;
        return true;
      }
      this.login = false;
      this.params_errados = true;
      return false;
    },
    initLogin() {
      if (this.validarInput(this.user, this.pass)) {
        this.md5_pass = helpers.toMD5(this.pass);
      }
    },
  },
};
</script>

<style scoped>
.erro {
  width: 93%;
  padding: 10px;
  padding-left: 15px;
  margin-bottom: 10%;
  border-radius: 3px;
  font-size: 1.1rem;
  font-weight: 600;
  border: 2px solid transparent;
  font-weight: 300;
  letter-spacing: 1px;
  outline: none;
  border-color: rgb(243, 77, 77);
  background-color: white;
  border-radius: 4px;
  color: var(--black);
  box-shadow: inset 4px 4px 8px 0px rgba(121, 95, 95, 0.301);
  text-shadow: 1px 1px 2px #9e9e9ebb;
  letter-spacing: 1px;
  font-weight: 300;
}

.log {
  display: grid;
  height: 90vh;
  place-items: center;
}

h3 {
  font-weight: 300;
  letter-spacing: 2px;
  writing-mode: vertical-lr;
  font-size: 2rem;
  margin: 0;
  padding: 3px;
  transform: rotateZ(180deg);
}

.conteudo-wrapper {
  display: grid;
  grid-template-columns: auto auto auto;
  box-shadow: var(--wrapper-shadow);
}

.sidebar {
  font-family: "Oleo Script", cursive;
  background-color: var(--black);
  color: var(--white);
  display: flex;
  flex-direction: column;
  place-items: center;
  padding: 6px;
  padding-top: 23px;
  border-top-left-radius: 7px;
  border-bottom-left-radius: 7px;
}

.circle-red {
  width: var(--circle-radius);
  height: var(--circle-radius);
  box-shadow: var(--circle-inner-shadow);
  background-color: #f33d3d;
  border-radius: 500px;
  margin-bottom: 10px;
}

.circle-yellow {
  width: var(--circle-radius);
  height: var(--circle-radius);
  box-shadow: var(--circle-inner-shadow);
  background-color: #dbff00;
  border-radius: 500px;
  margin-bottom: 10px;
}

.circle-green {
  width: var(--circle-radius);
  height: var(--circle-radius);
  box-shadow: var(--circle-inner-shadow);
  background-color: #24c820;
  border-radius: 500px;
  margin-bottom: 15px;
}

.login-form {
  font-family: "Roboto", sans-serif;
  display: flex;
  flex-direction: column;
  background-color: var(--white);
  padding: 1.5rem;
  padding-bottom: 7%;
}

.inner-log-form {
  display: flex;
  flex-direction: column;
  place-items: center;
  width: 60vw;
  min-width: 180px;
  max-width: 360px;
  margin-top: 1rem;
}

.logo {
  display: flex;
  flex-direction: column;
  margin-left: 10%;
  width: 60%;
}

.user {
  width: 93%;
  padding: 10px;
  padding-left: 15px;
  margin-bottom: 10%;
  outline: none;
  border: none;
  border-radius: 2rem;
  background-color: #dddddd;
  font-size: 1.1rem;
  font-weight: 600;
  border: 2px solid transparent;
  box-shadow: inset 3px 4px 8px 0px #c7c7c7;
  font-weight: 300;
  letter-spacing: 1px;
}

input {
  transition: 0.4s all ease-in-out, 0.4s border-color ease-in-out;
}

input:hover {
  border-color: #1e79e14b;
}

input:not(:placeholder-shown) {
  color: var(--black);
}

input[type="text"]:focus {
  outline: none;
  border-color: var(--blue);
  background-color: white;
  border-radius: 4px;
  color: var(--black);
  box-shadow: inset 4px 4px 8px 0px rgba(121, 95, 95, 0.301);
  text-shadow: 1px 1px 2px #9e9e9ebb;
  letter-spacing: 1px;
  font-weight: 300;
}

input[type="password"]:focus {
  outline: none;
  border-color: var(--blue);
  background-color: white;
  border-radius: 4px;
  color: var(--black);
  box-shadow: inset 4px 4px 8px 0px #795f5f4d;
  text-shadow: 2px 2px 3px #969696;
  font-weight: 300;
  letter-spacing: 2px;
}

input:focus::placeholder {
  transition: 0.85s all ease, 0.7s opacity ease-in;
  transform: translatex(100px);
  opacity: 0;
}

.paswwd {
  width: 93%;
  padding: 10px;
  padding-left: 15px;
  margin-bottom: 5%;
  outline: none;
  border: none;
  border-radius: 50px;
  background-color: #dddddd;
  font-size: 1.1rem;
  font-weight: 600;
  border: 2px solid transparent;
  box-shadow: inset 3px 4px 8px 0px #c7c7c7;
  font-weight: 300;
  letter-spacing: 1px;
}

.login-button {
  outline: none;
  font-family: "Roboto", sans-serif;
  color: rgb(56, 56, 56);
  font-weight: 600;
  font-size: 1.4rem;
  letter-spacing: 1px;
  text-rendering: optimizeLegibility;
  border: 2px solid transparent;
  border-radius: 50px;
  margin-top: 1rem;
  padding: 1.7rem;
  padding-bottom: 5px;
  padding-top: 5px;
  background-color: #dddddd;
  transition: 0.3s all ease-in-out, 0.5s color ease-in-out,
    0.6s border-radius ease-in-out;
  box-shadow: 4px 6px 7px 1px #c7c7c7;
}

.login {
  outline: none;
  border-radius: 5px;
  background-color: var(--blue);
  color: white;
  border-color: var(--blue);
}

.login-button:hover {
  border-color: var(--blue);
  cursor: pointer;
  transform: scale(1.05);
}

.move {
  z-index: -1;
  animation: send-it 1.7s cubic-bezier(0.51, -0.38, 0.49, 0.87) 0.3s 1 forwards;
}

@keyframes send-it {
  to {
    transform: translatey(-100vh);
  }
}
</style>
