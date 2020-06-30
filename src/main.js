import Vue from "vue"
import App from "./App.vue"
import "./registerServiceWorker"
import router from "./router"
import store from "./store"
import "./plugins/element.js"

import axios from "axios"
import QS from "qs"

Vue.prototype.$axios = axios
Vue.prototype.qs = QS

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app")
