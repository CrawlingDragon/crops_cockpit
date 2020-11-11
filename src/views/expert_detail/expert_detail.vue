<template>
  <div class="expert_detail-container">
    <div @click="topre">
      <div class="closefn"></div>
     <div class="head-title">专家：{{detail.realname}}</div>
    </div>
    <div class="top-nav">
      <div class="item" @click="content_show = 1" :class="{active:content_show == 1}">简介</div>
      <div class="item" @click="content_show = 2" :class="{active:content_show == 2}">TA加入的医院</div>
    </div>
    <div class="content1 content" v-show="content_show == 1">
      <div class="left">
        <el-image class="img" fit="cover" :src="detail.avatar"></el-image>
        <p class="p1">开处方次数：{{detail.chufangcount}}</p>
        <p class="p2">加入时间：{{detail.jointime}}</p>
      </div>
      <div class="right">
        <div class="name">
          {{detail.realname}}
          <span>专家</span>
        </div>
        <p class="title">
          {{detail.position}}
        </p>
        <p class="goodat">擅长作物：{{detail.zuowu}}</p>
        <div class="work-num">处方（{{detail.chufangcount}}）：测土配方（{{detail.cetucount}}）、巡诊（{{detail.wenzhencount}}）、问诊（{{detail.wenzhencount}}）、网诊（{{detail.answercount}}）</div>
        <div class="info">{{detail.description.length == 0?"":"简介："}}{{detail.description}}</div>
      </div>
    </div>
    <div class="content2 " v-show="content_show == 2">
      <Hospital :items="hospitalList"></Hospital>
    </div>
  </div>
</template>
<script>
import Hospital from "@/components/hospital_list_item/hospital_list_item";
import { mapState } from "vuex";
export default {
  name: "expert_detail",
  components: {
    Hospital,
  },
  props: {},
  data() {
    return {
      content_show:1,
      detail: "",
      hospitalList: [],
      appid:this.$route.query.appId
    };
  },
  activated(){
      this.content_show = 1
      this.getJoinHospital(this.$route.query.uid)
      this.getDetail(this.$route.query.uid);
  },
  computed: {
    ...mapState(["appId"]),
  },
  watch: {
    content_show(newVal){
      console.log(newVal)
    }
  },
  destroyed() {},
  methods: {
    getJoinHospital(uid) {
      // ta 加入的医院
      this.$axios
        .fetchPost("/Home/Manage/GetManageMpDataList", {
          appId:uid,
          storetag:99,
          ordertag:"default",
          areatag:"",
          type:"expert",
        })
        .then((res) => {
          console.log(res)
          if (res.data.code === "200") {
            this.hospitalList = res.data.data.lists;
          }
        });
    },
    topre(){
      this.$router.push({path:'/expertlist'})
    },
    getDetail(uid) {
      // 获取专家的详细数据
      this.$axios
        .fetchPost("/Home/Expert/GetMpExpertDetail", {
          appId: this.appid,
          uId: uid,
          purview: 1,
        })
        .then((res) => {
          if (res.data.code === "200") {
            this.detail = res.data.data;
          }
        });
    }
  },
};
</script>
<style lang="stylus" scoped>
.expert_detail-container
  .closefn
    position absolute
    width 30px
    height 30px
    background url("../../assets/61.png")
    background-size 100%
    color #7FB5F1
    left 41px
    top 41px
    display inline-block
  .head-title
    font-size 30px
    font-weight 400
    color #B5B5B5
    padding  42px 0 45px 90px
    text-align left
  .top-nav
    margin 0 90px
    text-align center
    .item
      padding 10px 35px
      display inline-block
      font-size 30px
      @media screen and (min-width:1900px)
        font-size 40px
      margin-right 20px
      color #B5B5B5
      cursor pointer
      &.active
        border-bottom 4px solid rgba(255, 102, 0, 1)
        color #fff
  .content
    margin 0 40px
    @media screen and (min-width:1900px)
      margin 0 90px
    text-align left
  .content1
    display flex
    padding-top 50px
    @media screen and (min-width:1900px)
      padding-top 100px
    .left
      width 320px
      margin-right 95px
      .img
        width 320px
        height 320px
        margin-bottom 35px
      .p1, .p2
        font-size 28px
        color rgba(181, 181, 181, 1)
        line-height 50px
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
        font-size 26px
        color #B5B5B5
        margin-bottom 5px
      .goodat
        font-size 26px
        color #FF6600
        margin-bottom 5px
        line-height 50px
      .work-num
        font-size 26px
        margin-bottom 5px
        line-height 50px
        color #FF6600
      .info
        font-size 24px
        margin-top 30px
        line-height 50px
        color #B5B5B5
  .content2
    padding 50px 40px 0px 40px
    @media screen and (min-width:1900px)
      padding 100px 40px 0px 40px
</style>
