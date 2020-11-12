<template>
  <div class="expert_detail-container">
    <div @click="go_huiyuan()">
      <div class="closefn"></div>
      <div class="head-title">会员：{{this.huiyuan_name}}</div>
    </div>
    <div class="top-nav">
      <router-link to='/second_huiyuan_itro/huiyuan_wang' ><span  class="item" @click="content_show = 1" :class="{active:content_show == 1}">网诊</span></router-link>
      <router-link to="/second_huiyuan_itro/huiyuan_jianjie" ><span  class="item" @click="content_show = 2" :class="{active:content_show == 2}">简介</span></router-link>
      <router-link to="/second_huiyuan_itro/huiyuan_tu" ><span  class="item" @click="content_show = 3" :class="{active:content_show == 3}">测土配方</span></router-link>
      <router-link to="/second_huiyuan_itro/huiyuan_dingdan" ><span class="item" @click="content_show = 4" :class="{active:content_show == 4}">订单</span></router-link>
    </div>
    <div class="intro_content">
        <router-view></router-view>
    </div>
  </div>
</template>
<script>
import Hospital from "@/components/hospital_list_item/hospital_list_item";
import { mapMutations, mapState } from "vuex";
export default {
  name: "expert_detail",
  components: {
    Hospital,
  },
  props: {
  },
  data() {
    return {
      content_show: 1,
      huiyuan_name:"",
      huiyuanname:window.sessionStorage.getItem("huiyuan_name")
    };
  },
  activated(){
    this.huiyuan_name = window.sessionStorage.getItem("huiyuan_name")
    this.content_show = 1
  },
  computed: {
    ...mapState([
      "appId",
      "huiyuanName",
      "huiyuanId"
      ]),
  },
  methods: {
    go_huiyuan(){
      this.$router.push({path:'/second_huiyuan_list'})
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
    width 30px
    height 30px
    background url("../../assets/61.png")
    background-size 100%
    left 41px
    top 41px
    display inline-block
  .head-title
    font-family  MicrosoftYaHei
    font-size 30px
    font-weight Regular
    color #7FB5F1
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
