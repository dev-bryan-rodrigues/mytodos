<template>
  <div class="home-wrapper">
    <TheHeader />
    <Projetos />
  </div>
</template>

<script>
import TheHeader from "@/components/TheHeader.vue";
import Projetos from "@/components/Organisms/Projetos.vue";
export default {
  name: "HomeView",
  components: { TheHeader, Projetos },
};
</script>

<style scoped>
.home-wrapper {
  position: relative;
}
</style>
