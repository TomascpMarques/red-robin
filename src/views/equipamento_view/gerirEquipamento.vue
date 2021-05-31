<template>
  <div class="page-wrap">
    <div class="page-tit">
      <h1>Equipamento</h1>
    </div>
    <div class="page-body">
      <div class="explorador">
        <inpCategorie />
        <br />
        <button @click="getAllRepos()">Try me</button>
        <br />
        <span
          >Lorem ipsum dolor sit amet consectetur, adipisicing elit. Pariatur
          debitis ducimus sunt magni corrupti quidem voluptas fuga, eligendi
          dignissimos atque eius harum aspernatur? Distinctio, a odit rem
          accusamus eligendi esse.
        </span>
      </div>
      <div class="editor">
        <div v-if="!items">
          <h3>Wow Such Empty...</h3>
        </div>
        <div v-if="items">
          <div v-for="x in itemsCategories" :key="x">
            <itemsCategoria :categoria="x[0].meta.estado" :items="x" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script src="./viewmain.js"></script>
<style src="./style.css" scoped></style>
