<template>
  <div class="second_wang-container">
    <!-- <AdminHeader
      v-show="purview == 3 || purview == 4"
      :midTitle="
        routeFrom == '/diagnosis/second_wang' ? '诊疗' : '网诊' + count
      "
      :title="title"
    ></AdminHeader>
    <Header
      title="网诊"
      :titleNumber="count"
      v-if="routeFrom != '/diagnosis/second_wang'"
      v-show="purview == 1 || purview == 2"
    ></Header> -->
    <ul
      class="wang-ul infinite-list"
      v-infinite-scroll="load"
      style="overflow:auto;"
      infinite-scroll-disabled="disabled"
    >
      <li
        v-for="item in list"
        :key="item.tid"
        class="infinite-list-item"
        @click="goToWangDetail(item.tid)"
      >
        <div class="icon"></div>
        <div class="text">
          <div class="time">
            {{ item.title }}
            <span style="margin-left :20px">{{ item.showtime }}</span>
          </div>
          <p class="p1">
            {{ item.content }}
          </p>
        </div>
        <div class="answer">
          <div class="p2">回复数：{{ item.replies }}</div>
          <el-image fit="cover" :src="item.thumb_pic" class="img">
            <div class="imgae_error" slot="placeholder"></div>
            <div class="image_error" slot="error"></div
          ></el-image>
        </div>
      </li>
      <div class="noData" v-if="noData">暂无会员提问,敬请期待</div>
      <p v-if="loading && !noData">加载中...</p>
      <p v-if="noMore && !noData">没有更多了</p>
    </ul>
    <Nav :index="3" v-if="purview != 4"></Nav>
  </div>
</template>
<script>
import Nav from "@/components/nav_list/nav_list";
// import Header from "@/components/online_hospital_header/online_hospital_header";
// import AdminHeader from "@/components/admin_header/admin_header";
import { mapState } from "vuex";
export default {
  name: "second_wang",
  components: { Nav },
  props: {},
  data() {
    return {
      list: [],
      page: 0,
      loading: false,
      noMore: false,
      count: 0,
      routeFrom: "",
      noData: false,
      title: "",
      routerPath: this.$route.path
    };
  },
  computed: {
    ...mapState([
      "appId",
      "purview",
      "lowerHospital",
      "isLowerHospital",
      "loginId"
    ]),
    disabled() {
      return this.loading || this.noMore;
    }
  },
  watch: {},
  mounted() {
    this.routeFrom = this.$route.fullPath;
    this.title = this.lowerHospital;
  },
  destroyed() {},
  methods: {
    load() {
      this.page += 1;
      this.loading = true;
      setTimeout(() => {
        this.$axios
          .fetchPost("/Home/Treatment/GetWenList", {
            page: this.page,
            appId:
              this.routerPath == "/diagnosis_general" ||
              this.routerPath == "/diagnosis_general/second_wang"
                ? this.loginId
                : this.appId,
            purview: this.routerPath == "/diagnosis_general/second_wang" ? 1 : 0
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
    goToWangDetail(tid) {
      this.$router.push({
        path: "/wangzhen_detail",
        query: { tid: tid }
      });
    }
  }
};
</script>
<style lang="stylus" scoped>
.second_wang-container
  max-width 1900px
  margin 0 auto
  min-height 724px
  padding-top 100px
  .wang-ul
    padding 0 40px 155px
    max-height 768px
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
      cursor pointer
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
        .time
          color #B5B5B5
          font-size 24px
          margin-bottom 15px
        .p1
          font-size 30px
          font-weight 400
          line-height 1.4
          overflow hidden
          text-overflow ellipsis
          display -webkit-box
          -webkit-line-clamp 3
          -webkit-box-orient vertical
      .answer
        font-size 24px
        color #B5B5B5
        margin-left 100px
        .p2
          margin-bottom 38px
          line-height 1.2
        .img
          width 110px
          height 110px
.noData
  font-size 26px
  color #7fb5f1
  line-height 60px
</style>
