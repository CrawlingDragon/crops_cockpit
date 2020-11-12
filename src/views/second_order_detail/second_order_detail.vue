<template>
    <div class="jianjie">
        <div class="head" @click="topre()">
            <div class="closefn"></div>
            <div class="head-title">订单详情</div>
        </div>
        <div class="left">
            <div class="name">{{this.order_info.name}}</div>
            <div class="shop_num">{{this.order_info.title}}</div>
            <div class="order_number">订单号：{{this.order_info.ordernumber}}</div>
            <div class="order_time">{{this.order_info.showtime}}</div>
            <div class="allprice">总金额：¥<span class="price">{{this.coastInt}}</span>.{{this.coastFloat == null ? "00":this.coastFloat}}</div>
            <!-- <img  src="../../assets/64.png" alt=""> -->
            <div class="icon1"></div>
        </div>
        <ul class="right">
            <li v-for="(item,index) in this.order_info.products" :key="index" @click="watchGooddetail(item)">
                <img :src="item.goods_pic" alt="">
                <div class="text">
                    <p class="order_kinds">
                        {{item.name}}
                        <span>¥{{item.price}}*{{item.spec_sn}}</span>
                    </p>
                    <div class="guige">
                        商品规格：{{item.spec}}
                    </div>
                </div>
                <div class="buy_number">
                  <span class="fuhao">¥</span>{{item.price}}<span class="fuhao">*</span>{{item.quantity}}
                </div>
            </li>
        </ul>
    </div>
</template>
<script>
export default {
    data(){
      return{
        order_info:"",//订单的信息
        coastInt:"",//订单金额取整
        coastFloat:""//订单金额取余
      }
    },
    activated(){
      this.getOrederinfo(this.$route.query.Id)
    },
    methods:{
      topre(){
        this.$router.go(-1)
      },
      getOrederinfo(Id){
        this.$axios.fetchPost(
          "/Home/Order/GetMpOrderDetail",
          {Id:Id}
        ).then(res=>{
          if(res.data.code == "200"){
            this.order_info = res.data.data
            const a = res.data.data.ordercost
            var b = a.toString().split(".")
            this.coastInt = b[0]
            this.coastFloat = b[1]
          }
        })
      },
      watchGooddetail(item){
        //跳转到 商品详情页面
        this.$router.push({path:"/goods_detail",query:{id:item.id}})
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
      .icon1
        margin-top 51px
        width 171px
        height 171px
        background url("../../assets/64.png")
        background-size 100%
    .right
      position absolute
      top 160px
      left 475px
      right 40px
      height 600px
      @media screen and (min-width:1900px) {
        height 741px
      }
      font-size 30px
      font-family  MicrosoftYaHei
      color #B5B5B5
      margin 0px auto
      overflow scroll
      overflow-x hidden
      scrollbar-arrow-color rgba(3, 5, 57, 1)
      scrollbar-base-color hsla(0, 0%, 53%, 0.4)
      scrollbar-track-color rgba(3, 5, 57, 1)
      scrollbar-shadow-color hsla(0, 0%, 53%, 0.1)
      &::-webkit-scrollbar {
          width: 6px;
          height: 6px;
          background: transparent;
      }
      &::-webkit-scrollbar-thumb {
          background: transparent;
          border-radius: 4px;
      }
      &:hover::-webkit-scrollbar-thumb {
          background: hsla(0, 0%, 53%, 0.4);
      }
      &:hover::-webkit-scrollbar-track {
          background: hsla(0, 0%, 53%, 0.1);
      }
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
           width 55%
           display: -webkit-box;
           -webkit-box-orient: vertical;
           -webkit-line-clamp: 1;
           overflow: hidden;
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