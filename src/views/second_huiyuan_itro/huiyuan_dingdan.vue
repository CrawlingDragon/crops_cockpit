<template>
  <div class="dingdan-container">
    <ul class="dingdan-ul">
      <li v-for="(item,index) in this.orderinfo" :key="index" @click="watchdetail(item)">
        <div class="icon"></div>
        <div class="text">
          <div class="row1">
            <span>{{item.title}}</span>
            <span>代购单号:{{item.ordernumber}}</span>
            <span>{{item.showtime}}</span>
            <div class="row1_text pay_status">{{item.orderstate == 1?"交易成功":"待付款"}}</div>
            <div class="row1_text">参考总价:<span class="price">¥{{item.ordercost}}</span></div>
          </div>
          <p class="order_kinds">
            <span class="single_row" v-for="(item,index) in item.products " :key="index">
              <span>{{item.name}}</span>
              <span>{{item.spec_sn}}</span>
              <span class="text1">¥{{item.price}}</span>
              <span>*{{item.quantity}}</span>
            </span>
          </p>
          <div class="order_pics">
              <img  v-for="(item,index) in item.products.reverse()" :key="index" :src= item.goods_pic alt="">
          </div>
        </div>
      </li>
    </ul>
    <div class="total">共计{{this.total}}个结果</div>
  </div>
</template>
<script>
import {mapState } from "vuex";
export default {
  name: "second_dingdan",
  components: {},
  props: {},
  data() {
    return {
      appId:window.localStorage.getItem("appId"),
      page:1,
      pagesize:4,
      orderinfo:"",//订单的信息
      products:"",//订单中的商品信息
      total:"",
      uid:window.sessionStorage.getItem("huiyuan_uid")
    }
  },
  computed: {
    ...mapState([
      "huiyuanName",
      "huiyuanId"
      ]),
  },
  watch: {},
  created() {
    this.getDingdan(this.appId,this.uid,1,5)
  },
  destroyed() {},
  methods: {
    getDingdan(appId,uId,page,pagesize){
      this.$axios.fetchPost(
        "/Home/Order/GetMpMemberOrder",
        {appId:appId,uId:uId,page:page,pagesize:pagesize}
      ).then(res=>{
        if(res.data.code == "200"){
          console.log(res)
          this.orderinfo = res.data.data
          // this.products = res.data.data.products
          this.total = res.data.count - 0
        }
      })
    },
    watchdetail(item){
      console.log(item)
      window.sessionStorage.setItem("orderid",item.id)
      window.sessionStorage.setItem("ordernumber",item.ordernumber)
      this.$router.push({path:"/huiyuan_dingdan/second_order_detail",query:{Id:item.id}})
    }
  }
}
</script>
<style lang="stylus" scoped>
.dingdan-container
  margin 0 40px
  height 741px
  overflow scroll
  .dingdan-ul
    margin 0px auto
    height 429px
    overflow scroll
    @media screen and (min-width:1900px) {
      height 741px
    }
    & > li
      background rgba(9, 29, 67, 0.4)
      border 1px solid rgba(255, 255, 255, 0.2)
      margin-bottom 11px
      padding 30px 0 0 22px
      display flex
      position relative
      & > .icon
        width 35px
        height 35px
        background url('../../assets/60.png') no-repeat
        background-position center
        background-size 100%
        margin 0 27px 0 20px
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
           height 120px
           display: -webkit-box;
           -webkit-box-orient: vertical;
           -webkit-line-clamp: 3;
           overflow: hidden;
           .single_row
              display inline-block
              width 100%
           .text1
              margin-left 37px
              margin-right 20px
        .order_pics
           display inline-block
           vertical-align top
           position absolute
           right 43px
           top 88px
           width 400px
           height 110px
           overflow hidden
           img 
            width 110px
            height 110px
            float right
            margin-left 20px
            $:nth-child(3n+0)
              margin-left 0px
.total
    position fixed
    left 40px
    bottom 79px
    color #B5B5B5
    font-size 24px
</style>
