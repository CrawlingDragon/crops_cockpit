<template>
  <div class="vip_diagnosis-container">
    <ul class="diagnosis-ul">
      <li v-for="(item,index) in this.wangzhenlist" :key="index" @click="godetail(item)">
        <div class="icon"></div>
        <div class="text">
          <p class="p1">
            {{item.title}}
            <span>{{item.showtime}}</span>
          </p>
          <p
            class="p2"
          >{{item.content}}</p>
        </div>
        <div class="answer">
          <p class="p3">回复数：{{item.replies}}</p>
          <el-image
            class="img"
            :src= "item.thumb_pic"
          ></el-image>
        </div>
      </li>
    </ul>
    <div class="result-num">共{{this.total}}个结果</div>
    <div class="temporary" v-if="this.total == 0">
        暂无提问
    </div>
  </div>
</template>
<script>
import { mapMutations, mapState } from "vuex";
import Nodata from "../../components/no-data/no-data"
export default {
  name: "vip_diagnosis",
  props: {},
  components:{
    Nodata
  },
  data() {
    return {
      appId:window.localStorage.getItem("appId"),//当前登录账号的Id,
      wangzhenlist:"",
      total:"",
    }
  },
  computed: {
    ...mapState(["huiyuanId"]),
  },
  watch: {},
  created(){
    this.getwanginfo(this.appId,this.$store.state.huiyuanId,1)
  },
  methods: {
    getwanginfo(appId,Id,page){
      this.$axios.fetchPost(
        "/Home/Treatment/GetWenList",
        {appId:appId,Id:Id,page:page}
      ).then(res=>{
        if(res.data.code == "200"){
          this.wangzhenlist = res.data.data
          this.total = res.data.count
          if(this.total == 0){
            // this.$refs.tips.aletiTipShow = true;
          }
        }
      })
    },
    godetail(item){
      console.log(item)
      this.$router.push({path:'/wangzhen_detail',query:{tid:item.tid,title:item.title}})
    }
  }
}
</script>
<style lang="stylus" scoped>
.vip_diagnosis-container
  .diagnosis-ul
    margin 0px 40px
    height 429px
    @media screen and (min-width:1900px) {
      height 741px
    }
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
    li
      border 1px solid rgba(255, 255, 255, 0.2)
      display flex
      text-align left
      height 220px
      padding-top 22px
      margin-bottom 11px
      &:hover
        outline 3px solid #FF6600
        box-shadow 0px 1px 26px #f60
      .icon
        width 30px
        height 35px
        background url('../vip_diagnosis/21.png') no-repeat
        background-position center
        background-size 100%
        margin 0 29px 0 22px
      .text
        flex 1
        .p1
          font-size 24px
          color #B5B5B5
          line-height 1.2
          overflow hidden
          text-overflow ellipsis
          white-space nowrap
          margin-bottom 20px
        .p2
          font-size 30px
          color #FFFFFF
          line-height 44px
      .answer
        width 140px
        margin 0 0 0 30px
        .p3
          font-size 24px
          color #B5B5B5
          margin-bottom 30px
          line-height 1.2
        .img
          width 110px
          height 110px
  .result-num
    text-align left
    margin-left 40px
    font-size 24px
    color #B5B5B5
    padding 30px 0
  .temporary
    font-size 30px
    line-height 36px
    color #FFFFFF
    width 300px
    height 200px
    position absolute
    top 50%
    left 50%
    transform translate(-50%, -50%); /* 50%为自身尺寸的一半 */
    -webkit-transform: translate(-50%, -50%);
</style>
