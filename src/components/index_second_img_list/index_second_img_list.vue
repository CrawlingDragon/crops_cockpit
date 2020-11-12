<template>
  <div class="index_second_img_list">
    <ul>
      <li>
        <img :src="expert.avatar" alt="" />
        <div class="tip"><span>专家</span></div>
        <div class="text-bar">{{ expert.realname }}</div>
      </li>
      <li>
        <img :src="video.thumb" alt="" />
        <div class="tip"><span>培训视频</span></div>
      </li>
      <li>
        <img :src="goods.thumb" alt="" />
        <div class="tip"><span>NEW</span></div>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  name: "index_second_img_list",
  components: {},
  props: {
    expert: {
      type: Object,
      default: function() {
        return {};
      }
    },
    video: {
      type: Object,
      default: function() {
        return {};
      }
    },
    goods: {
      type: Object,
      default: function() {
        return {};
      }
    }
  },
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
