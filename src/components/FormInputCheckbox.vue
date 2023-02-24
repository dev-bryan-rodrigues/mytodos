<template>
  <div class="checkbox-wrapper">
    <div class="top">
      <input
        type="checkbox"
        name="select"
        id="select"
        @click="$emit('check', value)"
        v-model="check"
      />
      <p>{{ title }}</p>
    </div>
    <slot />
  </div>
</template>

<script>
export default {
  name: "FormInputCheckbox",
  props: {
    title: {
      type: String,
      default: "",
    },
    value: {
      type: Number,
      default: null,
    },
    selected: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      check: false,
    };
  },
  watch: {
    selected() {
      this.check = this.selected;
    },
  },
};
</script>

<style scoped>
.checkbox-wrapper {
  width: 100%;
  background: #cdf8ff;
  max-width: 300px;
  padding: 15px;
}
.top {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 18px;
  font-weight: 600;
  border-radius: 4px;
}
input {
  width: 30px;
  height: 30px;
}
</style>
