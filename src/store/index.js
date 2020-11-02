import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    appId: localStorage.getItem("appId"),
    purview: localStorage.getItem("purview")
  },
  mutations: {
    getAppId(state, data) {
      state.appId = data;
      localStorage.setItem("appId", data);
    },
    getPurview(state, data) {
      state.purview = data;
      localStorage.setItem("purview", data);
    }
  },
  actions: {},
  modules: {}
});
