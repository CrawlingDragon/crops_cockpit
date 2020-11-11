<template>
  <div class="login-wrap">
    <div class="title">
      <h5>
        新型庄稼医院管理系统
        <h6>www.114nz.com</h6>
      </h5>
    </div>
    <div class="login-box">
      <h4>用户登录</h4>
      <input
        type="text"
        placeholder="用户名"
        class="username"
        v-model="username"
      />
      <input
        type="password"
        placeholder="密码"
        class="passworld"
        v-model="password"
      />
      <input
        type="button"
        value="登录"
        class="submit"
        v-on:click="login($event)"
        ref="sub"
      />
    </div>
    <Alert :alertTitle="title" :alertText="text" ref="alertBox"></Alert>
  </div>

</template>
<script>
// import Alert from "../../ui-components/alert/alert";
import md from "../../common/js/md5.js";
import { mapMutations } from "vuex";
const Alert = resolve => require(["../alert/alert"], resolve);
export default {
  name: "login",
  data() {
    return {
      username: "", //13094810413
      password: "", //asdf1234
      title: "登录失败",
      text: ""
    };
  },
  mounted() {
    const that = this;
    document.onkeydown = function() {
      const key = window.event.keyCode;
      if (key == 13) {
        that.login();
      }
    };
  },
  methods: {
    isEmpty() {
      if (this.username == "") {
        this.$refs.alertBox.showFlag = true;
        this.text = "账号不能为空";
        return false;
      } else if (this.password == "") {
        this.$refs.alertBox.showFlag = true;
        this.text = "密码不能为空";
        return false;
      } else {
        return true;
      }
    },
    ...mapMutations([
      // "getDefaultProvince",
      // "getDefaultCity",
      "getDefaultAddressArr",
      "getGlobalActiveName",
      "getGlobalFstusername",
      "getGlobalFstuserpw",
      "getGlobalFstRoomid",
      "getGlobalLevel",
      "getSecondGlobalLevel",
      "getSessionPassword",
      "getSessionUsername",
      "getPicAddress",
      "getAccountName",
      // "getLoginId",
      // "getBreadArr",
      "getAppId"
    ]),
    login(e) {
      if (this.isEmpty()) {
        if (e) {
          e.currentTarget.setAttribute("disabled", true);
          e.currentTarget.className = "submit disabled";
        } else {
          this.$refs.sub.setAttribute("disabled", true);
          this.$refs.sub.className = "submit disabled";
        }
        const password = md(this.password);
        this.$axios
          .fetchPost("Home/Login/login", {
            username: this.username,
            password: password
          })
          .then(res => {
            console.log(res)
            if (res.data.code == 200) {
              const purview = res.data.data.purview;
              const appid = res.data.data.appid;
              this.getAppId(appid);
              if (purview == 1) {
                this.$router.push({
                  path: "/index_third"
                });
              } else if (purview == 2) {
                this.$router.push({
                  path: "/index_second"
                });
              } else {
                const userid = res.data.data.userid;
                const level = res.data.data.level;
                let secondLevel = 0;
                if (level >= 3) {
                  secondLevel = level - 1;
                } else {
                  secondLevel = level;
                }
                // if (level <= 3) {
                //   this.getPicAddress(res.data.data.address);
                // }
                const arr = res.data.data.area;
                const areaname = res.data.data.areaname;
                const isshaoxing = res.data.data.ishaoxing;
                const name = res.data.data.name;
                window.sessionStorage.setItem("name", name);
                window.sessionStorage.setItem("curcity", areaname);
                window.sessionStorage.setItem("isshaoxing", isshaoxing); // 判断是否是绍兴市或者是绍兴市所属县级管理院
                // window.sessionStorage.setItem('shaoxingnextbvious',JSON.stringify(res.data.data.area[0].city[5].city))//存储绍兴市所属县级管理院的信息
                window.sessionStorage.setItem("curlevel", level); // 存储当前登录的管理院等级
                window.sessionStorage.setItem("curuserid", userid);
                const defaultName = res.data.data.default;
                const letter = res.data.data.letter;
                window.sessionStorage.setItem("letter", letter);
                // this.getDefaultProvince(areaname); // 获取全网页地址
                // this.getGlobalLevel(level); // 获取全网页等级
                // this.getDefaultCity(defaultName); // 获取二级方块地址
                this.getSecondGlobalLevel(secondLevel); // 获取二级方块等级
                // this.secondMapIndex(res.data.data)
                // this.getDefaultCity(city); // 获取默认城市
                // this.getDefaultAddressArr(arr); // 获取默认导航列表
                this.getGlobalFstusername(res.data.data.Fstusername); // 获取益农通账号
                this.getGlobalFstuserpw(res.data.data.Fstuserpw); // 获取益农通密码
                this.getGlobalFstRoomid(res.data.data.FstRoomid); // 获取益农通id
                this.getSessionUsername(this.username);
                this.getSessionPassword(password);
                this.getAccountName(res.data.data.areaname);
                // this.getLoginId(level);
                window.sessionStorage.setItem("LoginId",level)//记录当前登录账号的等级水平
                // this.getBreadArr(res.data.data.nav);
                this.$router.push({
                  path: "/indexFour",
                  query: {
                    userid: userid,
                    areaname: areaname,
                    level: level,
                    letter: letter
                  }
                });
              }
            } else if (res.data.code == 402) {
              this.$refs.alertBox.showFlag = true;
              this.text = res.data.message;
              this.$refs.sub.removeAttribute("disabled");
              this.$refs.sub.className = "submit";
            } else {
              this.$refs.alertBox.showFlag = true;
              this.text = res.data.message;
              this.$refs.sub.removeAttribute("disabled");
              this.$refs.sub.className = "submit";
            }
          });
      }
    }
  },
  components: {
    Alert
  }
};
</script>
<style lang="stylus" scoped>
.login-wrap
  position absolute
  left 0
  right 0
  top 0
  bottom 0
  width 100%
  height 100%
  background url('./login-bj.jpg') no-repeat
  background-size 1340px 768px
  background-position bottom center
  background-color #040a2a
  z-index 2
  .title
    position absolute
    left 4%
    top 4%
    color #fff
    h5
      font-size 20px
    h6
      font-size 17px
      display inline
      margin-left 40px
  .login-box
    width 360px
    margin 145px auto
    h4
      font-size 30px
      font-family MicrosoftYaHei
      font-weight 400
      color #fff
      margin-bottom 50px
    .username
      font-size 20px
      color #999999
      display block
      width 100%
      height 57px
      color #fff
      background rgba(166, 251, 255, 0)
      border 1px solid rgba(166, 251, 255, 0.5)
      border-radius 29px
      margin-bottom 20px
      padding 0 20px
      box-sizing border-box
    input::placeholder
      text-align center
      font-size 20px
      letter-spacing 2px
    .passworld
      padding 0 20px
      box-sizing border-box
      font-size 20px
      color #999999
      display block
      width 100%
      height 57px
      color #fff
      background rgba(166, 251, 255, 0)
      border 1px solid rgba(166, 251, 255, 0.5)
      border-radius 29px
      margin-bottom 50px
    .submit
      width 100%
      height 57px
      background #0E2A6A
      color #fff
      font-size 20px
      border-radius 29px
      border none
      &.disabled
        background #999
        color #7f7f7f
        &:hover 
          border none
          cursor wait
      &:hover
        border 1px solid #2196f3
</style>