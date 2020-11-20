<template>
  <div class="tu-container">
    <ul class="tu-ul" v-infinite-scroll="load" infinite-scroll-distance="15px">
      <li v-for="(item,index) in cetulist " :key="index" @click="godetail(item)">
        <div class="icon"></div>
        <div class="text">
          <p class="p1">
            {{item.title}}
            <span>ID:{{item.idnumber}}</span>
          </p>
          <p class="p2">{{item.address}}</p>
          <p class="p3">{{item.showtime}}</p>
        </div>
        <div class="test-status">
          <div  :class='[item.status == 1?"icon icon-ing":item.status==2?"icon icon-way":"icon icon-success"]'></div>
          <p>{{item.status == 1?"检测中":item.status==2?"检测完成":"已给处方"}}</p>
        </div>
      </li>
    </ul>
    <div class="total">共计{{this.total}}个结果</div>
    <div class="temporary" v-if="this.total == 0">
        暂无测土配方
    </div>
  </div>
</template>
<script>
import { mapMutations, mapState } from "vuex";
export default {
  data() {
    return {
      page:1,//当前页数，
      cetulist:"",//测土配方列表
      pagesize:"",//每页显示的数据
      status:"",
      total:""
    }
  },
  computed: {
    ...mapState(["huiyuanId","appId"]),
  },
  mounted(){
    this.getcetuinfo(this.appId,this.page,window.sessionStorage.getItem("huiyuan_id"))
  },
  methods: {
    getcetuinfo(appId,page,Id){
      this.$axios.fetchPost(
        "/Home/Treatment/GetTestingsoilList",
        {appId:appId,page:page,textstatus:"",Id:Id,purview:1}
      ).then(res=>{
        if(res.data.code == "200"){
            this.total = res.data.count
             if(this.page == 1){
              this.cetulist = res.data.data
            }else{
              this.cetulist.push(...res.data.data)
            }
        }
      })
    },
    godetail(item){
      console.log(item)
      this.$router.push({path:"/cetu_detail",query:{id:item.id,title:item.title,address:item.address}})
    },
    load() {
          // 是否当前page不是最后一页
      if (this.page < Math.ceil(this.total/12)) {
          // 页码+1
          this.page++;
          this.getcetuinfo(this.appId,this.page,window.sessionStorage.getItem("huiyuan_id"))
      }
    }
  }
}
</script>
<style lang="stylus" scoped>
.tu-container
  margin 0 40px
  .tu-ul
    margin 0px auto
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
    & > li
      background rgba(9, 29, 67, 0.4)
      border 1px solid rgba(255, 255, 255, 0.2)
      margin-bottom 11px
      padding 30px 0 0 22px
      display flex
      & > .icon
        width 22px
        height 29px
        background url('../../assets/63.png') no-repeat
        background-position center
        background-size 100%
        margin 0 28px 0 22px
      .text
        flex 1
        margin-bottom 10px
        text-align left
        .p1
          font-size 36px
          font-family SimHei
          font-weight Regular
          color rgba(255, 255, 255, 1)
          line-height 1.2
          margin-top -3px
          margin-bottom 15px
          span
            margin-left 20px
            font-size 24px
            color rgba(181, 181, 181, 1)
        .p2, .p3
          color #B5B5B5
          font-size 24px
          line-height 40px
      .test-status
        min-width 260px
        line-height 120px
        & > .icon
          width 40px
          height 40px
          display inline-block
          margin-right 21px
          vertical-align middle
          &.icon-ing
            background url('../second_tu/35.png') no-repeat
            background-position center
            background-size 100%
          &.icon-success
            background url('../second_tu/36.png') no-repeat
            background-position center
            background-size 100%
          &.icon-way
            background url('../second_tu/27.png') no-repeat
            background-position center
            background-size 100%
        p
          color #FF6500
          font-size 36px
          display inline-block
          vertical-align middle
.total
    position fixed
    left 40px
    bottom 79px
    color #B5B5B5
    font-size 24px
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
