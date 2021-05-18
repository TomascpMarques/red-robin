<template>
  <div class="input-comobo">
    <transition
      mode="in-out"
      enter-active-class="animate__animated animate__fadeInUp"
      leave-active-class="animate__animated animate__fadeOutDown"
    >
      <div v-if="anim">
        <span> {{ input_tit }} </span>
      </div>
    </transition>
    <input
      @focus="anim = true"
      @blur="anim = false"
      @input="$emit('update:modelValue', $event.target.value)"
      :type="fieldTipo"
      :placeholder="[[place]]"
      :value="modelValue"
      :step="[[step]]"
      :min="[[min]]"
      :max="[[max]]"
      v-bind:class="['input-comobo-input', inputErro ? 'bad' : '']"
      autocomplete="off"
    />
    <div class="error-message" v-if="estado">
      <p>
        {{ erro }}
      </p>
    </div>
    <div
      class="mostrar-pass tooltip"
      v-if="fieldDefault === 'password' && modelValue"
    >
      <label
        @click="
          pass = !pass;
          test();
        "
      >
        Ver Password
      </label>
      <div :class="[fieldTipo === 'password' ? 'norm' : 'pass']"></div>
      <div class="tooltiptext">
        <p>
          {{ passInp }}
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "inputCombo",
  props: [
    "input_tit",
    "place",
    "modelValue",
    "estado",
    "tipo",
    "passInp",
    "erro",
    "max",
    "min",
    "step",
  ],
  data() {
    return {
      anim: false,
      inputErro: null,
      fieldDefault: this.tipo,
      fieldTipo: this.tipo,
      pass: true,
    };
  },
  methods: {
    test() {
      this.pass ? (this.fieldTipo = "password") : (this.fieldTipo = "text");
    },
  },
  watch: {
    estado: {
      immediate: true,
      handler() {
        this.estado ? (this.inputErro = true) : (this.inputErro = false);
      },
    },
  },
};
</script>

<style scoped>
.pass {
  width: 0.8rem;
  height: 0.8rem;
  background-color: var(--orange);
  border-radius: 100px;
  transition: 0.15s all ease-in-out;
}

.norm {
  width: 0.5rem;
  height: 0.5rem;
  background-color: transparent;
  border-radius: 100px;
  transition: 0.15s all ease-in-out;
}

/* Tooltip container */
.tooltip {
  position: relative;
}

/* Tooltip text */
.tooltip .tooltiptext {
  display: none;
  width: 60%;
  background-color: #d3d3d3;
  color: #323232;
  text-align: left;
  padding: 0.5rem;
  border-radius: 4px;
  border: 3px solid #d0d0d0;
  font-size: 0.85rem;
  font-weight: 600;
  font-family: "Nunito";
  letter-spacing: 1px;
  line-height: 0.95rem;
  position: absolute;
  z-index: 1;
}

.tooltiptext p {
  margin: 0 0.5rem;
}

/* Show the tooltip text when you mouse over the tooltip container */
.tooltip:hover .tooltiptext {
  display: inline-block;
  top: -5px;
  left: 103%;
  transition: 0.3s all ease-in-out;
}

.mostrar-pass {
  margin-top: 0.4rem;
  display: flex;
  flex-direction: row-reverse;
  align-content: center;
  place-items: center;
  gap: 0.4em;
}

.mostrar-pass label {
  font-size: 0.9rem;
  font-weight: bold;
  color: rgb(202, 202, 202);
  transition: 0.14s all ease-in;
  user-select: none;
}

.mostrar-pass label:hover {
  color: var(--orange);
}

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

.input-comobo-input {
  background-color: white;
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

.input-comobo-input:hover {
  border-color: #95c7ff;
}

.input-comobo-input:focus {
  border-bottom: 2px solid var(--blue);
}

.input-comobo-input:focus::placeholder {
  color: transparent;
}

.input-comobo-input::placeholder {
  color: lightgray;
}

.bad {
  background-color: white;
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

.error-message {
  margin: 0.3rem;
}

.error-message p {
  padding: 0.2rem;
  margin: 0;
  background-color: tomato;
  border: 2px solid transparent;
  border-radius: 4px;
  color: white;
  font-family: consolas;
  font-weight: bold;
  text-align: center;
}
</style>
