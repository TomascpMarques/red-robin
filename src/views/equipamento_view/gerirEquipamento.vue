<template>
  <div class="page-wrap">
    <div class="page-tit">
      <h1>Hello mein friend</h1>
    </div>
    <div class="page-body">
      <div class="explorador">
        {{ test }}
        <inpSimples :titulo="'Quantidade'" plcholder="" v-model="test" />
        <inpCategorie />
        <br />
        <span
          >Lorem ipsum dolor sit amet consectetur, adipisicing elit. Pariatur
          debitis ducimus sunt magni corrupti quidem voluptas fuga, eligendi
          dignissimos atque eius harum aspernatur? Distinctio, a odit rem
          accusamus eligendi esse.
        </span>
      </div>
      <div class="editor">
        <span
          >Lorem ipsum dolor sit amet consectetur, adipisicing elit. Pariatur
          debitis ducimus sunt magni corrupti quidem voluptas fuga, eligendi
          dignissimos atque eius harum aspernatur? Distinctio, a odit rem
          accusamus eligendi esse.
        </span>
      </div>
    </div>
  </div>
</template>

<script src="./viewmain.js"></script>
<style src="./style.css" scoped></style>
