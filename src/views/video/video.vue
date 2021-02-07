<template>
  <div class="video-container">
    <Headers title="培训视频" v-if="from == 'general'"></Headers>
    <Header :title="title" midTitle="培训视频" v-else></Header>

    <!-- <div class="tab-bar">
      <div
        class="item"
        v-for="(item, index) in menu"
        :key="item.catid"
        @click="changeVideo(index, item.catid)"
        :class="{ active: active == index }"
        v-show="index == 0"
      >
        {{ item.catname }}
      </div>
    </div> -->
    <ul
      class="video-ul infinite-list container-wrap"
      v-infinite-scroll="load"
      style="overflow:auto;"
      infinite-scroll-disabled="disabled"
    >
      <li
        v-for="item in list"
        :key="item.id"
        class="infinite-list-item"
        @click="goToVideoDetail(item.id, item.catid)"
      >
        <el-image class="img" fit="cover" :src="item.thumb">
          <div slot="error" class="image-slot"></div>
          <div slot="placeholder" class="image-slot"></div>
        </el-image>
        <p class="p1">{{ item.title }}</p>
      </li>
      <p v-if="loading" class="p1">加载中...</p>
      <p v-if="noMore" class="p1">没有更多了</p>
    </ul>
    <div class="result-num">
      <div class="container-wrap">共{{ maxitem }}个结果</div>
    </div>
  </div>
</template>
<script>
import Header from "@/components/online_hospital_header/online_hospital_header";
import Headers from "@/components/general_hospital_header/general_hospital_header";
import { mapState } from "vuex";

export default {
  name: "videos",
  components: { Header, Headers },
  props: {},
  data() {
    return {
      list: [],
      active: 0,
      menu: [],
      maxitem: 0,
      page: 0,
      loading: false,
      noMore: false,
      title: "",
      from: this.$route.query.from
    };
  },
  computed: {
    ...mapState(["appId", "purview", "lowerHospital", "loginId"]),
    disabled() {
      return this.loading || this.noMore;
    }
  },
  watch: {},
  mounted() {
    // this.getVideoList();
    this.gerVideoMenu();
    this.title =
      this.purview == 3 || this.purview == 4 || this.purview == 46
        ? this.lowerHospital
        : "培训视频";
  },
  destroyed() {},
  methods: {
    load() {
      this.page += 1;
      this.loading = true;
      setTimeout(() => {
        this.$axios
          .fetchGet("/Home/Video/GetVideoList", {
            page: this.page,
            appId: this.from == "general" ? this.loginId : this.appId,
            catId: "99999999"
          })
          .then(res => {
            if (res.data.code == 200) {
              this.list = this.list.concat(res.data.data);
              this.loading = false;
              this.maxitem = res.data.maxitem;
              if (res.data.data.length == 0) {
                this.noMore = true;
              }
            } else {
              this.noMore = true;
            }
          });
      }, 1000);
    },
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
      // this.active = num;
      // this.getVideoList(catid);
    },
    getVideoList(catid) {
      // 获取视频列表
      this.$axios
        .fetchPost("/Home/Video/GetVideoList", {
          appId: this.appId,
          catId: catid,
          pageSize: 22
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
        query: { id: id, catid: catid, from: this.from }
      });
    }
  }
};
</script>
<style lang="stylus" scoped>
.video-container
  padding-top 100px
  .video-ul
    padding 0 40px
    text-align left
    max-width 1900px
    min-width 1340px
    margin 0 auto 0
    max-height 800px
    padding-bottom 151px
    padding-top 3px
    & > li
      width 348px
      height 300px
      margin-right 18px
      display inline-block
      position relative
      margin-bottom 20px
      cursor pointer
      &:nth-child(5n+0)
        margin-right 0
      &:hover
        outline 3px solid #FF6600
        box-sizing border-box
        box-shadow 0px 1px 26px #f60
      .img
        width 100%
        height 100%
        & > img
          display block
          width 100%
          background url('../../assets/65.png') no-repeat
          background-position center center
          background-size 80%
        .image-slot
          width 100%
          background url('../../assets/65.png') no-repeat
          background-position center center
          background-size 80%
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
    text-align left
    font-size 30px
    color #B5B5B5
    position fixed
    left 0
    right 0
    bottom 0
    height 100px
    background #080f3e
    .container-wrap
      padding 0 40px
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
.p1
  text-align center
  width 100%
@media screen and (max-width 1890px){
  .video-container .video-ul > li{
    width 236px
    height 236px
  }
}
</style>
