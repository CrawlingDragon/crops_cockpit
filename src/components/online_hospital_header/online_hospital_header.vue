<template>
  <div class="header-container">
    <div class="head-wrap cf">
      <div class="left-bar">
        <div class="logo" v-show="logoSrc" v-if="purview == 1 || purview == 2">
          <img src="./main_page_icon.png" alt="" class="img" />
        </div>
        <slot></slot>
        <div
          class="admin-icon"
          v-if="purview == 3 || purview == 4"
          v-show="!isWangzhen"
        >
          <div class="icon-back" @click="goBack"></div>
          <div class="icon-close" @click="close"></div>
        </div>
        <div class="goBack-icon" v-show="isWangzhen" @click="goBack"></div>
        <div
          class="goBack-icon"
          v-show="!logoSrc && !isWangzhen"
          v-if="purview == 1 || purview == 2"
          @click="goBack"
        ></div>
        <h2 class="h2" @click="goToLowerHospital">
          {{ title }}
          <span class="title-number" v-show="titleNumber != 0">
            {{ titleNumber }}
          </span>
        </h2>
      </div>
      <div class="mid" v-if="purview == 3 || purview == 4">{{ midTitle }}</div>
      <div class="right-bar" v-show="right_show_bar">
        <div
          class="admin-index"
          @click="goToIndex"
          v-if="purview == 3 || purview == 4"
        >
          <div class="icon"></div>
          <span>驾驶舱首页</span>
        </div>
        <div class="reload" @click="reload">
          <span class="icon"></span>
        </div>
        <div class="weather">
          <span class="icon"><img :src="weather.todaypicture" alt=""/></span>
          <span>{{ weather.nowtemperature }} ℃</span>
        </div>
        <div class="time">{{ time }}</div>
        <!-- <div class="search" @click="goToSearch">
        <span class="icon"></span>
        <span>搜索</span>
      </div> -->
      </div>
    </div>
  </div>
</template>
<script>
import { mapState, mapMutations } from "vuex";
export default {
  name: "online_hospital_headers",
  components: {},
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
      type: String,
      default: ""
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
    }
  },
  data() {
    return {
      time: "",
      query: "",
      weather: "",
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
      "adminRoute"
    ])
  },
  watch: {},
  created() {},
  mounted() {
    this.src = "./main_page_icon.png";
    // 获取时间
    const time = new Date();
    setInterval(() => {
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
    this.getWeather();
    // 获取天气
  },
  destroyed() {},
  methods: {
    goToLowerHospital() {
      // 当显示为下级医院的时候点击去下级医院首页
      if (this.title.indexOf("医院") >= 0) {
        this.$router.push({ path: "/index_second" });
        // if (this.hospitalIsstore == 1) {
        //   this.$router.push({ path: "/index_third" });
        // } else if (this.hospitalIsstore == 2) {

        // }
      }
    },
    goBack() {
      if (this.from == "adminRoute") {
        window.close();
      }
      if (this.returnPath != "") {
        this.$router.replace({
          path: this.returnPath
        });
      } else {
        this.$router.go(-1);
      }
    },
    close() {
      // 关闭下级医院
      if (this.closeNumer == 2) {
        window.close();
        // if (this.adminRoute == "/indexFour") {
        //   this.$router.push({
        //     path: "/indexFour",
        //     query: {
        //       userid: window.sessionStorage.getItem("curuserid"),
        //       areaname: window.sessionStorage.getItem("curcity"),
        //       level: window.sessionStorage.getItem("curlevel"),
        //       letter: window.sessionStorage.getItem("letter")
        //     }
        //   });
        // } else {
        //   this.$router.push({
        //     path: this.adminRoute
        //   });
        // }
        return;
      }
      this.closeNumer += 1;
      this.$layer.msg("再按一次关闭该医院");
    },
    getWeather() {
      // 获取头部天气
      this.$axios
        .fetchGet("/Home/Index/GetAreaWeather", { appId: this.appId })
        .then(res => {
          if (res.data.code === "200") {
            this.weather = res.data.data;
          }
        });
    },
    reload() {
      this.$router.go();
    },
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
    goToSearch() {
      this.$router.push({
        path: "/search"
      });
    }
  }
};
</script>
<style lang="stylus" scoped>
.header-container
  height 100px
  position fixed
  min-width 1340px
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
        color #000000
        cursor pointer
        width 160px
        height 50px
        background rgba(255, 255, 255, 1)
        opacity 0.5
        border-radius 25px
        display flex
        align-items center
        justify-content center
        font-size 30px
        .icon
          display inline-block
          width 27px
          height 27px
          background url('./4.png') no-repeat
          margin-right 8px
      .reload
        color #B5B5B5
        font-size 30px
        display flex
        align-items center
        margin-right 50px
        .icon
          display inline-block
          cursor pointer
          width 27px
          height 27px
          background url('./refresh.png') no-repeat
          margin-right 8px
      .weather
        color #7FB5F1
        font-size: 18px;
        display flex
        align-items center
        margin-right 37px
        color #7FB5F1
        .icon
          display inline-block
          width 26px
          height 26px
          margin-right 8px
          img
            width 100%
            height 100%
            display block
      .time
        color #7FB5F1
        font-size: 18px;
        display flex
        align-items center
        // margin-right 50px
</style>
