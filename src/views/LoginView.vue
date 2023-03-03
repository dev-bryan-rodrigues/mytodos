<template>
  <div class="login-wrapper">
    <h1>myTodos</h1>
    <transition mode="out-in">
      <div key="login" v-if="login === 'login'" class="login">
        <h2>Login</h2>
        <ContentBox max-width="350px" v-if="login === 'login'">
          <form>
            <InputLabel width="314px" label="Nome" />
            <InputLabel width="314px" label="Senha" />
            <ButtonStandart width="314px" padding="2px 112px">
              Entrar
            </ButtonStandart>
            <p>Ou</p>
            <ButtonStandart
              width="314px"
              padding="2px 90px"
              @click="login = 'create'"
            >
              Criar conta
            </ButtonStandart>
          </form>
        </ContentBox>
      </div>
      <div key="create" v-else class="create">
        <h2>Criar Conta</h2>
        <ContentBox max-width="350px">
          <form>
            <InputLabel width="314px" label="Nome" />
            <InputLabel width="314px" label="Senha" />
            <InputLabel width="314px" label="Confirme a senha" />

            <ButtonStandart width="314px" padding="2px 90px">
              Criar conta
            </ButtonStandart>
            <p>Ou</p>
            <ButtonStandart
              width="314px"
              padding="2px 112px"
              @click="login = 'login'"
            >
              Entrar
            </ButtonStandart>
          </form>
        </ContentBox>
      </div>
    </transition>
  </div>
</template>

<script>
import ContentBox from "@/components/ContentBox.vue";
import InputLabel from "@/components/InputLabel.vue";
import ButtonStandart from "@/components/ButtonStandart.vue";

export default {
  name: "LoginView",
  components: { ContentBox, InputLabel, ButtonStandart },
  data() {
    return {
      login: "login",
    };
  },
};
</script>

<style scoped>
.login-wrapper {
  padding-top: 65px;
  padding-bottom: 65px;
  display: flex;
  align-items: center;
  flex-direction: column;
}
h1 {
  font-weight: 600;
  font-size: 96px;
  line-height: 144px;
  color: #258c80;
  text-shadow: 0px 10px 10px rgba(0, 0, 0, 0.25);
  margin-bottom: 50px;
}
h2 {
  font-weight: 600;
  font-size: 32px;
  line-height: 48px;
  color: #111111;
  margin-bottom: 18px;
}
form {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  gap: 18px;
}
form p {
  font-weight: 600;
  font-size: 20px;
  line-height: 30px;
}
.login,
.create {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.v-enter {
  opacity: 0;
  transform: translate3d(0, -50px, 0);
}
.v-leave-to {
  opacity: 0;
  transform: translate3d(0, 50px, 0);
}
.v-enter-active,
.v-leave-active {
  transition: all 0.7s;
}
</style>
