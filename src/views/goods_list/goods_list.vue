<template>
  <div class="goods_list_container">
    <Header title="农资商品"></Header>
    <div class="nav-bar">
      <div class="item active">农药</div>
      <div class="item">化肥</div>
      <div class="item">农膜</div>
      <div class="item">其他</div>
    </div>
    <ul class="list_ul">
      <li v-for="item in 20" :key="item">
        <el-image
          class="img"
          src="https://ss1.baidu.com/6ONXsjip0QIZ8tyhnq/it/u=4081169809,34248161&fm=173&app=25&f=JPEG?w=640&h=427&s=C301F304D0E29CAFA4A0D48A0300E090"
          fit="cover"
        >
          <div slot="placeholder" class="image-slot">
            加载中
            <span class="dot">...</span>
          </div>
        </el-image>
        <p>燕化多禧利香菇多燕化多禧利香菇多</p>
      </li>
    </ul>
    <div class="result-bar">共200个结果</div>
  </div>
</template>
<script>
import Header from "@/components/headers/headers"
export default {
  name: "goods_list",
  components: {
    Header
  },
  props: {},
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
.goods_list_container
  .nav-bar
    padding 42px 0 0
    margin 0 90px
    margin-bottom 70px
    text-align center
    border-bottom 2px solid rgba(255, 255, 255, 0.2)
    & > .item
      display inline-block
      padding 0 35px 9px
      border-bottom 4px solid transparent
      font-size 40px
      color #C5C5C5
      cursor pointer
      margin-right 20px
      &:hover
        border-bottom 4px solid #FF6500
      &.active
        border-bottom 4px solid #FF6500
        color #FF6500
  .list_ul
    margin 0 90px
    text-align left
    padding 10px 3px 0
    & > li
      margin-right 14px
      width 270px
      height 270px
      margin-bottom 55px
      display inline-block
      position relative
      cursor pointer
      &:hover
        outline 3px solid #FF6600
        box-sizing border-box
        box-shadow 0px 1px 26px #f60
      & > .img
        display block
        width 100%
        height 100%
      p
        height 70px
        position absolute
        left 0
        bottom 0
        width 100%
        color #fff
        background url('./text-bj.png') no-repeat
        background-size 100%
        background-position center
        font-size 28px
        padding-left 20px
        line-height 70px
        overflow hidden
        text-overflow ellipsis
        white-space nowrap
  .result-bar
    margin 50px 0 20px 90px
    text-align left
    font-size 30px
    color #B5B5B5
</style>
