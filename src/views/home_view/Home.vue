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
          <section @click="logOut()" class="close-but" style="color: red">
            Terminar Sessão
          </section>
        </message>
      </transition>
    </div>
    <h1>
      Bem vindo,<span class="nome-tit">{{ nome }}</span>
    </h1>
    <div class="disposicao">
      <usrcard :nome="nome" :user="user" />
      <div class="side-content">
        <contentBox :titulo="'Contribuições'">
          <div class="contribuicoes-valores">
            <h3>Documentação:</h3>
            <div v-for="item in items" :key="item[0]">
              <div class="titulo-pasta">
                <img src="../../assets/folder.svg" alt="" />
                <span class="pasta">{{ Object.keys(item).toString() }} </span>
              </div>
              <ul v-for="it in item" :key="it">
                <li v-for="item in it" :key="item">
                  {{ item }} <span class="link">[link]</span>
                </li>
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
      </div>
      <button @click="initLogOut()">Logout</button>
    </div>
  </div>
</template>

<script src="./viewmain.js"></script>
<style src="./style.css" scoped></style>
