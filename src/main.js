require("./bootstrap");
require("./axios");
import Vue from "vue";
import App from "./App.vue";
import router from "./router/index";
require("./plugins/notify");
require("./plugins/font-awesome");
import Vuelidate from "vuelidate";
Vue.use(Vuelidate);

Vue.config.productionTip = false;

import store from "./store";

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
