<template>
    <div class="jianjie">
        <div class="head" @click="topre()">
            <div class="closefn"></div>
            <div class="head-title">扫一扫下载益农宝</div>
        </div>
        <div class="er_wei_ma"></div>
    </div>
</template>
<script>
export default {
    data(){
      return{
        order_id:window.sessionStorage.getItem("orderid"),//用户的订单id
        order_info:"",//订单的信息
        coastInt:"",//订单金额取整
        coastFloat:""//订单金额取余
      }
    },
    activated(){
    //   console.log("666")
    
    },
    methods:{
      topre(){
        this.$router.go(-1)
      },
      getOrederinfo(){
        this.$axios.fetchPost(
          "/Home/Order/GetMpOrderDetail",
          {Id:this.order_id}
        ).then(res=>{
          if(res.data.code == "200"){
            console.log(res)
            this.order_info = res.data.data
            const a = res.data.data.ordercost
            var b = a.toString().split(".")
            this.coastInt = b[0]
            this.coastFloat = b[1]
          }
        })
      },
      watchGooddetail(item){
        console.log("去查看商品的详情页面")
      }
    }
}
</script>
<style lang="stylus" scoped>
  .jianjie
    margin 0 40px
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
        width 240px
        top 0px
        left 51px
        font-size 30px
        font-weight 400
        color #7FB5F1
    .er_wei_ma
        height 500px
        width 500px
        background url("./sao_yinongbao.png")
        background-size 100%
        position absolute
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        margin:auto;
        background-color #C5C5C5
</style>