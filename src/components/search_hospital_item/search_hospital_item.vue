<template>
  <div class="search_hospital_item" @click="goToHospital(item)">
    <el-image class="left" fit="cover" :src="item.logo"></el-image>
    <div class="right">
      <div class="hospital-name">{{ item.name }}</div>
      <div class="hospital-address">地址：{{ item.mpaddress }}</div>
      <div class="hospital-property">属性：{{ item.levelname }}</div>
      <div class="numbers">
        <span>专家（{{ item.expert }}）</span>
        <span>会员（{{ item.user }}）</span>
        <span> 处方（{{ item.chufang }}）</span>
      </div>
      <div class="hospital-office">科室：{{ item.zuowu }}</div>
    </div>
  </div>
</template>
<script>
import { mapMutations } from "vuex";
export default {
  name: "search_hospital_item",
  components: {},
  props: {
    item: {
      type: Object,
      default: function() {
        return {};
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
    ...mapMutations(["setAppId"]),
    goToHospital(item) {
      let route = "";
      if (item.istown == 1) {
        route = this.$router.resolve({
          path: "/village_me",
          query: { appId: item.appid, from: "adminRoute" }
        });
      } else {
        route = this.$router.resolve({
          path: "/index_second",
          query: { appid: item.appid, from: "adminRoute" }
        });
      }
      // this.setIsLowerHospital("true");
      this.setAppId(item.appid);
      // window.open(route.href, "_blank");
      // let router = this.$router.resolve({
      //   path: "/index_second",
      //   query: { from: "adminRoute", appid: item.appid }
      // });
      window.open(route.href, "_blank");
    }
  }
};
</script>
<style lang="stylus" scoped>
.search_hospital_item
  width 100%
  height 235px
  padding-left 235px
  position relative
  margin-bottom 20px
  cursor pointer
  &:last-child
    margin-bottom 0
  .left
    width 235px
    height 235px
    position absolute
    left 0
    bottom 0
    top 0
  .right
    border : 2px solid rgba(255, 255, 255, 0.15);
    border-left none
    padding-left 25px
    height 100%
    & > div
      overflow hidden
      text-overflow ellipsis
      white-space nowrap
      word-break break-all
    .hospital-name
      font-size: 30px;
      color: #FFFFFF;
      padding 20px 0 25px
      line-height 1.2
    .hospital-address
      font-size 20px
      color rgba(128, 128, 128, 1)
      line-height 33px
    .hospital-property
      font-size 20px
      color rgba(128, 128, 128, 1)
      line-height 33px
    .numbers
      font-size 20px
      color #fff
      line-height 33px
    .hospital-office
      font-size 20px
      color #fff
      line-height 33px
</style>
