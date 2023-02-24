import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

Vue.config.productionTip = false;

Vue.filter("dataBR", (value) => {
  if (!value) return "--";

  const date = new Date(value);
  return date.toLocaleString(["pt-BR"], {
    month: "short",
    day: "2-digit",
    year: "numeric",
    timeZone: "UTC",
  });
});

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
