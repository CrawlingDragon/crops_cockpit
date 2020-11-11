<template>
  <div class="contain">
    <div class="left_nav">
      <div
        class="index"
        style="cursor:pointer"
        v-if="this.changemoudle == 'index' || this.changemoudle == 'find'"
        @click="toindex"
      >
        <span
          :class="[
            this.changemoudle == 'index' ? 'index-icon' : 'index-icon index-icon1'
          ]"
        ></span>
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
        <span
          :class="[
            this.changemoudle == 'find' ? 'find-icon' : 'find-icon find-icon1'
          ]"
        ></span>
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
        <span class="text1 jiantou"></span>
        <span class="text1 lefttitle">{{ this.lefttitle }}</span>
      </div>
    </div>
    <div class="logo">
      <span class="h5">{{ this.middle_title }}</span>
    </div>
    <div class="right_nav">
      <span class="icon-refresh" @click="refresh"></span>
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
      <div class="time"><Date /></div>
    </div>
    <Confim
      ref="confimBox"
      @btnSure="clickSure"
      :alertText="'注销' + cur_cityname + '账号后，将退出驾驶舱'"
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
    // cur_cityname: {
    //   type: String,
    //   default: function() {}
    // },
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
  data() {
    return {
      chooseHospitalRadio: "1",
      cur_cityname:window.sessionStorage.getItem("name")
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
      if(this.$props.returnpath == "/findindex"){
        this.$router.push({path:this.$props.returnpath})
      }else{
        this.$router.go(-1)
      }
    },
    refresh() {
      location.reload();
    },
    loignOutBtn() {
      // 退出登陆按钮
      this.$refs.confimBox.showFlag = true;
    },
    clickSure() {
      this.$router.push({path:"/"});
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
      this.$emit("datatype",num)
    },
    ...mapMutations(["getNoData", "getIsstore"])
  },
  watch:{
    chooseHospitalRadio(newVal){
      console.log(newVal)
      // this.$emit("datatype",newVal)
    }
  }
};
</script>
<style lang="stylus" scoped>
.contain
  height 50px
  display flex
  @media screen and (min-width:1900px) {
    height 75px
    padding-top 20px
  }
  width 100%
  .left_nav
    flex 3
    margin-left 40px
    text-align left
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
        vertical-align top
        @media screen and (min-width:1900px) {
          margin 4px 0px 0px 14px
        }
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
        position relative
        @media screen and (min-width:1340px) and (max-width:1899px) {
          bottom 2px
        }
        @media screen and (min-width:1900px){
          bottom 3px
        }
      .find-text1
        color #7FB5F1
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
    margin-right 40px
    .icon-refresh
      display inline-block
      width 20px
      height 20px
      margin-top 15px
      background url('./refresh.png') no-repeat
      background-size 100%
      @media screen and (min-width:1900px){
          height 28px
          width 28px
          margin-right 50px
      }
    cursor pointer
    .time
      display inline-block
      font-size 18px
      width 160px
      font-family ArialMT
      font-weight 400
      color rgba(127, 181, 241, 1)
      position relative
      bottom 1px
      @media screen and (min-width:1900px) {
        bottom 3px
      }
    .change-data
      display inline-block
      margin-right 30px
      margin-left 30px
      @media screen and (min-width:1900px){
        right 239px
        margin-right 55px
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
</style>
