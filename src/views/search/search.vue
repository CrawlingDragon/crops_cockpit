<template>
  <div class="search-container container-wrap">
    <headers title="搜索" :isSearchHref="true"></headers>
    <div class="search-bar">
      <el-input
        placeholder="输入关键字"
        prefix-icon="search-icon"
        v-model="searchValue"
        @keyup.enter.native="getSearchData"
      >
      </el-input>
      <div class="btn" @click="getSearchData">搜索</div>
    </div>
    <div class="content-bar" v-show="!result">
      <div class="small-title">你可能在找？</div>
      <ul class="init-ul">
        <li
          v-for="(item, index) in initResult"
          :key="index"
          @click="clickDetail(item)"
        >
          {{ item.name || item.realname || item.uname
          }}<span class="expert" v-if="item.position">专家</span>
        </li>
      </ul>
    </div>
    <div class="resule-bar" v-if="result">
      <div class="noData" v-show="noData">暂无符合搜索的结果</div>
      <div class="search-resule-content" v-show="!noData">
        <div class="nav">
          <div class="nav-list">
            <router-link to="/search/search_all" replace class="item"
              >综合</router-link
            >
            <router-link to="/search/search_hospital" replace class="item"
              >医院</router-link
            >
            <router-link to="/search/search_expert" replace class="item"
              >专家</router-link
            >
            <router-link to="/search/search_zuowu" replace class="item"
              >作物</router-link
            >
            <router-link to="/search/search_vip" replace class="item"
              >会员</router-link
            >
            <router-link to="/search/search_zuozhen" replace class="item"
              >坐诊</router-link
            >
            <router-link to="/search/search_xunzhen" replace class="item"
              >巡诊</router-link
            >
            <router-link to="/search/search_wangzhen" replace class="item"
              >网诊</router-link
            >
          </div>
        </div>
        <keep-alive>
          <router-view
            :result="result"
            :count="count"
            :searchValue="searchValue"
            :nextSearch="nextSearch"
          ></router-view>
        </keep-alive>
      </div>
    </div>
  </div>
</template>
<script>
import Headers from "@/components/general_hospital_header/general_hospital_header";
import { mapState, mapMutations } from "vuex";

export default {
  name: "search",
  components: { Headers },
  props: {},
  data() {
    return {
      searchValue: "",
      initResult: [],
      result: "",
      noData: false,
      count: 0,
      nextSearch: true, //代表重新搜索
      from: this.$route.query.from
    };
  },
  computed: {
    ...mapState(["loginId"])
  },
  activated() {
    if (this.$route.query.from == "header") {
      this.result = "";
      this.searchValue = "";
    }
  },
  watch: {
    loginId() {
      this.get_init_result();
    }
    // from(newVal) {
    //   if (newVal === "header") {
    //     this.initResult = [];
    //   }
    // }
  },
  mounted() {
    this.get_init_result();
  },
  destroyed() {},
  methods: {
    ...mapMutations(["setAppId", "setIsLowerHospital"]),
    getSearchData() {
      if (this.searchValue.trim() == "") {
        this.result = "";
        return;
      }
      this.nextSearch = !this.nextSearch;
      this.openLoading();
      this.$router
        .replace({
          path: "/search/search_all"
        })
        .catch(e => {});
      this.$axios
        .fetchGet("/Home/Search/getAppSearch", {
          appId: this.loginId,
          keyword: this.searchValue.trim()
        })
        .then(res => {
          if (res.data.code === "200") {
            this.openLoading().close();
            this.result = res.data.data;
            this.count = res.data.amount;
          }
        });
    },
    clickDetail(item) {
      // 默认搜索列表点击去医院，专家，会员
      if (item.name) {
        // 医院
        let route = "";
        if (item.istown == 1) {
          route = this.$router.resolve({
            path: "/village_me",
            query: { appId: item.linkid, from: "adminRoute" }
          });
        } else {
          route = this.$router.resolve({
            path: "/index_second",
            query: { appid: item.linkid, from: "adminRoute" }
          });
        }
        this.setIsLowerHospital("true");
        this.setAppId(item.linkid);
        window.open(route.href, "_blank");
      }
      if (item.realname) {
        this.$router.push({
          path: "/expert_detail_four",
          query: { uid: item.expertid, appId: this.loginId }
        });
      }
      if (item.uname) {
        this.$router.push({
          path: "/vip_diagnosis",
          query: { userName: item.uname, userId: item.uid, from: "general" }
        });
      }
    },
    get_init_result() {
      // 获取搜索页默认结果
      this.$axios
        .fetchGet("/Home/Search/getSearchList", { appId: this.loginId })
        .then(res => {
          if (res.data.code === "200") {
            this.initResult = res.data.data;
          }
        });
    }
  }
};
</script>
<style lang="stylus" scoped>
.search-container
  color #fff
  padding 150px 0 100px
  .search-bar
    text-align center
    .el-input--prefix
      display inline-block
      width auto
      vertical-align middle
      /deep/.el-input__inner
        height: 80px;
        background: rgba(166, 251, 255, 0);
        border: 1px solid rgba(166, 251, 255, 0.5);
        border-radius: 40px;
        border-radius: 40px;
        padding-left 103px
        width 780px
        color: #C5C5C5;
        font-weight: 400;
        font-size: 28px;
      /deep/.search-icon
        display block
        cursor pointer
        width 45px
        height 45px
        background url('../../assets/image/search_input.png') no-repeat
        margin-left 35px
        margin-top 18px
    .btn
      width: 170px;
      height: 80px;
      background: #7FB5F1;
      border-radius: 40px;
      display inline-block
      vertical-align middle
      margin-left 20px
      font-size: 32px;
      font-family: Microsoft YaHei;
      font-weight: 400;
      color: #080F3E;
      line-height 80px
      cursor pointer
  .content-bar
    width 1300px
    margin 60px auto 0
    text-align left
    .small-title
      font-size 24px
      color #c5c5c5
    .init-ul
      margin-top 25px
      li
        height 90px
        line-height 90px
        font-size: 32px;
        border-bottom 1px solid rgba(166, 251, 255, .5)
        cursor pointer
        .expert
          color rgba(197, 197, 197, 1)
          margin-left 30px
  .resule-bar
    .noData
      font-size 30px
      color #fff
      padding-top 100px
      line-height 100px
      margin-left -134px
    .search-resule-content
      margin-top 45px
      .nav
        width 100%
        background rgba(7, 31, 82, 1)
        .nav-list
          text-align center
          .item
            padding 0 45px
            height 80px
            line-height 80px
            font-size 30px
            display inline-block
            cursor pointer
            color #fff
            margin 0 2px
            &:hover
              color: #FF6600;
          .router-link-active,.linkActiveClass
            color: #FF6600;
            position relative
            &::after
              content ''
              position absolute
              left 45px
              right 45px
              bottom 15px
              border-bottom 2px solid #FF6600
/deep/.page-box
    position fixed
    left 0
    right 0
    bottom 0
    height 130px
    background #080f3e
    /deep/.wrap
      margin 0 auto
      height 100%
      position relative
      padding 0 40px
      width 100%
      @media (min-width 1900px)
        width: 1900px
      @media screen and (max-width 1890px)
        width: 1340px
      /deep/.paginatin
        position absolute
        right 40px
        top 40%
/deep/.module-title
  font-size 24px
  color: #C5C5C5;
  margin-bottom 50px
  margin-top 20px
/deep/.noData
  height 300px
  line-height 300px
  font-size 30px
  text-align center
</style>
