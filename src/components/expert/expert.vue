<template>
  <div class="expert-box" @click="goToExpertDetail(item.uid)">
    <el-image class="img" fit="cover" :src="item.avatar"></el-image>
    <div class="text">
      <div class="name">
        {{ item.realname }}
        <span>专家</span>
      </div>
      <p class="title">
        {{ item.position }}
      </p>
      <p class="time">加入时间：{{ item.jointime }}</p>
      <p class="goodat">擅长作物：{{ item.zuowu }}</p>
      <div class="bottom">
        <span style="margin-right:10px">处方（{{ item.chufangcount }}）</span>
        <span v-show="purview == 3"> 加入医院（{{ item.hospitalcount }}）</span>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState } from "vuex";

export default {
  name: "expert",
  components: {},
  props: {
    item: {
      type: Object,
      default: function() {
        return {};
      }
    }
  },
  data() {
    return {};
  },
  computed: {
    ...mapState(["purview"])
  },
  watch: {},
  mounted() {},
  destroyed() {},
  methods: {
    goToExpertDetail(uid) {
      // 到专家详情页
      this.$router.push({
        path: "/expert_detail",
        query: {
          uid: uid
        }
      });
    }
  }
};
</script>
<style lang="stylus" scoped>
.expert-box
  display flex
  .img
    width 235px
    height 235px
  .text
    flex 1
    min-width 0
    padding 25px 10px 0 30px
    text-align left
    .name
      font-size 40px
      color rgba(255, 255, 255, 1)
      font-size 40px
      margin-bottom 10px
      span
        width 95px
        height 38px
        background rgba(255, 102, 0, 1)
        border-radius 19px
        font-size 24px
        display inline-block
        text-align center
        line-height 38px
        margin-left 10px
        vertical-align middle
    .title, .time
      color #808080
      font-size 24px
      line-height 1.2
      margin-bottom 5px
    .goodat, .bottom
      font-size 24px
      line-height 1.2
      color #fff
      margin-bottom 5px
    .goodat
      overflow hidden
      text-overflow ellipsis
      white-space nowrap
      word-break break-all
</style>
