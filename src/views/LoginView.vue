<template>
  <div class="login-wrapper">
    <div class="left-animation">
      <div class="todo-card one">
        <img src="@/assets/cardtodo.svg" alt="" />
      </div>
      <div class="todo-card two">
        <img src="@/assets/cardtodo.svg" alt="" />
      </div>
      <div class="todo-card three">
        <img src="@/assets/cardtodo.svg" alt="" />
      </div>
      <div class="todo-card four">
        <img src="@/assets/cardtodo.svg" alt="" />
      </div>
    </div>
    <div class="center">
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

    <div class="right-animation">
      <div class="todo-card five">
        <img src="@/assets/cardtodo.svg" alt="" />
      </div>
      <div class="todo-card six">
        <img src="@/assets/cardtodo.svg" alt="" />
      </div>
      <div class="todo-card seven">
        <img src="@/assets/cardtodo.svg" alt="" />
      </div>
    </div>
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
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
}
.center {
  display: flex;
  align-items: center;
  flex-direction: column;
  grid-column: 2;
}
.left-animation {
  grid-column: 1;
}
.right-animation {
  grid-column: 3;
}
.left-animation,
.right-animation {
  position: relative;
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
.todo-card.one {
  position: absolute;
  left: 140px;
  top: 50px;
  animation: moveY 5s alternate infinite;
}
.todo-card.two {
  position: absolute;
  left: 287px;
  top: 200px;
  animation: moveX 3s alternate infinite;
}
.todo-card.three {
  position: absolute;
  left: 69px;
  top: 400px;
  animation: moveY 3s alternate infinite;
}
.todo-card.four {
  position: absolute;
  left: 330px;
  top: 600px;
  animation: moveX 2s alternate infinite;
}
.todo-card.five {
  position: absolute;
  left: 30px;
  top: 126px;
  animation: moveY 2s alternate infinite;
}
.todo-card.six {
  position: absolute;
  left: 115px;
  top: 350px;
  animation: moveX 2s alternate infinite;
}
.todo-card.seven {
  position: absolute;
  left: 200px;
  top: 500px;
  animation: moveY 4s alternate infinite;
}
.todo-card {
  z-index: -1;
}
@keyframes moveY {
  to {
    transform: translate3d(0, 0px, 0);
  }
  from {
    transform: translate3d(0, 50px, 0);
    opacity: 0.3;
  }
}
@keyframes moveX {
  to {
    transform: translate3d(0, 0px, 0);
  }
  from {
    transform: translate3d(50px, 0, 0);
    opacity: 0.3;
  }
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
