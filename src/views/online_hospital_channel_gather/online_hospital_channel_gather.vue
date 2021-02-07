<template>
  <div class="channel-container container-wrap">
    <headers title="频道"></headers>
    <ul class="channel-ul">
      <li class="langer li1 li_isshaoxing">
        <div
          class="is_not_shaoxing"
          style="background:#2494DE"
          v-if="isShaoxing == 0"
          @click="channelRoute('网诊')"
        >
          <div class="icon i1"></div>
          <p>网诊</p>
        </div>
        <div class="is_shaoxing clearfix" v-else>
          <div class="bar bar1" @click="channelRoute('网诊')">
            <div class="icon i1"></div>
            <p>网诊</p>
          </div>
          <div class="bar left" @click="channelRoute('专家网诊榜')">
            专家网诊榜
          </div>
          <div class="bar right" @click="channelRoute('评分')">评分</div>
        </div>
      </li>
      <li class="li2" @click="channelRoute('坐诊')" style="background:#DA3266">
        <div class="icon i2"></div>
        <p>坐诊</p>
      </li>
      <li class="li3" @click="channelRoute('巡诊')" style="background:#7B70FA">
        <div class="icon i3"></div>
        <p>巡诊</p>
      </li>
      <li
        class="li4 video-li"
        @click="channelRoute('测土配方')"
        style="background:#02D9AD"
      >
        <div class="icon i4"></div>
        <p>测土<br />配方</p>
      </li>
      <li
        class="li8 marginLeft0"
        style="background:#016AD5"
        @click="channelRoute('搜索')"
      >
        <div class="icon i8"></div>
        <p>搜索</p>
      </li>
      <li
        class="langer hospital"
        style="background:#016AD5"
        @click="channelRoute('医院数据概况')"
      >
        <div class="icon"></div>
        <p>医院数据概况</p>
      </li>
      <li class="li5" @click="channelRoute('专家')" style="background:#FF6600">
        <div class="icon i5"></div>
        <p>专家</p>
      </li>
      <li class="li6" @click="channelRoute('会员')" style="background:#EBB701">
        <div class="icon i6"></div>
        <p>会员</p>
      </li>
      <li
        class="langer marginLeft0 serve"
        style="background:#016AD5"
        @click="openCode"
      >
        <div class="left-text" v-if="isShaoxing == 1">
          绍兴市为农<br />服务平台
        </div>
        <div v-else class="left-text">扫一扫<br />下载益农宝</div>
        <el-image
          :src="code"
          style="width:242px;height:242px"
          v-if="isShaoxing == 1"
        ></el-image>
        <el-image
          :src="require('../../assets/image/channel/channel_scan.png')"
          style="width:242px;height:242px"
          v-else
        ></el-image>
      </li>
      <li class="no-icon" @click="channelRoute('医院本级')">
        <p>医院本级</p>
      </li>
      <li class="no-icon" @click="channelRoute('下级医院')">
        <p>下级医院</p>
      </li>
      <li class="no-icon" @click="channelRoute('农资商品')">
        <p>农资商品</p>
      </li>
      <li class="no-icon" @click="channelRoute('培训视频')">
        <p>培训视频</p>
      </li>

      <li class="no-icon" @click="channelRoute('资讯')">
        <p>资讯</p>
      </li>
      <li
        class="no-icon"
        @click="channelRoute('病虫害')"
        style="margin-right:0;"
      >
        <p>病虫害</p>
      </li>
    </ul>
    <SaoYinongbao
      @changeFlaw="changeCode"
      :codeboxFlaw="codeboxFlaw"
      :url="code"
    ></SaoYinongbao>
    <Nav :index="0"></Nav>
  </div>
</template>
<script>
import Headers from "@/components/general_hospital_header/general_hospital_header";
import Nav from "@/components/nav_list_third/nav_list_third";
import SaoYinongbao from "@/views/sao_yinongbao/sao_yinongbao";
import { mapState, mapMutations } from "vuex";
import img from "../../assets/image/channel/channel_scan.png";
export default {
  name: "online_hospital_channel_gather",
  components: { Nav, Headers, SaoYinongbao },
  props: {},
  data() {
    return {
      code: "",
      codeboxFlaw: false,
      isShaoxing: window.sessionStorage.getItem("isshaoxing")
    };
  },
  computed: {
    ...mapState(["purview", "loginId"])
  },
  watch: {},
  mounted() {
    this.getErCode();
  },
  destroyed() {},
  methods: {
    ...mapMutations(["setIsLowerHospital"]),
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
            path: "/diagnosis_general/second_wang"
          });
          break;
        case "专家网诊榜":
          this.$router.push({
            path: "/expertranking"
          });
          break;
        case "评分":
          this.$router.push({
            path: "/discussscore"
          });
          break;
        case "测土配方":
          this.$router.push({
            path: "/diagnosis_general/second_tu"
          });
          break;
        case "坐诊":
          this.$router.push({
            path: "/diagnosis_general/second_zuo"
          });
          break;
        case "巡诊":
          this.$router.push({
            path: "/diagnosis_general/second_xun"
          });
          break;
        case "医院数据概况":
          this.$router.push({
            path: "/nexthospital"
          });
          break;
        case "会员":
          this.$router.push({
            path: "/vip",
            query: { from: "general" }
          });
          break;
        case "医院本级":
          this.setIsLowerHospital("true");
          const route = this.$router.resolve({
            path: "/index_second",
            query: { appId: this.loginId, from: "adminRoute" }
          });
          window.open(route.href, "_blank");
          break;
        case "下级医院":
          this.$router.push({
            path: "/hospitalsort"
          });
          break;
        case "农资商品":
          this.$router.push({
            path: "/goods_list",
            query: { from: "general" }
          });
          break;
        case "专家":
          // 去到 专家列表
          this.$router.push({
            path: "/expertlist"
          });
          break;
        case "培训视频":
          this.$router.push({
            path: "/video",
            query: { from: "general" }
          });
          break;
        case "资讯":
          this.$router.push({
            path: "/find",
            query: { fromRoute: "general" }
          });
          break;
        case "病虫害":
          this.$router.push({
            path: "/find",
            query: { from: "bingchonghai", fromRoute: "general" }
          });
          break;
        case "搜索":
          this.$router.push({
            path: "/search"
          });
          break;
      }
    }
  }
};
</script>
<style lang="stylus" scoped>
.channel-container
  max-width 1900px
  margin 0 auto
  padding 100px 170px 151px
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
      .is_not_shaoxing
        width 100%
        height 100%
        align-items center
        display flex
        justify-content center
      .is_shaoxing
        width 100%
        .bar
          float left
          height 125px
          line-height 125px
          text-align center
        .bar1
          width 100%
          background #2494DE
          display flex
          justify-content center
          align-items center
          margin-bottom 20px
        .left
          width 240px
          margin-right 20px
          background #FF6600
        .right
          width 240px
          background #EBB701
      .left-text
        text-align center
        display inline-block
        font-size 32px
        color #fff
        margin-right 26px
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
      &.li_isshaoxing:hover
        outline none
        box-shadow none
        .bar:hover
          outline 3px solid #FF6600
          box-shadow 0px 1px 26px #f60
      &:marginLeft0
        margin-right 0
      &.langer
        width 500px
      &.no-icon
        border 2px solid rgba(7, 47, 101, 1)
        color #fff
      &.li1
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
        width 240px
        .icon
          width 90px
          height 90px
          background url('../../assets/image/channel/16.png') no-repeat
          background-size 100%
          background-position center
      &.hospital
        .icon
          width 92px
          height 92px
          background url('../../assets/image/channel/6.png') no-repeat
          background-size 100%
          background-position center
@media screen and (max-width 1890px)
  .channel-container
    padding-left 0
    padding-right 0
    .channel-ul
      & > li
        width 230px
        &.langer
          width 300px
        &.hospital
          font-size 22px
        &.serve
          width 490px
        &.no-icon
          width 202px
</style>
