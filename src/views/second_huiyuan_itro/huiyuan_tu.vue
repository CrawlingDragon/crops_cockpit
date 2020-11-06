<template>
  <div class="tu-container">
    <ul class="tu-ul">
      <li v-for="item in 4" :key="item">
        <div class="icon"></div>
        <div class="text">
          <p class="p1">
            番茄地
            <span>ID:1233456</span>
          </p>
          <p class="p2">青塘村大山脚下那块正方形的地</p>
          <p class="p3">取样日期：2017-05-27</p>
        </div>
        <div class="test-status">
          <div class="icon icon-ing"></div>
          <!-- <div class="icon icon-success"></div>
          <div class="icon icon-way"></div>-->
          <p>检测中</p>
        </div>
      </li>
    </ul>
    <div class="total">共计15个结果</div>
  </div>
</template>
<script>
export default {
  name: "second_tu",
  components: {},
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
.tu-container
  margin 0 40px
  height 741px
  .tu-ul
    margin 0px auto
    & > li
      background rgba(9, 29, 67, 0.4)
      border 1px solid rgba(255, 255, 255, 0.2)
      margin-bottom 11px
      padding 30px 0 0 22px
      display flex
      & > .icon
        width 22px
        height 29px
        background url('../second_tu/31.png') no-repeat
        background-position center
        background-size 100%
        margin 0 28px 0 22px
      .text
        flex 1
        margin-bottom 10px
        text-align left
        .p1
          font-size 36px
          font-family SimHei
          font-weight Regular
          color rgba(255, 255, 255, 1)
          line-height 1.2
          margin-top -3px
          margin-bottom 15px
          span
            margin-left 20px
            font-size 24px
            color rgba(181, 181, 181, 1)
        .p2, .p3
          color #B5B5B5
          font-size 24px
          line-height 40px
      .test-status
        min-width 260px
        line-height 120px
        & > .icon
          width 40px
          height 40px
          display inline-block
          margin-right 21px
          vertical-align middle
          &.icon-ing
            background url('../second_tu/27.png') no-repeat
            background-position center
            background-size 100%
          &.icon-success
            background url('../second_tu/27.png') no-repeat
            background-position center
            background-size 100%
          &.icon-way
            background url('../second_tu/27.png') no-repeat
            background-position center
            background-size 100%
        p
          color #FF6500
          font-size 36px
          display inline-block
          vertical-align middle
.total
    position fixed
    left 40px
    bottom 79px
    color #B5B5B5
    font-size 24px
</style>
