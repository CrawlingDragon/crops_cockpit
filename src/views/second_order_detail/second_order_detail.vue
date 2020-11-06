<template>
    <div class="jianjie">
        <div class="closefn" @click="topre()">&lt;</div>
        <div class="head-title">订单详情</div>
        <div class="left">
            <div class="name">黄莲蓉的订单</div>
            <div class="shop_num">5种商品共10件</div>
            <div class="order_number">订单号：12333333</div>
            <div class="order_time">2017-05-27 12:00</div>
            <div class="allprice">总金额：¥<span class="price">2600</span>.00</div>
            <img src="" alt="">
        </div>
        <ul class="right">
            <li v-for="item in 5" :key="item">
                <div class="text">
                    <div class="row1">
                        <span>5种商品共10件</span>
                        <span>代购单号:1233456</span>
                        <span>2017-05-27</span>
                        <div class="row1_text pay_status">交易成功</div>
                        <div class="row1_text">参考总价:<span class="price">¥2700.00</span></div>
                    </div>
                    <div class="order_kinds" v-for="item in 3" :key="item">
                        燕化 多禧利 香菇多糖 杀菌剂：¥6.50*3
                    </div>
                </div>
            </li>
        </ul>
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
    .closefn
        position absolute
        width 26px
        height 26px
        border 2px solid #7FB5F1
        border-radius 50%
        font-size 24px
        color #7FB5F1
        left 0px
        top 41px
        display inline-block
    .head-title
        font-size 30px
        font-weight 400
        color rgba(181, 181, 181, 1)
        padding 42px 0 10px 50px
        text-align left
    .left
      position absolute
      top 160px
      margin-right 50px
      text-align left
      font-size 24px
      font-weight Regular
      font-family MicrosoftYaHei
      .name
        font-size 40px
        color #FFFFFF
        margin-bottom 45px
      .shop_num
        color #FF6600
        line-height 50px
      .order_number,.order_time
        line-height 50px
        color #B5B5B5
      .allprice
        margin-top 52px
        color #FFFFFF
        font-size 36px
        .price
         font-size 60px
    .right
      position absolute
      top 160px
      left 475px
      right 40px
      height 900px
      border 1px solid red
      font-size 30px
      font-family  MicrosoftYaHei
      color #B5B5B5
      overflow scroll
      margin 0px auto
      & > li
       background rgba(9, 29, 67, 0.4)
       border 1px solid rgba(255, 255, 255, 0.2)
       margin-bottom 11px
       padding 30px 0 0 22px
       display flex
       position relative
      .text
        flex 1
        margin-bottom 10px
        text-align left
        .row1
          font-family SimHei
          font-weight Regular
          margin-bottom 30px
          span
            margin-right 20px
            font-size 24px
            color #B5B5B5
         .row1_text
            float right
            color #B5B5B5
            font-size 24px
            .price
              font-size 30px
              padding-right 48px
         .pay_status
            padding-right 43px
            color #FFFFFF
            font-size 34px
        .order_kinds
           color #ffffff
           font-size 30px
           line-height 40px
           width 900px
  .content2
    margin-top 100px
</style>