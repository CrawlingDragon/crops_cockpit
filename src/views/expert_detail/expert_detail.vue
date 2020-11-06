<template>
  <div class="expert_detail-container">
    <Header title="专家详情" :right_show_bar="false"></Header>
    <!-- <div class="head-title">专家：{{ detail.realname }}</div> -->
    <div class="top-nav">
      <div
        class="item"
        @click="content_show = 1"
        :class="{ active: content_show == 1 }"
      >
        简介
      </div>
      <div
        class="item"
        @click="content_show = 2"
        :class="{ active: content_show == 2 }"
      >
        处方
      </div>
    </div>
    <div class="content1 content" v-show="content_show == 1">
      <div class="left">
        <el-image class="img" fit="cover" :src="detail.avatar"></el-image>
        <p class="p1">开处方次数：{{ detail.chufangcount }}</p>
        <p class="p2">加入时间：{{ detail.jointime }}</p>
      </div>
      <div class="right">
        <div class="name">
          {{ detail.realname }}
          <span>专家</span>
        </div>
        <p class="title" v-if="detail.position">{{ detail.position }}</p>
        <p class="goodat" v-if="detail.zuowu">擅长作物：{{ detail.zuowu }}</p>
        <div class="work-num">
          处方（{{ chufangCount }}）：测土配方（{{
            detail.cetucount
          }}）、巡诊（{{ detail.wenzhencount }}）、问珍（{{
            detail.wenzhencount
          }}）、回答（{{ detail.answercount }}）
        </div>
        <div class="info" v-if="detail.description">
          简介：{{ detail.description }}
        </div>
      </div>
    </div>
    <div class="content2 content" v-show="content_show == 2">
      <OnlineUl :expertId="uId"></OnlineUl>
    </div>
  </div>
</template>
<script>
import Header from "@/components/online_hospital_header/online_hospital_header";
import OnlineUl from "@/components/online_ul/online_ul";
import { mapState } from "vuex";
export default {
  name: "expert_detail",
  components: {
    Header,
    OnlineUl
  },
  props: {},
  data() {
    return {
      content_show: 1,
      uId: this.$route.query.uid,
      detail: "",
      hospitalList: []
    };
  },
  computed: {
    ...mapState(["appId"]),
    chufangCount() {
      const r =
        parseFloat(this.detail.cetucount) +
        parseFloat(this.detail.wenzhencount) +
        parseFloat(this.detail.wenzhencount) +
        parseFloat(this.detail.answercount);
      return r;
    }
  },
  watch: {},
  mounted() {
    this.getDetail();
  },
  destroyed() {},
  methods: {
    getDetail() {
      // 获取专家的详细数据
      this.$axios
        .fetchPost("/Home/Expert/GetMpExpertDetail", {
          appId: this.appId,
          uId: this.uId,
          purview: 0
        })
        .then(res => {
          if (res.data.code === "200") {
            this.detail = res.data.data;
          }
        });
    }
  }
};
</script>
<style lang="stylus" scoped>
.expert_detail-container
  padding 101px 0 136px
  .top-nav
    margin 0 90px
    text-align center

    .item
      padding 10px 35px
      display inline-block
      font-size: 30px;
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
    padding-top 60px
    .left
      width 320px
      margin-right 50px
      .img
        width 320px
        height 320px
        margin-bottom 50px
      .p1, .p2
        font-size 26px
        color rgba(181, 181, 181, 1)
        margin-bottom 10px
    .right
      flex 1
      .name
        font-size 40px
        color #fff
        margin-bottom 20px
        display flex
        align-items center
        span
          width 120px
          height 48px
          background rgba(255, 102, 0, 1)
          border-radius 25px
          display inline-block
          font-size 30px
          text-align center
          line-height 48px
          margin-left 28px
          vertical-align middle
      .title
        font-size 26px
        color #B5B5B5
        margin-bottom 5px
      .goodat
        font-size 26px
        color #FF6600
        margin-bottom 5px
      .work-num
        font-size 26px
        color #FF6600
        margin-bottom 5px
      .info
        font-size 30px
        margin-top 30px
        color #B5B5B5
        font-size: 24px;
  .content2
    margin-top 60px
</style>
