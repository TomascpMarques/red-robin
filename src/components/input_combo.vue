<template>
  <div class="input-comobo">
    <transition
      mode="in-out"
      enter-active-class="animate__animated animate__fadeInUp"
      leave="animate__animated animate__fadeOutDown"
    >
      <div v-if="anim">
        <span> {{ input_tit }} </span>
      </div>
    </transition>
    <input
      @focus="anim = true"
      @blur="anim = false"
      @input="$emit('update:modelValue', $event.target.value)"
      type="text"
      :placeholder="[[place]]"
      :value="modelValue"
      v-bind:class="{ bad: tt }"
    />
    {{ estado }}
  </div>
</template>

<script>
export default {
  name: "inputCombo",
  props: ["input_tit", "place", "modelValue", "estado"],
  data() {
    return {
      anim: false,
      tt: this.estado,
    };
  },
};
</script>

<style scoped>
.input-comobo {
  padding-left: 0.5rem;
  font-family: "Roboto";
  font-weight: 500;
  margin: 0.5rem;
  margin-left: 0.15rem;
  margin-bottom: 0.9rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.input-comobo span {
  color: var(--blue);
  font-weight: 600;
  letter-spacing: 1px;
  font-family: "Roboto";
  margin-bottom: 0.2rem;
}

.input-comobo input {
  background-color: transparent;
  outline: none;
  border: none;
  border-bottom: 2px solid #d3d3d3;
  padding: 0.5rem;
  transition: 0.3s all ease-in;
  font-size: 0.95rem;
  font-family: "Nunito";
  font-weight: 700;
  transition: 0.3s all ease-in-out;
}

input:hover {
  border-color: #95c7ff;
}

.input-comobo input:focus {
  border-bottom: 2px solid var(--blue);
}

.input-comobo input:focus::placeholder {
  color: transparent;
}

.input-comobo input::placeholder {
  color: lightgray;
}

.bad {
  background-color: transparent;
  outline: none;
  border: none;
  border-bottom: 2px solid tomato;
  padding: 0.5rem;
  transition: 0.3s all ease-in;
  font-size: 0.95rem;
  font-family: "Nunito";
  font-weight: 700;
  transition: 0.3s all ease-in-out;
}
</style>
