<template>
  <div class="cetu_list-container">
    <div class="title">测土配方记录 ></div>
    <ul class="cetu-ul">
      <li v-for="item in 3" :key="item">
        <p class="p1">黄桂花的番茄地</p>
        <p class="p2">ID：12331452</p>
        <p class="p2">取样日期：2017-05-27</p>
        <div class="icon"></div>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  name: "cetu_list",
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
.cetu_list-container
  text-align left
  .title
    font-size 32px
    line-height 32px
    margin-bottom 15px
    cursor pointer
  .cetu-ul
    border 2px solid #072F65
    border-left none
    border-bottom none
    li
      height 157px
      border-bottom 2px solid #072F65
      background #061F50
      padding 20px
      cursor pointer
      position relative
      &:first-child
        border-left 3px solid #17DAA4
      &:nth-child(2)
        border-left 3px solid #E19129
      &:last-child
        border-left 3px solid #EA365E
      .p1
        font-size 28px
        line-height 28px
        margin-bottom 15px
        color #FFFDFD
      .p2
        font-size 24px
        color #808080
        margin-bottom 15px
        line-height 24px
      .icon
        width 40px
        height 40px
        right 20px
        bottom 35px
        position absolute
</style>
