import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import "./plugins/element.js";
import ECharts from "vue-echarts";
import axios from "./http";
import "./common/css/react.styl";
// import "echarts/lib/component/category";
Vue.component("v-chart", ECharts);

Vue.prototype.$axios = axios;
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
