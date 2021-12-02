<template>
  <!-- 扩展栏目 => 资讯列表 -->
  <div class="info_lits_container">
    <div class="header">
      <HeadNav :lefttitle="this.leftTitle"></HeadNav>
    </div>
    <ul
      class="infinite-list find-ul"
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
          <el-image :src="iconImg" class="small-img" fit="cover">
            <div slot="error" class="image_error"></div>
            <div slot="placeholder" class="image_error"></div>
          </el-image>
          <div class="title-bar">{{ item.title }}</div>
          <div class="text">
            <span class="from" v-show="item.copyfrom">{{ item.copyfrom }}</span>
            <span class="time">{{ item.inputtime }}</span>
          </div>
        </div>
      </li>
      <p v-if="loading">加载中...</p>
      <p v-if="noMore">{{ noMoreText }}</p>
    </ul>
    <div class="expert_num">共{{ this.total }}条数据</div>
  </div>
</template>
<script>
import HeadNav from "../../components/head_nav/head_nav";
export default {
  name: "info_list",
  components: { HeadNav },
  props: {},
  data() {
    return {
      iconImg: require("./44.png"),
      leftTitle: "区域品牌",
      list: [],
      loading: false,
      noMore: false,
      total: 0,
      page: 0,
      noMoreText: "没有更多了"
    };
  },
  computed: {
    catId() {
      return this.$route.query.catId;
    },
    disabled() {
      return this.loading || this.noMore;
    }
  },
  watch: {},
  mounted() {
    this.load();
  },
  destroyed() {},
  methods: {
    load() {
      this.page += 1;
      this.loading = true;
      setTimeout(() => {
        this.$axios
          .fetchGet("/Home/News/GetPushMessageList", {
            catId: this.catId,
            page: this.page
          })
          .then(res => {
            if (res.data.code === "200") {
              this.list = this.list.concat(res.data.data);
              this.total = res.data.count;
              this.loading = false;
              if (this.page === 1 && res.data.data.length === 0) {
                this.noMoreText = "暂无数据";
              } else {
                this.noMoreText = "没有更多了";
              }
              if (res.data.data.length === 0) {
                this.noMore = true;
              }
            } else {
              this.noMore = true;
            }
          });
      }, 1000);
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
    }
  }
};
</script>
<style lang="stylus" scoped>
.info_lits_container
  height: 100%
.find-ul
  margin 42px 90px 20px
  padding 16px 40px 100px
  max-height 660px
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
        .from
          margin-right 20px
    &:nth-child(odd)
      .bj-wrap
        margin-right 10px
    &:nth-child(even)
      .bj-wrap
        margin-left 10px
.expert_num
  font-size 20px
  font-family MicrosoftYaHei
  font-weight Regular
  color #B5B5B5
  position fixed
  left 3%
  bottom 8%
::-webkit-scrollbar
  display none
</style>
