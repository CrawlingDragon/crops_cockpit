<template>
  <div class="dingdan-container">
    <ul class="dingdan-ul">
      <li v-for="item in 5" :key="item">
        <div class="icon"></div>
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
          <div class="order_pics">
              <img  v-for="item in 3" :key="item" src="../../assets/5.png" alt="">
          </div>
        </div>
      </li>
    </ul>
    <div class="total">共计15个结果</div>
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

    }
  },
  computed: {
    ...mapState([
      "appId",
      "huiyuanName",
      "huiyuanId"
      ]),
  },
  watch: {},
  created() {
    this.getDingdan(this.$store.state.appId,this.$store.state.huiyuanId,1,5)
  },
  destroyed() {},
  methods: {
    getDingdan(appId,uId,page,pagesize){
      this.$axios.fetchPost(
        "/Home/Order/GetMpMemberOrder",
        {appId:appId,uId:uId,page:page,pagesize:pagesize}
      ).then(res=>{
        if(res.data.code=200){
          console.log(res)
        }
      })
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
        .order_pics
           display inline-block
           vertical-align top
           position absolute
           right 43px
           top 88px
           img 
            width 110px
            height 110px
            border 1px solid yellow
            margin-left 20px
.total
    position fixed
    left 40px
    bottom 79px
    color #B5B5B5
    font-size 24px
</style>
