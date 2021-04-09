<template>
  <div class="pagina">
    <cntboxside>
      <div class="registar-user">
        <h2>Criar um novo utilizador</h2>
        <div class="user-auth">
          <h3>Dados da Plataforma:</h3>
          <div class="inner">
            <inpCombo
              :input_tit="'Nome de Utilizador:'"
              :place="'Nome de Utilizador'"
            />
            <inpCombo :input_tit="'Palavra Passe'" :place="'Palavra Passe'" />
            <inpCombo
              :input_tit="'Repetir a Palavra Passe'"
              :place="'Repetir a Palavra Passe'"
            />
          </div>
          <div class="user-profile">
            <h3>Dados Pessoais:</h3>
            <div class="inner">
              <inpCombo :input_tit="'Nome próprio: '" :place="'Nome próprio'" />
              <inpCombo :input_tit="'Email: '" :place="'Email'" />
              <inpCombo
                :input_tit="'Especialidades '"
                :place="'Especialidades'"
              />
            </div>
          </div>
        </div>
        <br />
        <div class="submit">
          <button>Registar</button>
        </div>
      </div>
    </cntboxside>
  </div>
</template>

<script src="./viewmain.js"></script>
<style scoped src="./style.css"></style>
