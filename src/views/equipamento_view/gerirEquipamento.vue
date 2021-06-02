<template>
  <div class="page-wrap">
    <div class="page-tit">
      <h1>Equipamento</h1>
      <button @click="disp = !disp">Alterar Disposição</button>
    </div>
    <div :class="[disp ? 'page-body-hr' : 'page-body']">
      <div class="explorador">
        <h1>Ações</h1>
        <div class="search">
          <span>Procura customizada de registos</span>
          <details>
            <summary>Informação dos querys customizados</summary>
            <details>
              <summary>O que é extraido?</summary>
              <p>
                O query customizado, extrai a informação pedida dos registos que
                validam os filtros de busca. Tanto a informação na meta-data do
                ficheiro (quantidade, tipo, uso), como no corpo do registo.
              </p>
            </details>
            <details>
              <summary>Como, o quê, e quando extraido?</summary>
              <p>
                Os campos que irão ser extraidos são defenidos como listas de
                campos. Cada lista de campos é executada no registo retornado
                que têm o index equivalente. No entanto se só uma lista for
                fonecida e existir mais que um registo que valide os filtros de
                pesquisa, os campos extraidos serão os referidos na unica lista
                existente. Se a quantidade de listas de campos a extrair não for
                equivalente ao número de registos retornados, a ultima lista de
                campos defenida será usada na extração de campos de todos os
                registos restantes.
              </p>
            </details>
          </details>
          <h2 @click="showEditors = !showEditors">Defenir Campos</h2>
          <div class="editor-query" v-if="showEditors">
            <inpSimples :titulo="'Coleção Alvo'" @conteudo="getColecao" />
            <inpOBJ
              :titulo="'Filtros do Registo'"
              @conteudo="getFiltro"
              :plcholder="'«campos» ,Nº Filtros'"
            />
            <inpLista
              :titulo="'Campos a extrair'"
              @conteudo="getCampos"
              :plcholder="'ex: campo1 campo1.1, campo2 campo2.1'"
            />
            <button @click="initProcura()" class="procurar">Procurar</button>
          </div>
        </div>
        <inpCategorie />
        <delItemID />
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
