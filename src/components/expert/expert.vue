<template>
  <div class="expert-box">
    <el-image class="img" fit="cover"></el-image>
    <div class="text">
      <div class="name">
        黄蓉
        <span>专家</span>
      </div>
      <p class="title">
        浙江大学昆虫研究所
        <span style="margin-left:10px">教授</span>
      </p>
      <p class="time">加入时间：2017-05-27</p>
      <p class="goodat">擅长作物：水蜜桃、无花果、小樱桃</p>
      <div class="bottom">
        <span style="margin-right:10px">处方（5）</span>加入医院（1）
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "expert",
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
.expert-box
  display flex
  font-family SimHei
  .img
    width 235px
    height 235px
  .text
    flex 1
    min-width 0
    padding 25px 10px 0 30px
    text-align left
    .name
      font-size 40px
      color rgba(255, 255, 255, 1)
      font-size 40px
      margin-bottom 10px
      span
        width 95px
        height 38px
        background rgba(255, 102, 0, 1)
        border-radius 19px
        font-size 24px
        display inline-block
        text-align center
        line-height 38px
        margin-left 10px
        vertical-align middle
    .title, .time
      color #808080
      font-size 24px
      line-height 1.2
      margin-bottom 5px
    .goodat, .bottom
      font-size 24px
      line-height 1.2
      color #fff
      margin-bottom 5px
</style>
