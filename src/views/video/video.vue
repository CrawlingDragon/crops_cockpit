<template>
  <div class="video-container">
    <Header title="培训视频"></Header>
    <ul class="video-ul">
      <li v-for="item in 9" :key="item">
        <el-image
          class="img"
          fit="cover"
          src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1592385225255&di=818c8674ea3d109b531adbce5ed4cfd3&imgtype=0&src=http%3A%2F%2Ft9.baidu.com%2Fit%2Fu%3D583874135%2C70653437%26fm%3D79%26app%3D86%26f%3DJPEG%3Fw%3D3607%26h%3D2408"
        ></el-image>
        <p class="p1">沟金针虫</p>
      </li>
    </ul>
    <div class="result-num">共200个结果</div>
  </div>
</template>
<script>
import Header from "@/components/headers/headers"
export default {
  name: "videos",
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
.video-container
  .video-ul
    margin 40px 90px 0
    text-align left
    & > li
      width 409px
      height 300px
      margin-right 30px
      display inline-block
      position relative
      margin-bottom 20px
      &:nth-child(4n+0)
        margin-right 0
      &:hover
        outline 3px solid #FF6600
        box-sizing border-box
        box-shadow 0px 1px 26px #f60
      .img
        width 100%
        height 100%
      .p1
        position absolute
        left 0
        bottom 0
        width 100%
        height 60px
        background url('./text-bj.png') no-repeat
        background-position center
        background-size center
        font-size 32px
        color #FFFFFF
        line-height 75px
        padding-left 30px
        overflow hidden
        text-overflow ellipsis
        white-space nowrap
  .result-num
    padding 30px 90px 50px
    text-align left
    font-size 30px
    color #B5B5B5
</style>
