<template>
  <div class="pagina">
    <div>
      <transition
        enter-active-class="animate__animated animate__bounceInDown"
        leave-active-class="animate__animated animate__bounceOut"
      >
        <popup
          v-if="showUserAcc"
          :menssagem="log_mssUserAcc"
          :titulo="log_titUserAcc"
          :tipo="log_tipUserAcc"
        >
          <div @click="showUserAcc = !showUserAcc" class="close-but">
            Fechar
          </div>
        </popup>
      </transition>
    </div>
    <div>
      <transition
        enter-active-class="animate__animated animate__bounceInDown"
        leave-active-class="animate__animated animate__bounceOut"
      >
        <popup
          v-if="showUserInfo"
          :menssagem="log_mssUserInf"
          :titulo="log_titUserInf"
          :tipo="log_tipUserInf"
        >
          <div @click="showUserInfo = !showUserInfo" class="close-but">
            Fechar
          </div>
        </popup>
      </transition>
    </div>
    <cntboxside :titulo="'Robin'">
      <div class="registar-user">
        <h2>Novo Utilizador</h2>
        <div class="user-auth">
          <h3>Dados da Plataforma:</h3>
          <div class="inner">
            <inpCombo
              id="usrName"
              v-model="usrName"
              :input_tit="'Nome de Utilizador:'"
              :tipo="'text'"
              :place="'Nome de Utilizador'"
              :estado="usrErro"
              :erro="'O user já existe ou é inválido.'"
              @keyup="verificarUsrNameAval()"
            />
            <inpCombo
              @keyup="verificarPasseValida()"
              :erro="'A palavra-passe não é válida.'"
              v-model="password"
              :input_tit="'Palavra Passe: '"
              :place="'Palavra Passe'"
              :estado="passErro"
              :tipo="'password'"
              :passInp="'A passe deve ter 8 caracteres ou mais e conter números e caracteres especiais'"
              spellcheck="none"
            />
            <inpCombo
              @keyup="verificarPasseCoincide()"
              v-model="repPassword"
              :tipo="'password'"
              :input_tit="'Repetir a Palavra Passe: '"
              :place="'Repetir a Palavra Passe'"
              :estado="repErro"
              :erro="'Não coincide com a palavra-passe.'"
              :passInp="'A passe deve ter 8 caracteres ou mais e conter números e caracteres especiais'"
              spellcheck="none"
            />
            <inpCombo
              v-model="permissoes"
              :tipo="'number'"
              :step="1"
              :max="3"
              :min="2"
              :input_tit="'Nivél de permissões'"
              :place="'Nivél de permissões'"
              :estado="permsErro"
              :erro="'O nivél de permissão está entre 2 e 3'"
              spellcheck="none"
            />
          </div>
          <div class="user-profile">
            <h3>Dados Pessoais:</h3>
            <div class="inner">
              <inpCombo
                v-model="nome"
                :input_tit="'Nome próprio: '"
                :place="'Nome próprio'"
                :tipo="'text'"
                :estado="nomeErro"
              />
              <inpCombo
                v-model="email"
                :input_tit="'Email: '"
                :place="'Email'"
                :tipo="'email'"
                :estado="emailErro"
              />
              <inpCombo
                v-model="especialidades"
                :input_tit="'Especialidades: '"
                :place="'Especialidades'"
                :tipo="'text'"
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
