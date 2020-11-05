<template>
  <div class="second_wang-container">
    <ul
      class="wang-ul infinite-list"
      v-infinite-scroll="load"
      style="overflow:auto;"
      infinite-scroll-disabled="disabled"
    >
      <li v-for="item in list" :key="item.tid" class="infinite-list-item">
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
          <el-image
            fit="cover"
            :src="item.thumb_pic"
            class="img"
            v-if="item.thumb_pic"
          ></el-image>
        </div>
      </li>
      <p v-if="loading">加载中...</p>
      <p v-if="noMore">没有更多了</p>
    </ul>
    <Nav :number="count"></Nav>
  </div>
</template>
<script>
import Nav from "@/components/nav_list/nav_list";
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
      count: 0
    };
  },
  computed: {
    ...mapState(["appId"]),
    disabled() {
      return this.loading || this.noMore;
    }
  },
  watch: {},
  mounted() {},
  destroyed() {},
  methods: {
    load() {
      this.page += 1;
      this.loading = true;
      setTimeout(() => {
        this.$axios
          .fetchPost("/Home/Treatment/GetWenList", {
            page: this.page,
            appId: this.appId
          })
          .then(res => {
            if (res.data.code == 200) {
              this.list = this.list.concat(res.data.data);
              this.loading = false;
              this.count = res.data.count;
              if (res.data.data.length == 0) {
                this.noMore = true;
              }
            } else {
              this.noMore = true;
            }
          });
      }, 1000);
    }
  }
};
</script>
<style lang="stylus" scoped>
.second_wang-container
  max-width 1900px
  margin 0 auto
  height 100%
  max-height 100%
  overflow hidden
  .wang-ul
    padding-bottom 155px
    max-height 690px
    padding 0 40px
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
</style>
