import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import store from "./store";
import "./plugins/element.js";
import ECharts from "vue-echarts";
import axios from "./http";
import router from "./router/index";
import "./common/css/react.styl";
import VueLazyLoad from "vue-lazyload";
// import "echarts/lib/component/category";
import "swiper/dist/css/swiper.min.css";
Vue.component("v-chart", ECharts);
Vue.prototype.$axios = axios;
Vue.config.productionTip = false;
Vue.use(VueLazyLoad);

Vue.prototype.openLoading = function() {
  const loading = this.$loading({ // 声明一个loading对象
    lock: true, // 是否锁屏
    customClass: "create-isLoading", // 添加类名
    text: "正在加载中...", // 加载动画的文字
    spinner: "el-icon-loading", // 引入的loading图标
    background: "rgba(3, 5, 57, 0.8)", // 背景颜色
    fontSize: "30px"
  });
  return loading;
};

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
