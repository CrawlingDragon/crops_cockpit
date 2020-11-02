<template>
  <div class="my-container">
    <Header title="我的"></Header>
    <div class="my-box">
      <div class="left">
        <el-image class="img" :src="data.logo" fit="cover"></el-image>
        <div class="account">账号:{{data.acount}}</div>
        <div class="btn1">退出登录</div>
        <div class="btn1">已下载视频11</div>
      </div>
      <div class="right">
        <div class="title">
          {{data.name}}
          <span class="describe-title">{{data.isstore == 1? '实体店':'网院'}}</span>
        </div>
        <div class="name">作物科室：{{data.zuowu}}</div>
        <div class="text">简介：{{data.content}}</div>
      </div>
    </div>
    <Nav index="6"></Nav>
  </div>
</template>
<script>
import Header from "@/components/headers/headers";
import Nav from "@/components/nav_list/nav_list";
import { mapState } from "vuex";
export default {
  name: "me",
  components: {
    Header,
    Nav,
  },
  props: {},
  data() {
    return {
      data: "",
    };
  },
  computed: {
    ...mapState(["appId"]),
  },
  watch: {},
  mounted() {
    this.getData();
  },
  destroyed() {},
  methods: {
    getData() {
      // 获取我的医院
      this.$axios
        .fetchPost("/Home/About/GetMpDesc", { appId: this.appId })
        .then((res) => {
          if (res.data.code === "200") {
            this.data = res.data.data;
          }
        });
    },
  },
};
</script>
<style lang="stylus" scoped>
.my-container
  .my-box
    margin 60px 88px 0
    display flex
    .left
      width 412px
      .img
        width 300px
        height 300px
        border 1px solid rgba(255, 255, 255, 0.5)
        box-shadow 2px 4px 10px 0px rgba(0, 0, 0, 0.35), 0px 0px 122px 0px rgba(0, 112, 184, 0.15)
        border-radius 20px
        background linear-gradient(-90deg, rgba(0, 0, 0, 0.1), rgba(255, 255, 255, 0.1))
        padding 15px
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
        font-size 52px
        color #fff
        display flex
        align-items center
        .describe-title
          padding 0 23px
          background #FF6600
          font-size 32px
          color #FFFFFF
          margin-left 17px
          border-radius 25px
          height 50px
          line-height 50px
      .name
        color #F9FAFA
        font-size 30px
        margin-bottom 15px
      .text
        font-size 30px
        margin-top 40px
        font-family SimHei
        font-weight 400
        color rgba(181, 181, 181, 1)
        line-height 50px
</style>
