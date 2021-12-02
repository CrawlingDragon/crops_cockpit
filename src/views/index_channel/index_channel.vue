<template>
  <div class="index_channel-container">
    <Header
      :changemoudle="'channel'"
      :middle_title="userInfo.areaname + '新型庄稼医院管理驾驶舱'"
    ></Header>
    <div class="quick-in-box">
      <div class="small-title">快速入口</div>
      <ul class="clearfix">
        <router-link
          style="background:#2494DE"
          tag="li"
          :to="{ path: '/nexthospital' }"
        >
          下级医院数据概况
        </router-link>
        <router-link
          style="background:#DA3266"
          tag="li"
          :to="{ path: '/hospitalsort' }"
        >
          医院综合排序
        </router-link>
        <router-link
          style="background:#7B70FA"
          tag="li"
          :to="{ path: '/expert_all' }"
          >专家</router-link
        >
        <li style="background:#EBB701;" class="li-download" @click="openCode">
          <div class="down-text">扫一扫<br />下载<br />益农宝</div>
          <el-image :src="code" alt="" class="code-img"></el-image>
          <SaoYinongbao
            @changeFlaw="changeCode"
            :codeboxFlaw="codeboxFlaw"
            v-show="codeboxFlaw"
          ></SaoYinongbao>
        </li>
      </ul>
    </div>
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
    <div class="bottom-title">{{ userInfo.areaname }}管理驾驶舱</div>
  </div>
</template>
<script>
import Header from "@/components/head_nav/head_nav";
import ExtendedFunction from "@/components/extended_function/extended_function";
import SaoYinongbao from "@/views/sao_yinongbao/sao_yinongbao";
import { mapState } from "vuex";
import img from "./channel_scan.png";
export default {
  name: "index_channel",
  components: { Header, ExtendedFunction, SaoYinongbao },
  props: {},
  data() {
    return {
      extendedFunction: [], // 扩展功能
      extendedColumn: "", // 扩展栏目
      code: img,
      codeboxFlaw: false
    };
  },
  computed: {
    ...mapState(["loginHospitalName", "loginId", "userInfo"])
  },
  watch: {},
  mounted() {
    this.getChannelData();
  },
  destroyed() {},
  methods: {
    changeCode(boo) {
      this.codeboxFlaw = boo;
    },
    openCode() {
      this.codeboxFlaw = true;
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
    }
  }
};
</script>
<style lang="stylus" scoped>
.index_channel-container
  max-width: 1900px
  min-height: 100%
  position: relative
  margin 0 auto
  width 100%
  padding-bottom 60px
  .quick-in-box
    margin-top 70px
    padding 0 40px
    text-align: left
    .small-title
      font-size: 26px;
      font-family: Source Han Sans CN;
      font-weight: 500;
      color: #FFFFFF;
      line-height: 1.2
      margin-bottom 15px
    ul
      & > li
        float: left
        width 18.4%
        height: 150px
        margin-right: 2%
        text-align: center
        line-height: 150px
        font-size: 25px;
        color #fff
        cursor pointer
        margin-bottom: 20px
        background: #0F3A96
        @media screen and (min-width:1900px){
          font-size: 40px;
        }
        &:nth-child(5n)
          margin-right: 0
        &.li-download
          display: flex
          font-size 25px
          line-height: 1.2
          align-items: center
          @media screen and (min-width:1900px){
            font-size: 30px;
          }
          .down-text
            flex 1
          .code-img
            width: 90px
            height: 90px
            margin 0 10px
            @media screen and (min-width:1900px){
              width: 116px
              height: 116px
            }
  .extended-function-box
    margin-top 30px
    text-align: left
    padding: 0 40px
    .small-title
      font-size: 26px;
      font-family: Source Han Sans CN;
      font-weight: 500;
      color: #FFFFFF;
      line-height: 1.2
      margin-bottom 15px
    ul
      & > li
        float left
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
        &:nth-child(5n)
          margin-right: 0
        &.li-download
          display: flex
          font-size 30px
          line-height: 1.2
          align-items: center
          .down-text
            flex 1
          .code-img
            flex 1
            width: 116px
            height: 116px
            margin 0 auto
  .bottom-title
    position absolute
    left 0
    right: 0
    bottom 10px
    font-size: 30px;
    font-family: Microsoft YaHei;
    font-weight: 400;
    color: #FFFFFF;
</style>
