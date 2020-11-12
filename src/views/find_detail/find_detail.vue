<template>
<<<<<<< HEAD
  <div class="find_detail-container">
    <Header title="资讯详情"></Header>
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
      <div class="h2">{{ detail.title }} 字法”</div>
      <div class="small-title">
        <span class="time" v-if="detail.copyfrom">{{ detail.copyfrom }}</span>
        {{ detail.inputtime }}
      </div>
      <div class="text" v-html="detail.content"></div>
    </div>
  </div>
</template>
<script>
import Header from "@/components/online_hospital_header/online_hospital_header";
export default {
  name: "find_detail",
  components: { Header },
  props: {},
  data() {
    return {
      detail: "",
      catId: this.$route.query.catid, // 分类id
      Id: this.$route.query.id // 新闻id
    };
  },
  computed: {},
  watch: {},
  mounted() {
    this.getDetail();
  },
  destroyed() {},
  methods: {
    getDetail() {
      this.$axios
        .fetchPost("/Home/News/GetPushMessageDetail", {
          catId: this.catId,
          Id: this.Id
        })
        .then(res => {
          if (res.data.code == 200) {
            this.detail = res.data.data;
          }
        });
    },
    goToOther(other) {
      if (other == "prev") {
        if (!this.detail.previous_page) return;
        this.$router.push({
          path: "find_detail",
          query: {
            catid: this.detail.previous_page.catid,
            id: this.detail.previous_page.id
          }
        });
      } else if (other == "nexr") {
        if (!this.detail.next_page) return;
        this.$router.push({
          path: "find_detail",
          query: {
            catid: this.detail.next_page.catid,
            id: this.detail.next_page.id
          }
        });
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
      background url('./20.png') no-repeat
    .btn-p
      color #808596
      font-size 30px
    &.disabled
      .icon
        background url('./20.png') no-repeat
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
        background url('./21.png') no-repeat
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
      img
        max-width 100%
</style>
=======
  <div class="find_detail-container">find_detail</div>
</template>
<script>
export default {
  name: "find_detail",
  components: {},
  props: {},
  data() {
    return {};
  },
  computed: {},
  watch: {},
  mounted() {},
  destroyed() {},
  methods: {}
};
</script>
<style lang="stylus" scoped></style>
>>>>>>> dev_xiaobai
