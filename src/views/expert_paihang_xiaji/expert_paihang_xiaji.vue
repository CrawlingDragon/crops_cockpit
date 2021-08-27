<template>
  <div class="paihang_content">
    <Header :title="lowerHospital" midTitle="专家排行榜"></Header>
    <ExpertRank
      :appId="appId"
      :purview="0"
      @goExpertDetail="goExpertDetail"
    ></ExpertRank>
  </div>
</template>
<script>
import Header from "@/components/online_hospital_header/online_hospital_header";
import ExpertRank from "@/components/expert-rank/expert-rank";
import { mapState } from "vuex";
export default {
  name: "expert_paihang_xiaji",
  data() {
    return {};
  },
  components: { Header, ExpertRank },
  created() {},
  computed: {
    ...mapState([
      "appId",
      "purview",
      "lowerHospital",
      "isLowerHospital",
      "loginId"
    ])
  },
  mounted() {
    this.title = "专家排行榜";
  },
  methods: {
    goExpertDetail(item) {
      this.$router.push({
        path: "/expert_detail_four",
        query: { uid: item.uid }
      });
    }
  }
};
</script>
<style lang="stylus" scoped>
.paihang_content
    padding-top 100px
    margin 0 40px
    font-size MicrosoftYaHei
    font-weight Regular
    .swiper-container
        width 100%
        height 620px
        padding-bottom 20px
        .swiper-slide
            text-align center
            font-size 18px
            display -webkit-box
            display -ms-flexbox
            display -webkit-flex
            display flex
            -webkit-box-pack center
            -ms-flex-pack center
            -webkit-justify-content center
            justify-content center
            -webkit-box-align center
            -ms-flex-align center
            -webkit-align-items center
            align-items center
            transition 300ms
            transform scale(0.8)
            line-height 350px
            align-items center
            img
                width 250px
                height 250px
                border-radius 50%
        .swiper-slide-active
            transform scale(1)
            img
                width 320px
                height 320px
                border-radius 50%
                border 3px solid #FF6600
                box-shadow 0px 1px 26px #f60
        .swiper-slide-duplicate-active
            transform scale(1)
            border 1px solid red
            img
                width 320px
                height 320px
                border-radius 50%
                outline 3px solid #FF6600
                box-shadow 0px 1px 26px #f60
    .swiper-button-next
        position absolute
        top 383px !important
        right 0
        height 240px
        border 1px solid rgba(255, 255, 255, 0.2)
        width 80px
        outline none !important
        span:focus
          outline none
    .swiper-button-prev
        position absolute
        top 383px !important
        left 0
        height 240px
        border 1px solid rgba(255, 255, 255, 0.2)
        width 80px
        outline none !important
        span:focus
          outline none
    .single_info
        text-align center
        font-size 18px
        border 1px solid rgba(255, 255, 255, 0.2)
        margin 21px 90px
        display -webkit-box
        display -ms-flexbox
        display -webkit-flex
        -webkit-box-pack center
        -ms-flex-pack center
        -webkit-justify-content center
        justify-content center
        -webkit-box-align center
        -ms-flex-align center
        -webkit-align-items center
        align-items center
        position: relative;
        top: -280px;
        .left
            width 22.6%
            height 238px
            border-right 1px solid rgba(255, 255, 255, 0.2)
            .text1
                font-size 40px
                color #FFFFFF
            .text2
                font-size 40px
                color #FFFFFF
                overflow: hidden;
                text-overflow:ellipsis;
                white-space: nowrap;
                padding-left 15px
            .mingci
                margin-top 48px
                text-align left
                margin-left 130px
                margin-bottom 20px
        .right
            width 77.3%
            .intros
                width 58.8%
                height 100px
                display inline-block
                text-align left
                font-size 30px
                font-weight Regular
                margin-right 164px
                .text2
                    color #FF6600
                    margin-bottom 30px
                    white-space nowrap
                    overflow hidden
                    text-overflow ellipsis
            .huifu
                width 22%
                height 100px
                vertical-align top
                line-height 80px
                font-size 24px
                color #B5B5B5
                display inline-block
                .text4
                    font-size 60px
                    color #FF6600
                    padding-left 43px
                    vertical-align top
    .temporary
      font-size 30px
      line-height 36px
      color #FFFFFF
      width 300px
      height 200px
      position absolute
      top 50%
      left 50%
      transform translate(-50%, -50%); /* 50%为自身尺寸的一半 */
      -webkit-transform: translate(-50%, -50%);
</style>
