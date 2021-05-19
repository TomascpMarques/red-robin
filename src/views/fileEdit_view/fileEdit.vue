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
        <cntboxside :titulo="'Explorador de Ficheiros'">
          <span
            >Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore,
            natus officiis temporibus accusantium nam cupiditate quo quas labore
            odit ducimus ullam accusamus qui earum similique ut repellat dolores
            eveniet eaque commodi. Eligendi corporis, quo asperiores pariatur
            nostrum assumenda ea fugit dolorem illo minima delectus neque facere
            error veritatis odit animi quas saepe quia?
          </span>
        </cntboxside>
      </div>
      <div class="editor">
        <content-box :titulo="'Editor'">
          <span
            >Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore,
            natus officiis temporibus accusantium nam cupiditate quo quas labore
            odit ducimus ullam accusamus qui earum similique ut repellat dolores
            eveniet eaque commodi. Eligendi corporis, quo asperiores pariatur
            nostrum assumenda ea fugit dolorem illo minima delectus neque facere
            error veritatis odit animi quas saepe quia?
          </span>
        </content-box>
      </div>
    </div>
  </div>
</template>

<script src="./viewmain.js"></script>
<style src="./style.css" scoped></style>
