<template>
  <div class="channel-container container-wrap">
    <headers title="频道"></headers>
    <ul class="channel-ul clearfix">
      <li class="li1 li_isshaoxing" :style="colorArray[0]">
        <div class="is_shaoxing clearfix">
          <div class="" @click="channelRoute('网诊')">
            <!-- <div class="icon i1"></div> -->
            <p>网诊</p>
          </div>
          <div
            class="bar left"
            @click="channelRoute('专家网诊榜')"
            v-if="false"
          >
            专家网诊榜
          </div>
          <div class="bar right" @click="channelRoute('评分')" v-if="false">
            评分
          </div>
        </div>
      </li>
      <li class="li2" @click="channelRoute('坐诊')" :style="colorArray[1]">
        <!-- <div class="icon i2"></div> -->
        <p>坐诊</p>
      </li>
      <li class="li3" @click="channelRoute('巡诊')" :style="colorArray[2]">
        <!-- <div class="icon i3"></div> -->
        <p>巡诊</p>
      </li>
      <li
        class="li4 video-li"
        @click="channelRoute('测土配方')"
        :style="colorArray[3]"
      >
        <!-- <div class="icon i4"></div> -->
        <p>测土配方</p>
      </li>
      <li
        class="li8 marginLeft0"
        :style="colorArray[4]"
        @click="channelRoute('搜索')"
      >
        <!-- <div class="icon i8"></div> -->
        <p>搜索</p>
      </li>
      <li
        class="langer hospital"
        :style="colorArray[5]"
        @click="channelRoute('医院数据概况')"
      >
        <!-- <div class="icon"></div> -->
        <p>医院数据概况</p>
      </li>
      <li class="li5" @click="channelRoute('专家')" :style="colorArray[6]">
        <!-- <div class="icon i5"></div> -->
        <p>专家</p>
      </li>
      <li class="li6" @click="channelRoute('会员')" :style="colorArray[7]">
        <!-- <div class="icon i6"></div> -->
        <p>会员</p>
      </li>
      <li @click="channelRoute('病虫害')" :style="colorArray[8]">
        <p>病虫害</p>
      </li>
      <li class="scan-codes" @click="openCode">
        <div class="left-text">扫一扫<br />下载<br />益农宝</div>
        <el-image
          :src="require('../../assets/image/channel/channel_scan.png')"
        ></el-image>
      </li>
      <li @click="channelRoute('医院本级')" :style="colorArray[9]">
        <p>医院本级</p>
      </li>
      <li @click="channelRoute('下级医院')" :style="colorArray[10]">
        <p>下级医院</p>
      </li>
      <li @click="channelRoute('农资商品')" :style="colorArray[11]">
        <p>农资商品</p>
      </li>
      <li @click="channelRoute('培训视频')" :style="colorArray[12]">
        <p>培训视频</p>
      </li>
      <li @click="channelRoute('资讯')" :style="colorArray[13]">
        <p>资讯</p>
      </li>
    </ul>
    <SaoYinongbao
      @changeFlaw="changeCode"
      :codeboxFlaw="codeBoxFlaw"
      v-show="codeBoxFlaw"
      :url="code"
    ></SaoYinongbao>
    <ExtendedFunction
      v-if="extendedFunction.length"
      :dataArray="extendedFunction"
      :smallTitle="'扩展功能'"
    ></ExtendedFunction>
    <ExtendedFunction
      v-if="extendedColumn.length"
      :dataArray="extendedColumn"
      :smallTitle="'扩展栏目'"
    ></ExtendedFunction>
    <Nav :index="0"></Nav>
  </div>
</template>
<script>
import Headers from "@/components/general_hospital_header/general_hospital_header";
import Nav from "@/components/nav_list_third/nav_list_third";
import ExtendedFunction from "@/components/extended_function/extended_function";
import SaoYinongbao from "@/views/sao_yinongbao/sao_yinongbao";
import { mapState, mapMutations } from "vuex";
import img from "../../assets/image/channel/channel_scan.png";
const colorArr = [
  "background:#2494DE",
  "background:#DA3266",
  "background:#7B70FA",
  "background:#016AD5",
  "background:#016AD5",
  "background:#FF6600",
  "background:#EBB701",
  "background:#2494DE",
  "background:#7B70FA",
  "background:#7B70FA",
  "background:#02D9AD",
  "background:#016AD5",
  "background:#FF6600",
  "background:#DA3266"
];
export default {
  name: "online_hospital_channel_gather",
  components: { Nav, Headers, SaoYinongbao, ExtendedFunction },
  props: {},
  data() {
    return {
      colorArray: colorArr,
      code: img,
      codeBoxFlaw: false,
      extendedColumn: [],
      extendedFunction: []
    };
  },
  computed: {
    ...mapState(["purview", "loginId"])
  },
  watch: {},
  mounted() {
    this.getChannelData();
  },
  destroyed() {},
  methods: {
    ...mapMutations(["setIsLowerHospital"]),
    openCode() {
      this.codeBoxFlaw = true;
    },
    changeCode(boo) {
      this.codeBoxFlaw = boo;
    },
    getChannelData() {
      this.$axios
        .fetchPost("/Home/NationwideDatav/getUserModule", {
          userid: this.loginId
        })
        .then(res => {
          const re = res.data;
          if (re.code === "200") {
            this.extendedFunction = re.data.extend_module;
            this.extendedColumn = re.data.extend_category;
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
          window.open(
            this.$router.resolve({
              path: "/index_second",
              query: { appId: this.loginId, from: "adminRoute" }
            }).href,
            "_blank"
          );
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
            path: "/expert_all"
          });
          break;
        case "培训视频":
          this.$router.push({
            path: "/video",
            query: { from: "general", axiosPurview: this.purview }
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
  width 100%
  padding 100px 40px 151px
  .channel-ul
    text-align left
    display flex
    flex-wrap wrap
    padding-top 3px
    li
      float: left
      width 18.4%
      height: 150px
      margin-right: 2%
      text-align: center
      line-height: 150px
      font-size: 40px;
      color #fff
      cursor pointer
      margin-bottom: 20px
      background: #0F3A96
      @media screen and (max-width 1900px){
        font-size 25px
      }
      &:nth-child(5n)
        margin-right: 0
      &.scan-codes
        display: flex
        align-items: center
        .left-text
          flex 1
          text-align center
          font-size 20px
          color #fff
          line-height: 1.2
          @media screen and (min-width 1900px){
            font-size 30px
          }
      .el-image
        width 115px
        height: 115px
        margin 0 10px
        @media screen and (min-width 1900px){
          width 130px
          height: 130px
        }
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
      &.no-icon
        border 2px solid rgba(7, 47, 101, 1)
        color #fff
  /deep/.extended-function-box
    padding 0
</style>
