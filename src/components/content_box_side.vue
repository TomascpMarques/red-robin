<template>
  <div>
    <div class="root-box">
      <div class="sidebar">
        <div class="circle-red"></div>
        <div class="circle-yellow"></div>
        <div class="circle-green"></div>
        <h3>{{ titulo }}</h3>
      </div>
      <div class="cont">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "cntBoxSideBar",
  props: ["titulo"],
};
</script>

<style scoped>
h3 {
  font-weight: 300;
  letter-spacing: 2px;
  writing-mode: vertical-lr;
  font-size: 2rem;
  margin: 0;
  padding: 3px;
  transform: rotateZ(180deg);
}

.cont {
  background-color: var(--white);
  padding: 0.7rem 1.1vw;
}

.root-box {
  display: grid;
  grid-template-columns: auto auto auto;
  box-shadow: 7px 7px 5px 0px gainsboro;
  background-color: var(--white);
  transition: 0.3s all ease-in-out;
  margin: 0.5rem;
}

.sidebar {
  font-family: "Oleo Script", cursive;
  background-color: var(--drk-blue);
  color: var(--white);
  display: flex;
  flex-direction: column;
  place-items: center;
  padding: 6px;
  padding-top: 23px;
  border-top-left-radius: 7px;
  border-bottom-left-radius: 7px;
  max-width: min-content;
}

.circle-red {
  width: 1.5vh;
  height: 3.5vh;
  box-shadow: var(--circle-inner-shadow);
  transform: rotatez(45deg);
  border-radius: 500px;
  margin-bottom: 0px;
  background-color: #f33d3d;
}

.circle-yellow {
  width: 1.5vh;
  height: 3.5vh;
  box-shadow: var(--circle-inner-shadow);
  border-radius: 500px;
  transform: rotatez(45deg);
  margin-bottom: 0px;
  background-color: #dbff00;
}

.circle-green {
  width: 1.5vh;
  height: 3.5vh;
  box-shadow: var(--circle-inner-shadow);
  border-radius: 500px;
  transform: rotatez(45deg);
  margin-bottom: 15px;
  background-color: #24c820;
}
</style>
