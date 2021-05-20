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
          </div>
          <div class="hrzl"></div>
          <h3 class="paths-title">Listagem de Conteudo:</h3>
          <div class="paths-cont">
            <div
              class="select"
              v-for="path in Object.keys(fileStruct)"
              :key="path"
            >
              <div class="path-titl">
                <img src="../../assets/folder.svg" alt="" />
                <div
                  class="root-dir"
                  v-if="path.split('/').slice(1).length < 2"
                >
                  <h4>
                    {{ path.split("/").slice(1).join("/") }}
                  </h4>
                  <span> root dir</span>
                </div>
                <h4 v-if="path.split('/').slice(1).length >= 2">
                  {{ path.split("/").slice(1).join(" / ") }}
                </h4>
              </div>
              <div class="side-content">
                <div class="files">
                  <ul v-for="file in fileStruct[path]" :key="file">
                    <div class="file">
                      <div class="side-bar"></div>
                      <li @click="log(file.path, file.nome)">
                        {{ file.nome }}
                      </li>
                    </div>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </content-box>
      </div>
      <div class="editor">
        <content-box :titulo="'Editor'">
          <transition
            enter-active-class="animate__animated animate__fadeIn"
            leave-active-class="animate__animated animate__fadeOut"
          >
            <div class="cont" v-if="fileEscolhido">
              <h3 class="edit-file-title">File: {{ fileEscolhido }}</h3>
              <textarea
                class="text"
                :value="editorContent"
                @input="editorContent = $event.target.value"
              >
              </textarea>
            </div>
          </transition>
          <p class="empty" v-if="!fileEscolhido">wow such empty</p>
        </content-box>
      </div>
    </div>
  </div>
</template>

<script src="./viewmain.js"></script>
<style src="./style.css" scoped></style>
