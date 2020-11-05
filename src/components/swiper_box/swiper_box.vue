<template>
  <div class="swiper-box-container">
    <el-carousel class="swiper" indicator-position="none">
      <el-carousel-item v-for="item in 4" :key="item">
        <img src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1594900534736&di=0fafef30c253d7ac9441f85cdf23a10e&imgtype=0&src=http%3A%2F%2Fa1.att.hudong.com%2F05%2F00%2F01300000194285122188000535877.jpg" alt="" class="item-img">
        <div class="text">黄泽黄桃专科医院开业了</div>
      </el-carousel-item>
    </el-carousel>
  </div>
</template>
<script>
// import Swiper from "swiper";
export default {
  name: "swiper-box",
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
.swiper-box-container
  height 100%
  .swiper
    height 100%
  /deep/.el-carousel__container
    height 100%
    position relative
    .item-img
      width 100%
      height 100%
      display block
    .text
      position absolute
      left 0
      right 0
      bottom 0
      height 80px
      background rgba(0, 0, 0, 0.8)
      font-size 34px
      line-height 80px
      padding-left 20px
      text-align left
</style>
