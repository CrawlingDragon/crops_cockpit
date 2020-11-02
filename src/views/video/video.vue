<template>
  <div class="video-container">
    <Header title="培训视频"></Header>
    <ul class="video-ul">
      <li v-for="item in list" :key="item.id" @click="goToVideoDetail(item.id,item.catid)">
        <el-image class="img" fit="cover" :src="item.thumb"></el-image>
        <p class="p1">{{item.title}}</p>
      </li>
    </ul>
    <div class="result-num">共{{list.length}}个结果</div>
  </div>
</template>
<script>
import Header from "@/components/headers/headers";
import { mapState } from "vuex";

export default {
  name: "videos",
  components: { Header },
  props: {},
  data() {
    return {
      list: [],
    };
  },
  computed: {
    ...mapState(["appId"]),
  },
  watch: {},
  mounted() {
    this.getVideoList();
  },
  destroyed() {},
  methods: {
    getVideoList() {
      // 获取视频列表
      this.$axios
        .fetchPost("/Home/Video/GetVideoList", { appId: this.appId })
        .then((res) => {
          if (res.data.code == 200) {
            this.list = res.data.data;
          }
        });
    },
    goToVideoDetail(id, catid) {
      // 点击进入视频详情页
      this.$router.push({
        path: "/video_detail",
        query: { id: id, catid: catid },
      });
    },
  },
};
</script>
<style lang="stylus" scoped>
.video-container
  .video-ul
    margin 40px 90px 0
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
</style>
