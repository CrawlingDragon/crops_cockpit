<template>
    <div class="jianjie">
        <div class="head" @click="topre()">
            <div class="closefn"></div>
            <div class="head-title">网诊详情</div>
        </div>
        <div class="title">{{this.$route.query.title}}</div>
        <div class="content">
            <div class="con_left">
                <div class="left_title">作物病情资料</div>
                <div class="plant_mode text1">种植模式：{{this.zl_detail.crop_pattern}}</div>
                <div class="bf_chengdu text1">病发程度：{{this.zl_detail.crop_position}}</div>
                <div class="show_time text1">提问时间：{{this.zl_detail.addtime}}</div>
                <div class="miaoshu text1">病情描述：{{this.zl_detail.content}}</div>
                <div class="pictures">
                    <span>病情图片（4）</span>
                    <div class="pics">
                        <img v-for="(item,index) in this.zl_detail.urls" :key="index" :src="item" alt="">
                    </div>
                </div>
            </div>
            <div class="con_right">
                <div class="right_title">处方信息</div>
                <div class="huifu_info" v-if="this.replay != undefined">
                    <div class="huifu_person">{{this.replay.author}}回复：</div>
                    <div class="huifu_nr">{{this.replay.content}}</div>
                </div>
                <div class="no_data" v-if="this.replay == undefined">医院暂时还没有回复</div>
            </div>
        </div>
        <div class="bottom">
            <div class="chufang">
                <img src="../../assets/24.png" alt="">
                <div class="text2">处方药（5）</div>
            </div>
            <div class="yao" v-for="item in 4">
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
        zl_detail:"",//诊疗详情
        replay:""//网诊回复信息
      }
    },
    activated(){
      this.getWangzhendetail(this.$route.query.tid)
    },
    methods:{
      topre(){
        this.$router.go(-1)
      },
      getWangzhendetail(tid){
        this.$axios.fetchPost(
          "Home/NationwideDatav/getQuestionDetail",
          {tId:tid}
        ).then(res=>{
          if(res.data.code == "200"){
              console.log(res)
              this.zl_detail = res.data.data
              this.replay = res.data.answers
          }
        })
      },
     
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
        width 120px
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
            .pictures
                margin 15px 120px 16px 29px
                font-size 30px 
                line-height 40px
                .pics
                    margin-top 18px
                    img 
                        float left
                        height 110px
                        width 110px
                        margin-right 19px
                        &:nth-child(4n+0)
                          margin-right 0px
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
            .no_data
                font-size 24px
                color #B5B5B5
                margin 160px 450px
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