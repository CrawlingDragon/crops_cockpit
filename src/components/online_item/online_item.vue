<template>
  <!-- 网院网诊的单个li -->
  <div class="online_item-container">
    <div class="icon"></div>
    <div class="text">
      <div class="time">
        {{ item.title }}
        <span style="margin-left :20px">{{ item.showtime }}</span>
      </div>
      <p class="p1">
        {{ item.content }}
      </p>
    </div>
    <div class="answer">
      <div class="p2">回复数：{{ item.replies }}</div>
      <el-image
        fit="cover"
        :src="item.thumb_pic"
        class="img"
        v-if="item.thumb_pic"
      ></el-image>
    </div>
  </div>
</template>
<script>
export default {
  name: "online_item",
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
  computed: {},
  watch: {},
  mounted() {},
  destroyed() {},
  methods: {}
};
</script>
<style lang="stylus" scoped>
.online_item-container
  padding-bottom 155px
  max-height 690px
  padding 0 40px
  & > li
    background rgba(9, 29, 67, 0.4)
    border 1px solid rgba(255, 255, 255, 0.2)
    margin-bottom 11px
    display flex
    padding 22px
    height 220px
    cursor pointer
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
      .time
        color #B5B5B5
        font-size 24px
        margin-bottom 15px
      .p1
        font-size 30px
        font-weight 400
        line-height 1.4
        overflow hidden
        text-overflow ellipsis
        display -webkit-box
        -webkit-line-clamp 3
        -webkit-box-orient vertical
    .answer
      font-size 24px
      color #B5B5B5
      margin-left 100px
      .p2
        margin-bottom 38px
        line-height 1.2
      .img
        width 110px
        height 110px
</style>
