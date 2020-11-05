<template>
  <div class="second_wang-container">
    <ul class="wang-ul">
      <li v-for="item in 6" :key="item">
        <div class="icon"></div>
        <div class="text">
          <div class="time">范冰冰的水稻提问 2017-05-27 12:00</div>
          <p
            class="p1"
          >机插秧田，插秧后7天，追肥尿素15斤/亩，拌除草剂苄-乙，昨天下过大雨，田间水位上升许多，今天发现水深的地方成片心叶滞长，拌除草剂苄-乙，昨天下过大雨，田间水位上升许多，请教各位老师这是不是除草剂的危害，有什么办法缓解？有什么是不是除草剂的危害，有什么办法缓解？有什么是不是除草剂的危害，有什么办法缓解？有什么是不是除草剂的危害，有什么办法缓解？有什么办法缓解？有什</p>
        </div>
        <div class="answer">
          <div class="p2">回复数：4</div>
          <el-image fit="cover" src class="img"></el-image>
        </div>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  name: "second_wang",
  components: {},
  props: {},
  data() {
    return {}
  },
  computed: {},
  watch: {},
  mounted() {},
  destroyed() {},
  methods: {}
}
</script>
<style lang="stylus" scoped>
.second_wang-container
  min-height 724px
  .wang-ul
    margin 48px 90px 0
    & > li
      background rgba(9, 29, 67, 0.4)
      border 1px solid rgba(255, 255, 255, 0.2)
      margin-bottom 11px
      display flex
      padding 22px
      height 220px
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
        overflow hidden
        text-overflow ellipsis
        display -webkit-box
        -webkit-line-clamp 3
        -webkit-box-orient vertical
        .time
          color #B5B5B5
          font-size 24px
          margin-bottom 15px
        .p1
          font-size 30px
          font-family SimHei
          font-weight 400
          line-height 1.4
          font-family SimHei
      .answer
        font-size 24px
        color #B5B5B5
        margin-left 50px
        .p2
          margin-bottom 38px
          line-height 1.2
        .img
          width 110px
          height 110px
</style>
