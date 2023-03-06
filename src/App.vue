<template>
  <div id="app">
    <transition mode="out-in">
      <router-view />
    </transition>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "App",
  computed: {
    ...mapGetters(["user"]),
  },
  created() {
    if (!this.user.password) {
      this.$router.push("/");
    }
  },
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: "Poppins", sans-serif;
  text-decoration: none;
  list-style: none;
  color: #111111;
}

img {
  max-width: 100%;
  display: block;
}
body {
  background: #faf8f0;
}
.v-enter {
  opacity: 0;
  transform: translate3d(-50px, 0, 0);
}
.v-leave-to {
  opacity: 0;
  transform: translate3d(50px, 0, 0);
}
.v-enter-active,
.v-leave-active {
  transition: all 0.5s;
}
</style>
