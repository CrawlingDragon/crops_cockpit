<template>
  <ul class="nav">
    <li :class="{'active':index == '1'}">
      <span>频道</span>
    </li>
    <li :class="{'active':index == '2'}">
      <span>首页</span>
    </li>
    <li :class="{'active':index == '3'}">
      <span>医院</span>
    </li>
    <li :class="{'active':index == '4'}">
      <span>诊疗</span>
    </li>
    <li :class="{'active':index == '5'}">
      <span>发现</span>
    </li>
    <li :class="{'active':index == '6'}">
      <span>我的</span>
    </li>
  </ul>
</template>
<script>
export default {
  name: "nav_list",
  components: {},
  props: {
    index: { type: String, default: "1" },
  },
  data() {
    return {};
  },
  computed: {},
  watch: {},
  mounted() {},
  destroyed() {},
  methods: {},
};
</script>
<style lang="stylus" scoped>
.nav
  padding 40px 0
  width 75%
  margin 0 auto
  text-align center
  position fixed
  left 50%
  transform translateX(-50%)
  bottom 0
  & > li
    display inline-block
    font-size 44px
    font-family SimHei
    font-weight 400
    color rgba(197, 197, 197, 1)
    cursor pointer
    padding-bottom 10px
    span
      padding 0 40px 10px
    &.active
      span
        height 6px
        background url('./2.png') no-repeat
        background-position bottom center
        background-size 100% 6px
        color #FF6500
</style>
