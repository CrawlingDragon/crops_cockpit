<template>
  <div class="expert_detail-container">
    <Header
      :title="title"
      :right_show_bar="false"
      :midTitle="huiyuan_name"
    ></Header>
    <!-- :returnPath="this.returnPath" -->
    <div class="top-nav">
      <router-link
        :to="{
          path: '/second_huiyuan_itro/huiyuan_wang',
          query: {
            uerId: userId,
            name: this.$route.query.name,
            uId: this.$route.query.uId
          }
        }"
        replace
        ><span
          class="item"
          @click="content_show = 1"
          :class="{
            active: content_show == '/second_huiyuan_itro/huiyuan_wang'
          }"
          >网诊</span
        ></router-link
      >
      <router-link
        :to="{
          path: '/second_huiyuan_itro/huiyuan_jianjie',
          query: {
            uerId: userId,
            name: this.$route.query.name,
            uId: this.$route.query.uId
          }
        }"
        replace
        ><span
          class="item"
          @click="content_show = 2"
          :class="{
            active: content_show == '/second_huiyuan_itro/huiyuan_jianjie'
          }"
          >简介</span
        ></router-link
      >
      <router-link
        :to="{
          path: '/second_huiyuan_itro/huiyuan_tu',
          query: {
            uerId: userId,
            name: this.$route.query.name,
            uId: this.$route.query.uId
          }
        }"
        replace
        ><span
          class="item"
          @click="content_show = 3"
          :class="{ active: content_show == '/second_huiyuan_itro/huiyuan_tu' }"
          >测土配方</span
        ></router-link
      >
      <router-link
        :to="{
          path: '/second_huiyuan_itro/huiyuan_dingdan',
          query: {
            uerId: userId,
            name: this.$route.query.name,
            uId: this.$route.query.uId
          }
        }"
        replace
        ><span
          class="item"
          @click="content_show = 4"
          :class="{
            active: content_show == '/second_huiyuan_itro/huiyuan_dingdan'
          }"
          >订单</span
        ></router-link
      >
    </div>
    <div class="intro_content">
      <keep-alive v-if="$route.meta.keepAlive">
        <router-view :userId="userId" :uId="uId"></router-view>
      </keep-alive>
    </div>
  </div>
</template>
<script>
import Header from "@/components/online_hospital_header/online_hospital_header";
import { mapMutations, mapState } from "vuex";
export default {
  components: {
    // Hospital,
    Header
  },
  props: {},
  data() {
    return {
      content_show: this.$route.path,
      huiyuan_name: "",
      huiyuanname: "",
      title: "",
      from: this.$route.query.from,
      userId: this.$route.query.uerId,
      uId: this.$route.query.uId,
      count: 1 //控制第一次的时候不在路由栈中执行-1操作
    };
  },
  watch: {
    $route() {
      this.content_show = this.$route.path;
    }
  },
  // beforeRouteEnter: (to, from, next) => {
  //   // console.log(from.path);
  //   // next(vm => {
  //   //   switch (from.path) {
  //   //     case "/wangzhen_detail":
  //   //       vm.content_show = 1;
  //   //       break;
  //   //     case "/cetu_detail":
  //   //       vm.content_show = 3;
  //   //       break;
  //   //     case "/huiyuan_dingdan/second_order_detail":
  //   //       vm.content_show = 4;
  //   //       break;
  //   //     default:
  //   //       vm.$nextTick(() => {
  //   //         vm.content_show = 2;
  //   //       });
  //   //       break;
  //   //   }
  //   // });
  // },
  mounted() {
    this.huiyuan_name = "会员:" + this.$route.query.name;
    // this.content_show = window.sessionStorage.getItem("content_show");
    this.title =
      this.purview == 3 || this.purview == 4 || this.purview == 46
        ? this.lowerHospital
        : this.huiyuan_name;
  },
  destroyed() {
    // window.sessionStorage.setItem("content_show", this.content_show);
  },
  computed: {
    ...mapState([
      "appId",
      "huiyuanName",
      "huiyuanId",
      "lowerHospital",
      "purview"
    ])
  },
  methods: {
    getJoinHospital() {
      // ta 加入的医院
      this.$axios
        .fetchPost("/Home/Manage/GetManageMpDataList", {
          appId: this.appId,
          type: "expert"
        })
        .then(res => {
          if (res.data.code === "200") {
            this.hospitalList = res.data.data.lists;
          }
        });
    }
  }
};
</script>
<style lang="stylus" scoped>
.expert_detail-container
  padding-top 100px
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
    padding 35px 0 10px 90px
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
