<template>
  <div class="contain">
    <div
      class="index"
      style="cursor:pointer"
      v-if="this.changemoudle == 'index' || this.changemoudle == 'find'"
      @click="toindex"
    >
      <div
        :class="[
          this.changemoudle == 'index' ? 'index-icon' : 'index-icon index-icon1'
        ]"
      ></div>
      <span
        :class="[
          this.changemoudle == 'index' ? 'index-text' : 'index-text index-text1'
        ]"
        >首页</span
      >
    </div>
    <div
      class="find"
      style="cursor:pointer"
      v-if="this.changemoudle == 'index' || this.changemoudle == 'find'"
      @click="tofind"
    >
      <div
        :class="[
          this.changemoudle == 'find' ? 'find-icon' : 'find-icon find-icon1'
        ]"
      ></div>
      <span
        :class="[
          this.changemoudle == 'find' ? 'find-text' : 'find-text find-text1'
        ]"
        >主题看板</span
      >
    </div>
    <div
      class="close_btn"
      v-if="this.changemoudle != 'index' && this.changemoudle != 'find'"
      style="cursor:pointer"
      @click="backto"
    >
      <div class="text1 jiantou">&lt;</div>
      <span class="text1 lefttitle">{{ this.lefttitle }}</span>
    </div>
    <div class="logo">
      <span class="h5">{{ this.middle_title }}</span>
    </div>
    <div class="change-data">
      <div class="change-icon"></div>
      <div class="change-box">
        <div class="title">
          <span class="p1 active">医院数据源切换</span>
          <span class="p2">{{ this.cur_cityname }}</span>
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
    <div class="time"><Date /></div>
    <Confim
      ref="confimBox"
      @btnSure="clickSure"
      :alertText="'注销' + cur_cityname + '账号后，将退出监控平台'"
    ></Confim>
    <slot></slot>
  </div>
</template>
<script>
import Confim from "../confim/confim";
import { mapMutations, mapState } from "vuex";
const Date = resolve => require(["../date/date"], resolve);
export default {
  props: {
    cur_cityname: {
      type: String,
      default: function() {}
    },
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
    }
  },
  data() {
    return {
      chooseHospitalRadio: "1"
    };
  },
  created() {
    console.log(this.$store.state.isstore);
    if (this.$store.state.isstore == "null") {
      this.chooseHospitalRadio = "null";
    } else {
      this.chooseHospitalRadio = "1";
    }
  },
  components: {
    Date,
    Confim
  },
  methods: {
    tofind() {
      console.log("tofind");
      this.$router.push({ path: "/findindex" });
    },
    toindex() {
      console.log("toindex");
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
    backto() {
      this.$router.go(-1);
    },
    refresh() {
      location.reload();
    },
    loignOutBtn() {
      // 退出登陆按钮
      this.$refs.confimBox.showFlag = true;
    },
    clickSure() {
      this.$router.go(-1);
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
    ...mapMutations(["getNoData", "getIsstore"])
  }
};
</script>
<style lang="stylus" scoped>
.text1
  position fixed
  font-size 20px
  left 25px
  top 20px
  @media screen and (min-width:1900px) {
    font-size 30px
    left 40px
    top 40px
  }
  color #7FB5F1
.jiantou
  border 2px solid #7FB5F1
  border-radius 50%
  width 22px
  height 22px
  padding-right 3px
  @media screen and (min-width:1900px) {
    width 32px
    height 32px
  }
.lefttitle
  left 55px
  @media screen and (min-width:1900px) {
    left 91px
  }
.index,.find
  position fixed
  top 21px
  left 26px
  font-size 20px
  color #ffffff
  @media screen and (min-width:1900px){
    font-size 25px
    top 40px
  }
.index
  width 60px
  @media screen and (min-width:1900px){
    width 120px
    left 44px
    top 46px
  }
  z-index 999
  .index-icon
    height 18px
    width 20px
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
    position fixed
    left 56px
    top 21px
    @media screen and (min-width:1900px){
      top 48px
      left 86px
    }
  .index-text1
    color #7FB5F1
.find
  left 134px
  top 21px
  @media screen and (min-width:1900px){
    top 46px
    left 198px
  }
  z-index 666
  .find-icon
    height 20px
    width 20px
    @media screen and (min-width:1900px){
      height 28px
      width 28px
    }
    background url('./find-icon1.png') no-repeat
    background-size 100%
    bg-image('./find-icon1')
  .find-icon1
    background url('./find-icon.png') no-repeat
    bg-image('./find-icon')
    background-size 20px 20px
    @media screen and (min-width:1900px){
      background-size 28px 28px
    }
  .find-text
    position fixed
    top 21px
    left 163px
    @media screen and (min-width:1900px){
      top 48px
      left 239px
    }
  .find-text1
    color #7FB5F1
.logo
  position fixed
  left 0
  right 0
  top 18px
  @media screen and (min-width:1900px) {
    top 40px
  }
  .h5
    font-size 24px
    font-family SourceHanSansCN-Medium
    font-weight 500
    color #FFFFFF
    @media screen and (min-width:1900px){
      font-size 36px
    }
  .h6
    font-size 17px
    font-family ArialMT
    font-weight 400
    color rgba(255, 255, 255, 1)
.time
  position fixed
  top 25px
  right 17px
  font-size 14px
  font-family ArialMT
  font-weight 400
  color rgba(127, 181, 241, 1)
  @media screen and (min-width:1900px){
    top 54px
    right 43px
    width 141px
  }
.change-data
  position fixed
  top 21px
  right 173px
  height 30px
  @media screen and (min-width:1900px){
    right 239px
    top 46px
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
    background-size 100%
    bg-image('./setting-icon')
    cursor pointer
    &:hover .change-box
      display block
  .change-box
    position absolute
    right 0
    top 18px
    width 355px
    height 200px
    background #05113D
    z-index 9999999999
    border 1px solid #1B4E79
    display none
    @media screen and (min-width:1900px) {
      top 25px
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
  width 20px
  height 20px
  background url('./refresh.png') no-repeat
  background-size 100%
  position fixed
  top 21px
  right 229px
  @media screen and (min-width:1900px){
      height 28px
      width 28px
      right 317px
      top 46px
  }
  cursor pointer
</style>
