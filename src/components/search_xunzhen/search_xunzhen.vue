<template>
  <div class="search-xun" @click="goToZuoZhenXunzhen(item)">
    <div
      class="icon"
      :class="{
        zuozhen: iszuozhen == 'zuozhen',
        xunzhen: iszuozhen == 'xunzhen'
      }"
    ></div>
    <div class="text">
      <div class="time">{{ item.company }}·{{ item.title }}</div>
      <div class="p1 content-p1">
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
  </div>
</template>
<script>
import { mapMutations } from "vuex";

export default {
  name: "search_xunzhen",
  components: {},
  props: {
    item: {
      type: Object,
      default: function() {
        return {};
      }
    },
    iszuozhen: {
      type: String,
      default: "zuozhen"
    }
  },
  data() {
    return {};
  },
  computed: {},
  watch: {},
  mounted() {},
  destroyed() {},
  methods: {
    ...mapMutations(["setIsLowerHospital"]),
    goToZuoZhenXunzhen(item) {
      this.setIsLowerHospital("true");
      if (this.iszuozhen == "zuozhen") {
        const route2 = this.$router.resolve({
          path: "/zuozhen_detail",
          query: { tid: item.id, from: "adminRoute" }
        });
        window.open(route2.href, "_blank");
        // this.$router.push({
        //   path: "/zuozhen_detail",
        //   query: { tid: item.id }
        // });
      } else {
        const route3 = this.$router.resolve({
          path: "/xunzhen_detail",
          query: { tid: item.id, from: "adminRoute" }
        });
        window.open(route3.href, "_blank");
        // this.$router.push({
        //   path: "/xunzhen_detail",
        //   query: { tid: item.id }
        // });
      }
    }
  }
};
</script>
<style lang="stylus" scoped>
.search-xun
  background rgba(9, 29, 67, 0.4)
  border 1px solid rgba(255, 255, 255, 0.2)
  margin-bottom 11px
  display flex
  padding 22px
  height 220px
  & > .icon
    width 30px
    height 40px
    margin-right 30px
    &.zuozhen
      background url('../../assets/image/zuozhen.png')no-repeat
      background-position center
      background-size 100%
    &.xunzhen
      background url('../../assets/image/xunzhen.png') no-repeat
      background-position center
      background-size 100%
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
    .content-p1
      width 680px
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
</style>
