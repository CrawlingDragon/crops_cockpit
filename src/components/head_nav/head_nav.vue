<template>
  <div class="header-contain">
    <div class="left_nav">
      <div
        class="index"
        style="cursor:pointer"
        v-if="
          changemoudle == 'index' ||
            changemoudle == 'find' ||
            changemoudle == 'channel'
        "
        @click="toIndex"
      >
        <span
          :class="[
            changemoudle == 'index' ? 'index-icon' : 'index-icon index-icon1'
          ]"
        ></span>
        <span
          :class="[
            changemoudle == 'index' ? 'index-text' : 'index-text index-text1'
          ]"
          >首页</span
        >
      </div>
      <div
        class="find"
        style="cursor:pointer"
        v-if="
          changemoudle == 'index' ||
            changemoudle == 'find' ||
            changemoudle == 'channel'
        "
        @click="toChannel"
      >
        <span
          :class="[
            changemoudle === 'channel' ? 'channel-active-icon' : 'channel-icon'
          ]"
        ></span>
        <span
          :class="[
            changemoudle === 'channel' ? 'channel-active-text' : 'channel-text'
          ]"
          >频道</span
        >
      </div>
      <div
        class="find"
        style="cursor:pointer"
        v-if="
          dataV === '1' &&
            (changemoudle == 'index' ||
              changemoudle == 'find' ||
              changemoudle == 'channel')
        "
        @click="toFind"
      >
        <span
          :class="[
            this.changemoudle == 'find' ? 'find-icon' : 'find-icon find-icon1'
          ]"
        ></span>
        <span
          :class="[
            this.changemoudle == 'find' ? 'find-text' : 'find-text find-text1'
          ]"
          >{{ dataV == 1 ? "数据分析" : "数据分析" }}</span
        >
      </div>
      <div
        class="close_btn"
        v-if="
          this.changemoudle != 'index' &&
            this.changemoudle != 'find' &&
            this.changemoudle != 'channel'
        "
        style="cursor:pointer"
        @click="backTo"
      >
        <span class="text1 jiantou"></span>
        <span class="text1 lefttitle">{{ this.lefttitle }}</span>
      </div>
    </div>
    <div class="logo">
      <span class="h5">{{ this.middle_title }}</span>
    </div>
    <div class="right_nav">
      <div class="search" @click="goToSearch"></div>
      <span class="icon-refresh" @click="refresh"></span>
      <div class="change-data">
        <div class="login-out" @click="loginOutBtn"></div>
      </div>
      <div class="time"><Date /></div>
    </div>
    <Confim
      ref="confimBox"
      @btnSure="clickSure"
      :alertText="'注销' + loginName + '账号后，将退出登录'"
    ></Confim>
    <slot></slot>
  </div>
</template>
<script>
import Confim from "../confim/confim";
import { mapMutations, mapState } from "vuex";
const Date = resolve => require(["../date/date"], resolve);
export default {
  name: "header_nav",
  props: {
    changemoudle: {
      type: String,
      default: function() {}
    },
    middle_title: {
      type: String,
      default: function() {}
    },
    // 左边标题
    lefttitle: {
      type: String,
      default: function() {
        return "下级医院";
      }
    },
    // 记录要返回的路由地址
    returnpath: {
      type: String,
      default: function() {
        return "";
      }
    }
  },
  computed: {
    ...mapState(["loginHospitalName", "dataV"]),
    loginName() {
      if (this.loginHospitalName.indexOf("医院") >= 0) {
        return this.loginHospitalName;
      } else {
        return this.loginHospitalName + "医院";
      }
    }
  },
  data() {
    return {
      cur_cityname: this.loginHospitalName
    };
  },
  mounted() {},
  components: {
    Date,
    Confim
  },
  methods: {
    toChannel() {
      this.$router.push({ path: "/index_channel" });
    },
    toFind() {
      this.$router.push({
        path: "/data_analysis"
      });
    },
    toIndex() {
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
    backTo() {
      if (
        this.$props.returnpath === "/findindex" ||
        this.$props.returnpath === "/data_analysis"
      ) {
        this.$router.push({ path: this.$props.returnpath });
      } else if (this.$props.returnpath === "/indexFour") {
        this.$router.push({
          path: this.$props.returnpath,
          query: {
            userid: window.sessionStorage.getItem("curuserid"),
            areaname: window.sessionStorage.getItem("curcity"),
            level: window.sessionStorage.getItem("curlevel"),
            letter: window.sessionStorage.getItem("letter")
          }
        });
      } else {
        this.$router.go(-1);
      }
    },
    refresh() {
      location.reload();
    },
    loginOutBtn() {
      // 退出登陆按钮
      this.$refs.confimBox.showFlag = true;
    },
    clickSure() {
      this.$router.push({ path: "/" });
    },
    goToSearch() {
      this.$router.push({
        path: "/search",
        query: { from: "header" }
      });
    },
    ...mapMutations(["getNoData", "getIsstore"])
  }
};
</script>
<style lang="stylus" scoped>
.header-contain
  height 80px
  display flex
  background: #080f3e;
  padding-bottom 20px
  @media screen and (min-width:1900px) {
    height 85px
    padding-top 20px
  }
  width 100%
  .left_nav
    flex 3
    text-align left
    padding-left 40px
    .text1
      font-size 20px
      @media screen and (min-width:1900px) {
        font-size 30px
      }
      color #7FB5F1
    .jiantou
      display inline-block
      width 22px
      height 22px
      margin 15px 20px auto 0px
      background url("../../assets/61.png")
      background-size 100%
      @media screen and (min-width:1900px) {
        width 30px
        height 30px
      }
    .lefttitle
      font-size 20px
      position relative
      bottom 3px
      @media screen and (min-width:1900px) {
        font-size 26px
      }
    .index,.find
      display inline-block
      font-size 20px
      color #ffffff
      @media screen and (min-width:1900px){
        font-size 25px
      }
    .index
      margin 15px 0px 0px 0px
      .index-icon
        display inline-block
        text-align left
        height 18px
        width 20px
        vertical-align middle
        @media screen and (min-width:1900px){
          height 28px
          width 28px
        }
        background url('./index-white-icon.png') no-repeat
        background-size 100%
        bg-image('./index-white-icon')
      .index-icon1
        background url('./index-icon1.png') no-repeat
        bg-image('./index-icon1')
        background-size 20px 18px
        @media screen and (min-width:1900px){
          background-size 28px 28px
        }
      .index-text
        margin 0px 0px 0px 14px
        display inline-block
        vertical-align middle
      .index-text1
        color #7FB5F1
    .find
      margin 15px 0px 0px 40px
      @media screen and (min-width:1900px){
        margin-left 63px
      }
      .find-icon
        display inline-block
        height 20px
        width 20px
        margin-right 13px
        vertical-align middle
        @media screen and (min-width:1900px){
          height 28px
          width 28px
        }
        background url('./4.png') no-repeat
        background-size 100%
        bg-image('./4')
      .find-icon1
        background url('./2.png') no-repeat
        bg-image('./2')
        vertical-align middle
        background-size 20px 20px
        @media screen and (min-width:1900px){
          background-size 28px 28px
        }
      .find-text
        vertical-align middle
        @media screen and (min-width:1340px) and (max-width:1899px) {
          bottom 2px
        }
        @media screen and (min-width:1900px){
          bottom 3px
        }
      .find-text1
        color #7FB5F1
  .channel-active-icon
    display: inline-block
    vertical-align: middle
    width 20px
    height: 20px
    background:url('./3.png') no-repeat
    background-size 100%
    margin-right: 13px
    @media screen and (min-width:1900px){
      display: inline-block
      width 28px
      height: 28px
    }
  .channel-active-text
    display: inline-block
    vertical-align: middle
    color #fff
  .channel-icon
    display: inline-block
    vertical-align: middle
    width 20px
    height: 20px
    background:url('./1.png') no-repeat
    background-size 100%
    margin-right: 13px
    @media screen and (min-width:1900px){
      display: inline-block
      width 28px
      height: 28px
    }
  .channel-text
    display: inline-block
    vertical-align: middle
    color $theme-color
  .logo
    flex 3
    .h5
      font-size 24px
      font-family SourceHanSansCN-Medium
      font-weight 500
      line-height 58px
      color #FFFFFF
      @media screen and (min-width:1900px){
        font-size 36px
      }
  .right_nav
    flex 3
    text-align right
    .icon-refresh
      display inline-block
      width 20px
      height 20px
      margin-top 15px
      background url('../../assets/image/refresh.png') no-repeat
      background-size 100% 100%
      margin-right 40px
      @media screen and (min-width:1900px){
          height 28px
          width 28px
          margin-right 70px
      }
    cursor pointer
    .time
      display inline-block
      font-size 18px
      width 155px
      font-family ArialMT
      font-weight 400
      color rgba(127, 181, 241, 1)
      position relative
      bottom 1px
      text-align left
      margin-right 40px
      text-align: right
      @media screen and (min-width:1900px) {
        bottom 3px
      }
    .change-data
      display inline-block

      @media screen and (min-width:1900px){
        right 239px
      }
      &:hover .change-box
        display block
      .change-icon
        width 20px
        height 18px
        @media screen and (min-width:1900px){
          height 28px
          width 28px
        }
        background url('./setting-icon.png') no-repeat
        background-size 100% 100%
        bg-image('./setting-icon')
        cursor pointer
        &:hover .change-box
          display block
      .change-box
        position absolute
        z-index 9999
        right 230px
        top 35px
        width 355px
        height 200px
        background #05113D
        border 1px solid #1B4E79
        display none
        @media screen and (min-width:1900px) {
          top 60px
          right 255px
        }
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
  width 22px
  height 20px
  background url('../../assets/image/login_out_icon.png') no-repeat
  margin-right 40px
  cursor: pointer;
  background-size 100% 100%
  @media screen and (min-width:1900px) {
    margin-right 60px
    width 30px
    height 28px
  }
.search
  cursor pointer
  font-size 30px
  margin-right 40px
  display inline-block
  width 20px
  height 19px
  background url('../../assets/image/search.png') no-repeat
  background-size 100% 100%
  @media screen and (min-width:1900px) {
    margin-right 60px
    width 29px
    height 28px

   }
</style>
