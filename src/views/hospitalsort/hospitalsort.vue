<template>
    <div class="contain">
        <div class="header">
            <Headnav
            :lefttitle=this.lefttitle
            @datatype="datachange"
            ></Headnav>
        </div>
        <div class="option">
            <router-link to="/defaultsort" replace><span :class='[this.cur_index == 1 ? "text2 text3":"text2"]' @click = "changecolor1" >默认排序</span></router-link>
            <router-link to="/multiplesort" replace><span :class='[this.cur_index == 2 ? "text2 text3":"text2"]'  @click = "changecolor2" >综合排序</span></router-link>
            <router-link to="/selectsort" replace><span :class='[this.cur_index == 3 ? "text2 text3":"text2"]'  @click = "changecolor3" >筛选</span></router-link>
        </div>
        <div class="content">
            <keep-alive v-if="$route.meta.keepAlive">
                <router-view></router-view>
            </keep-alive>
        </div>
    </div>
</template>
<script>
import Headnav from '../../components/head_nav/head_nav'
export default {
    components:{
        Headnav
    },
    data(){
        return{
             cur_index:2,
             lefttitle:'下级医院'
        }
    },
    created(){
        this.$parent.app_loading=false
    },
    methods:{
        toindex(e){
            e.stopPropagation()
            this.$router.back()
        },
        changecolor1(){
            this.cur_index = 1
        },
        changecolor2(){
            this.cur_index = 2
        },
        changecolor3(){
            this.cur_index = 3
        },
        datachange(value){
            if(value){
                location.reload()
            }
        }
    }
}
</script>
<style lang="stylus" scoped>
.contain
    width 100%
    height 100%
    background-color: rgba(3, 5, 57, 1);
    margin 0 auto
    position relative
    .header
        position fixed
        height 50px
        z-index 99
        width 100%
        
    .option
        margin 40px auto 0px auto
        width 500px
        vertical-align middle
        position absolute
        left 0
        right 0
        top 10px
        @media screen and (min-width:1900px) {
            margin 77px auto 0px auto
        }
        z-index 666
        .text2
            font-size 24px
            font-family MicrosoftYaHei   
            font-weight Regular
            color #C5C5C5
            line-height 50px
            margin-right 50px
            @media screen and (min-width:1900px){
                font-size 30px
            }
        .text3
            color #FF6600
            padding-bottom 10px
            border-bottom 2px solid #FF6600
    ::-webkit-scrollbar 
        display none
    .content 
        position relative
        -ms-overflow-style none
        @media screen and (max-width:1899px) {
            padding-top 75px
        }

</style>