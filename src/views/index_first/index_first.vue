<template>
  <div
    v-loading="loading"
    element-loading-text="加载中..."
    element-loading-spinner="el-icon-loading"
    element-loading-background="rgba(7, 47, 101, .4)"
    style="width:100%;height:100%"
  >
    <!-- <div
      v-loading="loading"
      element-loading-text="加载中..."
      element-loading-spinner="el-icon-loading"
      element-loading-background="rgba(0,0,0, .7)"
      style="width: 400px;height:400px;position:fixed;left:50%;top:50%;z-index:333;border-radios:50px;margin-left:-200px;margin-top:-200px;"
    ></div> -->
    <div class="index-container">
      <Header :title="title" :logoSrc="true"></Header>
      <div class="left" @click="goToNextHospital">
        <ul>
          <li>
            <div class="titles">
              <div>庄稼</div>
              <div>医院</div>
            </div>
            <div class="text">
              <p>{{ count.isstore }}所</p>
            </div>
            <div class="up" v-if="count.new_mpublic != 0">
              <span class="icon"></span>
              <span class="up-num">{{ count.new_mpublic }}</span>
            </div>
          </li>
          <li>
            <div class="title">专家</div>
            <div class="text">{{ count.expert }}位</div>
            <div class="up" v-if="count.new_expert != 0">
              <span class="icon"></span>
              <span class="up-num">{{ count.new_expert }}</span>
            </div>
          </li>
          <li>
            <div class="title">会员</div>
            <div class="text">{{ count.user }}个</div>
            <div class="up" v-if="count.new_user != 0">
              <span class="icon"></span>
              <span class="up-num">{{ count.new_user }}</span>
            </div>
          </li>
          <li>
            <div class="title">三诊</div>
            <div class="text">{{ count.wenzhen }}次</div>
          </li>
          <li>
            <div class="titles">
              <div>测土</div>
              <div>配方</div>
            </div>
            <div class="text">{{ count.cetu }}次</div>
          </li>
        </ul>
      </div>
      <div class="right-bar">
        <div class="top">
          <div class="mid">
            <hospital :list="indexDate.mpublic"></hospital>
          </div>
          <div class="right">
            <Message :list="message"></Message>
            <div class="expert-box">
              <expert
                :list="expertArr"
                routerPath="/expert_paihang_general"
              ></expert>
            </div>
          </div>
        </div>
        <div class="nav-box">
          <div class="item i3" @click="goToHospital">
            <div class="icon icon03"></div>
            <p>医院本级</p>
          </div>
          <div class="item i2" @click="goToExpert">
            <div class="icon icon02"></div>
            <p>专家</p>
          </div>
          <div class="item i4" @click="goToHospitalList">
            <div class="icon icon04"></div>
            <p>医院综合排序</p>
          </div>
        </div>
      </div>
    </div>
    <Nav></Nav>
  </div>
</template>
<script>
import Header from "@/components/general_hospital_header/general_hospital_header";
import ExpertRankingList from "@/components/expert_ranking_list/expert_ranking_list";
import HospitalList from "@/components/hospital_list/hospital_list";
import Nav from "@/components/nav_list_third/nav_list_third";
import Message from "@/components/message_list/message_list";
import { mapMutations, mapState } from "vuex";
export default {
  name: "indexFirst",
  components: {
    Header,
    Expert: ExpertRankingList,
    hospital: HospitalList,
    Nav,
    Message
  },
  props: {},
  data() {
    return {
      title: "", //头部 医院名字
      indexDate: "",
      count: {},
      expertArr: [],
      message: [],
      loading: true
    };
  },
  computed: {
    ...mapState(["loginHospitalName", "appId", "loginId"])
  },
  created() {
    this.setAppId(this.loginId);
  },
  watch: {},
  mounted() {
    this.setIsLowerHospital("false");
    this.title = this.loginHospitalName;
    this.getIndexDate();
    this.getMessageDate();
  },
  destroyed() {},
  methods: {
    ...mapMutations(["setAppId", "getPurview", "setIsLowerHospital"]),
    getIndexDate() {
      // 获取首页数据
      this.$axios
        .fetchPost("/Home/Manage/GetManageMPIndexData", { appId: this.appId })
        .then(res => {
          if (res.data.code === "200") {
            this.indexDate = res.data.data;
            this.count = res.data.data.count;
            this.expertArr = res.data.data.expert.splice(0, 3);
            this.loading = false;
          }
        });
    },
    getMessageDate() {
      // 获取通知数据
      this.$axios
        .fetchPost("/Home/Manage/GetManageMessageData", { appId: this.appId })
        .then(res => {
          if (res.data.code === "200") {
            this.message = res.data.data;
          }
        });
    },
    goToNextHospital() {
      // 下级医院数据
      this.$router.push({
        path: "/nexthospital"
      });
    },
    goToExpert() {
      // 去到 浏览历史
      this.$router.push({
        path: "/expertlist"
      });
    },
    goToHospital() {
      // 去到医院本级
      this.setIsLowerHospital("true");
      const route = this.$router.resolve({
        path: "/index_second",
        query: { appId: this.appId, from: "adminRoute" }
      });
      window.open(route.href, "_blank");
    },
    goToHospitalList() {
      // 去到医院综合排序
      this.$router.push({
        path: "/multiplesort"
      });
    }
  }
};
</script>
<style lang="stylus" scoped>
.index-container
  display flex
  padding-top 101px
  padding-bottom 151px
  padding-left 40px
  padding-right 40px
  max-width 1900px
  margin 0 auto
  .left
    width 440px
    margin-right 30px
    ul
      border 1px solid #eee
      background rgba(9, 29, 68, 1)
      border 2px solid rgba(7, 47, 101, 1)
      li
        display flex
        border 2px solid #072F65
        position relative
        height 160px
        .title, .titles
          width 140px
          height 100%
          display flex
          align-items center
          justify-content center
          background rgba(12, 41, 84, 0.5)
          font-size 32px
          line-height 1.1
          flex-direction column
        .text
          flex 1
          text-align left
          padding-left 24px
          display flex
          align-items center
          color #FFFDFD
          font-size 32px
          line-height 1.1
          .small
            font-size 22px
            .num
              color #FF6600
        .up
          position absolute
          right 32px
          top 45px
          color #fff
          .icon
            width 20px
            height 26px
            margin-right 10px
            display inline-block
            background url('./1.png') no-repeat
          .up-num
            font-size 28px
            font-family SimHei
            font-weight 400
  .right-bar
    flex 1
    .top
      display flex
      .mid
        width 440px
        margin-right 30px
      .right
        flex 1
        min-width 0
        overflow hidden
        max-width 880px
    .nav-box
      width 100%
      display flex
      margin-top 9px
      & > .item
        margin-right 30px
        box-sizing border-box
        height 200px
        align-items center
        display flex
        justify-content center
        cursor pointer
        &.i3
          background #EBB701
          width 440px
        &.i2
          background #DA3266
          width 425px
        &.i4
          background #7B70FA
          width 425px
        &.i1
          background #2494DE
        &:last-child
          margin-right 0
        .icon01
          width 92px
          height 70px
          background url('./5.png') no-repeat
          background-position center
          background-size 100%
        .icon02
          width 90px
          height 91px
          background url('../../assets/image/index_expert.png') no-repeat
          background-position center
          background-size 100%
        .icon03
          width 75px
          height 75px
          background url('./15.png') no-repeat
          background-position center
          background-size 100%
        .icon04
          width 92px
          height 71px
          background url('./6.png') no-repeat
          background-position center
          background-size 100%
        & > p
          font-size 33px
          font-family SimHei
          font-weight 400
          color rgba(255, 255, 255, 1)
          margin-left 50px
  .hospital_list-wrap
    .item
      height:200px;
</style>
