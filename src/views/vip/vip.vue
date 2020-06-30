<template>
  <div class="vip-container">
    <Header title="所有会员"></Header>
    <ul class="vip-ul">
      <li v-for="item in 15" :key="item">
        <el-image
          fit="cover"
          class="img"
          src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1592393196566&di=42937b71b560b0ca94636bb30bb42e74&imgtype=0&src=http%3A%2F%2Fdmimg.5054399.com%2Fallimg%2Fpkm%2Fpk%2F13.jpg"
        ></el-image>
        <div class="name">黄蓉</div>
      </li>
    </ul>
    <div class="result-num">共200个结果</div>
  </div>
</template>
<script>
import Header from "@/components/headers/headers"
export default {
  name: "vip",
  components: { Header },
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
.vip-container
  .vip-ul
    margin 20px 90px
    text-align left
    & > li
      width 235px
      height 335px
      display inline-block
      margin-right 62px
      margin-bottom 65px
      &:hover
        outline 3px solid #FF6600
        box-shadow 0px 1px 26px #f60
      &:nth-child(6n)
        margin-right 0
      .img
        width 235px
        height 235px
        display block
      .name
        height 100px
        text-align left
        box-sizing border-box
        padding-left 20px
        font-size 36px
        color #FFFFFF
        line-height 96px
        overflow hidden
        text-overflow ellipsis
        white-space nowrap
        border 2px solid rgba(255, 255, 255, 0.15)
        background rgba(0, 0, 0, 0)
  .result-num
    font-size 30px
    color #B5B5B5
    text-align left
    padding-left 90px
    padding-bottom 30px
</style>
