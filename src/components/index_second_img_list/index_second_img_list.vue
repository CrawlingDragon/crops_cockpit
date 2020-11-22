<template>
  <div class="index_second_img_list">
    <ul>
      <li @click="goToExpert()">
        <img v-if="expert" :src="expert.avatar" alt="" />
        <div class="tip" v-if="expert"><span>专家</span></div>
        <div v-if="expert" class="text-bar">{{ expert.realname }}</div>
        <Empty v-if="!expert">
          <img src="./noData.png" alt="" />
        </Empty>
      </li>
      <li @click="goToVideoDetail(video.catid, video.id)">
        <img :src="video.thumb" alt="" v-if="video" />
        <div class="tip" v-if="video"><span>培训视频</span></div>
        <Empty v-if="!video">
          <img src="./noData.png" alt="" />
        </Empty>
      </li>
      <li @click="goToGoodsDetail(goods.id)">
        <img v-if="goods" :src="goods.thumb" alt="" />
        <div class="tip" v-if="goods"><span>NEW</span></div>
        <Empty v-if="!goods">
          <img src="./noData.png" alt="" />
        </Empty>
      </li>
    </ul>
  </div>
</template>
<script>
import Empty from "@/components/empty/empty";
export default {
  name: "index_second_img_list",
  components: { Empty },
  props: ["expert", "video", "goods"],
  data() {
    return {};
  },
  computed: {},
  watch: {},
  mounted() {},
  destroyed() {},
  methods: {
    goToExpert() {
      if (this.expert == undefined) {
        this.$layer.msg("暂无专家");
        return;
      }
      this.$router.push({
        path: "expert_detail",
        query: { uid: this.expert.uid }
      });
    },
    goToVideoDetail(catid, id) {
      this.$router.push({
        path: "video_detail",
        query: { catid: catid, id: id }
      });
    },
    goToGoodsDetail(id) {
      if (this.goods == "") {
        this.$layer.msg("暂无商品");
        return;
      }
      this.$router.push({
        path: "goods_detail",
        query: { id: id }
      });
    }
  }
};
</script>
<style lang="stylus" scoped>
.index_second_img_list
  ul
    display flex
    li
      width 360px
      position relative
      height 260px
      margin-right 10px
      &:first-child
        width 255px
      &:last-child
        width 255px
        margin-right 0
      img
        display block
        width 100%
        height 100%
      .tip
        position absolute
        top 0
        right 0
        width 81px
        height 71px
        background url('./52.png') no-repeat
        background-size 81px 71px
        span
          transform rotate(41deg)
          display block
          margin-left -8px
          margin-top 10px
          font-size 22px
          font-family SimHei
          width 100%
          height 100%
          font-size 18px
          line-height 18px
      .text-bar
        position absolute
        left 0
        right 0
        bottom 0
        height 47px
        text-indent 20px
        overflow hidden
        text-overflow ellipsis
        white-space nowrap
        word-break break-all
        font-size 28px
        color #fff
        text-align left
</style>
