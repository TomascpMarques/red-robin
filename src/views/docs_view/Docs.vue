<template>
  <div class="page-wrap">
    <div class="page-tit">
      <img src="../../assets/fldrfiles.svg" alt="" />
      <h1>Repositórios</h1>
    </div>
    <transition
      enter-active-class="animate__animated animate__fadeInLeft"
      leave-active-class="animate__animated animate__fadeOutLeft"
    >
      <button class="refresh" v-if="disabledButton" @click="reload()">
        Atualizar Lista
      </button>
    </transition>
    <br />
    <span class="hrzl"></span>
    <div class="repos">
      <div v-for="cntrb in repos" :key="cntrb.nome">
        <div class="repo-files">
          <repo
            class="el-repo"
            @click="repoShowChange(cntrb.nome)"
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
          <transition
            enter-active-class="animate__animated animate__fadeInLeft"
            leave-active-class="animate__animated animate__fadeOut"
          >
            <repoFiles
              :repo="cntrb.ficheiros"
              v-if="reposShowOBJ[cntrb.nome]"
            />
          </transition>
        </div>
      </div>
      <div>
        <newRepo> </newRepo>
        <br />
        <delRepo> </delRepo>
      </div>
    </div>
  </div>
</template>

<script src="./viewmain.js"></script>
<style src="./style.css" scoped></style>
