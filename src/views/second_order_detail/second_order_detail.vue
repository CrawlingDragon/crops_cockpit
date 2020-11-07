<template>
    <div class="jianjie">
        <div class="head" @click="topre()">
            <div class="closefn"></div>
            <div class="head-title">订单详情</div>
        </div>
        <div class="left">
            <div class="name">黄莲蓉的订单</div>
            <div class="shop_num">5种商品共10件</div>
            <div class="order_number">订单号：12333333</div>
            <div class="order_time">2017-05-27 12:00</div>
            <div class="allprice">总金额：¥<span class="price">2600</span>.00</div>
            <img src="" alt="">
        </div>
        <ul class="right">
            <li v-for="item in 10" :key="item">
                <img src="../../assets/5.png" alt="">
                <div class="text">
                    <div class="order_kinds" v-for="item in 1" :key="item">
                        燕化 多禧利 香菇多糖 杀菌剂：¥6.50*3
                    </div>
                    <div class="guige">
                        商品规格：20g
                    </div>
                </div>
                <div class="buy_number">
                  <span class="fuhao">¥</span>56.00<span class="fuhao">*</span>3
                </div>
            </li>
        </ul>
    </div>
</template>
<script>
export default {
    data(){

    },
    methods:{
      topre(){
        this.$router.go(-1)
      }
    }
}
</script>
<style lang="stylus" scoped>
  .jianjie
    margin 0 40px
    position relative
    .head
      position absolute
      top 40px
      .closefn
        height 30px
        width 30px
        background url("../../assets/61.png")
        background-size 100%
      .head-title
        position absolute
        width 120px
        top 0px
        left 51px
        font-size 30px
        font-weight 400
        color #7FB5F1
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
      font-size 30px
      font-family  MicrosoftYaHei
      color #B5B5B5
      overflow scroll
      margin 0px auto
      & > li
       background rgba(9, 29, 67, 0.4)
       border 1px solid rgba(255, 255, 255, 0.2)
       margin-bottom 11px
       padding 20px 0 20px 41px
       display flex
       position relative
       img 
        width 110px
        height 110px
        border 1px solid red
        margin-right 39px
      .text
        flex 1
        margin-bottom 10px
        text-align left
        font-family MicrosoftYaHei
        .order_kinds
           color #ffffff
           font-size 30px
           line-height 40px
           width 900px
           margin-top 18px
        .guige
          color #b5b5b5
          font-size 24px
          margin-top 17px
      .buy_number
        font-size 40px
        position absolute
        top 58px
        right 47px
        .fuhao
         font-size 30px
         padding-right 7px
</style>