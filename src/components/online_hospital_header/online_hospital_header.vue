<template>
  <div class="header-container">
    <div class="head-wrap cf">
      <div class="left-bar" @click="goBack">
        <div class="logo" v-show="logoSrc">
          <el-image :src="logoSrc" fit="cover" class="img"></el-image>
        </div>
        <slot></slot>
        <div class="goBack-icon" v-show="!logoSrc"></div>
        <h2 class="h2">
          {{ title }}
          <span class="title-number" v-show="titleNumber != 0">
            {{ titleNumber }}
          </span>
        </h2>
      </div>
      <div class="right-bar" v-show="right_show_bar">
        <div class="reload" @click="reload">
          <span class="icon"></span>
        </div>
        <div class="weather">
          <span class="icon"><img src="../../assets/62.png" alt=""/></span>
          <span>{{ weather.todaytemperature }}</span>
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
import { mapState } from "vuex";

export default {
  name: "headers",
  components: {},
  props: {
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
    returnPath: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      time: "",
      query: "",
      weather: ""
    };
  },
  computed: {
    ...mapState(["appId"])
  },
  watch: {},
  created() {},
  mounted() {
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
    goBack() {
      if(this.$props.returnPath == "/online_hospital_channel"){
        this.$router.push({path:this.$props.returnPath})
      }
      // if (!this.logoSrc) {
      //   this.$router.go(-1);
      // }
    },
    getWeather() {
      // 获取头部天气
      this.$axios
        .fetchPost("/Home/Index/GetAreaWeather", { appId: this.appId })
        .then(res => {
          if (res.data.code === "200") {
            this.weather = res.data.data;
          }
        });
    },
    reload() {
      this.$router.go();
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
    .left-bar
      width 50%
      float left
      display flex
      align-items center
      line-height 1.2
      .h2
        flex 1
        text-align left
        font-size 30px
        color rgba(181, 181, 181, 1)
        font-weight 400
        cursor pointer
        color #7FB5F1
        padding-left 30px
        .title-number
          margin-left 10px
      .logo
        float left
        width 40px
        height 40px
        .img
          display block
          width 100%
          height 100%
      .goBack-icon
        width 30px
        height 30px
        background url('./3.png') no-repeat
        cursor pointer
    .right-bar
      width 50%
      float right
      display flex
      align-items center
      justify-content flex-end
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
          img
            display block
            width 36px
            height 28px
            margin-right 8px
      .time
        color #7FB5F1
        font-size: 18px;
        display flex
        align-items center
        margin-right 50px
</style>
