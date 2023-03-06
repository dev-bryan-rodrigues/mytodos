<template>
  <div>
    <button @click.prevent="$emit('click', $event)" :style="cssVars">
      <slot />
    </button>
  </div>
</template>

<script>
export default {
  name: "ButtonStandart",
  props: {
    background: {
      type: String,
      default: "#A8EAD5",
    },
    color: {
      type: String,
      default: "#258C80",
    },
    padding: {
      type: String,
      default: "",
    },
    fontSize: {
      type: String,
      default: "20px",
    },
    width: {
      type: String,
      default: "100%",
    },
  },
  computed: {
    cssVars() {
      return {
        "--background": this.background,
        "--color": this.color,
        "--backgroundHover": this.backgroundHover,
        "--colorHover": this.colorHover,
        "--padding": this.padding,
        "--fontSize": this.fontSize,
        "--width": this.width,
      };
    },
  },
};
</script>

<style scoped>
button {
  background: var(--background);
  color: var(--color);
  border: 1px solid var(--color);
  transition: all 0.3s;
  cursor: pointer;
  padding: var(--padding);
  font-size: var(--fontSize);
  font-weight: 600;
  border-radius: 4px;
  line-height: 30px;
  width: var(--width);
}
button:hover {
  transform: scale(1.03);
}
</style>
