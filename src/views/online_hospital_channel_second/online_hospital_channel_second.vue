<template>
  <div class="channel-container">
    <headers title="频道"></headers>
    <ul class="channel-ul">
      <li class="langer li4 video-li" @click="channelRoute('测土配方')">
        <div class="icon i4"></div>
        <p>测土配方</p>
      </li>
      <li class="langer li1" @click="channelRoute('网诊')">
        <div class="icon i1"></div>
        <p>网诊</p>
      </li>
      <li class="li2" style="margin-right:20px" @click="channelRoute('坐诊')">
        <div class="icon i2"></div>
        <p>坐诊</p>
      </li>
      <li class="li3" style="margin-right:0" @click="channelRoute('巡诊')">
        <div class="icon i3"></div>
        <p>巡诊</p>
      </li>
      <li class="langer li5" @click="channelRoute('专家')">
        <div class="icon i5"></div>
        <p>专家</p>
      </li>
      <li class="li6 langer" @click="channelRoute('会员')">
        <div class="icon i6"></div>
        <p>会员</p>
      </li>
      <li
        class="li9 langer"
        style="margin-right:0;margin-left:20px;background:#016AD5"
        @click="openCode"
      >
        <div class="left-text">
          扫一扫<br />
          下载益农宝
        </div>
        <el-image :src="code" style="width:242px;height:242px"></el-image>
      </li>
      <li class="no-icon langer" @click="channelRoute('培训视频')">
        <p>培训视频</p>
      </li>
      <li
        class="no-icon"
        style="margin-right:20px"
        @click="channelRoute('农资商品')"
      >
        <p>农资商品</p>
      </li>
      <li class="no-icon" @click="channelRoute('资讯')">
        <p>资讯</p>
      </li>
      <li
        class="no-icon langer"
        @click="channelRoute('病虫害')"
        style="margin-right:0"
      >
        <p>病虫害</p>
      </li>
      <!-- <li class="down-li" @click="channelRoute('已下载的视频')">
        <div>
          <div class="down-icon"></div>
          已下载的视频
        </div>
      </li> -->

      <!--
      <li class="no-icon">
        <p>医院本级</p>
      </li>
      <li class="no-icon">
        <p>农资商品</p>
      </li>
      <li class="langer li4">
        <div class="icon i4"></div>
        <p>测土配方</p>
      </li>

      <li class="langer li7">
        <div class="icon i7"></div>
        <p>下级医院</p>
      </li>
      <li class="li8">
        <div class="icon i8"></div>
        <p>搜索</p>
      </li>
      <li class="li9">
        <div class="icon i9">二维码</div>
      </li> -->
    </ul>
    <SaoYinongbao
      @changeFlaw="changeCode"
      :codeboxFlaw="codeboxFlaw"
      v-if="codeboxFlaw"
    ></SaoYinongbao>
    <Nav></Nav>
  </div>
</template>
<script>
import Headers from "@/components/online_hospital_header/online_hospital_header";
import Nav from "@/components/nav_list_second/nav_list_second";
import SaoYinongbao from "@/views/sao_yinongbao/sao_yinongbao";
import { mapState } from "vuex";
import img from "../../assets/image/channel/channel_scan.png";
export default {
  name: "online_hospital_channel",
  components: { Nav, Headers, SaoYinongbao },
  props: {},
  data() {
    return {
      code: "",
      codeboxFlaw: false
    };
  },
  computed: {
    ...mapState(["purview"])
  },
  watch: {},
  mounted() {
    this.getErCode();
  },
  destroyed() {},
  methods: {
    openCode() {
      this.codeboxFlaw = true;
    },
    changeCode(boo) {
      this.codeboxFlaw = boo;
    },
    getErCode() {
      this.$axios.fetchPost("/Admin/Api/get_qr_code").then(res => {
        if (res.data.code == 200) {
          if (this.purview == 1 || this.purview == 2) {
            this.code = img;
            return;
          }
          this.code = res.data.data.qrcode;
        }
      });
    },
    channelRoute(where) {
      switch (where) {
        case "测土配方":
          this.$router.push({
            path: "/diagnosis/second_tu"
          });
          break;
        case "坐诊":
          this.$router.push({
            path: "/diagnosis/second_zuo"
          });
          break;
        case "巡诊":
          this.$router.push({
            path: "/diagnosis/second_xun"
          });
          break;
        case "会员":
          this.$router.push({
            path: "/second_huiyuan_list"
          });
          break;
        case "农资商品":
          this.$router.push({
            path: "/goods_list"
          });
          break;
        case "网诊":
          this.$router.push({
            path: "/diagnosis/second_wang"
          });
          break;
        case "专家":
          this.$router.push({
            path: "/expert"
          });
          break;
        case "培训视频":
          this.$router.push({
            path: "/video",
            query: { axiosPurview: this.purview }
          });
          break;
        case "资讯":
          this.$router.push({
            path: "/find"
          });
          break;
        case "病虫害":
          this.$router.push({
            path: "/find",
            query: { from: "bingchonghai" }
          });
          break;
        case "已下载的视频":
          this.$router.push({
            path: "/video",
            query: { axiosPurview: this.purview }
          });
          break;
      }
    }
  }
};
</script>
<style lang="stylus" scoped>
.channel-container
  width 100%
  max-width 1900px
  margin 0 auto
  padding 100px 180px 151px
  .channel-ul
    text-align left
    display flex
    flex-wrap wrap
    padding-top 3px
    li
      height 270px
      margin-bottom 12px
      margin-right 20px
      align-items center
      justify-content center
      width 240px
      box-sizing border-box
      display flex
      font-size 36px
      color #FFFFFF
      cursor pointer
      .left-text
          text-align center
          display inline-block
          font-size 32px
          color #fff
          margin-right 26px
      &.video-li
        background #00DBC4
      &.down-li
        background #016AD5
      .icon
        margin-right 30px
      .video-icon
        width 96px
        height 72px
        background url('../../assets/image/channel/17.png') no-repeat
        background-size 100%
        background-position center
      .down-icon
        width 94px
        height 63px
        background url('../../assets/image/channel/23.png') no-repeat
        background-size 100%
        background-position center
        margin 0 auto 18px
      &:hover
        outline 3px solid #FF6600
        box-shadow 0px 1px 26px #f60
      &:nth-child(3n)
        margin-right 0
      &.langer
        width 500px
      &.no-icon
        background #091D43
        border 2px solid rgba(7, 47, 101, 1)
        color #fff
      &.li1
        background #2393DD
        .icon
          width 80px
          height 95px
          background url('../../assets/image/channel/9.png') no-repeat
          background-size 100%
          background-position center
      &.bin-li
        background #EB942D
        .bin-icon
          width 93px
          height 76px
          background url('../../assets/image/channel/22.png') no-repeat
          background-size 100%
          background-position center
      &.li2
        background #D93165
        .icon
          width 80px
          height 95px
          background url('../../assets/image/channel/10.png') no-repeat
          background-size 100%
          background-position center
      &.li3
        background #7B6FF9
        .icon
          width 80px
          height 95px
          background url('../../assets/image/channel/11.png') no-repeat
          background-size 100%
          background-position center
      &.message-li
        background #47C303
        .message-icon
          width 71px
          height 83px
          background url('../../assets/image/channel/18.png') no-repeat
          background-size 100%
          background-position center
      &.li5
        background #F2600C
        .icon
          width 96px
          height 96px
          background url('../../assets/image/channel/12.png') no-repeat
          background-size 100%
          background-position center
      &.li6
        background #EB942D
        .icon
          width 80px
          height 95px
          background url('../../assets/image/channel/13.png') no-repeat
          background-size 100%
          background-position center
      &.li7
        background #EBB701
        .icon
          width 75px
          height 75px
          background url('../../assets/image/channel/15.png') no-repeat
          background-size 100%
          background-position center
       &.li4
        .icon
          width 80px
          height 95px
          background url('../../assets/image/channel/14.png') no-repeat
          background-size 100%
          background-position center
      &.li8
        background #D93165
        width 330px
        .icon
          width 90px
          height 90px
          background url('../../assets/image/channel/16.png') no-repeat
          background-size 100%
          background-position center
</style>
