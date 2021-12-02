<template lang="">
  <div
    v-loading="loading"
    element-loading-text="免登陆跳转中...."
    element-loading-spinner="el-icon-loading"
    element-loading-background="rgba(0, 0, 0, 0.8)"
    class="threelogin-box"
  ></div>
</template>
<script>
import { getUrlQuery } from "@/common/js/util.js";
import { mapMutations } from "vuex";
export default {
  data() {
    return {
      loading: true
    };
  },
  computed: {
    appId() {
      // appId=hHilp7J2dap-pqXbs3mMmbGmf2g&appKey=3Gcg2Rht3GcRirfpg7njJq7Rezyc&sign=e410dcf4043ba4a39bb82e6ddc47b211&stimestamp=1635154901000
      return this.$route.query.appId;
    },
    appKey() {
      return this.$route.query.appKey;
    },
    sign() {
      return this.$route.query.sign;
    },
    stimestamp() {
      return this.$route.query.stimestamp;
    }
  },
  beforeRouteEnter(to, from, next) {
    // 判断是否有url内是否有code参数，没有的话跳转到正式的登录页

    const appId = getUrlQuery("appId");
    // debugger;
    if (!appId) {
      next({
        path: "/home"
      });
    } else {
      next();
    }
  },
  mounted() {
    this.login();
  },
  methods: {
    ...mapMutations([
      "getDefaultProvince",
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
      "setLoginId",
      "getBreadArr",
      "setAppId",
      "getPurview",
      "setLoginHospitalName",
      "setIsDataV"
    ]),
    login() {
      this.$axios
        .fetchPost("/Home/Aulogin/autoLogin", {
          appId: this.appId,
          appKey: this.appKey,
          sign: this.sign,
          stimestamp: this.stimestamp
        })
        .then(res => {
          if (res.data.code === "200") {
            this.loading = false;
            const purview = res.data.data.purview;
            const appid = res.data.data.appid;
            const name = res.data.data.name;
            const isshaoxing = res.data.data.ishaoxing;
            window.sessionStorage.setItem("isshaoxing", isshaoxing); // 判断是否是绍兴市或者是绍兴市所属县级管理院
            this.setIsDataV(res.data.data.isdatav);
            this.getPurview(purview);
            this.setAppId(appid);
            this.setLoginId(appid);
            this.setLoginHospitalName(name);
            if (purview === 1) {
              this.$router.push({
                path: "/index_third"
              });
            } else if (purview === 2) {
              this.$router.push({
                path: "/index_second"
              });
            } else if (purview === 46) {
              // purview == 46 是总院
              this.$router.replace({
                path: "index_first"
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
              // const arr = res.data.data.area;
              const areaname = res.data.data.areaname;
              const name = res.data.data.name;
              // store.commit('getGlobalFstusername', res.data.data.Fstusername); //获取益农通账号
              // store.commit('getGlobalFstuserpw', res.data.data.Fstuserpw); //获取益农通密码
              // store.commit('getGlobalFstRoomid', res.data.data.FstRoomid); //获取益农通id
              this.setLoginHospitalName(name);
              window.sessionStorage.setItem("name", name);
              window.sessionStorage.setItem("curcity", areaname);

              // window.sessionStorage.setItem('shaoxingnextbvious',JSON.stringify(res.data.data.area[0].city[5].city))//存储绍兴市所属县级管理院的信息
              window.sessionStorage.setItem("curlevel", level); // 存储当前登录的管理院等级
              window.sessionStorage.setItem("curuserid", userid);
              // const defaultName = res.data.data.default;
              const letter = res.data.data.letter;
              window.sessionStorage.setItem("letter", letter);
              this.getDefaultProvince(areaname); // 获取全网页地址
              this.getGlobalLevel(level); // 获取全网页等级
              // this.getDefaultCity(defaultName); // 获取二级方块地址
              this.getSecondGlobalLevel(secondLevel); // 获取二级方块等级
              // this.secondMapIndex(res.data.data)
              // this.getDefaultCity(city); // 获取默认城市
              // this.getDefaultAddressArr(arr); // 获取默认导航列表
              this.getGlobalFstusername(res.data.data.Fstusername); // 获取益农通账号
              this.getGlobalFstuserpw(res.data.data.Fstuserpw); // 获取益农通密码
              this.getGlobalFstRoomid(res.data.data.FstRoomid); // 获取益农通id
              this.getSessionUsername(this.username);
              // this.getSessionPassword(password);
              this.getAccountName(res.data.data.areaname);
              // this.getLoginId(level);
              window.sessionStorage.setItem("LoginId", level); // 记录当前登录账号的等级水平
              // this.getBreadArr(res.data.data.nav);
              this.$router.replace({
                path: "/indexFour",
                query: {
                  userid: userid,
                  areaname: areaname,
                  level: level,
                  letter: letter
                }
              });
            }
          } else if (res.data.code === "402") {
            alert("免登陆失败，跳转到账号密码登录");
            this.$router.push({
              path: "/"
            });
          } else {
          }
        });
    }
  }
};
</script>
<style lang="stylus">
.threelogin-box
  width 100%
  height 100%
</style>
