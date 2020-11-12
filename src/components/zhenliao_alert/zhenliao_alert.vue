<template>
    <div class="alert_content">
        <div class="head" @click="topre()">
            <div class="closefn"></div>
            <div class="head-title">{{this.$props.title}}</div>
        </div>
        <div class="neirong" v-if="this.$props.godetail == '1'">
            <div class="plant_mode text1">{{this.detailinfo.crop_pattern}}</div>
            <div class="bf_chengdu text1">{{this.detailinfo.crop_position}}</div>
            <div class="show_time text1">{{this.detailinfo.showtime}}</div>
            <div class="miaoshu text1">{{this.detailinfo.content}}</div>
            <div class="pictures">
                <span>病情图片({{this.detailinfo.pic.length}})</span>
                <div class="pics">
                    <img v-for="(item,index) in this.detailinfo.pic" :key="index" :src="item" alt="">
                </div>
            </div>
        </div>
        <div class="neirong" v-if="this.$props.godetail == '2'">
            <div class="single_huifu" v-for="(item,index) in this.$props.detailinfo.result" :key="index">
                <div class="huifu_person text1">{{item.chufang_expert}}</div>
                <p class="huifu_info text1">{{item.result}}</p>
                <img v-for="(item,index) in item.content_pic"  :src="item" :key="index" alt="">
                <div class="pingfen" v-if="item.scoredata !==''">
                    <el-rate
                        class="rate"
                        :value="(item.scoredata.scoretips-0)"
                        disabled
                        text-color="#ff9900">
                    </el-rate>
                    <span class="score">提问者评分：{{item.scoredata.score}}</span>
                    <div class="comment">{{item.scoredata.comment}}</div>
                </div>
            </div>
        </div>
        <div class="neirong" v-if="this.$props.godetail == '3'">
            <div class="title0">土壤信息</div>
            <div class="cetu_number text1">测土单号：{{this.detailinfo.idnumber}}</div>
            <div class="weizhi text1">土壤位置：{{this.$route.query.address}}</div>
            <div class="show_time text1">{{this.detailinfo.showtime}}</div>
            <div class="mushu text1">亩数：{{this.detailinfo.crop_position}}</div>
            <div class="charge_per text1">测试专家：{{this.detailinfo.tester_expert}}</div>
            <div class="cetu_result text1">
                <div class="title1"> 测土配方结果</div>
                <div class="zhibiao">{{this.detailinfo.hl_h}}</div>
                <div class="zhibiao">{{this.detailinfo.hl_k}}</div>
                <div class="zhibiao">{{this.detailinfo.hl_p}}</div>
                <div class="zhibiao">{{this.detailinfo.hl_ph}}</div>
                <div class="zhibiao">{{this.detailinfo.hl_salt}}</div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    props:{
        detailinfo:{
            type:Object,
            default:{}
        },
        //记录是从何处点击进入的
        godetail:{
            type:String,
            default:""
        },
        //头部标题
        title:{
            type:String,
            default:""
        }
    },
    data(){
        return{

        }
    },
    activated(){
        console.log(this.$props.godetail)
    },
    methods:{
        topre(){
            this.$parent.$refs.detail.style= 'display:none'
        }
    }
}
</script>
<style lang="stylus" scoped>
/deep/.el-rate__icon
    font-size 40px
    position relative
    top 20px
.alert_content
    width 100%
    height 100%
    position fixed
    top 0px
    left 0px
    overflow scroll
    background #080f3e
    padding 0 40px
    .head
      position fixed
      top 40px
      .closefn
        height 30px
        width 30px
        background url("../../assets/61.png")
        background-size 100%
      .head-title
        position fixed
        width 190px
        text-align left
        top 40px
        left 91px
        font-size 30px
        font-weight 400
        color #7FB5F1
    .neirong
        width 100%
        height 100%
        overflow scroll
        margin-top 171px
        text-align left
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
        .text1
            font-size 28px
            line-height 50px
            color #c5c5c5
        .title0
            font-size 40px
            margin-bottom 15px
        .cetu_result
            margin-top 30px
            .title1
                font-size 40px
                color #FFFFFF
                line-height 50px
                margin-bottom 15px
        .single_huifu
            margin-bottom 60px
            fong-size 28px
            color #c5c5c5
            img
                margin 0 auto
                width 46.3%
                display block
                margin-top 20px
            .pingfen
                width 100%
                height 185px
                background #091D44
                padding-left 28px
                .rate
                    display inline-block
                .score
                    font-size 24px
                    color #B5B5B5
                    position relative
                    top 28px
                    left 20px
                .comment
                    font-size 30px 
                    line-height 40px
                    margin-top 50px
    .pictures
        margin-top 48px
        span 
            color #FFFFFF
            font-size 30px
        .pics
            width 46.3%
            margin 0 auto
            padding-top 37px
            img 
               width 100%
               margin-bottom 20px 
    
</style>