<template>
  <!-- 坐诊网诊详情 -->
  <div class="sit_detail-container">
    <Header title="坐诊详情">1</Header>
    <div class="titles">黄桂花的番茄提问</div>
    <div class="info-box">
      <div class="left">
        <div class="t">作物病情资料</div>
        <p class="p1">种植模式：露地种植</p>
        <p class="p1">病发程度：零星发生</p>
        <p class="p1">坐诊日期：2017-05-27</p>
        <p class="p1">
          病情描述：番茄的病情很严重，就医就医，已经持
          续很久很久了
        </p>
        <ul class="left-ul clearfix">
          <div class="ul-t">病情图片（4）</div>
          <li v-for="item in 4" :key="item">
            <el-image src fit="cover" class="img"></el-image>
          </li>
        </ul>
      </div>
      <div class="right">
        <div class="right-t">处方信息</div>
        <div class="text">
          处方专家：沈兵
          看诊结果：使用下面几种药混合使用。疗效更好。使用下面几种药混合使用。疗效更好。使用下面几种
          药混合使用。疗效更好。使用下面几种药混合使用。疗效更好。使用下面几种药混合使用。疗效更好。
          使用下面几种药混合使用。疗效更好。使用下面几种药混合使用。疗效更好。使用下面几种药混合使用。
          疗效更好。使用下面几种药混合使用。疗效更好。使用下面几种药混合使用。疗效更好。疗效更好。使
          用下面几种药混合使用。疗效更好。使用下面几种药混合使用。疗效更好。使用下面几种药混合使用。
          疗效更好。疗效更好。使用下面几种药混合使用。疗效更好。使用下面几种药混合使用。疗效更好。使
          用下面几种药混合使用。疗效更好。疗效更好。使用下面几种药混合使用。疗效更好。使用下面几种药
        </div>
      </div>
    </div>
    <div class="recipe-box">
      <div class="l">
        <div class="icon"></div>
        <p>
          处方药
          <br />（5）
        </p>
      </div>
      <div class="ul-wrap">
        <ul class="r-ul">
          <li v-for="item in 8" :key="item">
            <el-image fit="cover" class="img"></el-image>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
import Header from "@/components/headers/headers"
export default {
  name: "sit_detail",
  components: { Header },
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
.sit_detail-container
  text-align left
  font-family SimHei
  .titles
    font-size 44px
    font-family SimHei
    font-weight 400
    color rgba(255, 255, 255, 1)
    text-align left
    padding-left 90px
    margin-top 20px
    margin-bottom 40px
  .info-box
    margin 0 90px
    .left
      display inline-block
      width 580px
      margin-right 30px
      box-sizing border-box
      background rgba(9, 29, 67, 0.4)
      border 1px solid rgba(255, 255, 255, 0.2)
      vertical-align top
      height 460px
      padding 20px 0 16px 30px
      .t
        font-size 30px
        color #FFFFFF
        margin-bottom 10px
      .p1
        font-size 24px
        color #B5B5B5
        margin-bottom 5px
      .left-ul
        margin-top 10px
        .ul-t
          font-size 30px
          color #FFFFFF
          margin-bottom 10px
        li
          display inline-block
          margin-right 10px
          .img
            width 110px
            height 110px
    .right
      display inline-block
      width 1115px
      box-sizing border-box
      background rgba(9, 29, 67, 0.4)
      border 1px solid rgba(255, 255, 255, 0.2)
      vertical-align top
      height 460px
      padding 20px 30px
      overflow-x auto
      .right-t
        font-size 30px
        color #FFFFFF
        margin-bottom 15px
      .text
        color #B5B5B5
        font-size 24px
        line-height 35px
  .recipe-box
    margin 40px 0 0 90px
    display flex
    .l
      background rgba(9, 29, 67, 0.4)
      border 1px solid rgba(255, 255, 255, 0.2)
      width 140px
      height 270px
      display inline-block
      vertical-align top
      text-align center
      margin-right 40px
      .icon
        width 60px
        height 70px
        background url('./24.png') center no-repeat
        margin 45px auto 0
      p
        font-size 34px
        color #fff
        line-height 34px
        margin-top 34px
    .ul-wrap
      flex 1
      min-width 0
      overflow-x auto
      height 291px
    .r-ul
      display inline-block
      vertical-align top
      height 270px
      width 3000px
      li
        display inline-block
        margin-right 15px
        .img
          width 270px
          height 270px
</style>
