<template>
    <div class="paihang_content">
        <div>
            这是头部
        </div>
        <div class="swiper-container">
            <div class="swiper-wrapper">
                <div class="swiper-slide" v-for="(item,index) in this.expert_info" :key="index">
                    <img :src="item.avatar" alt="">
                </div>
            </div>
            <div class="swiper-button-prev" @click="prev()"></div>
            <div class="swiper-button-next" @click="next()"></div>
        </div>
        <div class="single_info">
                <div class="left">
                    <div class="mingci text1">NO.1</div>
                    <div class="name text1">陈岩</div>
                </div>
                <div class="right">
                    <div class="intros">
                        <div class="text2">擅长作物：</div>
                        <div></div>
                    </div>
                    <div class="huifu">
                        <span class="text3">总回复</span>
                        <span class="text4"></span>
                    </div>
                </div>
        </div>
    </div>
</template>
<script>
import Swiper from "swiper";
export default {
    data(){
        return{
            appId:localStorage.getItem("appId"),//管理院的appId
            page:1,
            limit:5,
            pageShownumber:3,//控制轮播图显示几个一页
            expert_info:"",
            cur_level:0
        }
    },
    created(){
        this.getExpertinfo(this.appId,1,"",this.page,this.limit)
    },
    mounted(){
    },
    
    methods:{
        init(pagesize){
        var swiper = new Swiper('.swiper-container', {
            spaceBetween: 30,
            loop: true,
            slidesPerView: pagesize,
            centeredSlides: true,
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
            },
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
        })
        },
        getExpertinfo(appId,purview,ordertag,page,limit){
            this.$axios.fetchPost(
                "/Home/Expert/GetMpExpertRank",
                {appId:appId,purview:purview,ordertag:ordertag,page:page,limit:limit}
            ).then(res=>{
                console.log(res)
                if(res.data.code == "200"){
                    this.expert_info = res.data.data
                    if(res.data.data.length-0 < 5){
                        this.pageShownumber = res.data.data.length-0
                        this.$nextTick(()=>{
                           this.init(this.pageShownumber)
                        })
                    }else{
                        this.$nextTick(()=>{
                           this.init(5)
                        })
                    }
                }
            })
        },
        prev(){
            this.cur_level+1
        },
        next(){
            this.cur_level-1
        }
    }
}
</script>
<style lang="stylus" scoped>
.paihang_content
    margin 0 40px
    font-size MicrosoftYaHei
    font-weight Regular
    .swiper-container
        margin-top 218px
        width 100%
        height 350px
        border 1px solid rgba(255, 255, 255, 0.2)
        .swiper-slide 
            text-align center
            font-size 18px
            display -webkit-box
            display -ms-flexbox
            display -webkit-flex
            display flex
            -webkit-box-pack center
            -ms-flex-pack center
            -webkit-justify-content center
            justify-content center
            -webkit-box-align center
            -ms-flex-align center
            -webkit-align-items center
            align-items center
            transition 300ms
            transform scale(0.6)
            line-height 350px
            align-items center
            img
                width 70%
                height auto
                border-radius 50%
    .swiper-button-next
        position fixed
        top 623px
        right 40px
        height 240px
        border 1px solid rgba(255, 255, 255, 0.2)
        width 80px
    .swiper-button-prev
        position fixed
        top 623px
        left 40px
        height 240px
        border 1px solid rgba(255, 255, 255, 0.2)
        width 80px
    .single_info
        text-align center
        font-size 18px
        border 1px solid rgba(255, 255, 255, 0.2)
        margin 21px 90px
        display -webkit-box
        display -ms-flexbox
        display -webkit-flex
        -webkit-box-pack center
        -ms-flex-pack center
        -webkit-justify-content center
        justify-content center
        -webkit-box-align center
        -ms-flex-align center
        -webkit-align-items center
        align-items center
        .left
            width 22.6%
            height 238px
            border-right 1px solid rgba(255, 255, 255, 0.2)
            .text1
                font-size 50px
                color #FFFFFF
            .mingci
                margin 48px 110px 45px 145px
        .right
            width 77.3%
            .intros
                width 58.8%
                height 100px
                display inline-block
                text-align left
                font-size 30px
                font-weight Regular
                margin-right 164px
                .text2
                    color #FF6600
                    margin-bottom 30px
                    white-space nowrap
                    overflow hidden
                    text-overflow ellipsis
            .huifu
                width 22%
                height 100px
                vertical-align top
                line-height 80px
                font-size 24px
                color #B5B5B5
                display inline-block
                .text4
                    font-size 60px
                    color #FF6600
                    padding-left 43px
                    vertical-align top
</style>