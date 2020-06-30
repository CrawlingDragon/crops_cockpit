<template>
  <!-- 下级医院 -->
  <div class="hospital-container">
    <Header title="下级医院"></Header>
    <div class="nav-top">
      <div class="item active">默认排序</div>
      <div class="item">综合排序</div>
      <div class="item">筛选</div>
    </div>
    <div class="hospital-box">
      <div class="address-list list1">
        <div class="item" v-for="item in 12" :key="item">全部</div>
      </div>
      <div class="address-list list2">
        <div class="item" v-for="item in 12" :key="item">全部</div>
      </div>
      <div class="box">
        <Item></Item>
      </div>
    </div>
    <div class="result-bum">共200个结果</div>
    <Nav></Nav>
  </div>
</template>
<script>
import Header from "@/components/headers/headers"
import Nav from "@/components/nav_list/nav_list"
import Item from "@/components/hospital_list_item/hospital_list_item"
export default {
  name: "hospital",
  components: { Header, Nav, Item },
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
.hospital-container
  .nav-top
    border-bottom 1px solid rgba(255, 255, 255, 0.2)
    margin 0 90px
    text-align center
    .item
      display inline-block
      padding 0px 40px 11px
      color #C5C5C5
      font-size 40px
      cursor pointer
      font-family SimHei
      &.active
        border-bottom 4px solid #FF6500
        color #FFFFFF
  .hospital-box
    .address-list
      text-align left
      margin 0 90px
      &.list1
        margin-top 50px
      &.list2
        margin-top 20px
      .item
        display inline-block
        margin-right 13px
        border 1px solid rgba(255, 255, 255, 0.2)
        background rgba(27, 57, 93, 0.4)
        padding 0 13px
        height 40px
        line-height 39px
        font-size 28px
        color #B5B5B5
        cursor pointer
        &:hover
          border 1px solid rgba(255, 255, 255, 1)
        &.active
          color #fff
          border 1px solid rgba(255, 255, 255, 1)
    .box
      margin 50px 90px 30px
  .result-bum
    margin 10px 90px
    color #B5B5B5
    font-size 30px
    text-align left
</style>
