<template>
  <div class="hospital_list-wrap">
    <div class="item" v-for="item in list" :key="item.id" @click="goTonNextHospital(item.appid)">
      <div class="title">{{item.name}}</div>
      <ul>
        <li>专家<br />{{item.expert}}</li>
        <li>网诊<br />{{item.wen}}</li>
        <li>处方<br />{{item.chufang}}</li>
      </ul>
    </div>
  </div>
</template>
<script>
import axios from "@/http.js";
export default {
  name: "hospital_list",
  components: {},
  props: {
    list: {
      type: Array,
      default: function () {
        return [];
      },
    },
  },
  data() {
    return {};
  },
  computed: {},
  watch: {},
  mounted() {},
  destroyed() {},
  methods: {
    goTonNextHospital(appid) {
      // 获取医院类型，路由到对应的首页
      axios
        .fetchPost("/Home/Index/GetIndexMpData", { appId: appid })
        .then((res) => {
          if (res.data.code === "200") {
            this.getHospitalType(res.data.data.purview, appid);
          }
        });
      // this.$router.push({});
    },
    getHospitalType(purview, appid) {
      switch (purview) {
        case 1:
          this.$router.push({
            path: "/index_second",
            query: { appid: appid },
          });
          break;
        case 2:
          this.$router.push({
            path: "/index_third",
            query: { appid: appid },
          });
          break;
        case 3:
          this.$router.push({
            path: "/index",
            query: { appid: appid },
          });
          break;
        case 4:
          this.$router.push({
            path: "/",
            query: { appid: appid },
          });
          break;
      }
    },
  },
};
</script>
<style lang="stylus" scoped>
.hospital_list-wrap
  .item
    width 100%
    height 190px
    margin-bottom 8px
    background #2494DE
    text-align left
    padding-left 30px
    padding-top 34px
    .title
      font-size 38px
      line-height 1.1
      font-family SimHei
      margin-bottom 18px
      overflow hidden
      text-overflow ellipsis
      white-space nowrap
      word-break break-all
    ul
      li
        display inline-block
        font-family SimHei
        width 33.33%
        font-size 30px
        color #CECECE
        line-height 1.1
</style>
