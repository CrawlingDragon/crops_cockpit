<template>
    <div class="jianjie">
        <div class="head" @click="topre()">
            <div class="closefn"></div>
            <div class="head-title">测土配方详情</div>
        </div>
        <div class="title">
            <span>{{this.$route.query.title}}</span>
            <div class="status">
                <div :class='[this.cetuinfo.teststatus == 1?"icon icon-ing":this.cetuinfo.teststatus==2?"icon icon-success":"icon icon-way"]'></div>
                <span class="status_text">已给处方</span>
            </div>
        </div>
        <div class="content">
            <div class="con_left" @click="watchdetail('3')">
                <div class="left_title">土壤信息</div>
                <div class="cetu_number text1">测土单号：{{this.cetuinfo.idnumber}}</div>
                <div class="weizhi text1">土壤位置：{{this.$route.query.address}}</div>
                <div class="show_time text1">{{this.cetuinfo.showtime}}</div>
                <div class="mushu text1">亩数：{{this.cetuinfo.crop_position}}</div>
                <div class="charge_per text1">测试专家：{{this.cetuinfo.tester_expert}}</div>
                <div class="cetu_result text1">
                   <div class="title1"> 测土配方结果</div>
                   <span class="zhibiao">{{this.cetuinfo.hl_h}}</span>
                   <span class="zhibiao">{{this.cetuinfo.hl_k}}</span>
                   <span class="zhibiao">{{this.cetuinfo.hl_p}}</span>
                   <span class="zhibiao">{{this.cetuinfo.hl_ph}}</span>
                   <span class="zhibiao">{{this.cetuinfo.hl_salt}}</span>
                </div>
            </div>
            <div class="con_right" @click="watchdetail('2')">
                <div class="right_title">处方信息</div>
                <div class="huifu_info">
                     <div v-for="(item,index) in this.cetuinfo.result" :key="index">
                        <div class="huifu_person">{{item.chufang_expert}}</div>
                        <div class="huifu_nr">{{item.result}}</div>
                    </div>
                </div>
                <div class="no_data" v-if="this.cetuinfo.result == ''">医院暂时还没有回复</div>
            </div>
        </div>
        <div class="bottom">
            <div class="chufang">
                <img src="../../assets/24.png" alt="">
                <div class="text2">处方药（{{this.yao_number}}）</div>
            </div>
            <div class="yao" v-for="(item,index) in this.cetuinfo.products" :key="index">
                <div class="shadow"></div>
                <img :src="item.thumb_pic" alt="">
                <p class="yao_name">{{item.name}}</p>
            </div>
             <div class="no_yao" v-if="this.yao_number == 0">
                <img src="../../assets/65.png" alt="">                
            </div>
        </div>
        <div ref="detail">
            <Detail
            :detailinfo="this.cetuinfo"
            :godetail="this.godetail"
            :title="this.alert_title"
            ></Detail>
        </div>
    </div>
</template>
<script>
import Detail from "../../components/zhenliao_alert/zhenliao_alert"
export default {
    data(){
      return{
        cetuinfo:"",//测土配方信息
        products:"",//药物信息,
        appId:localStorage.getItem("appId"),
        yao_number:"",//药物数量
        godetail:"",//判断是从何处打开了弹窗
        alert_title:"",//弹窗title
      }
    },
    activated(){
      this.getcetuinfo(this.appId,"testingsoil",this.$route.query.id)
      this.$refs.detail.style ='display:none'
    },
    components:{
        Detail
    },
    methods:{
      topre(){
        this.$router.go(-1)
      },
      watchdetail(godetails){
        this.godetail = godetails
        this.$refs.detail.style ='display:block'
        if(godetails == 2){
            this.alert_title="处方信息"
        }
        if(godetails == 3){
            this.alert_title="土壤信息详情"
        }
      },
      getcetuinfo(appId,frommodule,Id){
           this.$axios.fetchPost(
          "/Home/Treatment/GetRecipetemDetail",
          {appId:appId,module:frommodule,Id:Id}
        ).then(res=>{
          if(res.data.code == "200"){
            console.log(res)
            this.cetuinfo = res.data.data
            if(res.data.data.products==""){
                this.yao_number = 0
            }else{
                this.yao_number = Object.keys(res.data.data.products).length
            }
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
        width 180px
        top 0px
        left 51px
        font-size 30px
        font-weight 400
        color #7FB5F1
    .title
        font-size 34px
        text-align left
        padding-top 166px
        margin-bottom 31px
        .status
            float right
            font-size 30px
            line-height 32px
            color #FF6600
            .icon
                margin-right 21px
                width 40px
                height 40px
                vertical-align middle
                display inline-block
            .icon-ing
                background url('../second_tu/35.png') no-repeat
                background-position center
                background-size 40px 40px
            .icon-success
                background url('../second_tu/36.png') no-repeat
                background-position center
                background-size 100%
            .icon-way
                background url('../second_tu/27.png') no-repeat
                background-position center
                background-size 100%
            .status_text
                vertical-align middle  
.content
        width 100%
        height 460px
        .con_left
            float left
            height 460px
            width 36%
            border 2px solid #072F65
            font-family MicrosoftYaHei
            fong-weight Regular
            text-align left
            .left_title
                font-size 30px
                margin 19px auto 8px 29px
            .text1
                font-size 24px
                line-height 40px
                margin-left 29px
                color #B5B5B5
            .cetu_result
                margin-top 20px
                width 405px
                .title1
                    font-size 30px
                    color #FFFFFF
                .zhibiao
                    margin-right 30px
        .con_right
            text-align left
            float right
            width 62%
            height 460px
            border 2px solid #072F65
            overflow  hidden
            .right_title
                font-size 30px
                margin 19px auto 8px 29px
            .huifu_info
                margin auto 22px 12px 28px
                line-height 40px
                font-size 24px
                color #B5B5B5
            .no_data
                font-size 24px
                color #B5B5B5
                margin 160px 450px
    .bottom
        width 100%
        height 270px
        margin-top 31px
        .chufang
            width 140px
            height 270px
            border 2px solid #072F65
            margin-right 40px
            float left
            img 
                margin 56px 40px 46px 40px
            .text2
                margin 40 auto
                font-size 30px
                line-height 40px
        .yao
            height 270px
            width 270px
            margin-right 15px
            float left
            position relative
            img
                height 270px
                width 270px
            .yao_name
                position absolute
                bottom 12px
                left 17px
                right 44px
                width 100%
                text-align left
                font-size 24px
            .shadow
                position absolute
                top 0px
                height 100%
                width 100%
                background linear-gradient(to top,#000000 1%,transparent 100%)
        .no_yao
            height 270px
            width 270px
            float left
            border 2px solid #072F65
            img
                height 120px
                width 175px
                margin 75px 47px
</style>