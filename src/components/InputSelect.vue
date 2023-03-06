<template>
  <div>
    <select name="select" id="select" v-model="value">
      <option v-for="option in options" :key="option.id" :value="option">
        {{ option.title }}
      </option>
    </select>
  </div>
</template>

<script>
export default {
  name: "InputSelect",
  props: {
    options: {
      type: Array,
      require: true,
    },
  },
  data() {
    return {
      value: {},
    };
  },
  watch: {
    value() {
      this.$emit("select", this.value);
    },
  },
  created() {
    this.value = this.options[0];
  },
};
</script>

<style scoped>
select {
  background: #fdfaf3;
  border: 1px solid #111111;
  border-radius: 4px;
  width: 314px;
  max-width: 314px;
  height: 36px;
  font-weight: 600;
  font-size: 14px;
  line-height: 21px;
  color: #111111;
  padding-left: 10px;
}
option {
  font-weight: 600;
  font-size: 14px;
  line-height: 21px;
  color: #111111;
}
</style>
