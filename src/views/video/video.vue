<template>
  <div class="video-container">
    <Header title="培训视频"></Header>
    <div class="tab-bar">
      <div
        class="item"
        v-for="(item, index) in menu"
        :key="item.catid"
        @click="changeVideo(index, item.catid)"
        :class="{ active: active == index }"
      >
        {{ item.catname }}
      </div>
    </div>
    <ul class="video-ul">
      <li
        v-for="item in list"
        :key="item.id"
        @click="goToVideoDetail(item.id, item.catid)"
      >
        <el-image class="img" fit="cover" :src="item.thumb"></el-image>
        <p class="p1">{{ item.title }}</p>
      </li>
    </ul>
    <div class="result-num">共{{ maxitem }}个结果</div>
  </div>
</template>
<script>
import Header from "@/components/online_hospital_header/online_hospital_header";
import { mapState } from "vuex";

export default {
  name: "videos",
  components: { Header },
  props: {},
  data() {
    return {
      list: [],
      active: 0,
      menu: [],
      maxitem: 0
    };
  },
  computed: {
    ...mapState(["appId"])
  },
  watch: {},
  mounted() {
    this.getVideoList();
    this.gerVideoMenu();
  },
  destroyed() {},
  methods: {
    gerVideoMenu() {
      this.$axios
        .fetchPost("/Home/Video/GetVideoMenu", { appId: this.appId })
        .then(res => {
          if (res.data.code == 200) {
            this.menu = res.data.data;
          }
        });
    },
    changeVideo(num, catid) {
      this.active = num;
      this.getVideoList(catid);
    },
    getVideoList(catid) {
      // 获取视频列表
      this.$axios
        .fetchPost("/Home/Video/GetVideoList", {
          appId: this.appId,
          catid: catid
        })
        .then(res => {
          if (res.data.code == 200) {
            this.list = res.data.data;
            this.maxitem = res.data.maxitem;
          }
        });
    },
    goToVideoDetail(id, catid) {
      // 点击进入视频详情页
      this.$router.push({
        path: "/video_detail",
        query: { id: id, catid: catid }
      });
    }
  }
};
</script>
<style lang="stylus" scoped>
.video-container
  padding-top 100px
  .video-ul
    margin 70px 90px 0
    text-align left
    & > li
      width 409px
      height 300px
      margin-right 30px
      display inline-block
      position relative
      margin-bottom 20px
      cursor pointer
      &:nth-child(4n+0)
        margin-right 0
      &:hover
        outline 3px solid #FF6600
        box-sizing border-box
        box-shadow 0px 1px 26px #f60
      .img
        width 100%
        height 100%
      .p1
        position absolute
        left 0
        bottom 0
        width 100%
        height 60px
        background url('./text-bj.png') no-repeat
        background-position center
        background-size 100% 100%
        font-size 32px
        color #FFFFFF
        line-height 75px
        padding-left 30px
        overflow hidden
        text-overflow ellipsis
        white-space nowrap
  .result-num
    padding 30px 90px 50px
    text-align left
    font-size 30px
    color #B5B5B5
.tab-bar
  text-align center
  & > .item
    display inline-block
    font-size 30px
    color #C5C5C5
    padding 0 10px 10px
    margin-right 50px
    cursor pointer
    &.active
      color #ff6600
      border-bottom 1px solid #ff6600
</style>
