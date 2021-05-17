<template>
  <div class="page-wrap">
    <div class="page-tit">
      <img src="../../assets/fldrfiles.svg" alt="" />
      <h1>Repositórios</h1>
    </div>
    <span class="hrzl"></span>
    <!-- {{ test.contribuicoes }} -->
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
      <!-- <repo
        :criacao="'asdasd'"
        :tema="'adawad'"
        :contrib="'contrib'"
        :autor="'adwadawd'"
      /> -->
    </div>
  </div>
</template>

<script src="./viewmain.js"></script>
<style src="./style.css" scoped></style>
