<template>
  <div class="modal">
    <slot />
  </div>
</template>

<script>
export default {
  name: "TheModal",
};
</script>

<style scoped>
.modal {
  position: fixed;
  width: 100%;
  height: 100vh;
  background: rgba(58, 60, 66, 0.8);
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
