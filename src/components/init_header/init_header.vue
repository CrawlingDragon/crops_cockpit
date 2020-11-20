<template>
  <div class="header-container">
    <div class="index" style="cursor:pointer" @click="goToIndex">
      <div class="index-icon index-icon1"></div>
      <span class="index-text index-text1">首页</span>
    </div>
    <div class="find" style="cursor:pointer">
      <div class="find-icon"></div>
      <span class="find-text">数据分析</span>
    </div>
    <div class="logo">
      <span class="h5">新型庄稼医院管理驾驶舱</span>
    </div>
    <div class="change-data">
      <div class="change-icon"></div>
      <div class="change-box">
        <div class="title">
          <span class="p1 active">医院数据源切换</span>
          <span class="p2">{{ cur_cityname }}</span>
        </div>
        <div class="choose">
          <div class="item" @click="chooseHospital('null')">
            <div
              class="radio"
              :class="{
                active:
                  chooseHospitalRadio == 'null' || chooseHospitalRadio == 2
              }"
            ></div>
            <span
              :class="{
                active:
                  chooseHospitalRadio == 'null' || chooseHospitalRadio == 2
              }"
              >显示所有医院</span
            >
          </div>
          <div class="item" @click="chooseHospital(1)">
            <div
              class="radio"
              :class="{ active: chooseHospitalRadio == 1 }"
            ></div>
            <span :class="{ active: chooseHospitalRadio == 1 }"
              >仅显示新型</span
            >
          </div>
        </div>
        <div class="login-out" @click="loignOutBtn">退出登录</div>
      </div>
    </div>
    <div class="icon-refresh" @click="refresh"></div>
    <Date />
    <Confim
      ref="confimBox"
      @btnSure="clickSure"
      :alertText="'注销' + cur_cityname + '账号后，将退出驾驶舱'"
    ></Confim>
  </div>
</template>
<script>
import { mapState, mapMutations } from "vuex";
import Confim from "../confim/confim";
const Date = resolve => require(["@/components/date/date"], resolve);
export default {
  name: "init_header",
  components: { Date, Confim },
  props: {},
  data() {
    return {
      cur_cityname: "",
      chooseHospitalRadio: "null"
    };
  },
  computed: {
    ...mapState(["appId", "isstore"])
  },
  watch: {},
  mounted() {
    this.chooseHospitalRadio = this.isstore || "null";
  },
  destroyed() {},
  methods: {
    ...mapMutations(["getIsstore"]),
    goToIndex() {
      this.$router.push({
        path: "/indexFour",
        query: {
          userid: window.sessionStorage.getItem("curuserid"),
          areaname: window.sessionStorage.getItem("curcity"),
          level: window.sessionStorage.getItem("curlevel"),
          letter: window.sessionStorage.getItem("letter")
        }
      });
    },
    chooseHospital(num) {
      // 选择所有/或者新型医院
      if (num == this.isstore) {
        return;
      }
      this.chooseHospitalRadio = num;
      if (num == 1) {
        this.getIsstore(1);
      } else {
        this.getIsstore(null);
      }
    },
    loignOutBtn() {
      // 退出登陆按钮
      this.$refs.confimBox.showFlag = true;
    },
    clickSure() {
      this.$router.push({ path: "/" });
    },
    refresh() {
      location.reload();
    }
  }
};
</script>
<style lang="stylus" scoped>
bg-image($url)
    @media (-webkit-min-device-pixel-ratio: 2),(min-device-pixel-ratio: 2)
        background-image: url($url + "@2x.png")
.header-container
  // width: 1900px;
  height: calc(100vh);
  margin: 0 auto;
  position: relative;
  padding-top: 50px;
  height 103px
  .index,.find
    position absolute
    top 40px
    font-size 26px
    color #ffffff
  .index
    left 0
    padding-top 1px
    width 160px
    z-index 999
    .index-icon
      height 28px
      width 28px
      background url('./index-white-icon.png') no-repeat
      background-size 100%
      bg-image('./index-white-icon')
    .index-icon1
      background url('./index-icon1.png') no-repeat
      bg-image('./index-icon1')
      background-size 28px 28px
    .index-text
      position absolute
      left 40px
      top -4px
    .index-text1
      color #7FB5F1
  .find
    left 157px
    width 200px
    border 1px solid transparent
    z-index 666
    .find-icon
      height 28px
      width 28px
      background url('./find-icon1.png') no-repeat
      background-size 100%
      bg-image('./find-icon1')
    .find-icon1
      background url('./find-icon.png') no-repeat
      bg-image('./find-icon')
      background-size 28px 28px
    .find-text
      position absolute
      left 40px
      top -4px
    .find-text1
      color #7FB5F1
  .logo
    position absolute
    left 0
    right 0
    top 40px
    .h5
      font-size: 36px;
      font-family SourceHanSansCN-Medium
      font-weight 500
      color #FFFFFF
    .h6
      font-size 17px
      font-family ArialMT
      font-weight 400
      color rgba(255, 255, 255, 1)
  .time
    position absolute
    top 53px
    right 20px
    font-size 18px
    font-family ArialMT
    font-weight 400
    width 170px
    text-align right
    color rgba(127, 181, 241, 1)
  .change-data
    position absolute
    top 46px
    right 239px
    height 30px
    &:hover .change-box
      display block
    .change-icon
      width 28px
      height 28px
      margin-top 0px
      background url('./setting-icon.png') no-repeat
      background-size 100%
      bg-image('./setting-icon')
      cursor pointer
      &:hover .change-box
        display block
    .change-box
      position absolute
      left -300px
      top 24px
      width 355px
      height 200px
      background #05113D
      z-index 9999999999
      border 1px solid #1B4E79
      display none
      .title
        padding 30px 0px 20px 20px
        font-size 14px
        font-family Microsoft YaHei
        font-weight 400
        color rgba(127, 181, 241, 1)
        text-align left
        & > span
          display inline-block
          width 50%
          user-select none
          &.active
            font-weight bold
            font-size 18px
      .choose
        margin-top 20px
        padding 0 20px
        & > .item
          display inline-block
          width 50%
          color #fff
          font-size 16px
          text-align left
          cursor pointer
          .radio
            width 22px
            height 22px
            background url('./radio.png') no-repeat
            margin-right 10px
            display inline-block
            vertical-align middle
            &.active
              background url('./checked-radio.png') no-repeat
              color #F79D1D
          & > span
            display inline-block
            vertical-align middle
            &.active
              color #F79D1D
      .login-out
        position absolute
        left 0
        right 0
        bottom 0
        height 50px
        border-top 1px solid #1B4E79
        text-align center
        font-size 16px
        line-height 50px
        color #fff
        cursor pointer
        user-select none
  .icon-refresh
    width 28px
    height 28px
    background url('./refresh.png') no-repeat
    background-size 100%
    position absolute
    top 46px
    right 317px
    cursor pointer
    z-index 9999
.country-hospital
  width 315px
  height 430px
  float left
  margin-bottom 10px
  margin-right 9px
  margin-left 25px
  margin-top 14px
  background: #00002D;
  border: 1px solid #1B4E79;
.privent-hospital
  width 640px
  height 430px
  background: #00002D;
  border: 1px solid #1B4E79;
  float left
  margin-bottom 10px
  margin-right 9px
  margin-top 14px
.newest-online
  width 315px
  height 270px
  float left
  margin-bottom 10px
  margin-top 14px
.first-wrap
  width 315px
  height 270px
  .newest-top
    height 270px
.yinongtong
  margin-top 9px !important
  height 150px
.swiper-hospital
  width 315px
  height 215px
  float left
  margin-right 9px
  background: #00002D;
  border: 1px solid #1B4E79;
  // opacity: 0.6;
.first-swiper
  margin-left 25px
.ranking-list
  width 315px
  height 215px
  float left
  background: #00002D;
  border: 1px solid #1B4E79;
  // opacity: 0.6;
  margin-right 9px
  &:last-child
    margin-right 0
.video-wrap
  width 100%
  height 100%
  position absolute
  left 0
  right 0
  top 0
  bottom 0
  background rgb(0, 0, 45)
  z-index 11119999999
  .close-btn
    padding-top 15px
    .text1
        font-size 20px
        color #7FB5F1
        border-radius: 2px
    .jiantou
        position absolute
        left 25px
    .close
        position absolute
        left 45px
  .liubai
      padding-bottom 50px
  .video
      outline none
      width 80%
</style>
