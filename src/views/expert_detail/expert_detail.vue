<template>
  <div class="expert_detail-container">
    <div class="head-title">专家：黄莲蓉</div>
    <div class="top-nav">
      <div class="item" @click="content_show = 1" :class="{active:content_show == 1}">简介</div>
      <div class="item" @click="content_show = 2" :class="{active:content_show == 2}">TA加入的医院</div>
    </div>
    <div class="content1 content" v-show="content_show == 1">
      <div class="left">
        <el-image class="img" fit="cover"></el-image>
        <p class="p1">开处方次数：7</p>
        <p class="p2">加入时间：2017-05-25</p>
      </div>
      <div class="right">
        <div class="name">
          黄莲蓉
          <span>专家</span>
        </div>
        <p class="title">
          浙江省农科院植物保护与微生物研究所
          <span>研究员</span>
        </p>
        <p class="goodat">擅长作物：水蜜桃、无花果、小樱桃</p>
        <div class="work-num">处方（7）：测土配方（3）、网诊（3）、坐诊（0）</div>
        <div
          class="info"
        >简介：范冰冰，研究员，长期从事蔬菜、果树等经济作物病害的诊断、防治等研究工作，“七五”计划以来，先后承担了家攻关项目、国家农业成果转化资金项目、国家科技支撑项目、西甜瓜国家现代科技产业项目、省重大科技招标项目、国际合作项目等120余项科研项目。在蔬菜、果树、中药材等经济作物病害的诊断、致病机理、防治技术、无公害生产技术等方面的研究、技术推广成绩显著。在研究过程中研发了克服蔬菜栽培中连作障碍的土壤消毒技术，筛选出了番茄、茄子、西瓜等抗病砧木，完善了番茄、茄子、西瓜等作物的嫁接抗病技术，这些技术获得国家发明专利、并荣获了浙江省科技奖，并得到了国内同行学者的高度重视和认可。同时也积极地投身到农业科技的科谱培训工作，每年培训成百上千的菜农和果农，进行科技成果转化、先进实用技术推广，让农民兄弟掌握最新的农业科技，将科学技术、科技物化成果送到田间地头，让科技服务“三农”。在农业科技服务、科技成果转化、先进实用技术推广方面做了大量的工作，受到各地菜农、果农的好评，取得了较大的成绩。主要研究方向：1. 经济作物病害病害诊断鉴定；2. 经济作物无公害生产技术；3. 病害防治技术及其物化产品开发；4. 杀菌剂药效评价及防治试验主要科技成果。先后荣获浙江省科技进步二等奖3项、三等奖4项，四部委优秀科技成果1项，浙江省省直机关优秀共产党员，浙江省农业科技先进工作者，全国</div>
      </div>
    </div>
    <div class="content2 content" v-show="content_show == 2">
      <Hospital items="[]"></Hospital>
    </div>
  </div>
</template>
<script>
import Hospital from "@/components/hospital_list_item/hospital_list_item"
export default {
  name: "expert_detail",
  components: {
    Hospital
  },
  props: {},
  data() {
    return {
      content_show: 1
    }
  },
  computed: {},
  watch: {},
  mounted() {},
  destroyed() {},
  methods: {}
}
</script>
<style lang="stylus" scoped>
.expert_detail-container
  .head-title
    font-size 44px
    font-weight 400
    color rgba(181, 181, 181, 1)
    margin 45px 0 45px 90px
    text-align left
  .top-nav
    border-bottom 2px solid rgba(255, 255, 255, 0.2)
    margin 0 90px
    text-align center
    .item
      padding 10px 35px
      display inline-block
      font-size 40px
      margin-right 20px
      color #C5C5C5
      cursor pointer
      &.active
        border-bottom 4px solid rgba(255, 102, 0, 1)
        color #fff
  .content
    margin 0 90px
    text-align left
  .content1
    display flex
    padding-top 100px
    .left
      width 320px
      margin-right 95px
      .img
        width 320px
        height 320px
        margin-bottom 80px
      .p1, .p2
        font-size 28px
        color rgba(181, 181, 181, 1)
        margin-bottom 10px
    .right
      flex 1
      .name
        font-size 52px
        color #fff
        margin-bottom 20px
        span
          width 130px
          height 48px
          background rgba(255, 102, 0, 1)
          border-radius 25px
          display inline-block
          font-size 34px
          text-align center
          line-height 48px
          margin-left 10px
          vertical-align middle
      .title
        font-size 30px
        color #B5B5B5
        margin-bottom 5px
      .goodat
        font-size 30px
        color #B5B5B5
        margin-bottom 5px
      .work-num
        font-size 30px
        color #FFFFFF
        margin-bottom 5px
      .info
        font-size 30px
        margin-top 30px
        color #B5B5B5
  .content2
    margin-top 100px
</style>
