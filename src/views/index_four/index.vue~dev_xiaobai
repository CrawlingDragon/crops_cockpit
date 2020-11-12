<template>
  <div>
    <div
      class="container"
      v-if="loading !== false"
    >
      <div class="headnav">
          <Headnav
            :cur_cityname = this.cur_cityname
            :changemoudle = this.changemoudle
            :middle_title = this.middle_title
          >
          </Headnav>
      </div>
      <div class="content">
        <div>
          <div class="nav">
          <Navs
            v-bind:PercentArray="navHospitalArray"
            v-bind:activeProvince='activeProvince'
            v-bind:activeCity='activeCity'
            v-on:getName="getNavData"
            @out="loignOutBtn"
          ></Navs>
        </div>
          <div class="country-hospital">
            <Box>
              <CountryHospital
                v-bind:PercentArray=PercentArray
                :title="countryTitle"
              >
              </CountryHospital>
            </Box>
          </div>
          <div class="privent-hospital">
            <Box v-bind:showTitle=false>
              <PriventHospital
                :cityName="secondQuestName"
                :cityMap="letter"
                :proMapData="CurMpArray"
                @clickMapForData="getNavData"
              >
                <PriventHead
                  :Mpubcount=Mpubcount
                  :Usercount=Usercount
                  :Expertcount=Expertcount
                  :Servicecount=Servicecount
                  :Questioncount=Questioncount
                  :Recipecount=Recipecount
                  :Productamount="Productamount"
                ></PriventHead>
              </PriventHospital>
            </Box>
          </div>
            <div class="newest-online">
              <div class="newest-top">
                <Box v-bind:title=newDiDiagnosis>
                  <div class="newest-online-wrap first-wrap">
                    <NewestOnline :Replydata=Replydata></NewestOnline>
                  </div>
                </Box>
              </div>
              <div class="yinongtong">
                <Box
                  v-bind:title=title
                  v-bind:showTitle=false
                >
                  <div class="newest-online-wrap">
                    <YiNongTong
                      :isvideo="isvideo"
                      @openvideo="getshowflag"
                    >
                    </YiNongTong>
                  </div>
                </Box>
              </div>
            </div>
            <div class="swiper-hospital first-swiper">
              <Box v-bind:title=title>
                <SwiperHospital
                  :Mplocaldata="FineMpdata"
                  :selfUrl="'UserCenter/DataV/getHospitallist.html'"
                  :selfDetailUrl="'Web/Mpublic/detail.html?mId='"
                ></SwiperHospital>
              </Box>
            </div>
            <div class="swiper-hospital">
              <Box v-bind:title=title>
                <SwiperBase
                  :Mplocaldata="FineBasedata"
                  :selfUrl="'/UserCenter/DataV/getGoodBaselist.html'"
                  :selfDetailUrl="'Web/Company/detail?id='"
                ></SwiperBase>
              </Box>
            </div>
            <div class="ranking-list">
              <Box>
                <RankingList v-bind:afterExpphdata=Expphdata></RankingList>
              </Box>
            </div>
            <div class="ranking-list">
              <Box>
                <vipList
                  v-bind:colors=false
                  v-bind:Memberdata=Memberdata
                ></vipList>
              </Box>
          </div>
        </div>
        <!-- <div v-if="this.changemoudle =='find'">
          <Find></Find>
        </div> -->
      </div>
      <transition name="fade">
        <AlertTip ref="tips"></AlertTip>
      </transition>
      <div v-if="this.showvideoflag == 1" class="video-wrap">
        <div class="close-btn" style="cursor:pointer" @click="closealert">
            <span class="text1 jiantou">&lt;</span>
            <span class="text1 close">关闭</span>
        </div>
        <div class="liubai"></div>
        <video class="video" ref="video" autoplay="true" preload="auto" controls :src="this.isvideo.video_url"></video>
      </div>
    </div>
  </div>
</template>
<script>
import CountryHospital from "../../components/country-hospital/country-hospital";
import PriventHospital from "../../components/privent-hospital/privent-hospital";
import PriventHead from "../../components/privent-head/privent-head";
import NewestOnline from "../../components/newest-online/newest-online";
import SwiperBase from "../../components/swiper-base/swiper-base"
import SwiperHospital from "../../components/swiper-hospital/swiper-hospital"
import Navs from "../../components/navs/navs"
import Headnav from "../../components/head_nav/head_nav"
const YiNongTong = resolve=>require(["../../components/yinongtong/yinongtong"],resolve)
const RankingList = resolve=>require(["../../components/ranking-list/ranking-list"],resolve)
const vipList = resolve=>require(["../../components/vip-list/vip-list"],resolve)
const Box = resolve=>require(["../../components/box/box"],resolve)
const AlertTip = resolve=>require(["../../components/alertTip/alertTip"],resolve)
import { mapMutations, mapState } from "vuex";

export default {
  name: "index",
  data() {
    return {
      date: "",
      loading: false,
      newDiDiagnosis: "最新诊疗",
      expertRank: "专家排行榜",
      joinVip: "最新加入的会员",
      navList: [],
      title: "",
      userid: 54435,
      areaname: "杭州市",
      level: 3,
      indexData: {},
      letter: "",
      secondLevel: "", //右边地图数据的地址等级
      activeProvince: "", //默认选中的省 浙江
      activeCity: "", // 默认选中的城市  台州
      PercentArray: [],
      CurMpArray: [], //地图数据-数组
      Mpubcount: 0,
      Usercount: 0,
      Expertcount: 0,
      Servicecount: 0,
      Questioncount: 0,
      Recipecount: 0,
      Productamount: 0,
      Replydata: [],
      FineMpdata: [],
      Mplocaldata: [],
      FineBasedata: [],
      Expphdata: [],
      Memberdata: [],
      isvideo:{},//判断数据是否为空，控制益农通不同效果
      navHospitalArray: [], //导航----县乡镇医院数组
      confimFlag: false,
      changemoudle : 'index',
      cur_cityname:window.sessionStorage.getItem('name'),
      showvideoflag:false,//控制益农通视频点播
      curmoudle:'index',//控制头部左侧导航样式,
      middle_title:'新型庄稼医院管理驾驶舱'//中部标题
    };
  },
  methods: {
    //控制益农通视频播放
    getshowflag(msg){
      // 益农通传递参数表示当前有视频资源
      this.showvideoflag = msg
    },
    closealert(){
      // 关闭益农通播放视频弹窗
      this.showvideoflag = false
    },
    loignOutBtn() {
        // 退出登陆按钮
        this.$refs.confimBox.showFlag = true;
    },
    chooseHospital(num) {
      //选择所有/或者新型医院
      if (num == this.isstore) {
        return;
      }
      this.chooseHospitalRadio = num;
      if (num == 1) {
        this.getIsstore(1);
      } else {
        this.getIsstore(null);
      }
    },
    ...mapMutations([
      "getGlobalLevel",
      "getDefaultProvince",
      "getDefaultAddressArr",
      "getNoData",
      "getBreadArr",
      "getIsnav",
      "getIsstore"
    ]),
    getData(id, name, level, isClick) {
    if (isClick & (isClick != 0)) {
        const rLoading = this.openLoading();
        this.$axios
          .fetchPost(
            "/Home/NationwideDatav/GetDataVindex",
            {userid:id,areaname:name,level:level,isstore:this.isstore}
            
          )
          .then(res => {
            // this.FineMpdata = [];
              this.$parent.app_loading = false
              rLoading.close();
            if (res.data.code == 200) {
              this.isvideo = res.data.data.Video //益农通是否存在视频案例，得到的是一个包含视频资源的对象
              this.$parent.app_loading = false
              this.loading = true;
              this.indexData = res.data.data;
              this.PercentArray = this.indexData.PercentArray;
              this.CurMpArray = res.data.data.CurMpArray;//三级地址数组
              this.Mpubcount = this.indexData.Mpubcount;
              this.Usercount = this.indexData.Usercount;
              this.Expertcount = this.indexData.Expertcount;
              this.Servicecount = this.indexData.Servicecount;
              this.Questioncount = this.indexData.Questioncount;
              this.Recipecount = this.indexData.Recipecount;
              this.Productamount = this.indexData.Productamount;
              this.Replydata = this.indexData.Replydata;
              this.FineMpdata = this.indexData.FineMpdata;
              this.Mplocaldata = this.indexData.Mplocaldata;
              this.FineBasedata = this.indexData.FineBasedata;
              this.Expphdata = this.indexData.Expphdata;
              this.Memberdata = this.indexData.Memberdata;
              this.navHospitalArray = this.indexData.AreaMpArray;
              this.getBreadArr(res.data.nav);
              this.getNoData(false);
            } else if (res.data.code == 203) {
              this.getBreadArr(res.data.nav);
              this.getNoData(true);
              this.$refs.tips.aletiTipShow = true;
              this.loading = true;
            }
          });
      }
    },
    getNavData(obj) {
      //重新写入store的一级地址和等级
      //然后发送请求
      this.$refs.tips.aletiTipShow = false;
      this.getData(this.userid, obj.name, obj.level, obj.isClick);
      this.getGlobalLevel(obj.level); // 获取点击的地址等级
      this.getDefaultProvince(obj.name);
      this.getIsnav(1);
      if (obj.level > 2) {
        this.letter = obj.letter;
      }
    }
  },
  computed: {
    ...mapState(["isstore","accountName"]),
    accountName() {
      return this.$store.state.accountName;
    },
    firstQuestName() {
      //一级请求地址
      return this.$store.state.defaultProvince;
    },
    firstQuestLevel() {
      //一级请求等级
      return this.$store.state.globalLevel;
    },
    secondQuestName() {
      //二级方块请求地址
      return this.$store.state.defaultCity;
    },
    secondQuestElevel() {
      //二级方块请求地址等级
      return this.$store.state.secondGlobalLevel;
    },
    countryTitle() {
      return `${this.firstQuestName}建院情况`;
    }
  },
  mounted() {
    console.log(this.isvideo)
    this.userid = this.$route.query.userid;
    this.letter = this.$route.query.letter;
    this.navList = this.$store.state.defaultAddressArr; // 导航的省市乡县列表
    this.getData(this.userid, this.firstQuestName, this.firstQuestLevel, 1);
    // this.chooseHospitalRadio = this.isstore || "null";
  },
  components: {
    // Find,
    Navs,
    CountryHospital,
    Box,
    PriventHospital,
    NewestOnline,
    YiNongTong,
    SwiperHospital,
    RankingList,
    PriventHead,
    vipList,
    // Confim,
    AlertTip,
    SwiperBase,
    Date,
    Headnav
    // Loadings
  },
  watch: {
    isstore(newVal) {
      this.$router.go(0);
      // console.log("1 :>> ", 1);
    },
    changemoudle(newVal,oldVal){
      if(oldVal == 'find'){
        // console.log(this.userid, this.firstQuestName, this.firstQuestLevel, 1)
        this.navList = this.$store.state.defaultAddressArr
        this.getData(this.userid, this.firstQuestName, this.firstQuestLevel, 1);
      }
    }
  },
  beforeDestroyed(){
    console.log('1 :>> ', 1);
  }
};
</script>
<style lang="stylus" scoped>
/deep/ .change-box {
  @media screen and (min-width:1900px) {
    top 80px 
    right 255px 
  }
}
bg-image($url) 
    @media (-webkit-min-device-pixel-ratio: 2),(min-device-pixel-ratio: 2) 
        background-image: url($url + "@2x.png")
.container
  width 100%
  height 100%
  background-color #080f3e
  position relative
  z-index 222
  .headnav
    position fixed
    z-index 9999999
    min-width 1340px
    width 100%
  .content
    width 1340px
    height calc(100vh)
    margin 0 auto
    position relative
    padding-top 50px
    @media screen and (min-width:1900px){
      width 1900px
      padding-top 103px
    }
    background url('./index-bj.jpg') no-repeat
    .country-hospital
      width 315px
      height 430px
      float left
      margin-bottom 10px
      margin-right 9px
      margin-left 25px
      margin-top 14px
      @media screen and (min-width:1900px){
        margin 17px 20px 19px 40px
        width 440px
        height 560px
      }
      background: #00002D;
      border: 1px solid #1B4E79;
    .privent-hospital
      width 640px
      height 430px
      background: #00002D;
      border: 1px solid #1B4E79;
      float left
      margin-bottom 10px
      margin-right 9px
      margin-top 14px
      @media screen and (min-width:1900px){
        margin 17px 20px 19px 0px
        width 900px
        height 560px
      }
    .newest-online
      width 315px
      height 270px
      float left
      margin-bottom 10px
      margin-top 14px
      @media screen and (min-width:1900px){
        margin 17px 0px 19px 0px
        width 440px
        height 330px
      }
    .first-wrap
      width 315px
      height 270px
      @media screen and (min-width:1900px){
        width 440px
        height 330px
      }
      .newest-top
        height 270px
    .yinongtong
      margin-top 9px !important
      height 150px
      @media screen and (min-width:1900px){
        margin 0px 0px 19px 0px
        margin-top 19px !important
        width 440px
        height 210px
      }
    .swiper-hospital
      width 315px
      height 215px
      float left
      margin-right 9px
      @media screen and (min-width:1900px){
        margin 0px 19px 19px 0px
        width 440px
        height 270px
      }
      background: #00002D;
      border: 1px solid #1B4E79;
      // opacity: 0.6;
    .first-swiper
      margin-left 25px
      @media screen and (min-width:1900px){
        margin-left 40px
      }
    .ranking-list
      width 315px
      height 215px
      float left
      background: #00002D;
      border: 1px solid #1B4E79;
      // opacity: 0.6;
      margin-right 9px
      @media screen and (min-width:1900px){
        margin-right 19px
        width 440px
        height 270px
      }
      &:last-child
        margin-right 0
  .video-wrap
    width 100%
    height 1080px
    position fixed
    left 0
    top 0
    bottom 0
    background rgb(0, 0, 45)
    z-index 9999999999999
    .close-btn
      padding-top 15px
      .text1
          font-size 20px
          color #7FB5F1
          border-radius: 2px
      .jiantou
          position absolute
          left 25px
      .close
          position absolute
          left 45px
    .liubai
        padding-bottom 50px
    .video
        outline none
        width 80%
</style>