<template>
  <ul class="item-wrap">
    <li v-for="item in 6" :key="item">
      <div class="title">黄泽黄桃专科医院 拷贝 30</div>
      <div v-for="item in 3" :key="item" class="num-item">
        <p class="p1">专家</p>
        <p class="p2">999</p>
      </div>
    </li>
  </ul>
</template>
<script>
export default {
  name: "component_name",
  components: {},
  props: {
    title: {
      type: String,
      default: ""
    },
    items: {
      type: String,
      default: function() {
        return []
      }
    }
  },
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
.item-wrap
  text-align left
  li
    display inline-block
    background rgba(35, 147, 221, 0.5)
    width 420px
    height 190px
    margin-right 15px
    color #fff
    font-family SimHei
    padding 30px 5px 30px 31px
    margin-bottom 15px
    &.other
      background rgba(1, 217, 173, 0.5)
    &:nth-child(4n)
      margin-right 0
    .title
      font-size 38px
      overflow hidden
      text-overflow ellipsis
      white-space nowrap
      line-height 1.2
      margin-bottom 10px
    .num-item
      display inline-block
      width 33.33%
      line-height 1.2
      & > p
        font-size 30px
        color #CDCDCD
</style>
