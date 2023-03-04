<template>
  <div class="input-wrapper">
    <label for="input">{{ label }}</label>
    <input :type="type" name="input" id="input" v-model="value" />
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
</style>
