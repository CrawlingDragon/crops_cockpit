<template>
  <div class="index_third-container">
    <Header
      :title="headerTitle"
      :logoSrc="logoSrc"
      v-show="purview == 1 || purview == 2"
    ></Header>
    <AdminHeader
      v-if="purview == 3 || purview == 4"
      :title="headerTitle"
    ></AdminHeader>
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
          <SwiperBox :list="swiper"></SwiperBox>
        </div>
        <div class="expert-box">
          <Expert :list="experts"></Expert>
        </div>
      </div>
      <div class="right-bar">
        <Online :list="answerlist"></Online>
      </div>
    </div>
    <Nav :index="2"></Nav>
  </div>
</template>
<script>
import Header from "@/components/online_hospital_header/online_hospital_header";
import Nav from "@/components/nav_list/nav_list";
import SwiperBox from "@/components/swiper_box/swiper_box";
import Expert from "@/components/expert_ranking_list/expert_ranking_list";
import Online from "@/components/online_list/online_list";
import AdminHeader from "@/components/admin_header/admin_header";
import { mapMutations, mapState } from "vuex";
export default {
  name: "index_third",
  components: { Nav, SwiperBox, Expert, Online, Header, AdminHeader },
  props: {},
  data() {
    return {
      swiper: [],
      experts: [],
      answerlist: [],
      headerTitle: "",
      logoSrc: ""
    };
  },
  computed: {
    ...mapState(["appId", "purview"])
  },
  watch: {},
  mounted() {
    this.getHospitalIndexData();
  },
  destroyed() {},
  methods: {
    ...mapMutations(["setHospitalIsstore", "setLowerHospital"]),
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
            this.headerTitle = data.title;
            this.logoSrc = data.logo;
            this.setHospitalIsstore(data.purview);
            this.setLowerHospital(data.title);
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
};
</script>
<style lang="stylus" scoped>
.index_third-container
  max-width 1900px
  margin 0 auto
  padding 101px 0 136px
  .del
    width 35px
    height 35px
    background url('./17.png') no-repeat
    background-size 35px 35px
    margin-right 10px
    cursor pointer
  .container-box
    width 100%
    padding 0 40px
    display flex
    .left-bar
      width 285px
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
      width 900px
      margin 0 20px 0 25px
      .swiper-box
        height 440px
    .right-bar
      flex 1
</style>
