<template>
  <div class="main-wrap">
    <span>{{ titulo }}</span>
    <div class="decor"></div>
    <input
      type="text"
      name="inp"
      :placeholder="plcholder || 'Edit me!'"
      @input="$emit('update:modelValue', $event.target.value)"
    />
  </div>
</template>

<script>
export default {
  name: "inpValSimples",
  props: ["titulo", "plcholder", "modelvalue"],
  data() {
    return {};
  },
};
</script>

<style scoped>
.main-wrap {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  align-content: flex-start;
  place-items: center;
  gap: 0.3rem;
  padding: 0.15rem 0rem;
  border: none;
  border-bottom: 2px solid gainsboro;
  max-width: fit-content;
}

.decor {
  width: 0.4rem;
  height: 0.4rem;
  padding: 0;
  margin: 0;
  border: none;
  border-top: 3px solid var(--blue);
  border-right: 3px solid var(--blue);
  transform: rotateZ(45deg);
  margin-right: 0.1rem;
}

.main-wrap span {
  font-size: 1rem;
  letter-spacing: 0.6px;
  font-family: "Roboto";
  font-kerning: auto;
  width: fit-content;
}

.main-wrap input {
  padding: 0.13rem 0.2rem;
  border: none;
  outline: none;
  font-size: 1rem;
  font-family: "Roboto";
  color: #252525;
  width: 60%;
  transition: 1s all cubic-bezier(0.23, 1, 0.32, 1);
}

input:focus::placeholder {
  transform: translateX(105%);
}

input::placeholder {
  font-family: "Roboto";
  color: gray;
  letter-spacing: 1px;
  transition: 1.2s all ease-out;
}
</style>
