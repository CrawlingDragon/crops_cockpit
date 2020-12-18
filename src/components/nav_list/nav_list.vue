<template>
  <div class="foot-wrap">
    <ul class="nav">
      <div class="number" v-if="number != 0">共 {{ number }} 条数据</div>
      <li
        :class="{ active: index == 1 }"
        @click="changeRouter('频道')"
        v-show="showNav"
        v-if="purview == 1"
      >
        <span>频道</span>
      </li>
      <li
        :class="{ active: index == 2 }"
        @click="changeRouter('首页')"
        v-show="showNav"
      >
        <span>首页</span>
      </li>
      <li
        :class="{ active: index == 3 }"
        @click="changeRouter('网诊')"
        v-show="showNav"
      >
        <span>网诊</span>
      </li>
      <li
        :class="{ active: index == 4 }"
        @click="changeRouter('发现')"
        v-show="showNav"
        v-if="purview == 1"
      >
        <span>发现</span>
      </li>
      <li
        :class="{ active: index == 5 }"
        @click="changeRouter('我的')"
        v-show="showNav"
      >
        <span>{{
          purview == 3 ||
          purview == 4 ||
          (purview == 46 && isLowerHospital == "true")
            ? "关于"
            : "我的"
        }}</span>
      </li>
    </ul>
  </div>
</template>
<script>
import { mapState } from "vuex";
export default {
  name: "nav_list",
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
    ...mapState(["purview", "isLowerHospital"])
  },
  watch: {},
  mounted() {},
  destroyed() {},
  methods: {
    changeRouter(where) {
      switch (where) {
        case "频道":
          this.$router.push({
            path: "/online_hospital_channel"
          });
          break;
        case "首页":
          this.$router.push({
            path: "/index_third"
          });
          break;
        case "网诊":
          this.$router.push({
            path: "/second_wang"
          });
          break;
        case "发现":
          this.$router.push({
            path: "/find"
          });
          break;
        case "我的":
          this.$router.push({
            path: "/me"
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
    width 1900px
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
