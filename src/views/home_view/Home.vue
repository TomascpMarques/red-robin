<template>
  <div class="home">
    <div>
      <transition
        enter-active-class="animate__animated animate__bounceInDown"
        leave-active-class="animate__animated animate__bounceOut"
      >
        <message
          v-if="sess"
          :menssagem="'Quer mesmo fazer logout?'"
          :titulo="'Terminar sessão'"
          :tipo="'warn'"
        >
          <div style="display: flex; justify-content: space-between">
            <section
              @click="logOut()"
              class="close-but"
              style="
                color: red;
                cursor: pointer;
                font-weight: bold;
                margin-top: 0.3rem;
              "
            >
              Terminar Sessão
            </section>
            <section
              @click="sess = !sess"
              class="close-but"
              style="
                color: lightgray;
                cursor: pointer;
                font-weight: bold;
                margin-top: 0.3rem;
                margin-left: 1rem;
              "
            >
              Cancelar
            </section>
          </div>
        </message>
      </transition>
    </div>
    <h1>
      Bem vindo,<span class="nome-tit">{{ nome }}</span>
    </h1>
    <div class="disposicao">
      <usrcard :nome="nome" :user="user" :status="status" :email="email" />
      <div class="side-content">
        <contentBox :titulo="'Contribuições'">
          <div class="contribuicoes-valores">
            <h3>Documentação:</h3>
            <!-- <div v-for="item in items" :key="item[0]">
              <div class="titulo-pasta">
                <img src="../../assets/folder.svg" alt="" />
                <span class="pasta">{{ Object.keys(item).toString() }} </span>
              </div>
              <ul v-for="it in item" :key="it">
                <li v-for="item in it" :key="item">
                  {{ item }} <span class="link">[link]</span>
                </li>
              </ul>
            </div> -->
            <div v-for="item in items" :key="item" class="listing">
              <div class="titulo-pasta">
                <img src="../../assets/folder.svg" alt="" />
                <span class="pasta">{{ item["reponome"] }} </span>
              </div>
              <ul class="doc-list">
                <div v-for="it in item.ficheiros" :key="it">
                  <li>{{ it }} <span class="link">[link]</span></li>
                </div>
              </ul>
            </div>
          </div>
        </contentBox>
        <content-box :titulo="'Especialidades'">
          <div class="contribuicoes-valores">
            <ul v-for="it in especialidades" :key="it">
              <li>
                {{ it }}
              </li>
            </ul>
          </div>
        </content-box>
        <div class="logbutton">
          <button @click="initLogOut()">Logout</button>
          <span class="legenda">Terminar Sessão</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script src="./viewmain.js"></script>
<style src="./style.css" scoped></style>
