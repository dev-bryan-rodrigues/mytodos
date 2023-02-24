<template>
  <div id="app">
    <TheHeader />
    <transition mode="out-in">
      <router-view />
    </transition>
  </div>
</template>

<script>
import TheHeader from "./components/TheHeader.vue";

export default {
  name: "App",
  components: {
    TheHeader,
  },
  created() {
    this.$router.push("/user");
  },
};
</script>

<style>
/* Color Base:#42d9ff*/

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: "Inter", sans-serif;
  text-decoration: none;
  list-style: none;
  color: #134866;
}

img {
  max-width: 100%;
  display: block;
}
body {
  background: #ebfdff;
}
.btn {
  width: 50px;
  height: 50px;
  border-radius: 15px;
  border: none;
  font-size: 40px;
  background: #00a9dc;
  color: #cdf8ff;
  cursor: pointer;
  box-shadow: -1px 1px 2px rgba(9, 107, 149, 0.4);
  transition: all 0.3s;
}
.btn:hover {
  transform: scale(1.1);
  background: #18b5e0;
  box-shadow: -2px 2px 4px rgba(9, 107, 149, 0.4);
}
</style>
