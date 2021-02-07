<template>
  <div class="my-container">
    <Header :title="title" midTitle="关于"></Header>
    <div class="my-box">
      <div class="left">
        <el-image class="img" :src="data.logo" fit="cover">
          <div slot="error" class="image-slot"></div>
          <div slot="placeholder" class="image-slot"></div>
        </el-image>
        <div class="account">账号:{{ data.acount }}</div>
        <div class="btn1" v-if="false">已下载视频11</div>
      </div>
      <div class="right">
        <div class="title">
          {{ data.name }}
          <span class="describe-title" v-if="data.isstore == 2">{{
            网院
          }}</span>
        </div>
        <div class="property">医院属性：{{ data.level_name }}</div>
        <div class="name">诊疗科室：{{ data.zuowu }}</div>
        <div class="name">医院地址：{{ data.mpaddress }}</div>
        <div class="text">简介：{{ data.content }}</div>
        <div v-for="item in data.pic_url" :key="item" class="item-img">
          <el-image :src="item" class="el-img"></el-image>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Header from "@/components/online_hospital_header/online_hospital_header";
import Nav from "@/components/nav_list/nav_list";
import NavSecond from "@/components/nav_list_second/nav_list_second";
import NavThird from "@/components/nav_list_third/nav_list_third";
import Confim from "@/components/confim/confim";
import { mapMutations, mapState } from "vuex";
export default {
  name: "village_me",
  components: {
    Header,
    Nav,
    NavSecond,
    Confim,
    NavThird
  },
  props: {},
  data() {
    return {
      data: "",
      title: "",
      appId: this.$route.query.appId
    };
  },
  computed: {
    ...mapState([
      "purview",
      "lowerHospital",
      "hospitalIsstore",
      "isLowerHospital"
    ])
  },
  watch: {},
  mounted() {
    this.getData();
  },
  beforeDestroy() {
    // this.setIsLowerHospital("false");
  },
  methods: {
    ...mapMutations(["setLowerHospital", "setIsLowerHospital"]),
    loignOutBtn() {
      // 退出登陆按钮
      this.$refs.confimBox.showFlag = true;
    },
    clickSure() {
      this.$router.push({ path: "/" });
    },
    getData() {
      // 获取我的医院
      this.$axios
        .fetchPost("/Home/About/GetMpDesc", { appId: this.appId })
        .then(res => {
          if (res.data.code === "200") {
            this.data = res.data.data;
            this.setLowerHospital(res.data.data.name);
            this.setIsLowerHospital("true");
            if (
              this.purview == 3 ||
              this.purview == 4 ||
              (this.purview == 46 && this.isLowerHospital == "true")
            ) {
              this.title = this.lowerHospital;
            } else if (this.purview == 46 && this.isLowerHospital == "false") {
              this.title = "我的";
            } else {
              this.title = "我的";
            }
          }
        });
    }
  }
};
</script>
<style lang="stylus" scoped>
.my-container
  padding-top 100px
  padding-bottom 150px
  .my-box
    max-width 1900px
    margin 0 auto
    padding 0 40px
    display flex
    .left
      width 300px
      margin-right 50px
      .img
        width 300px
        height 300px
        border 1px solid rgba(255, 255, 255, 0.5)
        box-shadow 2px 4px 10px 0px rgba(0, 0, 0, 0.35), 0px 0px 122px 0px rgba(0, 112, 184, 0.15)
        border-radius 20px
        background linear-gradient(-90deg, rgba(0, 0, 0, 0.1), rgba(255, 255, 255, 0.1))
        padding 15px
        .image-slot
          background url('../../assets/65.png') no-repeat
          background-position center center
          background-size 80%
          height 100%
      .account
        font-size 28px
        color rgba(255, 255, 255, 0.5)
        line-height 72px
        font-family SimHei
      .btn1
        width 300px
        height 80px
        text-align center
        font-size 32px
        color rgba(255, 255, 255, 0.5)
        line-height 80px
        margin 0 auto 20px
        background linear-gradient(180deg, rgba(255, 255, 255, 0), rgba(255, 255, 255, 0))
        border 3px solid rgba(255, 255, 255, 0.63)
        box-shadow 0px 0px 2px 0px rgba(115, 193, 193, 0.5), 3px 2px 32px 2px rgba(255, 255, 255, 0.18)
        border-radius 40px
        cursor pointer
        &:hover
          color #fff
          border 3px solid #FF6600
          box-shadow 0px 1px 26px #f60
    .right
      flex 1
      text-align left
      height 730px
      overflow auto
      .title
        font-size 34px
        color #fff
        display flex
        align-items center
        .describe-title
          padding 0 23px
          background #FF6600
          font-size 28px
          color #FFFFFF
          margin-left 17px
          border-radius 25px
          height 50px
          line-height 50px
      .property
        color #F9FAFA
        font-size 30px
        margin-top 35px
      .name
        color #F9FAFA
        font-size 30px
        margin-bottom 15px
      .text
        font-size 24px
        margin-top 40px
        font-family SimHei
        font-weight 400
        color rgba(181, 181, 181, 1)
        line-height 50px
        padding-right 20px
.item-img
  margin 10px auto
  display block
  text-align center
  .el-img
    display inline-block
    width auto
    text-align center
</style>
