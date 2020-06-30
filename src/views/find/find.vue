<template>
  <div class="find-container">
    <Header title="发现"></Header>
    <div class="nav-bar">
      <div class="item">
        <span class="active">资讯</span>
      </div>
      <div class="item">
        <span>蔬菜虫害</span>
      </div>
      <div class="item">
        <span>蔬菜病害</span>
      </div>
      <div class="item">
        <span>果树虫害</span>
      </div>
      <div class="item">
        <span>果树病害</span>
      </div>
      <div class="item">
        <span>经济作物虫害</span>
      </div>
      <div class="item">
        <span>经济作物病害</span>
      </div>
      <div class="item">
        <span>粮食作物虫害</span>
      </div>
      <div class="item">
        <span>粮食作物病害</span>
      </div>
      <div class="item">
        <span>杂草识别</span>
      </div>
    </div>
    <ul class="infinite-list find-ul" v-infinite-scroll="load" style="overflow:auto;height:698px">
      <li v-for="i in count" class="infinite-list-item" :key="i">
        <div class="bj-wrap">
          <div class="title-bar">中华全国供销合作总社原副主任、党组副书记李春生 莅临参观杭州市网上庄稼...</div>
          <div class="text">
            中国农业新闻网-农民日报
            <span class="time">2017-8-23 09:08:56</span>
          </div>
        </div>
      </li>
    </ul>
    <Nav></Nav>
  </div>
</template>
<script>
import Header from "@/components/headers/headers"
import Nav from "@/components/nav_list/nav_list"
export default {
  name: "find",
  components: {
    Header,
    Nav
  },
  props: {},
  data() {
    return {
      count: 0
    }
  },
  computed: {},
  watch: {},
  mounted() {},
  destroyed() {},
  methods: {
    load() {
      this.count += 2
    }
  }
}
</script>
<style lang="stylus" scoped>
.find-container
  .nav-bar
    margin 0 90px
    display flex
    border-bottom 1px solid rgba(255, 255, 255, 0.2)
    .item
      flex 1
      line-height 58px
      margin-right 34px
      text-align left
      cursor pointer
      &:hover
        span
          border-bottom 4px solid #FF6600
      span
        padding 0 12px
        height 100%
        display inline-block
        &.active
          border-bottom 4px solid #FF6600
  .find-ul
    height 698px
    margin 42px 0 20px
    padding 16px 90px 0
    & > li
      display inline-block
      width 50%
      height 200px
      margin-bottom 20px
      padding-top 3px
      .bj-wrap
        cursor pointer
        background rgba(9, 29, 68, 1)
        border 1px solid rgba(255, 255, 255, 0.2)
        height 100%
        padding-left 80px
        padding-top 12px
        padding-right 44px
        background url('./44.png') no-repeat
        background-size 30px 35px
        background-position 28px 22px
        &:hover
          outline 3px solid #FF6600
          box-shadow 0px 1px 26px #f60
        .title-bar
          font-size 36px
          color #FFFFFF
          line-height 50px
          font-family SimHei
          text-align left
          height 100px
          overflow hidden
          text-overflow ellipsis
          display -webkit-box
          -webkit-box-orient vertical
          -webkit-line-clamp 2
          margin-bottom 30px
        .text
          text-align left
          color #808080
          font-size 24px
          span
            margin-left 34px
      &:nth-child(odd)
        .bj-wrap
          margin-right 10px
      &:nth-child(even)
        .bj-wrap
          margin-left 10px
</style>
