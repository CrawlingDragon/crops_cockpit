<template>
  <div class="foot-wrap">
    <ul class="nav container-wrap">
      <div class="number" v-if="number != 0">共 {{ number }} 条数据</div>
      <li
        :class="{ active: index == 0 }"
        @click="changeRouter('频道')"
        v-show="showNav"
      >
        <span>频道</span>
      </li>
      <li
        :class="{ active: index == 1 }"
        @click="changeRouter('首页')"
        v-show="showNav"
      >
        <span>首页</span>
      </li>
      <li
        :class="{ active: index == 2 }"
        @click="changeRouter('医院')"
        v-show="showNav"
      >
        <span>医院</span>
      </li>
      <li
        :class="{ active: index == 3 }"
        @click="changeRouter('诊疗')"
        v-show="showNav"
      >
        <span>诊疗</span>
      </li>
      <li
        :class="{ active: index == 4 }"
        @click="changeRouter('发现')"
        v-show="showNav"
        v-if="purview == 2 || purview == 46"
      >
        <span>发现</span>
      </li>
      <li
        :class="{ active: index == 5 }"
        @click="changeRouter('我的')"
        v-show="showNav"
      >
        <span>{{ purview == 4 || purview == 3 ? "关于" : "我的" }}</span>
      </li>
    </ul>
  </div>
</template>
<script>
import { mapState, mapMutations } from "vuex";
export default {
  name: "nav_list_third",
  components: {},
  props: {
    index: { type: Number, default: 1 },
    number: {
      type: Number,
      default: 0
    },
    showNav: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {};
  },
  computed: {
    ...mapState(["purview", "loginId"])
  },
  watch: {},
  mounted() {
    // this.setAppId(this.loginId);
  },
  destroyed() {},
  methods: {
    ...mapMutations(["setAppId", "setIsLowerHospital"]),
    changeRouter(where) {
      this.setIsLowerHospital("false");
      switch (where) {
        case "频道":
          this.$router.push({
            path: "/online_hospital_channel_gather"
          });
          break;
        case "医院":
          this.$router.push({
            path: "/hospitalsort"
          });
          break;
        case "首页":
          this.$router.push({
            path: "/index_first"
          });
          break;
        case "诊疗":
          this.$router.push({
            path: "/diagnosis_general"
          });
          break;
        case "发现":
          this.$router.push({
            path: "/find",
            query: { fromRoute: "general" }
          });
          break;
        case "我的":
          this.$router.push({
            path: "/me",
            query: { fromRoute: "general" }
          });
          break;
      }
    }
  }
};
</script>
<style lang="stylus" scoped>
.foot-wrap
  position fixed
  height 135px
  background #080f3e
  bottom 0
  left 0
  right 0
  z-index 22
  .nav
    margin 0 auto
    text-align center
    position relative
    height 100%
    .number
      position absolute
      padding-left 40px
      margin-top 20px
      font-size 20px
      text-align left
      color: #C5C5C5;
    & > li
      margin-top 30px
      display inline-block
      font-size 44px
      font-family SimHei
      font-weight 400
      color rgba(197, 197, 197, 1)
      cursor pointer
      &:hover
        span
          color #FF6500
      span
        padding 0 40px 10px
      &.active
        span
          color #FF6500
</style>
