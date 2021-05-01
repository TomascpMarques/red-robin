<template>
  <div class="pagina">
    <div class="info-mudar">
      <contentBox :titulo="'Dados da Plataforma'">
        <infoDisp
          :titulo="'Utilizador:'"
          :info="$store.state.usr_perfil.user"
        />
        <infoDisp :titulo="'Password:'" :info="'* '.repeat(12)" />
      </contentBox>
      <cntboxside> </cntboxside>
    </div>
    <contentBox :titulo="'Dados de Utilizador'">
      <infoDisp :titulo="'Nome:'" :info="$store.state.usr_perfil.nome" />
      <infoDisp :titulo="'Email:'" :info="$store.state.usr_perfil.email" />
      <infoDisp
        :titulo="'Ultimo Estado:'"
        :info="$store.state.usr_perfil.statusmss"
      />
    </contentBox>
    <contentBox :titulo="'Contribuições do Utilizador'">
      <infoDisp
        :titulo="'Especialidades:'"
        :info="$store.state.usr_perfil.especialidades"
      />
      <infoDisp
        :titulo="'Contribuições:'"
        :info="$store.state.usr_perfil.contribuicoes"
      />
      <div v-for="item in $store.state.usr_perfil.contribuicoes" :key="item[0]">
        <div v-for="it in item" :key="it">
          <infoDisp v-for="item in it" :key="item" :titulo="item" :info="item">
          </infoDisp>
        </div>
      </div>
    </contentBox>
  </div>
</template>

<script src="./viewmain.js"></script>
<style src="./style.css" scoped></style>
