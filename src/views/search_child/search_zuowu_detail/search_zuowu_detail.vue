<template>
  <div class="zuowu-detail-container">
    <div class="container container-wrap">
      <div class="back-title" @click="back">
        <span class="back"></span><span>{{ zuowuName }}搜索结果</span>
      </div>
      <div class="content-wrap">
        <div class="tab">
          <div
            class="tab-item"
            @click="chooseDetail('医院')"
            :class="{ active: index == 1 }"
          >
            医院 {{ moduleCount.mpublic }}
          </div>
          <div
            class="tab-item"
            @click="chooseDetail('专家')"
            :class="{ active: index == 2 }"
          >
            专家
            {{ moduleCount.expert }}
          </div>
          <div
            class="tab-item"
            @click="chooseDetail('网诊')"
            :class="{ active: index == 3 }"
          >
            网诊
            {{ moduleCount.wen }}
          </div>
          <div
            class="tab-item"
            @click="chooseDetail('坐诊')"
            :class="{ active: index == 4 }"
          >
            坐诊
            {{ moduleCount.zuozhen }}
          </div>
          <div
            class="tab-item"
            @click="chooseDetail('巡诊')"
            :class="{ active: index == 5 }"
          >
            巡诊
            {{ moduleCount.xunzhen }}
          </div>
          <div
            class="tab-item"
            @click="chooseDetail('测土配方')"
            :class="{ active: index == 6 }"
          >
            测土配方
            {{ moduleCount.testingsoil }}
          </div>
        </div>
      </div>
    </div>

    <router-view :zuowuName="zuowuName"></router-view>
  </div>
</template>
<script>
import { mapState } from "vuex";
export default {
  name: "search_zuowu_detail",
  components: {},
  props: {},
  data() {
    return {
      index: 1,
      moduleCount: {},
      zuowuName: this.$route.query.zuowuName
    };
  },
  computed: { ...mapState(["loginId"]) },
  watch: {
    $route(newVal, oldVal) {
      let newName = newVal.query.zuowuName;
      let oldName = oldVal.query.zuowuName;
      if (newName != oldName && newName != undefined) {
        this.zuowuName = newName;
        this.index = 1;
        this.getSearchModuleCount();
      }
    }
  },
  mounted() {
    this.getSearchModuleCount();
  },
  destroyed() {},
  methods: {
    getSearchModuleCount() {
      this.$axios
        .fetchGet("/Home/Search/getSearchModuleCount", {
          appId: this.loginId,
          keyword: this.zuowuName,
          module: "mpublic"
        })
        .then(res => {
          if (res.data.code === "200") {
            this.moduleCount = res.data.data;
          }
        });
    },
    chooseDetail(where) {
      switch (where) {
        case "医院":
          this.index = 1;
          this.$router
            .replace({
              path: "/search_zuowu_detail/hospital_detail",
              query: { zuowuName: this.zuowuName }
            })
            .catch(() => {});
          break;
        case "专家":
          this.index = 2;
          this.$router
            .replace({
              path: "/search_zuowu_detail/zuowu_expert_detail",
              query: { zuowuName: this.zuowuName }
            })
            .catch(() => {});
          break;
        case "网诊":
          this.index = 3;
          this.$router
            .replace({
              path: "/search_zuowu_detail/wangzhen_detail",
              query: { zuowuName: this.zuowuName }
            })
            .catch(() => {});
          break;
        case "坐诊":
          this.index = 4;
          this.$router
            .replace({
              path: "/search_zuowu_detail/zuozhen_detail",
              query: { zuowuName: this.zuowuName }
            })
            .catch(() => {});
          break;
        case "巡诊":
          this.index = 5;
          this.$router
            .replace({
              path: "/search_zuowu_detail/xunzhen_detail",
              query: { zuowuName: this.zuowuName }
            })
            .catch(() => {});
          break;
        case "测土配方":
          this.index = 6;
          this.$router
            .replace({
              path: "/search_zuowu_detail/cetu_detail",
              query: { zuowuName: this.zuowuName }
            })
            .catch(() => {});
          break;
      }
    },
    back() {
      this.$router.go(-1);
    }
  }
};
</script>
<style lang="stylus" scoped>
.zuowu-detail-container
  position fixed
  left 0
  top 0
  right 0
  bottom 0
  background #080f3e
  z-index 999
  text-align left
  overflow auto
  .back-title
    display flex
    align-items center
    margin 40px
    color rgba(127, 181, 241, 1)
    font-size 30px
    cursor pointer
    .back
      width 30px
      height 30px
      background url('../../../assets/image/back.png') no-repeat
      display block
      margin-right 20px
  .content-wrap
    padding 0 40px
    .tab-content
      height 400px
      overflow-y auto
    .tab
      text-align center
      margin-top 20px
      margin-bottom 60px
      .tab-item
        display inline-block
        padding 9px 24px
        font-size 30px
        color rgba(197, 197, 197, 1)
        margin 0 20px
        cursor pointer
        &.active
          color rgba(255, 102, 0, 1)
          border-bottom 4px solid rgba(255, 102, 0, 1)
.expert
  .expert-box
    margin-bottom 10px
    /deep/.text
      border: 2px solid rgba(255, 255, 255, 0.15);
/deep/.acount-bar
  position absolute
  top 37%
  left 40px
  font-size: 24px;
  color: #B5B5B5;
/deep/.content
  padding 0 40px
  padding-bottom 130px
</style>
