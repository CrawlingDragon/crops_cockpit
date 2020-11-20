<template>
  <div class="channel-container">
    <Headers title="频道"></Headers>
    <ul class="channel-ul">
      <li class="langer li1" @click="channelRoute('网诊')">
        <div class="icon i1"></div>
        <p>网诊</p>
      </li>
      <li class="langer li5" @click="channelRoute('专家')">
        <div class="icon i5"></div>
        <p>专家</p>
      </li>
      <li class="langer video-li" @click="channelRoute('培训视频')">
        <div class="video-icon icon"></div>
        <p>培训视频</p>
      </li>
      <li class="langer message-li" @click="channelRoute('资讯')">
        <div class="message-icon icon"></div>
        <p>资讯</p>
      </li>
      <li
        class="langer bin-li"
        style="background:#EB942D"
        @click="channelRoute('病虫害')"
      >
        <div class="icon bin-icon"></div>
        <p>病虫害</p>
      </li>
      <li
        class="langer"
        style="margin-right:0;background:#016AD5;text-algin:center"
        @click="openCode"
      >
        <div class="left-text" style="">
          扫一扫<br />
          下载益农宝
        </div>
        <el-image :src="code" style="width:242px;height:242px"></el-image>
      </li>

      <!-- <li class="li2">
        <div class="icon i2"></div>
        <p>坐诊</p>
      </li>
      <li class="li3">
        <div class="icon i3"></div>
        <p>巡诊</p>
      </li>
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
      <li class="li6">
        <div class="icon i6"></div>
        <p>会员</p>
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
    ></SaoYinongbao>
    <Nav></Nav>
  </div>
</template>
<script>
import Headers from "@/components/online_hospital_header/online_hospital_header";
import Nav from "@/components/nav_list/nav_list";
import SaoYinongbao from "@/views/sao_yinongbao/sao_yinongbao";
import { mapState } from "vuex";
import img from "./channel_scan.png";
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
        case "网诊":
          this.$router.push({
            path: "/second_wang"
          });
          break;
        case "专家":
          this.$router.push({
            path: "/expert"
          });
          break;
        case "培训视频":
          this.$router.push({
            path: "/video"
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
            path: "/video"
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
  padding 100px 180px
  .channel-ul
    text-align left
    display flex
    flex-wrap wrap
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
      &.video-li
        background #00DBC4
      &.down-li
        background #016AD5
      .icon
        margin-right 30px
      .video-icon
        width 96px
        height 72px
        background url('./17.png') no-repeat
        background-size 100%
        background-position center
      .down-icon
        width 94px
        height 63px
        background url('./23.png') no-repeat
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
          background url('./9.png') no-repeat
          background-size 100%
          background-position center
      &.bin-li
        background #EB942D
        .bin-icon
          width 93px
          height 76px
          background url('./22.png') no-repeat
          background-size 100%
          background-position center
      &.li2
        background #D93165
        .icon
          width 80px
          height 95px
          background url('./10.png') no-repeat
          background-size 100%
          background-position center
      &.li3
        background #7B6FF9
        .icon
          width 80px
          height 95px
          background url('./11.png') no-repeat
          background-size 100%
          background-position center
      &.message-li
        background #47C303
        .message-icon
          width 71px
          height 83px
          background url('./18.png') no-repeat
          background-size 100%
          background-position center
      &.li5
        background #F2600C
        .icon
          width 96px
          height 96px
          background url('./12.png') no-repeat
          background-size 100%
          background-position center
      &.li6
        background #EB942D
        .icon
          width 80px
          height 95px
          background url('./13.png') no-repeat
          background-size 100%
          background-position center
      &.li7
        background #EBB701
        .icon
          width 75px
          height 75px
          background url('./15.png') no-repeat
          background-size 100%
          background-position center
      &.li8
        background #D93165
        width 330px
        .icon
          width 90px
          height 90px
          background url('./16.png') no-repeat
          background-size 100%
          background-position center
      &.li9
        width 240px
.left-text
  text-align center
  display inline-block
  font-size 32px
  color #fff
  margin-right 26px
</style>
