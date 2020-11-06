<template>
  <div class="expert_detail-container">
    <div class="closefn" @click="topre()">&lt;</div>
    <div class="head-title">会员：{{detail.realname}}</div>
    <div class="top-nav">
      <router-link to='/second_huiyuan_itro/huiyuan_wang' ><span  class="item" @click="content_show = 1" :class="{active:content_show == 1}">网诊</span></router-link>
      <router-link to="/second_huiyuan_itro/huiyuan_intro" ><span  class="item" @click="content_show = 2" :class="{active:content_show == 2}">简介</span></router-link>
      <router-link to="/second_huiyuan_itro/huiyuan_tu" ><span  class="item" @click="content_show = 3" :class="{active:content_show == 3}">测土配方</span></router-link>
      <router-link to="/second_huiyuan_itro/huiyuan_dingdan" ><span class="item" @click="content_show = 4" :class="{active:content_show == 4}">订单</span></router-link>
    </div>
    <div class="intro_content">
        <router-view></router-view>
    </div>      
    <!-- <div class="content2 content" v-show="content_show == 2">
      <Hospital :items="hospitalList"></Hospital>
    </div> -->
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
      content_show: 2,
      uId: this.$route.query.uid,
      detail: "",
      hospitalList: [],
      appid:this.$route.query.appId
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
    },
  },
  watch: {
  },
  created() {
    // console.log('999')
    // this.getDetail();
    // this.getJoinHospital();
  },
  destroyed() {},
  methods: {
    topre(){
      this.$router.push({path:'/expertlist'})
    },
    xxx(){
        console.log('666')
    },
    getDetail() {
      // 获取专家的详细数据
      this.$axios
        .fetchPost("/Home/Expert/GetMpExpertDetail", {
          appId: this.appid,
          uId: this.uId,
          purview: 4,
        })
        .then((res) => {
          console.log(res)
          if (res.data.code === "200") {
            this.detail = res.data.data;
          }
        });
    },
    getJoinHospital() {
      // ta 加入的医院
      this.$axios
        .fetchPost("/Home/Manage/GetManageMpDataList", {
          appId: this.appid,
          type: "expert",
        })
        .then((res) => {
          console.log(res)
          if (res.data.code === "200") {
            this.hospitalList = res.data.data.lists;
          }
        });
    },
  },
};
</script>
<style lang="stylus" scoped>
.expert_detail-container
  .closefn
    position absolute
    width 26px
    height 26px
    border 2px solid #7FB5F1
    border-radius 50%
    font-size 24px
    color #7FB5F1
    left 41px
    top 41px
    display inline-block
  .head-title
    font-size 30px
    font-weight 400
    color rgba(181, 181, 181, 1)
    padding 42px 0 10px 90px
    text-align left
  .top-nav
    margin 0 90px
    padding-bottom 75px
    text-align center
    .item
      padding 10px 35px
      display inline-block
      font-size 30px
      margin-right 20px
      color #C5C5C5
      cursor pointer
      &.active
        border-bottom 4px solid rgba(255, 102, 0, 1)
        color #fff
    .intro_content
        margin 0 40px
</style>
