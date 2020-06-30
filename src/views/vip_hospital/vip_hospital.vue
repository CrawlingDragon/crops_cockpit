<template>
  <div class="vip-hospital-container">
    <Header title="会员：134*****7220"></Header>
    <div class="nav">
      <div class="item">网诊</div>
      <div class="item active">TA加入的医院</div>
    </div>
    <ul class="vip-h-ul">
      <li v-for="item in 9" :key="item">
        <div class="h-name">黄泽黄桃专科医院</div>
        <div class="box">
          <div class="left">
            专家
            <br />9999
          </div>
          <div class="left">
            专家
            <br />9999
          </div>
          <div class="left">
            专家
            <br />9999
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>
<script>
import Header from "@/components/headers/headers"
export default {
  name: "vip_hospital",
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
.vip-hospital-container
  .nav
    border-bottom 2px solid rgba(255, 255, 255, 0.2)
    margin 0 90px
    text-emphasis center
    .item
      padding 0 35px 11px
      font-size 40px
      color #C5C5C5
      display inline-block
      cursor pointer
      margin-right 40px
      &.active
        border-bottom 4px solid #FF6500
        color #fff
  .vip-h-ul
    text-align left
    margin 100px 90px 0
    li
      display inline-block
      width 420px
      height 190px
      background rgba(35, 147, 221, 0.5)
      margin-right 15px
      padding 25px 31px
      margin-bottom 15px
      &.blue
        background rgba(35, 147, 221, 0.5)
      &.green
        background #01D9AD
      &:nth-child(4n)
        margin-right 0
      .h-name
        font-size 38px
        color #FFFFFF
      .box
        display flex
        padding-top 11px
        .left
          width 33.33%
          font-size 28px
          color #CDCDCD
          line-height 1.2
</style>
