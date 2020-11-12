<template>
    <div class="jianjie">
        <div class="head" @click="topre()">
            <div class="closefn"></div>
            <div class="head-title">网诊详情</div>
        </div>
        <div class="title">{{this.$route.query.title}}</div>
        <div class="content">
            <div class="con_left" @click="watchdetail('1')">
                <div class="left_title">作物病情资料</div>
                <div class="plant_mode text1">{{this.zl_detail.crop_pattern}}</div>
                <div class="bf_chengdu text1">{{this.zl_detail.crop_position}}</div>
                <div class="show_time text1">{{this.zl_detail.showtime}}</div>
                <div class="miaoshu text1">{{this.zl_detail.content}}</div>
                <div class="pictures">
                    <span>病情图片（4）</span>
                    <div class="pics">
                        <img v-for="(item,index) in this.zl_detail.pic" :key="index" :src="item" alt="">
                    </div>
                </div>
            </div>
            <div class="con_right" @click="watchdetail('2')">
                <div class="right_title">处方信息</div>
                <div class="huifu_info" v-if="this.zl_detail.result != ''">
                    <div v-for="(item,index) in this.zl_detail.result" :key="index">
                        <div class="huifu_person">{{item.chufang_expert}}</div>
                        <div class="huifu_nr">{{item.result}}</div>
                    </div>
                </div>
                <div class="no_data" v-if="this.zl_detail.result == ''">医院暂时还没有回复</div>
            </div>
        </div>
        <div class="bottom">
            <div class="chufang">
                <img src="../../assets/24.png" alt="">
                <div class="text2">处方药（{{this.yao_number}}）</div>
            </div>
            <div class="yao" v-for="(item,index) in this.zl_detail.products" :key="index">
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
            :detailinfo="this.zl_detail"
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
        zl_detail:"",//诊疗详情
        replay:"",//网诊回复信息
        appId:localStorage.getItem("appId"),
        yao_number:"",//处方药数量
        godetail:"",//判断是从何处打开了弹窗
        alert_title:"",//弹窗title
      }
    },
    activated(){
        this.getWangzhendetail(this.appId,"forum_post",this.$route.query.tid)
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
            if(godetails == 1){
                this.alert_title="作物病情资料"
            }
            if(godetails == 2){
                this.alert_title="处方信息"
            }
        },
        getWangzhendetail(appId,frommodule,Id){
            this.$axios.fetchPost(
            "/Home/Treatment/GetRecipetemDetail",
            {appId:appId,module:frommodule,Id:Id}
            ).then(res=>{
                console.log(res)
            if(res.data.code == 200){
                console.log(res)
                this.zl_detail = res.data.data
                //   this.replay = res.data.answers
                if(res.data.data.products==""){
                    this.yao_number = 0
                }else{
                    this.yao_number = Object.keys(res.data.data.products).length
                }
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
            border 2px solid #091D44
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