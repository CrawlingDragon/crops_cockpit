<template>
  <!--  扫一扫组件 -->
  <div class="scanCodes">
    <div class="head" @click.stop="toPre()">
      <div class="closeFn"></div>
      <div class="head-title">
        {{ title }}
      </div>
    </div>
    <el-image :src="url" class="er_wei_ma"></el-image>
  </div>
</template>
<script>
export default {
  props: ["codeBoxFlaw", "url", "title"],
  data() {
    return {};
  },
  methods: {
    toPre() {
      this.$emit("changeFlaw", false);
    }
  }
};
</script>
<style lang="stylus" scoped>
.scanCodes
  padding 0 40px
  position fixed
  left 0
  right 0
  bottom 0
  top 0
  background #080f3e
  z-index 999999
  .head
    display flex
    align-items center
    height 100px
    max-width 1900px
    min-width 1340px
    margin 0 auto
    cursor pointer
    .closeFn
      height 30px
      width 30px
      background url("../../assets/61.png")
      background-size 100%
    .head-title
      margin-left 30px
      font-size 30px
      font-weight 400
      color #7FB5F1
  .er_wei_ma
      height 500px
      width 500px
      // background url("./channel_scan.png") no-repeat
      background-size 100%
      position absolute
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
      margin:auto;
      background-color #C5C5C5
</style>
