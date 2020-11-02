<template>
  <div class="find-container">
    <Header title="发现"></Header>
    <div class="nav-bar">
      <div class="item" v-for="(item,index) in navList" :key="item.catid" :class="{'active':activeIndex == index}" @click="nav(item.catid,index)">
        <span class="active">{{item.catname}}</span>
      </div>
    </div>
    <ul class="infinite-list find-ul">
      <li v-for="item in list" class="infinite-list-item" :key="item.id">
        <div class="bj-wrap">
          <el-image :src="item.thumb" class="small-img" fit="cover">
            <div slot="error" class="image-slot">
              <div class="icon"></div>
            </div>
          </el-image>
          <div class="title-bar">{{item.title}}</div>
          <div class="text">
            {{item.copyfrom}}
            <span class="time">{{item.inputtime}}</span>
          </div>
        </div>
      </li>
    </ul>
    <Nav index="5"></Nav>
  </div>
</template>
<script>
import Header from "@/components/headers/headers";
import Nav from "@/components/nav_list/nav_list";
export default {
  name: "find",
  components: {
    Header,
    Nav,
  },
  props: {},
  data() {
    return {
      count: 0,
      navList: [],
      activeIndex: 0,
      initCatid: 0,
      list: [],
    };
  },
  computed: {},
  watch: {},
  mounted() {
    this.getNavList();
  },
  destroyed() {},
  methods: {
    getNavList(catId) {
      // 获取导航栏目
      this.$axios.fetchGet("/Home/News/GetPushMessageMenu").then((res) => {
        if (res.data.code == 200) {
          this.navList = res.data.data;
          this.initCatid = res.data.data[0].catid;
          setTimeout(() => {
            this.getList(this.initCatid);
          }, 100);
        }
      });
    },
    getList(catid) {
      // 获取列表数据
      this.$axios
        .fetchPost("/Home/News/GetPushMessageList", { catId: catid })
        .then((res) => {
          if (res.data.code == 200) {
            this.list = res.data.data;
          }
        });
    },
    nav(catid, index) {
      // 点击导航栏
      this.activeIndex = index;
      this.getList(catid);
    },
  },
};
</script>
<style lang="stylus" scoped>
.find-container
  .nav-bar
    margin 0 90px
    display flex
    border-bottom 1px solid rgba(255, 255, 255, 0.2)
    .item
      line-height 58px
      margin-right 34px
      text-align left
      cursor pointer
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
    margin 42px 0 20px
    padding 16px 90px 100px
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
</style>
