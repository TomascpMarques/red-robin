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
          <br />
          <span @click="show = !show" class="close-but"> Fechar </span>
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
          <br />
        </div>
      </div>
    </div>
  </div>
</template>

<script src="./viewmain.js"></script>
<style src="./style.css"></style>
