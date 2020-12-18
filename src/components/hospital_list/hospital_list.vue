<template>
  <div class="hospital_list-wrap">
    <div
      class="item"
      v-for="item in list"
      :key="item.id"
      @click="goTonNextHospital(item.isstore, item.appid, item.istown)"
    >
      <div class="title">{{ item.name }}</div>
      <ul>
        <li>专家<br />{{ item.expert }}</li>
        <li>会员<br />{{ item.user }}</li>
        <li>处方<br />{{ item.chufang }}</li>
      </ul>
    </div>
  </div>
</template>
<script>
import { mapMutations } from "vuex";
export default {
  name: "hospital_list",
  components: {},
  props: {
    list: {
      type: Array,
      default: function() {
        return [];
      }
    }
  },
  data() {
    return {};
  },
  computed: {},
  watch: {},
  mounted() {},
  destroyed() {},
  methods: {
    ...mapMutations(["setAppId", "setIsLowerHospital"]),
    goTonNextHospital(isstore, appId, istown) {
      // 获取医院类型，路由到对应的首页
      this.setAppId(appId);
      this.setIsLowerHospital("true");
      if (istown == 1) {
        let route = this.$router.resolve({
          path: "/village_me",
          query: { from: "adminRoute", appId: appId }
        });
        window.open(route.href, "_blank");
      } else {
        const router = this.$router.resolve({
          path: "/index_second",
          query: { appid: appId, from: "adminRoute" }
        });
        window.open(router.href, "_blank");
      }
    }
  }
};
</script>
<style lang="stylus" scoped>
.hospital_list-wrap
  .item
    width 100%
    height 190px
    margin-bottom 8px
    background #04757c
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
