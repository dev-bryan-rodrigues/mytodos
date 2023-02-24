<template>
  <div class="modal" @click="fecharModal" :style="cssVars">
    <div class="modal-wrapper">
      <div class="modal-top">
        <h1>{{ title }}</h1>
        <button @click.prevent="$emit('fecharModal')" class="btn">X</button>
      </div>
      <slot />
    </div>
  </div>
</template>

<script>
export default {
  name: "ModalComponent",
  props: {
    title: {
      type: String,
      default: "",
    },
    width: {
      type: String,
      default: "800px",
    },
    height: {
      type: String,
      default: "500px",
    },
  },
  methods: {
    fecharModal({ currentTarget, target }) {
      if (currentTarget === target) {
        this.$emit("fecharModal");
      }
    },
  },
  computed: {
    cssVars() {
      return {
        "--width": this.width,
        "--height": this.height,
      };
    },
  },
};
</script>

<style scoped>
.modal {
  position: fixed;
  width: 100%;
  height: 100vh;
  top: 0;
  left: 0;
  background: rgba(19, 72, 102, 0.4);
  display: flex;
  align-items: center;
  justify-content: center;
}
.modal-wrapper {
  width: 100%;
  max-width: var(--width);
  height: var(--height);
  background: #ebfdff;
  border-radius: 8px;
  padding: 20px;
  position: relative;
}
.modal-top {
  display: flex;
  border-bottom: 1px solid rgba(1, 133, 185, 0.2);
  padding-bottom: 12px;
}
.btn {
  color: #134866;
  position: absolute;
  top: -20px;
  right: 20px;
}
</style>
