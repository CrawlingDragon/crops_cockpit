<template>
  <div class="diagnosis-container">
    <Header title="诊疗"></Header>
    <div class="nav-top">
      <div class="item active">
        测土配方
        <span>(24)</span>
      </div>
      <div class="item">
        网诊
        <span>(24)</span>
      </div>
      <div class="item">
        坐诊
        <span>(24)</span>
      </div>
      <div class="item">
        巡诊
        <span>(24)</span>
      </div>
    </div>
    <router-view></router-view>
    <Nav index="4"></Nav>
  </div>
</template>
<script>
import Header from "@/components/headers/headers"
import Nav from "@/components/nav_list/nav_list"
export default {
  name: "diagnosis",
  components: { Header, Nav },
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
.diagnosis-container
  .nav-top
    margin 0 90px
    border-bottom 1px solid rgba(255, 255, 255, 0.2)
    & > .item
      padding 5px 30px
      display inline-block
      font-size 44px
      color #C5C5C5
      cursor pointer
      &.active
        color #fff
        border-bottom 4px solid #FF6500
      span
        font-size 24px
        color #C5C5C5
</style>
