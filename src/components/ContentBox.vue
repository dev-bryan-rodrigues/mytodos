<template>
  <div :style="cssVars" class="content-wrapper">
    <ButtonStandart
      @click.prevent="$emit('close', event)"
      v-if="buttonClose"
      class="button-close"
      width="36px"
      color="#B33B44"
      background="#E44652"
    >
      X
    </ButtonStandart>
    <slot />
  </div>
</template>

<script>
import ButtonStandart from "@/components/ButtonStandart.vue";

export default {
  name: "ContentBox",
  components: {
    ButtonStandart,
  },
  props: {
    maxWidth: {
      type: String,
      default: "",
    },
    buttonClose: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    cssVars() {
      return {
        "--max-width": this.maxWidth,
        "--height": this.height,
      };
    },
  },
};
</script>

<style scoped>
.content-wrapper {
  position: relative;
  background: #e4dfcf;
  border: 1px solid #111111;
  border-radius: 8px;
  width: 100%;
  height: 100%;
  max-width: var(--max-width);
  padding: 18px 18px 36px 18px;
  display: flex;
  flex-direction: column;
}
.button-close {
  position: absolute;
  top: -18px;
  right: 18px;
}
</style>
