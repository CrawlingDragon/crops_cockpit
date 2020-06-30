<template>
  <div class="my-container">
    <Header title="我的"></Header>
    <div class="my-box">
      <div class="left">
        <el-image
          class="img"
          src="https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg"
          fit="cover"
        ></el-image>
        <div class="account">账号:113654789632</div>
        <div class="btn1">退出登录</div>
        <div class="btn1">已下载视频11</div>
      </div>
      <div class="right">
        <div class="title">
          黄泽黄桃庄稼医院
          <span class="describe-title">实体店</span>
        </div>
        <div class="name">作物科室：黄桃</div>
        <div
          class="text"
        >简介：范冰冰，研究员，长期从事蔬菜、果树等经济作物病害的诊断、防治等研究工作，“七五”计划以来，先后承担了家攻关项目、国家农业成果转化资金项目、国家科技支撑项目、西甜瓜国家现代科技产业项目、省重大科技招标项目、国际合作项目等120余项科研项目。在蔬菜、果树、中药材等经济作物病害的诊断、致病机理、防治技术、无公害生产技术等方面的研究、技术推广成绩显著。在研究过程中研发了克服蔬菜栽培中连作障碍的土壤消毒技术，筛选出了番茄、茄子、西瓜等抗病砧木，完善了番茄、茄子、西瓜等作物的嫁接抗病技术，这些技术获得国家发明专利、并荣获了浙江省科技奖，并得到了国内同行学者的高度重视和认可。</div>
      </div>
    </div>
    <Nav index="6"></Nav>
  </div>
</template>
<script>
import Header from "@/components/headers/headers"
import Nav from "@/components/nav_list/nav_list"
export default {
  name: "me",
  components: {
    Header,
    Nav
  },
  props: {},
  data() {
    return {}
  },
  computed: {},
  watch: {},
  mounted() {},
  destroyed() {},
  methods: {}
}
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
</style>
