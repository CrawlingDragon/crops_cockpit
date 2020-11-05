<template>
  <div class="index_third-container">
    <Header title="绍兴市网上庄稼医院">
      <div class="del"></div>
    </Header>
    <div class="container-box">
      <div class="left-bar">
        <div class="item item1" @click="goToOnline">
          <div class="icon"></div>
          <div>网诊</div>
        </div>
        <div class="item item2" @click="goToExpert">
          <div class="icon"></div>
          <div>专家</div>
        </div>
        <div class="item item3" @click="goToVideo">
          <div class="icon"></div>
          <div>培训视频</div>
        </div>
      </div>
      <div class="mid-bar">
        <div class="swiper-box">
          <SwiperBox></SwiperBox>
        </div>
        <div class="expert-box">
          <Expert></Expert>
        </div>
      </div>
      <div class="right-bar">
<<<<<<< HEAD
        <Online :list="answerlist"></Online>
        <!-- <Empty></Empty> -->
      </div>
    </div>
    <Nav :index="2"></Nav>
=======
        <Online></Online>
      </div>
    </div>
    <div class="nav-box">
      <Nav></Nav>
    </div>
>>>>>>> origin/dev_xiaobai
  </div>
</template>
<script>
import Header from "@/components/headers/headers";
import Nav from "@/components/nav_list/nav_list";
import SwiperBox from "@/components/swiper_box/swiper_box";
import Expert from "@/components/expert_ranking_list/expert_ranking_list";
import Online from "@/components/online_list/online_list";
<<<<<<< HEAD
import { mapState } from "vuex";
import Empty from "@/components/empty/empty";
export default {
  name: "index_third",
  components: { Nav, SwiperBox, Expert, Online, Empty },
=======
export default {
  name: "index_third",
  components: { Header, Nav, SwiperBox, Expert, Online },
>>>>>>> origin/dev_xiaobai
  props: {},
  data() {
    return {};
  },
  computed: {},
  watch: {},
  mounted() {},
  destroyed() {},
<<<<<<< HEAD
  methods: {
    getHospitalIndexData() {
      // 获取首页数据
      this.$axios
        .fetchPost("/Home/Index/GetIndexMpData", { appId: this.appId })
        .then(res => {
          if (res.data.code == 200) {
            // console.log("res.data.data :>> ", res.data.data);
            const data = res.data.data;
            this.swiper = data.adlists;
            this.experts = data.rank_experts;
            this.answerlist = data.answerlists;
          }
        });
    },
    goToOnline() {
      this.$router.push({
        path: "/second_wang"
      });
    },
    goToExpert() {
      this.$router.push({
        path: "/expert"
      });
    },
    goToVideo() {
      this.$router.push({
        path: "/video"
      });
    }
  }
=======
  methods: {}
>>>>>>> origin/dev_xiaobai
};
</script>
<style lang="stylus" scoped>
.index_third-container
  .del
    width 35px
    height 35px
    background url('./17.png') no-repeat
    background-size 35px 35px
    margin-right 10px
    cursor pointer
  .container-box
    margin 0 90px
    display flex
    .left-bar
      width 280px
      color #fff
      .item
        margin-bottom 5px
        display flex
        align-items center
        font-size 36px
        flex-direction column
        justify-content center
        cursor pointer
      .item1
        height 370px
        background #2494DE
        .icon
          width 80px
          height 95px
          background url('./9.png') no-repeat
          background-size 100% 100%
          margin-bottom 30px
      .item2
        height 230px
        background #F2600C
        .icon
          width 96px
          height 95px
          background url('./12.png') no-repeat
          background-size 100% 100%
          margin-bottom 9px
      .item3
        height 225px
        background #00DBC4
        .icon
          width 96px
          height 72px
          background url('./42.png') no-repeat
          background-size 100% 100%
          margin-bottom 30px
    .mid-bar
      width 850px
      margin 0 25px 0
      .swiper-box
        height 440px
        border 1px solid #fff
    .right-bar
      flex 1
</style>
