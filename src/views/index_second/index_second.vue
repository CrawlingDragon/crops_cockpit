<template>
  <div class="index_second-container">
    <Header
      :title="headerTitle"
      :returnPath="this.returnPath"
      :logoSrc="true"
    ></Header>
    <div class="second-container">
      <div class="left-bar">
        <div class="swiper-box">
          <SwiperBox :list="swiper"></SwiperBox>
        </div>
        <div class="mid-nav">
          <div class="item1" @click="goToViplist"></div>
          <div class="item2" @click="goToExpertlist"></div>
          <div class="item3" @click="goToGoodslist"></div>
          <div class="item4" @click="goToVideolist"></div>
        </div>
        <div class="bottom-bar">
          <div class="item" @click="goToExpertPaihang">
            <div class="l">
              <div class="icon icon01"></div>
              <p class="p1">专家回复</p>
              <p class="p2">排行榜</p>
            </div>
            <div class="r">
              <div
                class="list"
                v-for="(item, index) in rank_experts"
                :key="item.uid"
              >
                <span class="number number1">{{ index + 1 }}</span>
                <span class="name">{{ item.realname }}</span>
              </div>
              <img src="./2.png" alt="" v-show="rank_experts.length == 0" />
            </div>
          </div>
          <div class="item" @click="goToNewVip">
            <div class="l">
              <div class="icon icon02"></div>
              <p class="p2">新增</p>
              <p class="p2">会员</p>
            </div>
            <div class="r">
              <div class="list" v-for="item in new_users" :key="item.id">
                <span class="num"></span>
                <span class="name">{{ item.name }}</span>
              </div>
              <img src="./2.png" alt="" v-show="new_users.length == 0" />
            </div>
          </div>
        </div>
      </div>
      <div class="right-bar">
        <div class="list-wrap">
          <IndexSecondImgList
            :expert="recommend_expert"
            :goods="recommend_product"
            :video="recommend_video"
          ></IndexSecondImgList>
        </div>
        <div class="cetu-wrap">
          <Cetu :list="cetu" :zuowu="false"></Cetu>
        </div>
        <div class="online-wrap">
          <Online :list="answerlist"></Online>
        </div>
      </div>
    </div>
    <NavList :index="2"></NavList>
  </div>
</template>
<script>
import Header from "@/components/online_hospital_header/online_hospital_header";
import IndexSecondImgList from "@/components/index_second_img_list/index_second_img_list";
import Cetu from "@/components/cetu_list/cetu_list";
import Online from "@/components/online_list/online_list";
import NavList from "@/components/nav_list_second/nav_list_second";
import SwiperBox from "@/components/swiper_box/swiper_box";
import { mapState, mapMutations } from "vuex";
export default {
  name: "index_second",
  components: { Header, IndexSecondImgList, Cetu, NavList, Online, SwiperBox },
  props: {},
  data() {
    return {
      swiper: [],
      experts: [],
      answerlist: [],
      headerTitle: "",
      logoSrc: "",
      rank_experts: [],
      new_users: [],
      recommend_expert: {},
      recommend_video: {},
      recommend_product: {},
      cetu: [],
      returnPath: "",
      routerAppid: this.$route.query.appid,
      hospitalPurview: 0
    };
  },
  computed: {
    ...mapState(["appId", "loginId"])
  },
  watch: {},
  mounted() {
    this.getIndexData();
    if (this.$route.query.appid != undefined) {
      this.setAppId(this.routerAppid);
    }
  },
  destroyed() {},
  methods: {
    ...mapMutations(["setHospitalIsstore", "setLowerHospital", "setAppId"]),
    getIndexData() {
      this.$axios
        .fetchPost("/Home/Index/GetIndexMpData", {
          appId:
            this.$route.query.appid == undefined ? this.loginId : this.appId
        })
        .then(res => {
          if (res.data.code == 200) {
            const data = res.data.data;
            this.swiper = data.adlists;
            this.experts = data.rank_experts;
            this.answerlist = data.answerlists;
            this.headerTitle = data.title;
            // this.logoSrc = data.logo;
            this.cetu = data.ceturecords;
            this.rank_experts = data.rank_experts;
            this.new_users = [].concat(data.new_users).splice(0, 3);
            this.recommend_expert = data.recommend_expert[0];
            this.recommend_video = data.recommend_video;
            this.recommend_product = data.recommend_product;
            this.setHospitalIsstore(data.purview);
            this.setLowerHospital(data.title);
            this.hospitalPurview = data.purview;
          }
        });
    },
    goToExpertPaihang() {
      // 专家排行榜
      if (this.rank_experts.length == 0) {
        this.$layer.msg("暂无排行榜");
        return;
      }
      this.$router.push({
        path: "/expert_paihang_xiaji",
        query: { hospitalPurview: this.hospitalPurview }
      });
    },
    goToViplist() {
      this.$router.push({
        path: "/second_huiyuan_list"
      });
    },
    goToNewVip() {
      if (this.new_users.length == 0) {
        this.$layer.msg("暂无会员");
        return;
      }
      this.$router.push({
        path: "/second_huiyuan_list",
        query: { from: "newJoin" }
      });
    },
    goToExpertlist() {
      this.$router.push({
        path: "/expert"
      });
    },
    goToGoodslist() {
      this.$router.push({
        path: "/goods_list"
      });
    },
    goToVideolist() {
      this.$router.push({
        path: "/video",
        query: { axiosPurview: this.axiosPurview }
      });
    }
  }
};
</script>
<style lang="stylus" scoped>
.index_second-container
  padding-top 100px
  padding-bottom 150px
  .second-container
    margin 0 auto
    max-width 1900px
    min-width 1900px
    display flex
    padding: 0 45px;
    .left-bar
      width 900px
      margin-right 20px
      .swiper-box
        width 100%
        height 440px
        margin-bottom 20px
      .mid-nav
        display flex
        & > div
          flex 1
          margin-right 20px
          height 200px
          cursor pointer
          &:last-child
            margin-right 0
        .item1
          background url('./47.png') no-repeat
          background-size 100% 100%
        .item2
          background url('./48.png') no-repeat
          background-size 100% 100%
        .item3
          background url('./49.png') no-repeat
          background-size 100% 100%
        .item4
          background url('./50.png') no-repeat
          background-size 100% 100%
      .bottom-bar
        display flex
        margin-top 20px
        & > .item
          flex 1
          cursor pointer
          display flex
          padding 5px 0
          background rgba(9, 29, 68, 1)
          border 2px solid rgba(7, 47, 101, 1)
          &:first-child
            margin-right 20px
          .l
            width 153px
            border-right 2px solid #072F65
            .icon
              width 29px
              height 31px
              margin 0 auto 15px
              &.icon01
                background url('./55.png') no-repeat
                background-size 29px 31px
              &.icon02
                background url('./56.png') no-repeat
                background-size 28px 27px
                margin-bottom 10px
            .p1
              font-size 24px
              line-height 1.2
            .p2
              font-size 32px
              line-height 1.2
          .r
            flex 1
            padding-left 30px
            .list
              margin-bottom 5px
              text-align left
              .number
                border-radius 50%
                width 30px
                height 30px
                text-align center
                display inline-block
                vertical-align middle
                color #fff
                line-height 30px
                font-size 24px
              .number1
                background rgba(250, 139, 0, 0.7)
              .number2
                background rgba(236, 74, 6, 0.7)
              .number3
                background rgba(169, 108, 105, 0.7)
              .name
                font-size 24px
                margin-left 30px
                display inline-block
                vertical-align middle
              .num
                width 5px
                height 5px
                background rgba(250, 139, 0, 1)
                border-radius 50%
                display inline-block
                vertical-align middle
    .right-bar
      flex 1
      display flex
      flex-wrap wrap
      .list-wrap
        margin-bottom 40px
        width 100%
      .cetu-wrap
        flex 1
        margin-right 33px
        min-height 516px
      .online-wrap
        flex 1
        min-height 516px
/deep/.online_list-wrap
  .title
    margin-bottom 15px
</style>
