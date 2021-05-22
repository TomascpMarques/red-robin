<template>
  <div class="page-wrap">
    <transition
      enter-active-class="animate__animated animate__fadeIn"
      leave-active-class="animate__animated animate__fadeOut"
    >
      <div v-if="pop_up" class="wrapping">
        <div class="bkg"></div>
        <fileCreate
          class="file-create"
          :repoNome="
            $route.params.valor.split('/')[
              $route.params.valor.split('/').length - 1
            ]
          "
          :path="$route.params.valor"
          v-model="pop_up"
        />
      </div>
    </transition>
    <div v-bind:class="{ blur: pop_up }">
      <div class="page-tit">
        <div class="tit-left">
          <img src="../../assets/files.svg" alt="" />
          <h1>Gestor de documentos</h1>
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
      <transition
        enter-active-class="animate__animated animate__fadeInLeft"
        leave-active-class="animate__animated animate__fadeOutLeft"
      >
        <button class="refresh" v-if="disabledButton" @click="reload()">
          Vista Geral
        </button>
      </transition>
      <div class="page-body">
        <div class="explorador">
          <content-box :titulo="'Explorador'">
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
            <h3 class="paths-title">Conteudo do repositório:</h3>
            <div class="cont-novo">
              <span
                @click="
                  pop_up = true;
                  refreshToken();
                "
              >
                Novo Ficheiro
              </span>
              <span
                @click="setupApagarFicheiroMeta()"
                v-bind:class="[apagar ? 'but-active' : '']"
              >
                Apagar Ficheiro
              </span>
            </div>
            <div class="paths-cont">
              <div
                class="select"
                v-for="path in Object.keys(fileStruct)"
                :key="path"
              >
                <div class="path-titl">
                  <img src="../../assets/folder.svg" alt="" />
                  <div class="root-dir" v-if="lenLessThanTwo(path)">
                    <h4>
                      {{ setUpDirName(path) }}
                    </h4>
                    <span>root dir</span>
                  </div>
                  <h4 v-if="lenGreaterOrEqualThanTwo(path)">
                    {{ setUpFileNameFromPath(path) }}
                  </h4>
                </div>
                <div class="side-content">
                  <div class="files">
                    <ul v-for="file in fileStruct[path]" :key="file">
                      <div class="file">
                        <div
                          v-bind:class="{
                            'side-bar': true,
                            selected: fileEscolhidoPath === file.path,
                          }"
                        ></div>
                        <li @click="log(file.path, file.nome)">
                          <div class="file-options">
                            {{ file.nome }}
                            <span
                              v-if="apagar"
                              @click="
                                apagar = !apagar;
                                apagarMetaDataFile(file.nome, file.path);
                              "
                              >apagar ficheiro</span
                            >
                          </div>
                        </li>
                      </div>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </content-box>
          <div>
            <transition
              enter-active-class="animate__animated animate__fadeIn"
              leave-active-class="animate__animated animate__fadeOut"
            >
              <message
                v-if="show"
                :menssagem="log_mss"
                :titulo="log_tit"
                :tipo="log_tip"
              >
                <section @click="show = !show" class="close-but">
                  Fechar
                </section>
              </message>
            </transition>
          </div>
        </div>
        <div class="editor">
          <content-box :titulo="'Editor'">
            <transition
              enter-active-class="animate__animated animate__fadeIn"
              leave-active-class="animate__animated animate__fadeOut"
            >
              <div class="cont" v-if="fileEscolhido">
                <h3 class="edit-file-title">Ficheiro: {{ fileEscolhido }}</h3>
                <p class="empty" v-if="!editorContent">wow such empty</p>
                <textarea
                  class="text"
                  :value="editorContent"
                  @input="editorContent = $event.target.value"
                >
                </textarea>
              </div>
            </transition>
            <p class="empty" v-if="!fileEscolhido">wow such empty</p>
            <button class="butt" v-if="fileEscolhido" @click="SetupFileWrite()">
              Escrever no Ficheiro
            </button>
          </content-box>
        </div>
      </div>
    </div>
  </div>
</template>

<script src="./viewmain.js"></script>
<style src="./style.css" scoped></style>
