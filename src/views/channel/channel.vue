<template>
  <div class="channel-container">
    <headers
      title="浙江省网上庄稼医院"
      logoSrc="https://t7.baidu.com/it/u=3204887199,3790688592&fm=79&app=86&size=h300&n=0&g=4n&f=jpeg?sec=1592979933&t=aba69622567ff8b287355bc1e1e4c037"
    ></headers>
    <ul class="channel-ul">
      <li class="langer li1">
        <div class="icon i1"></div>
        <p>网诊</p>
      </li>
      <li class="li2">
        <div class="icon i2"></div>
        <p>坐诊</p>
      </li>
      <li class="li3">
        <div class="icon i3"></div>
        <p>巡诊</p>
      </li>
      <li class="no-icon">
        <p>医院本级</p>
      </li>
      <li class="no-icon">
        <p>农资商品</p>
      </li>
      <li class="langer li4">
        <div class="icon i4"></div>
        <p>测土配方</p>
      </li>
      <li class="li5">
        <div class="icon i5"></div>
        <p>专家</p>
      </li>
      <li class="li6">
        <div class="icon i6"></div>
        <p>会员</p>
      </li>
      <li class="no-icon">
        <p>资讯</p>
      </li>
      <li class="no-icon">
        <p>病虫害图库</p>
      </li>
      <li class="langer li7">
        <div class="icon i7"></div>
        <p>下级医院</p>
      </li>
      <li class="li8">
        <div class="icon i8"></div>
        <p>搜索</p>
      </li>
      <li class="li9">
        <div class="icon i9">二维码</div>
      </li>
      <li class="no-icon">
        <p>培训视频</p>
      </li>
      <li class="no-icon">
        <p>已下载的视频</p>
      </li>
    </ul>
    <Nav></Nav>
  </div>
</template>
<script>
import headers from "@/components/headers/headers"
import Nav from "@/components/nav_list/nav_list"
export default {
  name: "channel",
  components: { headers, Nav },
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
.channel-container
  .channel-ul
    margin 20px 88px
    text-align left
    display flex
    flex-wrap wrap
    li
      height 230px
      margin-bottom 12px
      margin-right 10px
      align-items center
      justify-content space-around
      width 280px
      box-sizing border-box
      display flex
      font-size 36px
      color #FFFFFF
      cursor pointer
      &:hover
        outline 3px solid #FF6600
        box-shadow 0px 1px 26px #f60
      &:nth-child(5n)
        margin-right 0
      &.langer
        width 568px
      &.no-icon
        background #091D43
        border 2px solid rgba(7, 47, 101, 1)
        color #CDCDCD
      &.li1
        background #2393DD
        .icon
          width 80px
          height 95px
          background url('./9.png') no-repeat
          background-size 100%
          background-position center
      &.li2
        background #D93165
        .icon
          width 80px
          height 95px
          background url('./10.png') no-repeat
          background-size 100%
          background-position center
      &.li3
        background #7B6FF9
        .icon
          width 80px
          height 95px
          background url('./11.png') no-repeat
          background-size 100%
          background-position center
      &.li4
        background #01D9AD
        .icon
          width 80px
          height 95px
          background url('./14.png') no-repeat
          background-size 100%
          background-position center
      &.li5
        background #FF6500
        .icon
          width 96px
          height 96px
          background url('./12.png') no-repeat
          background-size 100%
          background-position center
      &.li6
        background #EBB701
        .icon
          width 80px
          height 95px
          background url('./13.png') no-repeat
          background-size 100%
          background-position center
      &.li7
        background #EBB701
        .icon
          width 75px
          height 75px
          background url('./15.png') no-repeat
          background-size 100%
          background-position center
      &.li8
        background #D93165
        width 330px
        .icon
          width 90px
          height 90px
          background url('./16.png') no-repeat
          background-size 100%
          background-position center
      &.li9
        width 230px
</style>
