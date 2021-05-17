<template>
  <div class="page-wrap">
    <div class="page-tit">
      <img src="../../assets/fldrfiles.svg" alt="" />
      <h1>Repositórios</h1>
    </div>
    <button class="refresh" @click="reload()">Atualizar Lista</button>
    <br />
    <span class="hrzl"></span>
    <div class="repos">
      <div v-for="cntrb in repos" :key="cntrb.nome">
        <repo
          :criacao="cntrb.criacao"
          :tema="cntrb.tema"
          :contrib="
            cntrb.contribuidores.lenght <= 0
              ? cntrb.contribuidores
              : 'Sem contribuidores'
          "
          :autor="cntrb.autor"
          :titulo="cntrb.nome"
        />
      </div>
    </div>
  </div>
</template>

<script src="./viewmain.js"></script>
<style src="./style.css" scoped></style>
