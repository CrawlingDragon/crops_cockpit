<template>
  <!-- 扫码登录 -->
  <div class="container-wrap login_code_container">
    <div class="title">扫码登录</div>
    <div class="code-box">
      <VueQrcode
        :value="erweimaValue"
        class="erweima"
        v-show="user_img == ''"
      />
      <el-image
        :src="user_img"
        class="erweima"
        fit="cover"
        v-show="user_img != ''"
      ></el-image>
      <div class="status" v-show="codeError">
        <div class="status-title">二维码已失效</div>
        <div class="status-btn">重新获取</div>
      </div>
    </div>
    <div class="title2" v-show="!codeSuccess">
      请使用<span>益农宝App</span>扫码登录
    </div>
    <div class="title2" v-show="codeSuccess">{{ user_name }}</div>
    <div class="title3">
      {{
        codeSuccess == true
          ? "请在手机上确认登录"
          : "监管账号不支持扫码登录,请通过用户名登录"
      }}
    </div>
    <div class="account-login" @click="goUserLogin">
      <div class="icon"></div>
      <span>用户名登录</span>
    </div>
  </div>
</template>
<script>
import VueQrcode from "vue-qrcode";
import { mapMutations } from "vuex";
export default {
  name: "login_code",
  components: { VueQrcode },
  props: {},
  data() {
    return {
      codeError: false, // 二维码失败，或者失效
      codeSuccess: false, // 正确扫码成功，获取到用户图片
      ws: "",
      erweimaValue: "w",
      user_img: "",
      user_name: ""
    };
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {
    const wsUrl =
      process.env.NODE_ENV === "development"
        ? "ws://218.244.138.10:8989"
        : "ws://114.215.173.157:8989";
    console.log("process.env.NODE_ENV :>> ", process.env.NODE_ENV);
    this.ws = new WebSocket(wsUrl);

    // this.ws_open();
    this.ws_message();
    this.ws_error();
  },
  destroyed() {},
  methods: {
    ...mapMutations([
      "getPurview",
      "setAppId",
      "setLoginId",
      "setLoginHospitalName",
      "getDefaultProvince",
      "getGlobalLevel",
      "getSecondGlobalLevel",
      "getAccountName",
      "getGlobalFstusername",
      "getGlobalFstuserpw",
      "getGlobalFstRoomid",
      "setIsDataV"
    ]),
    ws_message() {
      // ws 接受到数据后 处理数据
      const that = this;
      if (this.$route.name != "login") {
        return;
      }
      this.ws.addEventListener("message", function(event) {
        const data = JSON.parse(event.data);
        console.log("data :>> ", data);
        console.log("that.ws :>> ", that.ws);
        if (data.type === "login") {
          that.erweimaValue = data.client_id + "&from=pc";
        }
        if (data.code === "200" && data.type === "submit") {
          that.user_img = data.data.logo;
          that.user_name = data.data.name;
          that.codeSuccess = true;
        } else if (data.code === "200" && data.type === "success") {
          // 登录成功
          const purview = data.purview;
          const appid = data.uid;
          const name = data.name;
          const isshaoxing = data.ishaoxing;
          that.setIsDataV(data.isdatav);
          window.sessionStorage.setItem("isshaoxing", isshaoxing); // 判断是否是绍兴市或者是绍兴市所属县级管理院
          that.getPurview(purview);
          that.setAppId(appid);
          that.setLoginId(appid);
          that.getGlobalFstusername(data.Fstusername); // 获取益农通账号
          that.getGlobalFstuserpw(data.Fstuserpw); // 获取益农通密码
          that.getGlobalFstRoomid(data.FstRoomid); // 获取益农通id
          if (purview == 1) {
            that.$router.push({
              path: "/index_third"
            });
          } else if (purview == 2) {
            that.$router.push({
              path: "/index_second"
            });
          } else if (purview == 46) {
            // purview == 46 是总院
            that.$router.push({
              path: "index_first"
            });
            that.setLoginHospitalName(name);
          } else {
            const userid = data.uid;
            const level = data.level;
            let secondLevel = 0;
            if (level >= 3) {
              secondLevel = level - 1;
            } else {
              secondLevel = level;
            }
            const arr = data.area;
            const areaname = data.areaname;
            const name = data.name;
            that.setLoginHospitalName(name);
            window.sessionStorage.setItem("name", name);
            window.sessionStorage.setItem("curcity", areaname);
            window.sessionStorage.setItem("curlevel", level); // 存储当前登录的管理院等级
            window.sessionStorage.setItem("curuserid", userid);
            const defaultName = data.default;
            const letter = data.letter;
            window.sessionStorage.setItem("letter", letter);
            that.getDefaultProvince(areaname); // 获取全网页地址
            that.getGlobalLevel(level); // 获取全网页等级
            that.getSecondGlobalLevel(secondLevel); // 获取二级方块等级
            that.getAccountName(areaname);

            window.sessionStorage.setItem("LoginId", level); // 记录当前登录账号的等级水平
            that.$router.push({
              path: "/indexFour",
              query: {
                userid: userid,
                areaname: areaname,
                level: level,
                letter: letter
              }
            });
          }
          that.ws.onclose = function() {};
          that.ws.close();
          console.log("that.ws :>> ", that.ws);
        } else if (data.code === "200" && data.type === "cancle") {
          // 登录取消
          that.codeSuccess = false;
          that.user_img = "";
        }
      });
    },
    ws_open() {
      // ws 成功链接后
      this.ws.addEventListener("open", function(event) {
        console.log("open :>> ", event);
      });
    },
    ws_error() {
      // ws 发生错误后
      this.ws.addEventListener("error", function(event) {
        // handle error event
        console.log("error :>> ", event);
      });
    },
    goUserLogin() {
      this.$emit("changeCodeLogin", false);
    }
  }
};
</script>
<style lang="stylus" scoped>
.login_code_container
  color #fff
  text-align center
  padding-bottom 50px
  .title
    font-size: 42px;
    margin-bottom 3%
    margin-top 3%
  .code-box
    width 300px
    height 300px
    border : 5px solid rgba(255, 255, 255, 0.5);
    border-radius: 8px;
    background: #0B51A3;
    margin 0 auto
    position relative
    // overflow hidden
    .erweima
      width 100%
      height 100%
      border-radius: 8px;
    .status
      position absolute
      left -5px
      top -5px
      right -5px
      bottom -5px
      width 300px
      height 300px
      background rgba(0, 0, 0, .9)
      text-align center
      .status-title
        font-size 36px
        padding-top 75px
        margin-bottom 40px
      .status-btn
        width 210px
        height 60px
        width: 210px;
        height: 60px;
        display inline-block
        background: #FF6600;
        border-radius: 30px;
        font-size 28px
        line-height 60px
        cursor pointer
  .title2
    font-size 40px
    margin-top 60px
    span
      color rgba(255, 102, 0, 1)
  .title3
    margin-top 23px
    font-size: 24px;
  .account-login
    width 516px
    height 63px
    margin 0 auto
    background url('../../assets/image/login/login_where.png') no-repeat
    background-size 100%
    text-align center
    margin-top 50px
    cursor pointer
    .icon
      display inline-block
      width 30px
      height 30px
      margin-top -2px
      background url('./user-icon.png') no-repeat
      vertical-align middle
    span
      color rgba(255, 102, 0, 1)
      display inline-block
      line-height 63px
      font-size: 30px;
      vertical-align middle
      margin-left 20px
</style>
