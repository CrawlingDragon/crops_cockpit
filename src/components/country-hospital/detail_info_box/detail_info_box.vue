<template>
  <div class="info-box">
    <div class="left">
      <div class="t">作物病情资料</div>
      <p class="p1">{{ detail.crop_pattern }}</p>
      <p class="p1">{{ detail.crop_position }}</p>
      <p class="p1">{{ detail.showtime }}</p>
      <p class="p1">
        {{ detail.content }}
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
        {{ detail.mpublic }} 官方回复<br />
        处方专家：{{ detail.chufang_expert }} <br />
        看诊结果：{{ detail.result }}
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "component_name",
  components: {},
  props: {},
  data() {
    return {};
  },
  computed: {},
  watch: {},
  mounted() {},
  destroyed() {},
  methods: {}
};
</script>
<style lang="stylus" scoped>
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
</style>
