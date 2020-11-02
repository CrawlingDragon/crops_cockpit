<template>
  <div class="ranking-container">
    <Head title="专家回复排行榜" :right_show_bar="false"></Head>
    <div class="swiper-container">
      <div class="swiper-wrapper">
        <div class="swiper-slide">
          <div class="img-box">
            <img
              src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1594379897346&di=7b9d908626ec831c312293959d36c5cc&imgtype=0&src=http%3A%2F%2Fhbimg.b0.upaiyun.com%2Ff8180eacfbbd18755c4dfda545247109287d4fd91b0d45-fVjs6x_fw658"
              alt
            />
          </div>
        </div>
        <div class="swiper-slide">
          <div class="img-box">
            <img
              src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1594379897346&di=7b9d908626ec831c312293959d36c5cc&imgtype=0&src=http%3A%2F%2Fhbimg.b0.upaiyun.com%2Ff8180eacfbbd18755c4dfda545247109287d4fd91b0d45-fVjs6x_fw658"
              alt
            />
          </div>
        </div>
        <div class="swiper-slide">
          <div class="img-box">
            <img
              src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1594379897346&di=7b9d908626ec831c312293959d36c5cc&imgtype=0&src=http%3A%2F%2Fhbimg.b0.upaiyun.com%2Ff8180eacfbbd18755c4dfda545247109287d4fd91b0d45-fVjs6x_fw658"
              alt
            />
          </div>
        </div>
        <div class="swiper-slide">
          <div class="img-box">
            <img
              src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1594379897346&di=7b9d908626ec831c312293959d36c5cc&imgtype=0&src=http%3A%2F%2Fhbimg.b0.upaiyun.com%2Ff8180eacfbbd18755c4dfda545247109287d4fd91b0d45-fVjs6x_fw658"
              alt
            />
          </div>
        </div>
        <div class="swiper-slide">
          <div class="img-box">
            <img
              src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1594379897346&di=7b9d908626ec831c312293959d36c5cc&imgtype=0&src=http%3A%2F%2Fhbimg.b0.upaiyun.com%2Ff8180eacfbbd18755c4dfda545247109287d4fd91b0d45-fVjs6x_fw658"
              alt
            />
          </div>
        </div>
        <div class="swiper-slide">
          <div class="img-box">
            <img
              src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1594379897346&di=7b9d908626ec831c312293959d36c5cc&imgtype=0&src=http%3A%2F%2Fhbimg.b0.upaiyun.com%2Ff8180eacfbbd18755c4dfda545247109287d4fd91b0d45-fVjs6x_fw658"
              alt
            />
          </div>
        </div>
        <div class="swiper-slide">
          <div class="img-box">
            <img
              src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1594379897346&di=7b9d908626ec831c312293959d36c5cc&imgtype=0&src=http%3A%2F%2Fhbimg.b0.upaiyun.com%2Ff8180eacfbbd18755c4dfda545247109287d4fd91b0d45-fVjs6x_fw658"
              alt
            />
          </div>
        </div>
        <div class="swiper-slide">
          <div class="img-box">
            <img
              src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1594379897346&di=7b9d908626ec831c312293959d36c5cc&imgtype=0&src=http%3A%2F%2Fhbimg.b0.upaiyun.com%2Ff8180eacfbbd18755c4dfda545247109287d4fd91b0d45-fVjs6x_fw658"
              alt
            />
          </div>
        </div>
        <div class="swiper-slide">
          <div class="img-box">
            <img
              src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1594379897346&di=7b9d908626ec831c312293959d36c5cc&imgtype=0&src=http%3A%2F%2Fhbimg.b0.upaiyun.com%2Ff8180eacfbbd18755c4dfda545247109287d4fd91b0d45-fVjs6x_fw658"
              alt
            />
          </div>
        </div>
        <div class="swiper-slide">
          <div class="img-box">
            <img
              src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1594379897346&di=7b9d908626ec831c312293959d36c5cc&imgtype=0&src=http%3A%2F%2Fhbimg.b0.upaiyun.com%2Ff8180eacfbbd18755c4dfda545247109287d4fd91b0d45-fVjs6x_fw658"
              alt
            />
          </div>
        </div>
      </div>
      <!-- Add Pagination -->
      <div class="swiper-pagination"></div>
    </div>
    <div class="text-box">
      <div class="left">
        <span>NO.1</span>
        <div>提莫安妮</div>
      </div>
      <div class="mid">
        <p class="p1">擅长作物：水蜜桃、无花果、小樱桃、无花果、小樱桃...</p>
        <p class="p2">浙江省农科院植物保护与微生物研究所</p>
      </div>
      <div class="right">
        总回复数
        <span>30</span>
      </div>
    </div>
  </div>
</template>
<script>
import Head from "../../components/headers/headers";
export default {
  name: "expert_ranking",
  components: { Head },
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
.ranking-container
  .swiper-container
    margin-left 90px
    .swiper-wrapper
      display flex
      align-items center
    .img-box
      width 280px
      height 280px
      border-radius 50%
      border 6px solid rgba(255, 255, 255, 0.2)
      overflow hidden
      img
        display block
        width 100%
        height 100%
    .swiper-slide-active, .swiper-slide-duplicate-active
      .img-box
        width 350px
        height 350px
        border 6px solid #ff6600
    .swiper-slide-active
      margin-right 100px !important
  .text-box
    margin 30px 90px
    height 240px
    display flex
    text-align left
    background rgba(9, 29, 68, 0.4)
    border 1px solid rgba(255, 255, 255, 0.2)
    .left
      width 400px
      display flex
      align-items center
      color #FFFFFF
      flex-direction column
      justify-content center
      border-right 1px solid rgba(255, 255, 255, 0.1)
      span
        font-size 60px
        font-family Arial
        font-weight 900
        font-style italic
      div
        font-size 70px
        font-family SimHei
    .mid
      flex 1
      padding 69px 50px
      .p1, .p2
        line-height 40px
        font-size 34px
        font-family SimHei
        font-weight 400
        width 100%
        overflow hidden
        text-overflow ellipsis
        white-space nowrap
        word-break break-all
      .p1
        color #ff6600
        margin-bottom 18px
      .p2
        color #B5B5B5
    .right
      width 400px
      display flex
      align-items center
      font-size 28px
      font-family SimHei
      font-weight 400
      color rgba(181, 181, 181, 1)
      padding-left 50px
      span
        font-size 60px
        font-family Arial
        font-weight 900
        font-style italic
        color rgba(255, 102, 0, 1)
        margin-left 30px
</style>
