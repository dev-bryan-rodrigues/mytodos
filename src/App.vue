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
};
</script>

<style>
/* Color Base:#42d9ff*/

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
</style>
