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
    <div class="search" @click="goToSearch"></div>
    <div class="change-data">
      <div class="login-out" @click="loignOutBtn"></div>
    </div>
    <div class="icon-refresh" @click="refresh"></div>
    <Date />
    <Confim
      ref="confimBox"
      @btnSure="clickSure"
      :alertText="'注销' + loginName + '账号后，将退出登录'"
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
    return {};
  },
  computed: {
    ...mapState(["appId", "isstore", "loginHospitalName"]),
    loginName() {
      if (this.loginHospitalName.indexOf("医院") >= 0) {
        return this.loginHospitalName;
      } else {
        return this.loginHospitalName + "医院";
      }
    }
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
    loignOutBtn() {
      // 退出登陆按钮
      this.$refs.confimBox.showFlag = true;
    },
    clickSure() {
      this.$router.push({ path: "/" });
    },
    refresh() {
      location.reload();
    },
    goToSearch() {
      this.$router.push({
        path: "/search",
        query: { from: "header" }
      });
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
    .login-out
      width 30px
      height 28px
      background url('../../assets/image/login_out_icon.png') no-repeat
      cursor: pointer;
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
.search
  cursor pointer
  width 160px
  height 50px
  font-size 30px
  display inline-block
  vertical-align middle
  width 29px
  height 28px
  background url('../../assets/image/search.png') no-repeat
  position absolute
  top 46px
  right 380px
</style>
