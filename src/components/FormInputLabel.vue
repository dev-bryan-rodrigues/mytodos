<template>
  <div :style="cssVars" class="input-wrapper">
    <label for="titulo">{{ title }}</label>
    <input
      type="text"
      name="titulo"
      id="titulo"
      v-model="value"
      :class="{ error: error }"
      @keyup="$emit('escrevendo', value)"
    />
    <p v-if="error" class="input-error">{{ errorMessage }}</p>
  </div>
</template>

<script>
export default {
  name: "FormInputLabel",
  props: {
    title: {
      type: String,
      default: "",
    },
    error: {
      type: Boolean,
      default: false,
    },
    errorMessage: {
      type: String,
      default: "",
    },
    width: {
      type: String,
      default: "400px",
    },
    valor: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      value: "",
    };
  },
  computed: {
    cssVars() {
      return {
        "--width": this.width,
      };
    },
  },
  created() {
    this.value = this.valor;
  },
  watch: {
    valor() {
      this.value = this.valor;
    },
  },
};
</script>

<style scoped>
input,
textarea {
  display: block;
  border: 1px solid #134866;
  outline: none;
  border-radius: 4px;
  padding: 5px;
  font-size: 16px;
  transition: all 0.5s;
  width: 100%;
  max-width: var(--width);
}
input:focus,
textarea:focus,
input:hover,
textarea:hover {
  box-shadow: 0px 0px 8px #1ac6f6;
  transform: scale(1.02);
}
textarea {
  height: 80px;
}
input {
  height: 40px;
  margin-top: 10px;
}
input.error {
  transition: box-shadow 0.2s;
  box-shadow: 0px 0px 8px red;
}
label {
  font-size: 20px;
  font-weight: 600;
  margin-top: 20px;
}
.input-error {
  margin-top: 5px;
  color: red;
  animation: slideError 0.3s forwards;
}
@keyframes slideError {
  from {
    transform: translate3d(0, -15px, 0);
  }
  to {
    transform: translate3d(0, 0, 0);
  }
}
</style>
