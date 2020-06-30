<template>
  <div class="second_zuo-container">
    <ul class="wang-ul">
      <li v-for="item in 6" :key="item">
        <div class="icon"></div>
        <div class="text">
          <div class="time">黄泽黄桃专科医院·黄桂花的番茄坐诊</div>
          <p class="p1">病情描述：番茄的病情很严重，就医就医，已经持续很久很久了。</p>
          <p class="p1">坐诊日期：2017-05-27</p>
          <p class="p1">处方专家：沈冰</p>
        </div>
        <div class="answer">
          <div class="p2">处方药：拜耳 露娜森 42.8%氟菌肟菌脂杀菌剂</div>
          <ul>
            <li v-for="item in 3" :key="item">
              <el-image src class="img"></el-image>
            </li>
          </ul>
        </div>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  name: "second_zuo",
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
.second_zuo-container
  min-height 724px
  .wang-ul
    margin 48px 90px 0
    & > li
      background rgba(9, 29, 67, 0.4)
      border 1px solid rgba(255, 255, 255, 0.2)
      margin-bottom 11px
      display flex
      padding 22px
      height 220px
      & > .icon
        width 30px
        height 40px
        background url('./31.png') no-repeat
        background-position center
        background-size 100%
        margin-right 30px
      .text
        flex 1
        text-align left
        min-width 0
        overflow hidden
        text-overflow ellipsis
        display -webkit-box
        -webkit-line-clamp 3
        -webkit-box-orient vertical
        .time
          font-size 36px
          font-family SimHei
          font-weight 400
          line-height 1.2
          margin-bottom 20px
        .p1
          color #B5B5B5
          font-size 24px
      .answer
        font-size 24px
        color #B5B5B5
        margin-left 50px
        .p2
          margin-bottom 38px
          line-height 1.2
        ul
          text-align right
          li
            display inline-block
            margin-left 20px
            .img
              width 110px
              height 110px
</style>
