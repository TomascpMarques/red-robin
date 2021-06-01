<template>
  <div class="page-wrap">
    <div class="page-tit">
      <h1>Equipamento</h1>
    </div>
    <div class="page-body">
      <div class="explorador">
        <h1>Ações</h1>
        <inpCategorie />
        <button @click="getAllRepos()" class="update">Atualizar Lista</button>
      </div>
      <div class="editor">
        <div v-if="!items">
          <h3>Wow Such Empty...</h3>
        </div>
        <div v-if="items">
          <div
            v-for="(colecao, collName) in itemsCategories"
            :key="(colecao, collName)"
          >
            <div class="titulo">
              <div
                v-bind:class="[
                  showColecoes[collName] ? 'decor-down' : 'decor-up',
                ]"
                @click="showColecoes[collName] = !showColecoes[collName]"
              ></div>
              <h1>
                {{ collName }}
              </h1>
            </div>

            <div class="show_estados" v-if="showColecoes[collName]">
              <div v-for="estado in colecao" :key="estado">
                <itemsCategoria
                  :categoria="estado[0].meta.estado"
                  :items="estado"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script src="./viewmain.js"></script>
<style src="./style.css" scoped></style>
