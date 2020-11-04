<template>
  <div class="swiper-box-container">
    <el-carousel class="swiper" indicator-position="" trigger="click">
      <el-carousel-item v-for="item in list" :key="item.id">
        <img :src="item.thumb" alt="" class="item-img" />
        <div class="text">{{ item.title }}</div>
      </el-carousel-item>
    </el-carousel>
  </div>
</template>
<script>
// import Swiper from "swiper";
export default {
  name: "swiper-box",
  components: {},
  props: {
    list: {
      type: Array,
      default: function() {
        return [];
      }
    }
  },
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
    cursor pointer
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
  /deep/.el-carousel__button
    width 20px
    height 20px
    border-radius: 50%;
  /deep/.el-carousel__indicators--horizontal
    right 50px
    left auto
    bottom 15px
</style>
