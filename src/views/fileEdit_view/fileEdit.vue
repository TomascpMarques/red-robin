<template>
  <div class="page-wrap">
    <div class="page-tit">
      <div class="tit-left">
        <img src="../../assets/files.svg" alt="" />
        <h1>Gestor de documentos</h1>
        <h2>v1.2</h2>
      </div>
      <div class="route-info">
        <h2>{{ $route.params.tipo }}:</h2>
        <div v-if="$route.params.tipo == 'Repo'">
          <h2>
            {{
              $route.params.valor.split("/")[
                $route.params.valor.split("/").length - 1
              ]
            }}
          </h2>
        </div>
        <div v-else>
          <h2>{{ $route.params.valor }}</h2>
        </div>
      </div>
    </div>
    <div class="page-body">
      <div class="explorador">
        <content-box :titulo="'Explorador de Ficheiros'">
          <div class="info-repo">
            <div>
              <h3>Informação Repo:</h3>
              <div class="info">
                <section class="info-repo-val">
                  <span class="title">Autor:</span>
                  <span class="value">{{ repo.autor }}</span>
                </section>
                <section class="info-repo-val">
                  <span class="title">Tema:</span>
                  <span class="value">{{ repo.tema }}</span>
                </section>
                <section class="info-repo-val">
                  <span class="title">Criado:</span>
                  <span class="value">{{ repo.criacao }}</span>
                </section>
              </div>
            </div>
            <span class="hrzl"></span>
          </div>
        </content-box>
      </div>
      <div class="editor">
        <content-box :titulo="'Editor'">
          <span class="text">
            {{ repo }}
          </span>
        </content-box>
      </div>
    </div>
  </div>
</template>

<script src="./viewmain.js"></script>
<style src="./style.css" scoped></style>
