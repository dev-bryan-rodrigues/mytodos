<template>
  <header>
    <router-link to="/">
      <div class="logo">
        <h1>MyTodo</h1>
      </div>
    </router-link>
    <div class="link">
      <router-link to="/">
        <img src="@/assets/logo.png" alt="" />
      </router-link>
      <router-link to="/user">
        <img src="@/assets/user.png" alt="usericon" class="user" />
      </router-link>
    </div>
  </header>
</template>

<script>
export default {
  name: "TheHeader",
};
</script>

<style scoped>
header {
  width: 100%;
  height: 70px;
  background: #00a9dc;
  padding: 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-shadow: 0px 4px 8px rgba(9, 107, 149, 0.3);
  border-radius: 0 0 10px 10px;
}
.logo img {
  height: 60px;
}
.link img {
  height: 50px;
}
.link img.user {
  opacity: 0.7;
  height: 45px;
}
.link {
  display: flex;
  align-items: center;
  gap: 20px;
}

.logo {
  display: flex;
  align-items: center;
  gap: 20px;
}
.logo h1 {
  color: #096b95;
}
.router-link-exact-active .router-link-active {
  border-bottom: 12px solid #fff;
}
</style>
