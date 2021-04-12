<template>
  <div class="pagina">
    <cntboxside>
      <div class="registar-user">
        <h2>Criar Novo Utilizador</h2>
        <div class="user-auth">
          <h3>Dados da Plataforma:</h3>
          <div class="inner">
            <inpCombo
              v-model="usrName"
              :input_tit="'Nome de Utilizador:'"
              :place="'Nome de Utilizador'"
              :estado="usrErro"
            />
            <inpCombo
              v-model="password"
              :input_tit="'Palavra Passe'"
              :place="'Palavra Passe'"
              :estado="passErro"
              :tipo="'password'"
              :passInp="'Ao mudares a palavra passe ela volta a ficar escondida.'"
            />
            <inpCombo
              @keyup="init()"
              v-model="repPassword"
              :tipo="'password'"
              :input_tit="'Repetir a Palavra Passe'"
              :place="'Repetir a Palavra Passe'"
              :estado="repErro"
              :passInp="'Ao mudares a palavra passe ela volta a ficar escondida.'"
            />
          </div>
          <div class="user-profile">
            <h3>Dados Pessoais:</h3>
            <div class="inner">
              <inpCombo
                v-model="nome"
                :input_tit="'Nome próprio: '"
                :place="'Nome próprio'"
                :estado="nomeErro"
              />
              <inpCombo
                v-model="email"
                :input_tit="'Email: '"
                :place="'Email'"
                :estado="emailErro"
              />
              <inpCombo
                v-model="especialidades"
                :input_tit="'Especialidades '"
                :place="'Especialidades'"
                :estado="especErro"
              />
            </div>
          </div>
        </div>
        <br />
        <div class="submit">
          <button @click.prevent="init()">Registar</button>
        </div>
      </div>
    </cntboxside>
  </div>
</template>

<script src="./viewmain.js"></script>
<style scoped src="./style.css"></style>
