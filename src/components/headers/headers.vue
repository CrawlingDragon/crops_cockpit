<template>
  <div class="head-wrap cf">
    <div class="left-bar">
      <div class="logo" v-show="logoSrc">
        <img :src="logoSrc" alt />
      </div>
      <h2 class="h2">{{title}}</h2>
    </div>
    <div class="right-bar">
      <div class="time">18:24</div>
      <div class="weather">
        <span class="icon"></span>
        <span>19.c</span>
      </div>
      <div class="reload">
        <span class="icon"></span>
        <span>刷新</span>
      </div>
      <div class="search">
        <span class="icon"></span>
        <span>搜索</span>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "headers",
  components: {},
  props: {
    title: {
      type: String,
      default: ""
    },
    logoSrc: {
      type: String,
      default: ""
    }
  },
  data() {
    return {}
  },
  computed: {},
  watch: {},
  mounted() {},
  destroyed() {},
  methods: {}
}
</script>
<style lang="stylus" scoped>
.head-wrap
  padding 45px 90px 20px
  .left-bar
    width 50%
    float left
    display flex
    align-items top
    line-height 1.2
    .h2
      flex 1
      text-align left
      font-size 44px
      color rgba(181, 181, 181, 1)
      font-weight 400
    .logo
      float left
      width 90px
      height 60px
      img
        display block
        width 100%
        height 100%
  .right-bar
    width 50%
    float right
    display flex
    align-items center
    justify-content flex-end
    .search
      color #000000
      width 160px
      height 50px
      background rgba(255, 255, 255, 1)
      opacity 0.5
      border-radius 25px
      display flex
      align-items center
      justify-content center
      font-size 30px
      .icon
        display inline-block
        width 30px
        height 30px
        background url('./4.png') no-repeat
        margin-right 8px
    .reload
      color #B5B5B5
      font-size 30px
      display flex
      align-items center
      margin-right 50px
      .icon
        display inline-block
        width 37px
        height 30px
        background url('./3.png') no-repeat
        margin-right 8px
    .weather
      color #B5B5B5
      font-size 30px
      display flex
      align-items center
      margin-right 37px
      .icon
        display inline-block
        width 34px
        height 34px
        background url('./2.png') no-repeat
        margin-right 8px
    .time
      color #B5B5B5
      font-size 30px
      display flex
      align-items center
      margin-right 50px
</style>
