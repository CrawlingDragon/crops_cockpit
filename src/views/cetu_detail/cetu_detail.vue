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
            <div class="con_left">
                <div class="left_title">土壤信息</div>
                <div class="cetu_number text1">测土单号：{{this.cetuinfo.idnumber}}</div>
                <div class="weizhi text1">土壤位置：{{this.cetuinfo.crop_patten}}</div>
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
            <div class="con_right">
                <div class="right_title">处方信息</div>
                <div class="huifu_info">
                    <div class="huifu_person">嵊州市蔬菜专科医院医院 官方回复：</div>
                    <div class="huifu_nr">使用下面几种药混合使用。疗效更好。使用下面几种药混合使用。疗效更好。使用下面几种药混合使用。疗效更好。使用下面几种药混合使用。疗效更好。使用下面几种药混合使用。疗效更好。使用下面几种药混合使用。疗效更好。使用下面几种药混合使用。疗效更好。使用下面几种药混合使用。疗效更好。使用下面几种药混合使用。疗效更好。使用下面几使用下面几种药混合使用。疗效更好。使用下面几种药混合使用。疗效更好。使用下面几种药混合使用。疗效更好。使用下面几种药混合使用。疗效更好。使用下面几种药混合使用。疗效更好。使用下面几种药混合使用。疗效更好。使用下面几种药混合使用。疗效更好。使用下面几种药混合使用。疗效更好。使用下面几种药混合使用。疗效更好。使用下面几使用下面几种药混合使用。疗效更好。使用下面几种药混合使用。疗效更好。</div>
                </div>
            </div>
        </div>
        <div class="bottom">
            <div class="chufang">
                <img src="../../assets/24.png" alt="">
                <div class="text2">处方药（6）</div>
            </div>
            <div class="yao" v-for="item in 5">
                <div class="shadow"></div>
                <img src="../../assets/61.png" alt="">
                <p class="yao_name">燕化多禧利香菇多...</p>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data(){
      return{
        cetuinfo:"",//测土配方信息
        products:""//药物信息
      }
    },
    activated(){
      this.getcetuinfo(this.$route.query.id)
    },
    methods:{
      topre(){
        this.$router.go(-1)
      },
      getcetuinfo(Id){
        this.$axios.fetchPost(
          "/Home/Treatment/GetTestingsoilDetail",
          {Id:Id}
        ).then(res=>{
          if(res.data.code == "200"){
              console.log(res)
              this.cetuinfo = res.data.data
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
        border 1px solid red
        .con_left
            float left
            height 460px
            width 36%
            border 1px solid yellow
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
            border 1px solid green
            overflow  hidden
            .right_title
                font-size 30px
                margin 19px auto 8px 29px
            .huifu_info
                margin auto 22px 12px 28px
                line-height 40px
                font-size 24px
                color #B5B5B5
    .bottom
        width 100%
        height 270px
        margin-top 31px
        border 1px solid red
        .chufang
            width 140px
            height 270px
            border 1px solid #091D44
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
            border 1px solid red
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
</style>