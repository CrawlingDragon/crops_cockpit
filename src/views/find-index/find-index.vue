<template>
    <div class="container">
        <div class="head">
            <Headnav
                :cur_cityname = this.cur_cityname
                :changemoudle = this.changemoudle
                :middle_title = this.middle_title
            ></Headnav>
        </div>
        <div class="contain">
            <div class="next-hospital-data" @click = "tonexthospital">
                <span class="text1" >下级医院数据</span>
            </div>
            <div class="hospital-sort" @click="tohospitalsort">
                <span class="text1" >医院综合排序</span>
            </div>
            <div class="expert" @click="toexpertlist">
                <span class="text1"  >专家</span>
            </div>
            <div class="expert-net-sort" v-if="shaoxingprivate == true" @click="toexpertranking">
                <span class="text1" >专家网诊榜</span>
            </div>
            <div class="score" v-if="shaoxingprivate == true" @click="todiscussscore">
                <span class="text1" >评分</span>
            </div>
            <div class="shaoxing-serve" v-if="shaoxingprivate == true">
                <div class="text2" >{{this.title}}</div>
                <img class="sao-ma" :src="this.imgurl" alt="站点正在维护升级中，请稍后！"/>
            </div>
            <div class="bottom-text">{{cur_cityname}}</div>
        </div>
    </div>
</template>
<script>
import Headnav from "../../components/head_nav/head_nav"
export default {
    'name':'Find',
    data(){
        return{
           shaoxingprivate:false,
           curcity:window.sessionStorage.getItem('curcity'),
           imgurl:"",
           title:"",
           cur_cityname:window.sessionStorage.getItem('name'),
           tmp_alert_satus:'',
           changemoudle:'find',//控制头部左侧导航样式
           middle_title:'新型庄稼医院管理驾驶舱'//中部标题
        }
    },
    components:{
        Headnav
    },
    created(){
        let isshaoxing = window.sessionStorage.getItem('isshaoxing')
        if(isshaoxing == 1){
            this.shaoxingprivate = true
        }
       //获取绍兴市为民服务平台的二维码
       this.$axios.fetchGet(
           "/Admin/Api/get_qr_code"
       ).then(res=>{
            this.imgurl = res.data.data.qrcode
            this.title = res.data.data.title
       })
   },
   methods:{
       tonexthospital(){
           this.$router.push({
                'path':'/nexthospital'
            })
       },
       tohospitalsort(){
           this.$router.push({
               'path':'/hospitalsort'
           })
       },
       toexpertlist(){
           this.$router.push({
               'path':'/expertlist'
           })
       },
       toexpertranking(){
           this.$router.push({
               'path':'/expertranking'
           })
       },
       todiscussscore(){
           this.$router.push({
               'path':'/discussscore'
           })
       }
   }
}
</script>
<style lang="stylus" scoped>
.container
    position relative
    .head
        position fixed
        z-index 99999999
    .contain
        width 1340px
        margin 0 auto
        position relative
        @media screen and (min-width:1900px) {
            width 1900px
        }
        .next-hospital-data,.expert-net-sort
            position absolute
            left 91px
            top 104px
            width: 502px
            height: 230px
            background: #2393DD
            @media screen and (min-width:1900px) {
                width 760px
                height 270px
                left 181px
                top 273px
            }
        .expert-net-sort
            top 346px
            background: #01D9AD
            @media screen and (min-width:1900px) {
                top 563px
            }
        .text1
            line-height 270px
            text-align center         
            font-size 36px;
            font-family SimHei
            font-weight 400
            color #FFFFFF
            cursor default
            @media screen and (min-width:1900px) {
                font-size 40px
            }
        .hospital-sort,.score
            position absolute
            right 419px
            top 104px
            width: 320px
            height: 230px
            background: #D93165
            @media screen and (min-width:1900px) {
                width 370px
                height 270px
                top 273px
                right 568.5px
            }
        .score
            top 346px;
            background: #FF6500
            @media screen and (min-width:1900px) {
                top 563px
            }
        .expert,.shaoxing-serve
            position absolute
            right 92px
            width: 320px;
            height: 230px;
            top 104px
            background #7B6FF9
            @media screen and (min-width:1900px) {
                width 370px
                height 270px
                right 179px
                top 273px
            }
        .shaoxing-serve
            top 346px
            background #EBB701
            @media screen and (min-width:1900px) {
                top 563px
            }
            .text2
                width: 108px;
                height: 121px;
                margin-left 23px
                margin-top 49px
                font-size 36px
                font-family SimHei
                font-weight 400
                color #FFFFFF
                cursor default
                @media screen and (min-width:1900px) {
                   margin 68px 21px 66px 27px
                   width 121px
                   height 136px
                   font-size 40px
                }
            .sao-ma
                position absolute
                left 138px
                top 27px
                width 165px
                height 165px
                background #FFFFFF
                @media screen and (min-width:1900px) {
                    top 45px
                    left 169px
                    width 180px
                    height 180px
                }
        .bottom-text
            position fixed
            bottom 40px
            right 0
            left 0
            font-size: 24px;
            font-family Source Han Sans CN;
            color #FFFFFF
            @media screen  and (min-width:1900px){
                font-size 30px
            }
    ::-webkit-scrollbar
        display none
</style>