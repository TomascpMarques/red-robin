<template>
  <div class="container">
    <div class="wrap" v-bind:class="{ 'blk-out': maxvideo }">
      <div class="bar"></div>
      <div class="main">
        <span class="button-max" @click="maxvideo = !maxvideo"> Aumentar </span>
        <div v-bind:class="{ 'video-player': true }">
          <iframe
            v-bind:class="{ 'max-height': maxvideo }"
            :src="`https://www.youtube.com/embed/${lol}`"
            :title="title"
            frameborder="0"
            allow="accelerometer; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen
          ></iframe>
        </div>
        <div class="info" v-bind:class="{ blur: maxvideo }">
          <span class="title">
            {{ title }}
          </span>
          <span class="desc">
            {{ desc }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "videoShow",
  props: ["title", "lol", "desc"],
  data() {
    return {
      maxvideo: false,
    };
  },
};
</script>

<style scoped>
.container {
  max-width: 400px;
}

.button-max {
  color: lightgray;
  font-style: italic;
  letter-spacing: 1px;
  font-family: consolas;
  padding: 0.1rem;
  cursor: pointer;
}

.wrap {
  display: flex;
  flex-direction: row-reverse;
  justify-content: center;
  box-shadow: 0px 0px 10px 3px lightgray;
  border-radius: 10px;
  max-width: 100%;
  margin: 0.3rem;
  background-color: white;
  transition: 0.3s all ease-in-out;
}

.video-player {
  width: 100%;
  transition: 0.3s all ease-in-out;
}

.max-height {
  height: 210%;
  transition: 0.3s all ease-in-out;
}

.blk-out {
  background-color: white;
  transition: 0.3s all ease-in-out;
}

.blur {
  z-index: -1;
  transition: 0.3s all ease-in-out;
}

.wrap:hover > .bar {
  background-color: #3882f2;
}

.main {
  padding: 0.8rem;
  padding-top: 0.25rem;

  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  justify-content: center;
  gap: 0.7rem;
}

.bar {
  width: 2.3rem;
  border-top-right-radius: 10px;
  border-bottom-right-radius: 10px;
  background-color: #e1871e;
  transition: 0.3s all ease-out;
}

.info {
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 0.3rem 0.5rem;
  margin-bottom: 0.3rem;
}

.title {
  color: #3882f2;
  font-size: 1.2rem;
  font-weight: 600;
  letter-spacing: 1px;
  line-height: 1.6rem;
  padding: 0 0.5rem;
  padding-bottom: 0.5rem;
  margin-bottom: 0.8rem;
  border-bottom: 2px solid lightgray;
}

.desc {
  font-family: "Nunito";
  font-weight: 500;
  font-size: 1rem;
  letter-spacing: 1px;
  text-align: justify;
  text-justify: inter-word;
  padding: 0 0.2rem;
}

iframe {
  transition: all 0.4s cubic-bezier(0.75, 0.25, 0.67, 0.84);
  height: 100%;
  width: 100%;
  border-radius: 10px;
  z-index: 3;
  background-color: black;
}
</style>
