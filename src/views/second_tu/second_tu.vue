<template>
  <div class="tu-container">
    <div class="bar">
      <div class="item active">全部</div>
      <div class="item">检测中</div>
      <div class="item">检测完成</div>
      <div class="item">已给处方</div>
    </div>
    <ul class="tu-ul">
      <li v-for="item in 6" :key="item">
        <div class="icon"></div>
        <div class="text">
          <p class="p1">
            嵊州蔬菜专科医院·黄莲蓉的番茄地
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
  margin 50px 90px 0
  min-height 724px
  .bar
    text-align left
    .item
      display inline-block
      border 1px solid rgba(255, 255, 255, 0.2)
      background rgba(27, 57, 93, 0.4)
      height 60px
      line-height 60px
      width 170px
      text-align center
      font-size 36px
      color rgba(181, 181, 181, 1)
      margin-right 52px
      cursor pointer
      &:hover
        outline 3px solid #FF6600
        box-shadow 0px 1px 26px #f60
        color #fff
      &.active
        border 1px solid #eee
        color #eee
        &:hover
          border 1px solid #eee
          color #eee
          outline none
          box-shadow none
  .tu-ul
    margin 30px auto
    & > li
      background rgba(9, 29, 67, 0.4)
      border 1px solid rgba(255, 255, 255, 0.2)
      margin-bottom 11px
      padding 30px 0 20px
      display flex
      & > .icon
        width 30px
        height 40px
        background url('./31.png') no-repeat
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
          font-weight 400
          color rgba(255, 255, 255, 1)
          line-height 1.2
          margin-top -3px
          margin-bottom 25px
          span
            margin-left 20px
            font-size 24px
            color rgba(181, 181, 181, 1)
        .p2, .p3
          color #B5B5B5
          font-size 24px
          line-height 1.2
          margin-bottom 10px
      .test-status
        min-width 260px
        line-height 141px
        & > .icon
          width 40px
          height 40px
          display inline-block
          margin-right 21px
          vertical-align middle
          &.icon-ing
            background url('./27.png') no-repeat
            background-position center
            background-size 100%
          &.icon-success
            background url('./27.png') no-repeat
            background-position center
            background-size 100%
          &.icon-way
            background url('./27.png') no-repeat
            background-position center
            background-size 100%
        p
          color #FF6500
          font-size 36px
          display inline-block
          vertical-align middle
</style>
