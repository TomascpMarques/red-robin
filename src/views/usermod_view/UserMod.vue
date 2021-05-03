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
</template>

<script src="./viewmain.js"></script>
<style src="./style.css" scoped></style>
