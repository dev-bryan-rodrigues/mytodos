<template>
  <header>
    <h1>myTodos</h1>
    <div class="user">
      <img src="@/assets/user.svg" alt="Ícone do usuário" />
      <p>{{ user.name }}</p>
      <img
        src="@/assets/logout.svg"
        alt="Íconde de logout"
        class="logout-icon"
        @click="sair"
      />
    </div>
  </header>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  name: "TheHeader",
  computed: {
    ...mapGetters(["user"]),
  },
  methods: {
    ...mapActions(["logout"]),
    async sair() {
      await this.logout();
      this.$router.push("/");
    },
  },
};
</script>

<style scoped>
header {
  width: 100%;
  height: 100px;
  background: #a8ead5;
  padding: 14px 40px;
  display: grid;
  grid-template-columns: 1fr;
  align-items: center;
  justify-content: center;
  border-radius: 0 0 16px 16px;
}
h1 {
  display: block;
  font-size: 48px;
  font-weight: 600;
  line-height: 72px;
  font-family: "Poppins";
  color: #258c80;
  grid-column: 1;
  grid-row: 1;
  justify-self: center;
}
.user {
  grid-column: 1;
  grid-row: 1;
  display: flex;
  align-items: center;
  gap: 24px;
  justify-self: end;
}
.user p {
  font-weight: 600;
  font-size: 24px;
  line-height: 36px;
  color: #258c80;
}
.logout-icon {
  cursor: pointer;
  transition: all 0.5s;
}
.logout-icon:hover {
  transform: scale(1.05);
}
@media (max-width: 1320px) {
  header {
    height: 80px;
  }
  h1 {
    font-size: 36px;
    line-height: 100%;
  }
}
</style>
