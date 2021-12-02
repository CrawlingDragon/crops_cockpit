<template>
  <div class="header-container container-wrap">
    <div class="head-wrap cf">
      <div class="left-bar">
        <div
          class="logo"
          v-if="
            (purview == 1 && logoSrc) ||
              (purview == 2 && logoSrc) ||
              purview == 46
          "
          v-show="logoSrc"
        >
          <img src="./main_page_icon.png" alt="" class="img" />
        </div>
        <slot></slot>
        <div class="admin-icon" v-if="false" v-show="!isWangzhen">
          <div class="icon-back" @click="goBack"></div>
          <div class="icon-close" @click="close"></div>
        </div>
        <div class="goBack-icon" v-show="isWangzhen" @click="goBack"></div>
        <div
          class="goBack-icon"
          v-show="!logoSrc && !isWangzhen"
          v-if="purview == 1 || purview == 2 || purview == 46 || purview == 4"
          @click="goBack"
        ></div>
        <h2
          class="h2"
          @click="goToLowerHospital"
          :class="{ haveHospital: haveHospitalName }"
        >
          {{ title }}
          <span class="title-number" v-show="titleNumber != 0">
            {{ titleNumber }}
          </span>
        </h2>
      </div>
      <div class="mid" v-if="false" v-show="!isWangzhen">
        {{ midTitle }}
      </div>
      <div class="right-bar" v-show="right_show_bar">
        <!-- <div class="admin-index" @click="goToIndex" v-if="false">
          <div class="icon"></div>
          <span>平台首页</span>
        </div> -->
        <div class="search" @click="goToSearchPage" v-if="!isSearchHref"></div>
        <div class="reload" @click="reload">
          <span class="icon"></span>
        </div>
        <div class="login-out" @click="loignOutBtn"></div>
        <div class="time">{{ time }}</div>
      </div>
    </div>
    <!--诊疗 -->
    <Confim
      ref="confimBox"
      @btnSure="clickSure"
      :alertText="'注销账号' + loginName + '后，将退出登录'"
    ></Confim>
  </div>
</template>
<script>
import { mapState } from "vuex";
import Confim from "@/components/confim/confim";
let timer;
export default {
  name: "general_hospital_headers",
  components: { Confim },
  props: {
    isWangzhen: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: ""
    },
    logoSrc: {
      type: Boolean,
      default: false
    },
    right_show_bar: {
      type: Boolean,
      default: true
    },
    titleNumber: {
      type: Number,
      default: 0
    },
    midTitle: {
      type: String,
      default: ""
    },
    returnPath: {
      type: String,
      default: ""
    },
    isSearchHref: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      time: "2020-12-11 10：00",
      query: "",
      closeNumer: 1,
      src: "",
      from: this.$route.query.from
    };
  },
  computed: {
    ...mapState([
      "appId",
      "purview",
      "curuserid",
      "hospitalIsstore",
      "adminRoute",
      "loginHospitalName",
      "isLowerHospital"
    ]),
    loginName() {
      if (this.loginHospitalName.indexOf("医院") >= 0) {
        return this.loginHospitalName;
      } else {
        return this.loginHospitalName + "医院";
      }
    },
    haveHospitalName() {
      if (this.title.indexOf("医院") >= 0) {
        return true;
      } else {
        return false;
      }
    },
    showMidTitle() {
      const path = this.$route.path;
      if (
        path == "/zuozhen_detail" ||
        path == "/xunzhen_detail" ||
        path == "/cetu_detail"
      ) {
        return true;
      } else {
        false;
      }
    }
  },
  watch: {},
  created() {},
  mounted() {
    // console.log("this.$router.current :>> ", this.$route.path);
    // 获取时间
    const time = new Date();
    timer = setInterval(() => {
      const y = time.getFullYear();
      const m =
        time.getMonth() + 1 < 10
          ? "0" + (time.getMonth() + 1)
          : time.getMonth() + 1;
      const d = time.getDate() < 10 ? "0" + time.getDate() : time.getDate();
      const h = time.getHours();
      const min =
        time.getMinutes() < 10 ? "0" + time.getMinutes() : time.getMinutes();
      this.time = y + "-" + m + "-" + d + "  " + h + ":" + min;
    }, 1000);
    // this.getWeather();
    // 获取天气
  },
  destroyed() {
    clearInterval(timer);
  },
  methods: {
    loignOutBtn() {
      // 退出登陆按钮
      this.$refs.confimBox.showFlag = true;
    },
    clickSure() {
      this.$router.push({ path: "/" });
    },
    goToLowerHospital() {
      // 当显示为下级医院的时候点击去下级医院首页
      if (
        this.$router.currentRoute.name == "index_second" ||
        this.$router.currentRoute.name == "index_first"
      ) {
        return;
      }
      if (this.title.indexOf("医院") >= 0) {
        if (this.purview == 46 && this.isLowerHospital == "false") {
          this.$router.push({
            path: "/index_first"
          });
        } else {
          this.$router.push({ path: "/index_second" });
        }
      }
    },
    goBack() {
      if (this.from == "adminRoute") {
        window.close();
      }
      if (this.returnPath != "") {
        if (this.returnPath == "/index_second") {
          this.$router.replace({
            path: this.returnPath,
            query: { from: "adminRoute" }
          });
        } else {
          this.$router.replace({
            path: this.returnPath
          });
        }
      } else {
        this.$router.go(-1);
      }
    },
    close() {
      // 关闭下级医院
      if (this.closeNumer == 2) {
        if (this.purview == 46 && this.isLowerHospital == "false") {
          this.$router.push({
            path: "/index_first"
          });
          return;
        }
        window.close();
        return;
      }
      this.closeNumer += 1;
      this.$layer.msg("再按一次关闭该医院");
    },
    goToSearchPage() {
      // 去搜索页面
      this.$router.push({
        path: "/search",
        query: { from: "header" }
      });
    },
    reload() {
      this.$router.go();
    },
    goToIndex() {
      if (this.purview == 46) {
        this.$router.push({
          path: "/index_first"
        });
      } else {
        this.$router.push({
          path: "/indexFour",
          query: {
            userid: window.sessionStorage.getItem("curuserid"),
            areaname: window.sessionStorage.getItem("curcity"),
            level: window.sessionStorage.getItem("curlevel"),
            letter: window.sessionStorage.getItem("letter")
          }
        });
      }
    }
  }
};
</script>
<style lang="stylus" scoped>
.header-container
  height 100px
  position fixed
  min-width 1340px
  width 100%
  left 0
  right 0
  top 0
  background #080f3e
  z-index 22
  .head-wrap
    height 100%
    padding 0 45px
    display flex
    max-width 1900px
    margin 0 auto
    align-items center
    position relative
    .left-bar
      position absolute
      left 45px
      display flex
      align-items center
      line-height 1.2
      .h2
        flex 1
        text-align left
        font-size 30px
        color rgba(181, 181, 181, 1)
        font-weight 400
        color #7FB5F1
        padding-left 30px
        &.haveHospital
          cursor: pointer;
        .title-number
          margin-left 10px
      .logo
        float left
        width 65px
        height 65px
        .img
          display block
          width 100%
          height 100%
      .admin-icon
        width 110px
        height 30px
        cursor pointer
        position relative
        .icon-back
          width 56px
          height 30px
          position absolute
          left 0
          background url('./32.png') no-repeat
        .icon-close
          width 55px
          height 30px
          position absolute
          right  0
          background url('./32.png') no-repeat
          background-position right
      .goBack-icon
        width 30px
        height 30px
        background url('./3.png') no-repeat
        cursor pointer
     .mid
      text-align center
      font-size 34px
      color: #C5C5C5;
      width 100%
    .right-bar
      position absolute
      right 45px
      display flex
      align-items center
      justify-content flex-end
      .admin-index
        color #7FB5F1
        font-size 20px
        display flex
        align-items center
        margin-right 50px
        cursor pointer
        .icon
          width 26px
          height 25px
          margin-right 10px
          background url('./28.png') no-repeat
      .search
        cursor pointer
        width 160px
        height 50px
        font-size 30px
        margin-right 59px
        display inline-block
        vertical-align middle
        width 29px
        height 28px
        background url('../../assets/image/search.png') no-repeat
      .reload
        color #B5B5B5
        font-size 30px
        display flex
        align-items center
        margin-right 70px
        .icon
          display inline-block
          cursor pointer
          width 27px
          height 27px
          background url('../../assets/image/refresh.png') no-repeat
          background-size 100% 100%
      .login-out
          width 30px
          height 28px
          background url('../../assets/image/login_out_icon.png') no-repeat
          margin-right 60px
          cursor: pointer;
      .time
        color #7FB5F1
        font-size: 18px;
        display flex
        align-items center
        // margin-right 50px
</style>
