<template>
  <div :style="cssVars" class="content-wrapper">
    <ButtonStandart
      @click.prevent="$emit('close', $event)"
      v-if="buttonClose"
      class="button-close"
      width="36px"
      color="#B33B44"
      background="#E44652"
    >
      X
    </ButtonStandart>
    <div class="top" v-if="title">
      <h2>
        {{ title }}
      </h2>
    </div>
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
    height: {
      type: String,
      default: "100%",
    },
    buttonClose: {
      type: Boolean,
      default: false,
    },
    title: {
      type: String,
      default: "",
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
  height: var(--height);
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
.top {
  padding-bottom: 10px;
  border-bottom: 1px solid rgba(17, 17, 17, 0.1);
  margin-bottom: 12px;
}
h2 {
  font-family: "Poppins";
  font-weight: 600;
  font-size: 24px;
  line-height: 100%;
}
</style>
