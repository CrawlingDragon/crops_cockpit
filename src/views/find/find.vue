<template>
  <div class="find-container">
    <Header title="发现"></Header>
    <div class="nav-bar">
      <div
        class="item"
        v-for="(item, index) in navList"
        :key="item.catid"
        :class="{ active: activeIndex == index }"
        @click="nav(item.catid, index)"
      >
        <span class="active">{{ item.catname }}</span>
      </div>
    </div>
    <ul
      class="infinite-list find-ul"
      v-show="activeIndex == 0"
      v-infinite-scroll="load"
      style="overflow:auto;"
      infinite-scroll-disabled="disabled"
    >
      <li
        v-for="item in list"
        class="infinite-list-item"
        :key="item.id"
        @click="goToDetail(item.catid, item.id)"
      >
        <div class="bj-wrap">
          <el-image :src="item.thumb" class="small-img" fit="cover">
            <div slot="error" class="image-slot">
              <div class="image-error"></div>
            </div>
          </el-image>
          <div class="title-bar">{{ item.title }}</div>
          <div class="text">
            {{ item.copyfrom }}
            <span class="time">{{ item.inputtime }}</span>
          </div>
        </div>
      </li>
      <p v-if="loading">加载中...</p>
      <p v-if="noMore">没有更多了</p>
    </ul>
    <ul
      v-show="activeIndex != 0"
      class="infinite-list bingchonghai"
      v-infinite-scroll="load"
      style="overflow:auto;"
      infinite-scroll-disabled="disabled"
    >
      <li
        v-for="item in list"
        class="infinite-list-item"
        :key="item.id"
        @click="goToBinchonghaiDetail(item.catid, item.id)"
      >
        <div class="content">
          <el-image class="el-img" :src="item.thumb">
            <div slot="error" class="image-slot">
              <div class="image-error"></div>
            </div>
          </el-image>
          <div class="p">{{ item.title }}</div>
        </div>
      </li>
      <p v-if="loading" class="p">加载中...</p>
      <p v-if="noMore" class="p">没有更多了</p>
    </ul>
    <Nav :index="4" v-if="purview == 1"></Nav>
    <NavSecond :index="4" v-if="purview == 2"></NavSecond>
  </div>
</template>
<script>
import Nav from "@/components/nav_list/nav_list";
import NavSecond from "@/components/nav_list_second/nav_list_second";
import Header from "@/components/online_hospital_header/online_hospital_header";
import { mapState } from "vuex";
export default {
  name: "find",
  components: {
    Nav,
    Header,
    NavSecond
  },
  props: {},
  data() {
    return {
      count: 0,
      navList: [],
      activeIndex: 0,
      initCatid: 0,
      list: [],
      page: 0,
      loading: false,
      noMore: false,
      catid: 0,
      from: this.$route.query.from
    };
  },
  computed: {
    ...mapState(["purview"]),
    disabled() {
      return this.loading || this.noMore;
    }
  },
  watch: {},
  mounted() {
    this.getNavList();
    if (this.from == "bingchonghai") {
      this.activeIndex = 1;
    }
  },
  destroyed() {},
  methods: {
    load() {
      this.page += 1;
      this.loading = true;
      setTimeout(() => {
        this.$axios
          .fetchGet("/Home/News/GetPushMessageList", {
            catId: this.catid,
            page: this.page
          })
          .then(res => {
            if (res.data.code == 200) {
              this.list = this.list.concat(res.data.data);
              this.loading = false;
              if (res.data.data.length == 0) {
                this.noMore = true;
              }
            } else {
              this.noMore = true;
            }
          });
      }, 1000);
    },
    getNavList(catId) {
      // 获取导航栏目
      this.$axios.fetchGet("/Home/News/GetPushMessageMenu").then(res => {
        if (res.data.code == 200) {
          this.navList = res.data.data;
          if (this.from == "bingchonghai") {
            this.initCatid = res.data.data[1].catid;
            this.catid = res.data.data[1].catid;
          } else {
            this.initCatid = res.data.data[0].catid;
            this.catid = res.data.data[0].catid;
          }

          // setTimeout(() => {
          //   this.getList();
          // }, 100);
        }
      });
    },
    getList(catid) {
      // 获取列表数据
      this.$axios
        .fetchPost("/Home/News/GetPushMessageList", { catId: catid })
        .then(res => {
          if (res.data.code == 200) {
            this.list = res.data.data;
          }
        });
    },
    nav(catid, index) {
      // 点击导航栏
      this.activeIndex = index;
      this.catid = catid;
      this.list = [];
      this.page = 0;
      this.loading = true;
      this.noMore = false;
      this.load();
    },
    goToDetail(catid, id) {
      // 导航去发现详情页
      this.$router.push({
        path: "/find_detail",
        query: {
          catid: catid,
          id: id
        }
      });
    },
    goToBinchonghaiDetail(catid, id) {
      // 导航去发现详情页
      this.$router.push({
        path: "/binchonghai_detail",
        query: {
          catid: catid,
          id: id
        }
      });
    }
  }
};
</script>
<style lang="stylus" scoped>
.find-container
  padding-top 100px
  padding-bottom 150px
  .nav-bar
    display flex
    border-bottom 1px solid rgba(255, 255, 255, 0.2)
    max-width 1900px
    min-width 1340px
    margin 0 auto
    padding-left 40px
    .item
      line-height 58px
      text-align left
      cursor pointer
      font-size 30px
      &:hover
        span
          border-bottom 4px solid #FF6600
      span
        padding 0 12px
        height 100%
        display inline-block
      &.active
        border-bottom 4px solid #FF6600
        &:hover
          span
            border 0
  .find-ul
    margin 42px 90px 20px
    padding 16px 40px 100px
    max-height 650px
    max-width 1900px
    min-width 1340px
    margin 0 auto
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
      display inline-block
      width 50%
      height 200px
      margin-bottom 20px
      padding-top 3px
      .bj-wrap
        cursor pointer
        background rgba(9, 29, 68, 1)
        border 1px solid rgba(255, 255, 255, 0.2)
        height 100%
        padding-left 80px
        padding-top 12px
        padding-right 44px
        position relative
        &:hover
          outline 3px solid #FF6600
          box-shadow 0px 1px 26px #f60
        .small-img
          width 30px
          height 35px
          position absolute
          left 28px
          top 22px
          .icon
            background url('./44.png') no-repeat
            width 30px
            height 35px
            background-size 100% 100%
        .title-bar
          font-size 36px
          color #FFFFFF
          line-height 50px
          font-family SimHei
          text-align left
          height 100px
          overflow hidden
          text-overflow ellipsis
          display -webkit-box
          -webkit-box-orient vertical
          -webkit-line-clamp 2
          margin-bottom 30px
        .text
          text-align left
          color #808080
          font-size 24px
          margin-right 34px
      &:nth-child(odd)
        .bj-wrap
          margin-right 10px
      &:nth-child(even)
        .bj-wrap
          margin-left 10px
  .bingchonghai
    // width 100%
    padding-top 16px
    text-align left
    margin 0 90px
    max-height 640px
    min-height 100px
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
    .p
      text-align center
    & > li
      width 20%
      padding-right 20px
      position relative
      display inline-block
      height 300px
      vertical-align top
      margin-bottom 20px
      &:nth-child(5n)
        padding-right 0
      .content
        width 100%
        height 100%
        cursor pointer
        position relative
      .p
        width 100%
        position absolute
        left 0
        bottom 0
        background: linear-gradient(0deg, rgba(3, 0, 0, 0.84) 0%, rgba(3, 0, 0, 0) 100%);
        line-height 72px
        height 72px
        text-indent 14px
        color #fff
        font-size 30px
        overflow hidden
        text-overflow ellipsis
        word-break break-all
        white-space nowrap
      .el-img
        width 100%
        height 100%
/deep/.image-slot
  background url('./65.png') no-repeat
  width auto
  height auto
  margin 0 auto
  width 100%
  height 100%
  background-size auto
  background-position center center
</style>
