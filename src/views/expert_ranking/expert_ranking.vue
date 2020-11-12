<template>
  <div class="ranking-container">
    <Header title="专家回复排行榜"></Header>
    <el-carousel :interval="114000" type="card" class="car">
      <el-carousel-item v-for="item in list" :key="item.uid">
        <div class="img-box">
          <el-image :src="item.avatar" fit="contain"></el-image>
        </div>
      </el-carousel-item>
    </el-carousel>
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
import Header from "@/components/online_hospital_header/online_hospital_header";
import { mapState } from "vuex";
export default {
  name: "expert_ranking",
  components: { Header },
  props: {},
  data() {
    return {
      list: []
    };
  },
  computed: {
    ...mapState(["appId", "purview"])
  },
  watch: {},
  mounted() {
    this.getRanking();
  },
  destroyed() {},
  methods: {
    getRanking() {
      this.$axios
        .fetchGet("/Home/Expert/GetMpExpertRank", {
          appId: this.appId,
          purview: this.purview == (3 || 4) ? 1 : 0,
          limit: 30
        })
        .then(res => {
          if (res.data.code == 200) {
            this.list = res.data.data;
          }
        });
    }
  }
};
</script>
<style lang="stylus" scoped>
.ranking-container
  padding-top 100px
  .car
    width 800px
    margin 0 auto
    height 550px
    /deep/.el-carousel__container
      height 500px
    /deep/.el-carousel__mask
      background none
  .img-box
    width 350px
    height 350px
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
