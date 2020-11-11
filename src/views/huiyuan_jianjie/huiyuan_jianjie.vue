<template>
    <div class="jianjie">
        <div class="left">
            <el-image class="img" fit="cover" :src="this.huiyuaninfo.avatar"></el-image>
        </div>
        <div class="right">
            <div class="name">
                <span>{{this.huiyuaninfo.name}}</span>
                <span>ID:{{this.huiyuaninfo.id}}</span>
            </div>
            <div class="right_left">
                <span class="text1">手机：{{this.huiyuaninfo.idnumber}}</span>
                <span class="text1">村名：{{this.huiyuaninfo.address}}</span>
                <span class="text1">加入时间：{{this.huiyuaninfo.idnumber}}</span>
                <span class="text1">种养种类：
                  <p class="zuowu" >
                    <span v-for="(item,index) in this.zuowu" :key="index">
                      <span>{{item.name}}</span>
                      <span class="zuowu_mushu">{{item.mushu}}</span>
                    </span>
                  </p>
                </span>
            </div>
            <div class="right_right">
                <span class="text2">订单：{{this.huiyuaninfo.order}}</span>
                <span class="text2">测土配方：{{this.huiyuaninfo.cetu}}</span>
                <span class="text2">问答：{{this.huiyuaninfo.ask}}</span>
                <span class="text2">处方：{{this.huiyuaninfo.recipetem}}</span>
            </div>
        </div>
    </div>
</template>
<script>
import { mapMutations, mapState } from "vuex";
export default {
    data(){
      return{
        appId:window.localStorage.getItem("appId"),//当前登录账号的Id,
        huiyuaninfo:"",
        zuowu:"",
        huiyuanid:window.sessionStorage.getItem("huiyuan_id"),
      }
    },
    created(){
      this.getpersonInfo(this.huiyuanid,this.appId)
    },
    // computed:{
    //   ...mapState(["huiyuanId"]),
    // },
    methods:{
      getpersonInfo(Id,appId){
        this.$axios.fetchPost(
          "/Home/Member/GetMpUserDetail",
          {Id:Id,appId:appId}
        ).then(res=>{
          if(res.data.code == "200"){
            this.huiyuaninfo = res.data.data
            this.zuowu = res.data.data.zuowu
          }
        })
      }
    }
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
        text-align left         
        .text1
          width 100%
          display inline-block
          line-height 70px
          .zuowu
            position relative
            left 150px
            bottom 70px
            line-height 70px
            width 260px
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 2;
            @media screen and (min-width:1900px) {
              -webkit-line-clamp: 5;
            }
            overflow: hidden;
            .zuowu_mushu
              margin 0 10px
     .right_right
          position absolute
          text-align left
          width 168px
          height 240px
          left 500px
          @media screen and (min-width:1900px) {
            left 759px
          }
        .text2
          display inline-block
          line-height 70px
  .content2
    margin-top 100px
</style>