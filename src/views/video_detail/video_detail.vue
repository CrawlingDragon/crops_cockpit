<template>
  <div class="video-containers">
    <Header title="视频详情" :right_show_bar="false"></Header>
    <div class="detail-conatiner">
      <div class="detail-box">
        <div class="left-bar">
          <div class="play-icons"></div>
          <video src=""></video>
        </div>
        <div class="right-bar">
          <p class="p1">黄泽黄桃专科医院</p>
          <p class="small-p2">课程讲师：浙江大学果树科学研究所教授 贾惠娟</p>
          <p class="time-p3">时长：50分钟</p>
          <p class="p4">视频简介：近日，市农业局召开全局干部职工会议，传达学习第八次党代会精神。会议要求：一是充分认识市第八次党代会的重要意义，紧密结合实际，认真学习、深刻领会会议精神，全面抓好贯彻落实。二是充分全面抓好贯彻落实。全面抓好贯彻落实。</p>
          <div class="btns">
            <div class="btn">
              <span class="info-btn"></span>
              <span>简 介</span>
            </div>
            <div class="btn">
              <span class="play-icon"></span>
              <span>播 放</span>
            </div>
            <div class="btn">
              <div class="down-icon"></div>
              <span>下 载</span>
            </div>
          </div>
        </div>
      </div>
      <div class="second-title">相关视频</div>
      <ul class="relation-ul">
        <li v-for="item in 3" :key="item">
          <el-image class="img" fit="cover" src="item"></el-image>
          <p class="p1">{{item}}123li1y2i37y12p;io37y41yu</p>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import Header from "@/components/headers/headers";
import { mapState } from "vuex";

export default {
  name: "videos",
  components: { Header },
  props: {},
  data() {
    return {
      list: [],
    };
  },
  computed: {
    ...mapState(["appId"]),
  },
  watch: {},
  mounted() {},
  destroyed() {},
  methods: {},
};
</script>
<style lang="stylus" scoped>
.video-containers
  .detail-conatiner
    margin 40px 90px 0
    text-align left
    .detail-box
      display flex
      .left-bar
        width 700px
        height 525px
        border 2px solid #ff6600
        margin-right 40px
      .right-bar
        flex 1
        font-family SimHei
        min-width 0
        .p1
          font-size 52px
          font-weight 400
          color rgba(255, 255, 255, 1)
          line-height 52px
          margin-top 9px
        .small-p2
          font-size 30px
          font-weight 400
          color rgba(255, 255, 255, 1)
          line-height 30px
          margin 28px 0 19px
        .time-p3
          color #FF6600
          font-size 28px
          margin-bottom 45px
          line-height 28px
        .p4
          font-size 30px
          line-height 60px
          overflow hidden
          text-overflow ellipsis
          display -webkit-box
          word-break break-all
          -webkit-box-orient vertical
          -webkit-line-clamp 3
      .btns
        display flex
        margin-top 40px
        & > div
          width 200px
          height 90px
          display flex
          justify-content center
          align-items center
          color #FFFFFF
          font-size 32px
          border 2px solid rgba(255, 255, 255, 1)
          border-radius 10px
          margin-right 40px
          cursor pointer
          .info-btn
            width 37px
            height 43px
            margin-right 25px
            background url('./info.png') no-repeat
            background-size 100% 100%
          .play-icon
            width 43px
            height 43px
            margin-right 25px
            background url('./play-icon.png') no-repeat
            background-size 100% 100%
          .down-icon
            width 39px
            height 39px
            margin-right 25px
            background url('./downing.png') no-repeat
            background-size 100% 100%
          .downinged
            background url('./downinged.png') no-repeat
            background-size 100% 100%
          .downed
            background url('./downed.png') no-repeat
            background-size 100% 100%
    .second-title
      font-size 36px
      color rgba(255, 255, 255, 0.5)
      line-height 36px
      margin 35px 0
    .relation-ul
      font-size 0
      & > li
        display inline-block
        width 340px
        height 250px
        margin-right 20px
        position relative
        cursor pointer
        .img
          display block
          width 100%
          height 100%
        .p1
          position absolute
          left 0
          right 0
          height 68px
          background url('./text-bj.png')
          background-size 100% 100%
          font-size 30px
          color #FFFFFF
          padding-left 28px
          line-height 68px
          bottom 0
          overflow hidden
          text-overflow ellipsis
          white-space nowrap
          word-break break-all
</style>
