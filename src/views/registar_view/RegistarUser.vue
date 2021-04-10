<template>
  <div class="pagina">
    <cntboxside>
      <div class="registar-user">
        <h2>Criar Um Novo Utilizador</h2>
        <div class="user-auth">
          <h3>Dados da Plataforma:</h3>
          <div class="inner">
            <inpCombo
              v-model="usrName"
              :input_tit="'Nome de Utilizador:'"
              :place="'Nome de Utilizador'"
            />
            <inpCombo
              v-model="password"
              :input_tit="'Palavra Passe'"
              :place="'Palavra Passe'"
            />
            <inpCombo
              :input_tit="'Repetir a Palavra Passe'"
              :place="'Repetir a Palavra Passe'"
            />
          </div>
          <div class="user-profile">
            <h3>Dados Pessoais:</h3>
            <div class="inner">
              <inpCombo
                v-model="nome"
                :input_tit="'Nome próprio: '"
                :place="'Nome próprio'"
              />
              <inpCombo
                v-model="email"
                :input_tit="'Email: '"
                :place="'Email'"
              />
              <inpCombo
                v-model="especialidades"
                :input_tit="'Especialidades '"
                :place="'Especialidades'"
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
