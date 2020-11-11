<template>
   <div class="contain">
       <div class="head">
           <Headers
            :title=this.title
            :returnPath = this.returnPath
           ></Headers>
           这是头部
       </div>
       <div class="my_huiyuan">
           <div class="single_huiyuan" v-for="(item,index) in this.huiyuan_list"  v-infinite-scroll="load" :key="index" @click="watch_detail(item)">
               <img class="photo" :src="item.avatar" alt="">
               <div class="intro">
                    <div class="name">{{item.name}}</div>
                    <p class="skills">{{item.zuowu_mushu}}</p>
               </div>
           </div>
       </div>
       <div class="total">共计15个结果</div>
   </div>
</template>
<script>
import Headers from "../../components/online_hospital_header/online_hospital_header"
import { mapMutations, mapState } from "vuex";
export default {
    data(){
        return{
            huiyuan_list:[],//会员列表
            appId:this.$store.state.appId,
            page: 1, // 当前页数
            total:'',//当前会员总数
            title:"我的会员",
            returnPath:"/online_hospital_channel"
        }
    },
    components:{
        Headers
    },
    created(){
        this.gethuiyuan_list(1,14)
    },
    methods:{
        gethuiyuan_list(page,pagesize){
            this.$axios.fetchPost(
                "/Home/Member/GetMpUser",
                {appId:this.appId,keyword:'',page:page,pagesize:pagesize}
            ).then(res=>{
                if(res.data.code == '200'){
                    this.huiyuan_list = res.data.data
                    this.total = res.data.count
                    if(this.page == 1){
                        this.huiyuan_list = res.data.data
                    }else{
                        this.huiyuan_list.push(...res.data.data)
                    }
                    this.loading=false
                }
            })
        },
         ...mapMutations([
            "getHuiyuanName",
            "getHuiyuanId"
        ]),
        watch_detail(item){
            this.getHuiyuanName(item.name)
            this.getHuiyuanId(item.id)
            window.sessionStorage.setItem("huiyuan_id",item.id)
            window.sessionStorage.setItem("huiyuan_name",item.name)
            window.sessionStorage.setItem("huiyuan_uid",item.uid)
            this.$router.push({path:"/second_huiyuan_itro",query:{
                id:item.id,
                name:item.name
            }})
        },
        load() {
            // 是否当前page不是最后一页
            if (this.page <= Math.ceil(this.total/14)) {
                // 页码+1
                this.page++;
                this.getexpert_list(this.page)
            }
        }
    }
}
</script>
<style lang="stylus" scoped>
.contain
    .my_huiyuan
        margin 0 37px
        margin-top 141px
        height 500px
        @media screen and (min-width:1900px)
            margin-top 200px
            height 700px
        overflow scroll
        overflow-x hidden
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
    .single_huiyuan
        height 329px
        width 232px
        margin 0px 20px 20px 0px
        float left
        @media screen and (max-width:1340px)
            &:nth-child(5n+0)
                margin-right 0px
        @media screen and (min-width:1900px) 
            height 334px
            width 235px
            margin 0px 29px 29px 0px
            float left
            &:nth-child(7n+0)
                margin-right 0px
        .photo
            width 232px
            height 232px
            @media screen and (min-width:1900px) 
                width 235px
                height 235px
        .intro
            width 232px
            height 99px
            @media screen and (min-width:1900px)
                width 235px
                height 99px
            border 2px solid rgba(255, 255, 255, 0.15)
            .name
                margin 21px auto 8px 19px
                font-size 30px
                text-align left
                font-family Microsoft YaHei
                font-weight Regular
                color #FFFFFF
            .skills
                font-size 24px
                text-align left
                font-family Microsoft YaHei
                font-weight Regular
                color #808080
                margin 0px 0px 16px 20px
                overflow hidden
                text-overflow ellipsis
                white-space nowrap
.total
    position fixed
    left 40px
    bottom 79px
    color #B5B5B5
    font-size 24px
</style>