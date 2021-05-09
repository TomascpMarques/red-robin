<template>
  <div>
    <div class="user-tit">
      <h2>{{ nome }}</h2>
    </div>
    <div class="pagina">
      <div class="info-mudar">
        <contentBox :titulo="'Dados da Plataforma'">
          <infoDisp
            :titulo="'Utilizador:'"
            :info="$store.state.usr_perfil.user"
          />
          <infoDisp :titulo="'Password:'" :info="'*'.repeat(12)" />
        </contentBox>
        <cntboxside>
          <br />
          <inpCombo
            id="usrName"
            v-model="usrName"
            :input_tit="'Mudar Nome de Utilizador:'"
            :tipo="'text'"
            :place="'Novo Nome de Utilizador'"
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
            :passInp="'A passe deve ter 8 caracteres ou mais, conter números e caracteres especiais'"
            spellcheck="none"
          />
          <div class="submit">
            <button @click.prevent="init()">Atualizar</button>
          </div>
          <br />
        </cntboxside>
      </div>
      <div class="info-mudar">
        <contentBox :titulo="'Dados de Utilizador'">
          <infoDisp :titulo="'Nome:'" :info="$store.state.usr_perfil.nome" />
          <infoDisp :titulo="'Email:'" :info="$store.state.usr_perfil.email" />
          <infoDisp
            :titulo="'Ultimo Estado:'"
            :info="$store.state.usr_perfil.statusmss"
          />
        </contentBox>
        <cntboxside>
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
        </cntboxside>
      </div>
      <div class="info-mudar">
        <contentBox :titulo="'Contribuições do Utilizador'">
          <listSimple
            :titulo="'Especialidades'"
            :lista="$store.state.usr_perfil.especialidades"
          />
          <listDisplay
            :titulo="'Contribuições'"
            :list="$store.state.usr_perfil.contribuicoes"
          >
          </listDisplay>
        </contentBox>
      </div>
    </div>
  </div>
</template>

<script src="./viewmain.js"></script>
<style src="./style.css" scoped></style>
