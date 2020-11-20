<template>
  <div class="find_detail-container">
    <Header title="病虫害详情" :isWangzhen="true"></Header>
    <div
      class="left-bar"
      @click="goToOther('prev')"
      :class="{ disabled: detail.previous_page == '' }"
    >
      <div class="icon"></div>
      <div class="btn-p">上篇</div>
    </div>
    <div
      class="right-bar"
      @click="goToOther('next')"
      :class="{ disabled: detail.next_page == '' }"
    >
      <div class="icon"></div>
      <div class="btn-p">下篇</div>
    </div>
    <div class="container">
      <div class="h2">{{ detail.title }}</div>
      <div class="small-title">
        <span class="time" v-if="detail.copyfrom">{{ detail.copyfrom }}</span>
        {{ detail.inputtime }}
      </div>
      <div class="imgae-box">
        <div class="imgs" v-for="item in detail.picurl" :key="item">
          <el-image :src="item.url"></el-image>
        </div>
      </div>
      <div class="text" v-html="detail.content"></div>
    </div>
  </div>
</template>
<script>
import Header from "@/components/online_hospital_header/online_hospital_header";
import { mapState } from "vuex";
export default {
  name: "binchonghai_detail",
  components: { Header },
  props: {},
  data() {
    return {
      title: "",
      detail: "",
      catId: this.$route.query.catid, // 分类id
      Id: this.$route.query.id, // 新闻id
      from: this.$route.query.from
    };
  },
  computed: {
    ...mapState(["appId"])
  },
  watch: {
    catId() {
      this.from = this.$route.query.from;
      this.getDetail();
    },
    Id() {
      this.from = this.$route.query.from;
      this.getDetail();
    }
  },
  mounted() {
    this.getDetail();
  },
  destroyed() {},
  methods: {
    getDetail() {
      this.$axios
        .fetchPost("/Home/News/GetPushMessageDetail", {
          catId: this.catId,
          Id: this.Id,
          appId: this.from == "ad" ? this.appId : ""
        })
        .then(res => {
          if (res.data.code == 200) {
            this.detail = res.data.data;
            this.title = res.data.data.title;
          }
        });
    },
    goToOther(other) {
      if (other == "prev") {
        if (!this.detail.previous_page) {
          this.$layer.msg("已是第一篇");
          return;
        }
        this.catId = this.detail.previous_page.catid;
        this.Id = this.detail.previous_page.id;
      } else if (other == "next") {
        if (!this.detail.next_page) {
          this.$layer.msg("已是最后一篇");
          return;
        }
        this.catId = this.detail.next_page.catid;
        this.Id = this.detail.next_page.id;
      }
    }
  }
};
</script>
<style lang="stylus" scoped>
.find_detail-container
  width 1900px
  min-width 1340px
  margin 0 auto
  padding 100px 125px 100px
  position relative
  .left-bar
    position absolute
    left 40px
    top 300px
    cursor pointer
    .icon
      width 50px
      height 100px
      margin-bottom 20px
      background url('./21.png') no-repeat
      transform:rotate(180deg);
    .btn-p
      color #808596
      font-size 30px
    &.disabled
      .icon
        background url('./20.png') no-repeat
        transform:rotate(0);
        cursor default
      .btn-p
        color #2F3C5D
  .right-bar
    position absolute
    right 40px
    top 300px
    cursor pointer
    .icon
      width 50px
      height 100px
      margin-bottom 20px
      background url('./21.png') no-repeat
    .btn-p
      color #808596
      font-size 30px
    &.disabled
      .icon
        background url('./20.png') no-repeat
        transform:rotate(180deg);
      .btn-p
        color #2F3C5D
  .container
    position relative

    .h2
      font-size: 50px;
      color: #FFFFFF;
      text-align left
      margin-bottom 20px
    .small-title
      font-size: 24px;
      color #808080
      margin-bottom 30px
      text-align left
      .time
        margin-right 20px
    .text
      font-size 30px !important
      line-height 1.2
      text-align left
      background none !important
      /deep/span
        font-size 30px !important
        line-height 1.2
        background none !important
      /deep/p
        font-size 30px !important
        line-height 1.2
        background none !important
      /deep/img
        max-width 100%
        text-align center
        display block
        margin 0 auto
.imgae-box
  text-align center
  .imgs
    margin 10px auto
</style>
