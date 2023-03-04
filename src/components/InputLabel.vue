<template>
  <div class="input-wrapper">
    <label for="input">{{ label }}</label>
    <input
      :type="type"
      name="input"
      :id="label"
      v-model="value"
      :class="{ error: error }"
    />
    <p v-if="error" class="text-error">{{ error }}</p>
  </div>
</template>

<script>
export default {
  name: "InputLabel",
  data() {
    return {
      value: null,
    };
  },
  props: {
    label: {
      type: String,
      default: "",
    },
    width: {
      type: String,
      default: "",
    },
    type: {
      type: String,
      default: "text",
    },
    error: {
      type: String,
      default: "",
    },
  },
  computed: {
    cssVars() {
      return {
        "--width": this.width,
      };
    },
  },
  watch: {
    value() {
      this.$emit("input", this.value);
    },
  },
};
</script>

<style scoped>
.input-wrapper {
  display: flex;
  flex-direction: column;
  width: 100%;
}
label {
  font-weight: 600;
  font-size: 20px;
  line-height: 30px;
  margin-bottom: 5px;
}
input {
  width: var(--width);
  height: 36px;
  background: #fdfaf3;
  border: 1px solid #111111;
  border-radius: 4px;
  font-family: "Inter";
  padding: 5px;
  font-size: 16px;
  transition: all 0.5s;
}
input:hover,
input:focus {
  box-shadow: 0px 0px 8px #aade87;
  transform: scale(1.01);
}
input:focus-visible {
  outline: #aade87;
}
input.error {
  box-shadow: 0px 0px 4px #f24463;
  color: #e44652;
}
.text-error {
  font-family: "Inter";
  font-weight: 400;
  font-size: 12px;
  line-height: 15px;
  color: #e44652;
  margin-top: 5px;
  animation: slideError 0.5s forwards;
}
@keyframes slideError {
  from {
    transform: translate3d(0, -10px, 0);
    opacity: 0;
  }
  to {
    transform: translate3d(0, 0, 0);
    opacity: 1;
  }
}
</style>
