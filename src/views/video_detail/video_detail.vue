<template>
  <div class="video-containers">
    <Header :title="title" :right_show_bar="false" midTitle="视频详情"></Header>
    <div class="detail-conatiner">
      <div class="detail-box">
        <div class="left-bar">
          <!-- <div class="play-icons">
            <el-image :src="detail.thumb"></el-image>
          </div> -->
          <video
            :src="detail.videourl"
            style="width:100%;height:100%;object-fit: fill;"
            ref="video"
            id="video"
            controls
          ></video>
        </div>
        <div class="right-bar">
          <p class="p1">{{ detail.title }}</p>
          <p class="small-p2">课程讲师：{{ detail.expert }}</p>
          <p class="time-p3">时长：{{ detail.duration }}</p>
          <p class="p4">视频简介：{{ detail.description }}</p>
          <div class="btns">
            <div class="btn" @click="infowShowFlag = true">
              <span class="info-btn"></span>
              <span>简 介</span>
            </div>
            <div class="btn" @click="playVideo">
              <span class="play-icon"></span>
              <span>播 放</span>
            </div>
            <div class="download btn" @click="downVideo" style="display:none;">
              <!-- <input type="file" class="file" /> -->
              下载视频
            </div>
            <video
              :src="videoSrc"
              width="200px"
              height="200px"
              style="display:none;border:1px solid #fff"
              controls
            ></video>
          </div>
        </div>
      </div>
      <div class="second-title">相关视频</div>
      <div class="swiper-container">
        <ul class="relation-ul swiper-wrapper">
          <li
            class="swiper-slide"
            v-for="item in list"
            :key="item.id"
            @click="goToDetal(item.catid, item.id)"
          >
            <el-image class="img" fit="cover" :src="item.thumb"></el-image>
            <p class="p1">{{ item.title }}</p>
          </li>
        </ul>
        <div class="swiper-scrollbar"></div>
      </div>
    </div>
    <div class="info-box" v-show="infowShowFlag">
      <div class="wrap">
        <div class="back-btn" @click="infowShowFlag = false">
          <div class="icon"></div>
          简介
        </div>
        <div class="info-text">
          {{ detail.content }}
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Header from "@/components/online_hospital_header/online_hospital_header";
import { mapState } from "vuex";
import Swiper from "swiper";
import download from "../../common/js/download";
export default {
  name: "videos",
  components: { Header },
  props: {},
  data() {
    return {
      detail: "",
      list: [],
      catid: this.$route.query.catid,
      id: this.$route.query.id,
      infowShowFlag: false,
      videoSrc: "",
      title: ""
    };
  },
  computed: {
    ...mapState(["appId", "purview", "lowerHospital"])
  },
  watch: {
    $route() {
      this.catid = this.$route.query.catid;
      this.id = this.$route.query.id;
      this.getVideoDetail();
    }
  },
  mounted() {
    this.getVideoDetail();
    this.title =
      this.purview == 3 || this.purview == 4 ? this.lowerHospital : "视频详情";
    // this.downloadfile(this.detail.videourl, "xxxx", "video/map4");
  },
  destroyed() {},
  methods: {
    downVideo() {
      // alert(1);
      // this.videoSrc = require("/Users/wuhelong/Documents/图片/cce50b4fd7e395d2379c28dc66c07368_1.mp4");
      // this.videoSrc = "file:///D:/video/cce50b4fd7a0d586dfe2d764pim.mp4";
    },
    init(pagesize) {
      var mySwiper = new Swiper(".swiper-container", {
        spaceBetween: 30,
        slidesPerView: pagesize,
        autoplay: {
          delay: 3000,
          stopOnLastSlide: false,
          disableOnInteraction: true
        },
        scrollbar: {
          el: ".swiper-scrollbar"
        }
      });
      // mySwiper
    },
    playVideo() {
      function FullScreen() {
        var ele = document.getElementById("video");
        if (ele.requestFullscreen) {
          ele.requestFullscreen();
        } else if (ele.mozRequestFullScreen) {
          ele.mozRequestFullScreen();
        } else if (ele.webkitRequestFullScreen) {
          ele.webkitRequestFullScreen();
        }
      }
      FullScreen();
      this.$refs.video.play();
    },
    getVideoDetail() {
      this.$axios
        .fetchPost("/Home/Video/GetVideoDetail", {
          appId: this.appId,
          catId: this.catid,
          Id: this.id
        })
        .then(res => {
          if (res.data.code == 200) {
            this.detail = res.data.data;
            this.list = res.data.data.relation;
            this.$nextTick(() => {
              this.init(5);
            });
          }
        });
    },
    goToDetal(catid, id) {
      this.catid = catid;
      this.id = id;
      this.getVideoDetail();
      // this.$router.push({
      //   path: "/video_detail",
      //   query: { catid: catid, id: id }
      // });
    },
    infoShow(boolean) {
      this.infoShowFlag = boolean;
    }
  }
};
</script>
<style lang="stylus" scoped>
.video-containers
  padding-top 100px
  padding-bottom 30px
  .detail-conatiner
    padding 0 40px
    text-align left
    min-width 1340px
    max-width 1900px
    margin 0 auto
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
    .swiper-container
      .relation-ul
        .swiper-slide
          text-align center
          font-size 18px
          /* Center slide text vertically */
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
          font-size 0
        & > li
          display inline-block
          width 287px
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
    .swiper-scrollbar
      height 5px
      background #C5C5C5
.info-box
  position fixed
  left 0
  right 0
  top 0
  bottom 0
  background #080f3e
  z-index 222
  .wrap
    width 100%
    min-width 1340px
    max-width 1900px
    margin 0 auto
    .back-btn
      text-align left
      display flex
      align-items center
      padding-left 40px
      height 100px
      margin-bottom 30px
      color #7FB5F1
      font-size 30px
      cursor pointer
      .icon
        width 30px
        height 30px
        background url('./3.png') no-repeat
        margin-right 20px
    .info-text
      padding 0 180px
      font-size: 28px;
      color: #B5B5B5;
      line-height: 48px;
      text-align left
</style>
