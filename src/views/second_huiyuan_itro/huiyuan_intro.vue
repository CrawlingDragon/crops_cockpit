<template>
    <div class="jianjie">
        <div class="left">
            <el-image class="img" fit="cover" src=""></el-image>
        </div>
        <div class="right">
            <div class="name">
                <span>黄莲蓉</span>
                <span>ID:1234567890</span>
            </div>
            <div class="right_left">
                <span class="text1">手机：15236985245</span>
                <span class="text1">村名：青塘村</span>
                <span class="text1">加入时间：2017-05-28</span>
                <span class="text1">种养种类：</span>
                <p class="kinds">番茄 2亩 水稻 3亩 番茄 2亩 水稻 3亩 番茄 2亩 水稻 3亩
                    番茄 2亩 水稻 3亩 番茄 2亩 水稻 3亩番茄 2亩 水稻 3亩
                </p>
            </div>
            <div class="right_right">
                <span class="text2">订单：5</span>
                <span class="text2">测土配方：5</span>
                <span class="text2">问答：5</span>
                <span class="text2">处方：5</span>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    
}
</script>
<style lang="stylus" scoped>
  .jianjie
    margin 0 40px
    position relative
    .left
      width 320px
      margin-right 50px
      .img
        width 320px
        height 320px
      .p1, .p2
        font-size 28px
        color rgba(181, 181, 181, 1)
        margin-bottom 10px
    .right
      position absolute
      top 0px
      left 369px
      font-size 30px
      font-family  MicrosoftYaHei
      color #B5B5B5
      .name
        font-size 40px
        color #fff
        margin-bottom 35px
     .right_left
        position absolute
        left 0px
        width 400px
        height 589px
        text-align left         
        .text1
          display inline-block
          line-height 70px
        .kinds
          line-height 70px
          width 260px
          position absolute
          right 0px
          top 210px
     .right_right
          position absolute
          text-align left
          left 759px
          width 168px
          height 240px
        .text2
          display inline-block
          line-height 70px
  .content2
    margin-top 100px
</style>