<template>
    <div>
        <div class="index" style="cursor:pointer" @click="toindex">
          <div :class='[this.changemoudle == "index" ? "index-icon" :"index-icon index-icon1"]' ></div>
          <span :class='[this.changemoudle == "index" ? "index-text" :"index-text index-text1"]' >首页</span>
        </div>
        <div class="find"  style="cursor:pointer" @click="tofind">
          <div :class='[this.changemoudle == "find" ? "find-icon" :"find-icon find-icon1"]' ></div>
          <span :class='[this.changemoudle == "find" ? "find-text" :"find-text find-text1"]' >主题看板</span>
        </div>
        <div class="logo">
          <span class="h5">新型庄稼医院管理驾驶舱</span>
        </div>
        <div class="change-data">
          <div class="change-icon"></div>
          <div class="change-box">
            <div class="title">
              <span
                class="p1 active"
              >医院数据源切换</span>
              <span class="p2"
              >{{this.cur_cityname}}</span>
            </div>
            <div class="choose">
              <div
                class="item"
                @click="chooseHospital('null')"
              >
                <div
                  class="radio"
                  :class="{active:chooseHospitalRadio == 'null' || chooseHospitalRadio == 2}"
                ></div>
                <span :class="{active:chooseHospitalRadio == 'null' || chooseHospitalRadio == 2}">显示所有医院</span>
              </div>
              <div class="item" @click="chooseHospital(1)">
                <div class="radio" :class="{active:chooseHospitalRadio == 1}"></div>
                <span :class="{active:chooseHospitalRadio == 1}">仅显示新型</span>
              </div>
            </div>
            <div class="login-out" @click="loignOutBtn" >退出登录</div>
          </div>
        </div>
        <div
          class="icon-refresh"
          @click="refresh"
        ></div>
        <div class="time"><Date/></div>
        <Confim
            ref="confimBox"
            @btnSure="clickSure"
            :alertText="'注销'+cur_cityname+'账号后，将退出监控平台'"
        ></Confim>
    </div>
</template>
<script>
const Date = resolve=>require(["../../ui-components/date/date"],resolve)
import Confim from "../../ui-components/confim/confim"
import { mapMutations, mapState } from "vuex"
export default {
    props:{
        cur_cityname:{
            type:String,
            default: function() {
                return ;
            }
        },
        changemoudle:{
            type:String,
            default: function() {
                return 'index';
            }
        }
    },   
    data(){
        return{
            chooseHospitalRadio: '1',
        }
    },
    created(){
        console.log(this.$store.state.isstore)
        if(this.$store.state.isstore == 'null'){
            this.chooseHospitalRadio = 'null'
        }else{
            this.chooseHospitalRadio = '1'
        }
    },
    mounted(){
    },
    components:{
        Date,
        Confim
    },
    methods:{
        tofind(){
            console.log('tofind')
            this.$router.push({path:"/findindex"})
        },
        toindex(){
            console.log('toindex')
            this.$router.push({path:"/index",
            query: {
                userid:window.sessionStorage.getItem('curuserid'),
                areaname:window.sessionStorage.getItem('curcity'),
                level: window.sessionStorage.getItem('curlevel'),
                letter: window.sessionStorage.getItem('letter')
            }})
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
            //选择所有/或者新型医院
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
        ...mapMutations([
            "getNoData",
            "getIsstore"
        ]),
    }
}
</script>
<style lang="stylus" scoped>
    .index,.find
      position absolute
      top 15px
      font-size 13px
      color #ffffff
    .index
      left 20px
      padding-top 1px
      width 60px
      z-index 999
      .index-icon
        height 18px
        width 20px
        background url('./index-white-icon.png') no-repeat
        background-size 100%
        bg-image('./index-white-icon') 
      .index-icon1
        background url('./index-icon1.png') no-repeat
        bg-image('./index-icon1') 
        background-size 20px 18px
      .index-text
        position absolute
        left 25px
        top 6px
      .index-text1
        color #7FB5F1
    .find
      left 100px
      width 80px
      top 15px
      border 1px solid transparent
      z-index 666
      .find-icon
        height 20px
        width 20px
        background url('./find-icon1.png') no-repeat
        background-size 100%
        bg-image('./find-icon1')
      .find-icon1
        background url('./find-icon.png') no-repeat
        bg-image('./find-icon')
        background-size 20px 20px
      .find-text
        position absolute
        right 0px
        top 5px
      .find-text1
        color #7FB5F1
    .logo
      position absolute
      left 0
      right 0
      top 15px
      .h5
        font-size 24px
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
      top 11px
      right 20px
      font-size 14px
      font-family ArialMT
      font-weight 400
      color rgba(127, 181, 241, 1)
    .change-data
      position absolute
      top 0px
      right 175px
      height 30px
      &:hover .change-box
        display block
      .change-icon
        width 20px
        height 18px
        margin-top 18px
        background url('./setting-icon.png') no-repeat
        background-size 100%
        bg-image('./setting-icon')
        cursor pointer
        &:hover .change-box
          display block
      .change-box
        position absolute
        right 0
        top 36px
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
      width 20px
      height 20px
      background url('./refresh.png') no-repeat
      background-size 100%
      position absolute
      top 17px
      right 229px
      cursor pointer
      z-index 9999
</style>