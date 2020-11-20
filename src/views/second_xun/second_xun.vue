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
        @click="goToDetail(item.id)"
      >
        <div class="icon"></div>
        <div class="text">
          <div class="time">{{ item.title }}</div>
          <div class="p1">
            {{ item.content }}
          </div>
          <div class="p1">{{ item.showtime }}</div>
          <div class="p1">{{ item.describe }}</div>
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
      <p v-if="loading">加载中...</p>
      <p v-if="noMore">没有更多了</p>
    </ul>
  </div>
</template>
<script>
import { mapState } from "vuex";
export default {
  name: "second_zuo",
  components: {},
  props: {},
  data() {
    return {
      list: [],
      page: 0,
      loading: false,
      noMore: false
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
          .fetchGet("/Home/Treatment/GetWenzhenList", {
            page: this.page,
            appId: this.appId,
            type: "2",
            purview: this.purview == (3 || 4) ? 1 : 0
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
    },
    goToDetail(id) {
      this.$router.push({
        path: "/xunzhen_detail",
        query: { tid: id }
      });
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
</style>
