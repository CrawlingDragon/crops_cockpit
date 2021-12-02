<template>
  <div class="second_zuo-container">
    <ul
      class="wang-ul infinite-list"
      v-infinite-scroll="load"
      style="overflow:auto;"
      infinite-scroll-disabled="disabled"
    >
      <li
        v-for="item in list"
        :key="item.id"
        class="infinite-list-item"
        @click="goToDetail(item.id, item.userid)"
      >
        <div class="icon"></div>
        <div class="text">
          <div class="time">
            {{ item.title }}
          </div>
          <p class="p1">
            {{ item.content }}
          </p>
          <div class="p1">{{ item.showtime }}</div>
          <p class="p1">{{ item.describe }}</p>
        </div>
        <div class="answer">
          <div class="p2">{{ item.name }}</div>
          <ul>
            <li v-for="item in item.thumb_pic" :key="item">
              <el-image :src="item" class="img"></el-image>
            </li>
          </ul>
        </div>
      </li>
      <div class="noData" v-if="noData">
        <p>暂无坐诊</p>
        <p>请先使用新型庄稼医院管理平台录入坐诊记录</p>
      </div>
      <p v-if="loading && !noData">加载中...</p>
      <p v-if="noMore && !noData">没有更多了</p>
    </ul>
  </div>
</template>
<script>
import { mapMutations, mapState } from "vuex";
export default {
  name: "second_zuo",
  components: {},
  props: {},
  data() {
    return {
      list: [],
      page: 0,
      loading: false,
      noMore: false,
      noData: false,
      routerPath: this.$route.path
    };
  },
  computed: {
    ...mapState(["appId", "isLowerHospital", "purview", "loginId"]),
    disabled() {
      return this.loading || this.noMore;
    }
  },
  watch: {},
  mounted() {},
  destroyed() {},
  methods: {
    ...mapMutations(["setIsLowerHospital"]),
    load() {
      this.page += 1;
      this.loading = true;
      setTimeout(() => {
        this.$axios
          .fetchGet("/Home/Treatment/GetWenzhenList", {
            page: this.page,
            appId:
              this.routerPath == "/diagnosis_general" ||
              this.routerPath == "/diagnosis_general/second_zuo"
                ? this.loginId
                : this.appId,
            type: "1",
            purview: this.routerPath == "/diagnosis_general/second_zuo" ? 1 : 0
          })
          .then(res => {
            if (res.data.code == 200) {
              this.list = this.list.concat(res.data.data);
              this.loading = false;
              this.count = res.data.count;
              if (res.data.data.length == 0) {
                this.noMore = true;
                if (this.page == 1) {
                  this.noData = true;
                }
              }
            } else {
              this.noMore = true;
            }
          });
      }, 1000);
    },
    goToDetail(id, appId) {
      if (this.routerPath == "/diagnosis_general/second_zuo") {
        this.setIsLowerHospital("true");
        const route3 = this.$router.resolve({
          path: "/zuozhen_detail",
          query: { tid: id, from: "adminRoute", appId: appId }
        });
        window.open(route3.href, "_blank");
      } else {
        this.$router.push({
          path: "/zuozhen_detail",
          query: { tid: id, appId: appId }
        });
      }
    }
  }
};
</script>
<style lang="stylus" scoped>
.second_zuo-container
  max-width 1900px
  margin 0 auto
  height 100%
  max-height 100%
  overflow hidden
  padding-bottom 150px
  .wang-ul
    margin 48px 90px 0
    scrollbar-arrow-color rgba(3, 5, 57, 1)
    scrollbar-base-color hsla(0, 0%, 53%, 0.4)
    scrollbar-track-color rgba(3, 5, 57, 1)
    scrollbar-shadow-color hsla(0, 0%, 53%, 0.1)
    &::-webkit-scrollbar {
        width: 6px;
        height: 6px;
        background: transparent;
    }
    &::-webkit-scrollbar-thumb {
        background: transparent;
        border-radius: 4px;
    }
    &:hover::-webkit-scrollbar-thumb {
        background: hsla(0, 0%, 53%, 0.4);
    }
    &:hover::-webkit-scrollbar-track {
        background: hsla(0, 0%, 53%, 0.1);
    }
    & > li
      background rgba(9, 29, 67, 0.4)
      border 1px solid rgba(255, 255, 255, 0.2)
      margin-bottom 11px
      display flex
      padding 22px
      height 220px
      & > .icon
        width 30px
        height 40px
        background url('./31.png') no-repeat
        background-position center
        background-size 100%
        margin-right 30px
      .text
        flex 1
        text-align left
        min-width 0
        overflow hidden
        text-overflow ellipsis
        display -webkit-box
        -webkit-box-orient vertical
        .time
          font-size 36px
          font-family SimHei
          font-weight 400
          line-height 1.2
          margin-bottom 20px
        .p1
          color #B5B5B5
          font-size 24px
          overflow hidden
          text-overflow ellipsis
          white-space nowrap
          word-break break-all
      .answer
        font-size 24px
        color #B5B5B5
        margin-left 50px
        .p2
          margin-bottom 38px
          line-height 1.2
        ul
          text-align right
          li
            display inline-block
            margin-left 20px
            .img
              width 110px
              height 110px
.noData
  font-size 26px
  color #7fb5f1
  // height 60px
  & > P
    line-height 60px
</style>
