<template>
  <div class="online_list-wrap">
    <div class="title">最新网诊 ></div>
    <ul class="online-ul">
      <li v-for="item in list" :key="item.tid" @click="goToDetail">
      <li v-for="item in 5" :key="item">
        <div class="top">
          <span class="item-title">黄桂花的水稻水稻水稻问题</span>
          <span class="time">05-24 12:00</span>
        </div>
        <div class="text">南瓜开花结果都没问题，但就是长不 大，一般长的约10公分后就从瓜一般长的约10公分后就从瓜一般长的约10公分后就从瓜</div>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  name: "online_list",
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
<style lang="stylus" scoped>
.online_list-wrap
  text-align left
  .title
    font-size 32px
    margin-bottom 15px
    color #FFFDFD
    line-height 32px
  .online-ul
    border 2px solid #072F65
    border-left none
    border-bottom none
    li
      height 157px
      // border-bottom 2px solid #072F65
      background #061F50
      padding 20px
      cursor pointer
      position relative
      &:nth-child(1n)
        border-left 3px solid #17DAA4
      &:nth-child(2n)
        border-left 3px solid #E19129
      &:nth-child(3n)
        border-left 3px solid #EA365E
      &::after
        border-bottom 2px solid #072F65
        content ''
        position absolute
        left 0
        bottom 0
        right 0
      .top
        display flex
        color #808080
        margin-bottom 20px
        .item-title
          margin-right 26px
          font-size 28px
          line-height 30px
          flex 1
          width 0
          max-width 100%
          overflow hidden
          text-overflow ellipsis
          white-space nowrap
          word-break break-all
        .time
          width 140px
          font-size 21px
    .text
      width 100%
      overflow hidden
      text-overflow ellipsis
      display -webkit-box
      -webkit-box-orient vertical
      -webkit-line-clamp 2
      font-size 24px
      color #FFFDFD
      line-height 32px
</style>
