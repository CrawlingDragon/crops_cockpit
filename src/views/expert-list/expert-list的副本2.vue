<template>
  <div class="contain">
    <div class="header">
      <Headnav :lefttitle="this.lefttitle"></Headnav>
    </div>
    <ExpertRank
      :appId="loginId"
      :purview="purview == 4 || purview == 46 ? 1 : 0"
      @goExpertDetail="goExpertDetail"
    ></ExpertRank>
  </div>
</template>
<script>
import Headnav from "../../components/head_nav/head_nav";
import ExpertRank from "@/components/expert-rank/expert-rank";
import { mapState } from "vuex";
export default {
  components: {
    Headnav,
    ExpertRank
  },
  data() {
    return {
      lefttitle: "专家排行榜",
      returnpath: "/findindex"
    };
  },
  computed: {
    ...mapState(["loginId", "purview"])
  },
  created() {},
  methods: {
    goExpertDetail(item) {
      this.$router.push({
        path: "/expert_detail_four",
        query: { appId: this.loginId, uid: item.uid }
      });
    }
  }
};
</script>
<style lang="stylus" scoped>
.contain
    width 100%
    height 100%
    background-color: rgba(3, 5, 57, 1);
    margin 0 auto
    .header
        width 100%
    .expert_list
        margin 0 auto
        max-width 1790px
        margin-top 53px
        margin 0 auto
        height 740px
        overflow scroll
        overflow-x hidden
        scrollbar-arrow-color rgba(3, 5, 57, 1)
        scrollbar-base-color hsla(0, 0%, 53%, 0.4)
        scrollbar-track-color rgba(3, 5, 57, 1)
        scrollbar-shadow-color hsla(0, 0%, 53%, 0.1)
        &::-webkit-scrollbar {
            width: 6px;
            height: 6px;
            background: transparent;
        }
        &::-webkit-scrollbar-thumb {
            background: transparent;
            border-radius: 4px;
        }
        &:hover::-webkit-scrollbar-thumb {
            background: hsla(0, 0%, 53%, 0.4);
        }
        &:hover::-webkit-scrollbar-track {
            background: hsla(0, 0%, 53%, 0.1);
        }
        .expert_info
            position relative
            height 235px
            width 100%
            float left
            margin-bottom 18px
            border 2px solid rgba(255, 255, 255, 0.15)
            display flex
            align-items center
            padding-right 35px
            .photo
                height 170px
                width 170px
                margin-right 58px
                border-radius: 50%;
                margin-left 35px
                border: 4px solid #fff;
            .no01
              color #FF0000 !important
              border-color #FF0000 !important
            .no02
              color #FFA335 !important
              border-color #FFA335 !important
            .name
                flex 1
                font-size 30px
                font-weight 400
                color #FFFFFF
                text-align left
                font-size: 40px;
                font-family: Microsoft YaHei;
                font-weight: 400;
            .tag
                display inline-block
                margin-top 15px
                float left
                width 60px
                height 35px
                background: #FF6600
                border-radius 16px
                font-size 20px
                font-family SimHei
                font-weight 400
                color #FFFFFF
                line-height 35px
            .intro
                flex 3
                font-size 20px
                font-family SimHei
                font-weight Regular
                line-height 28px
                min-width 0
                margin-right 20px
                .company
                    width 100%
                    text-align left
                    white-space nowrap
                    color #808080
                .company1
                    display none
                .join_time
                    width 100%
                    float left
                    text-align left
                    color #808080
                .skills
                    text-align left
                    vertical-align top
                    overflow hidden
                    text-overflow ellipsis
                    white-space nowrap
                    color #FFFFFF
                .chufang,.cut_line,.join_hospital
                    float left
                    color #FFFFFF
            .total-number
              font-size: 20px;
              font-family: Microsoft YaHei;
              font-weight: 400;
              color: #999999;
              display flex
              align-items center
              & > i
                font-size: 50px;
                font-family: Microsoft YaHei;
                font-weight: 400;
                font-style: italic;
                color: #FF6600;
                margin-left 15px
    .expert_num
        position fixed
        left 44px
        bottom 20px
        font-size 24px
        font-family SimHei
        font-weight Regular
        color #B5B5B5
</style>
