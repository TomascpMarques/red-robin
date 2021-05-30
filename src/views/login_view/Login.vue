<template>
  <div class="log">
    <div>
      <transition
        enter-active-class="animate__animated animate__bounceInDown"
        leave-active-class="animate__animated animate__bounceOut"
      >
        <message
          v-if="show"
          :menssagem="log_mss"
          :titulo="log_tit"
          :tipo="log_tip"
        >
          <section @click="show = !show" class="close-but">Fechar</section>
        </message>
      </transition>
    </div>
    <div class="conteudo-wrapper">
      <div class="sidebar">
        <div class="circle-red"></div>
        <div class="circle-yellow"></div>
        <div class="circle-green"></div>
        <h3>Robin</h3>
      </div>
      <div class="login-form">
        <div class="inner-log-form">
          <img class="logo-login" src="../../assets/logo.svg" alt="" />
          <div class="inputs">
            <transition
              mode="in-out"
              enter-active-class="animate__animated animate__fadeInUp"
              leave-active-class="animate__animated animate__fadeOutDown"
            >
              <div v-if="anim">
                <span> Utilizador: </span>
              </div>
            </transition>
            <input
              type="text"
              v-bind:class="[params_errados === true ? 'erro' : 'user']"
              placeholder="Utilizador"
              v-model="user"
              @click="anim = true"
            />
          </div>
          <div class="inputs">
            <transition
              mode="in-out"
              enter-active-class="animate__animated animate__fadeInUp"
              leave-active-class="animate__animated animate__fadeOutDown"
            >
              <div v-if="anim">
                <span> Password: </span>
              </div>
            </transition>
            <input
              type="password"
              v-bind:class="[params_errados === true ? 'erro' : 'paswwd']"
              placeholder="Password"
              v-model="pass"
              @click="anim = true"
            />
          </div>
          <button
            :class="{ login: login, 'login-button': true }"
            @click.prevent="initLogin()"
          >
            Login
          </button>
          <br />
        </div>
      </div>
    </div>
  </div>
</template>

<script src="./viewmain.js"></script>
<style scoped src="./style.css"></style>
