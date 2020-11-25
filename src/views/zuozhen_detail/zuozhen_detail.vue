<template>
  <div class="jianjie">
    <Header :title="title" midTitle="坐诊详情" :right_show_bar="false"></Header>
    <div class="title">{{ zl_detail.title }}</div>
    <div class="content">
      <div class="con_left" @click="watchdetail(1)">
        <div class="left_title">作物病情资料</div>
        <div class="plant_mode text1">{{ this.zl_detail.crop_pattern }}</div>
        <div class="bf_chengdu text1">{{ this.zl_detail.crop_position }}</div>
        <div class="show_time text1">{{ this.zl_detail.showtime }}</div>
        <div class="miaoshu text1">{{ this.zl_detail.content }}</div>
        <div class="pictures">
          <span>病情图片（{{ imgLength }}）</span>
          <div class="pics">
            <img
              v-for="(item, index) in this.zl_detail.pic"
              :key="index"
              :src="item"
              alt=""
            />
          </div>
        </div>
      </div>
      <div class="con_right" @click="watchdetail(4)">
        <div class="right_title">处方信息</div>
        <div class="huifu_info" v-if="this.zl_detail.result != ''">
          {{ zl_detail.result }}
          <!-- <div v-for="(item, index) in this.zl_detail.result" :key="index">
            <div class="huifu_person">{{ item.chufang_expert }}</div>
            <div class="huifu_nr">{{ item.result }}</div>
          </div> -->
        </div>
        <div class="no_data" v-if="this.zl_detail.result == ''">
          医院暂时还没有回复
        </div>
      </div>
    </div>
    <div class="bottom">
      <div class="chufang">
        <img src="../../assets/24.png" alt="" />
        <div class="text2">处方药（{{ this.yao_number }}）</div>
      </div>
      <div
        class="yao"
        v-for="(item, index) in this.zl_detail.products"
        :key="index"
        @click="goToDetail(item.id)"
      >
        <div class="shadow"></div>
        <img :src="item.thumb_pic" alt="" />
        <p class="yao_name">{{ item.name }}</p>
      </div>
      <div class="no_yao" v-if="this.yao_number == 0">
        <img src="../../assets/65.png" alt="" />
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
import Detail from "../../components/zhenliao_alert/zhenliao_alert";
import Header from "@/components/online_hospital_header/online_hospital_header";
import { mapState } from "vuex";

export default {
  data() {
    return {
      zl_detail: {}, // 诊疗详情
      replay: "", // 网诊回复信息
      appId: localStorage.getItem("appId"),
      yao_number: "", // 处方药数量
      godetail: "", // 判断是从何处打开了弹窗
      alert_title: "", // 弹窗title
      title: "",
      imgLength: 0
    };
  },
  computed: {
    ...mapState(["purview", "lowerHospital"])
  },
  mounted() {
    this.getWangzhendetail(this.appId, "wenzhen", this.$route.query.tid);
    this.$refs.detail.style = "display:none";
    this.title =
      this.purview == 3 || this.purview == 4 ? this.lowerHospital : "坐诊详情";
  },
  components: {
    Detail,
    Header
  },
  methods: {
    goToDetail(id) {
      this.$router.push({
        path: "/goods_detail",
        query: { id: id }
      });
    },
    watchdetail(godetails) {
      this.godetail = godetails;
      if (godetails == 1) {
        this.alert_title = "作物病情资料";
        this.$refs.detail.style = "display:block";
      }
      if (godetails == 4) {
         if(this.zl_detail.result == ""){
          //如果处方信息为空则什么也不做
        }else{
          this.alert_title = "处方信息";
          this.$refs.detail.style = "display:block";
        }
      }
    },
    getWangzhendetail(appId, frommodule, Id) {
      this.$axios
        .fetchGet("/Home/Treatment/GetRecipetemDetail", {
          appId: appId,
          module: frommodule,
          Id: Id
        })
        .then(res => {
          console.log(res);
          if (res.data.code == 200) {
            console.log(res);
            this.zl_detail = res.data.data;
            this.imgLength =
              res.data.data.pic == "" ? 0 : res.data.data.pic.length;
            //   this.replay = res.data.answers
            if (res.data.data.products == "") {
              this.yao_number = 0;
            } else {
              this.yao_number = Object.keys(res.data.data.products).length;
            }
          }
        });
    }
  }
};
</script>
<style lang="stylus" scoped>
.jianjie
  margin 0 40px
  padding-top 100px
  .title
      font-size 34px
      text-align left
      margin-bottom 31px
  .content
      width 100%
      height 460px
      .con_left
          float left
          height 460px
          width 36%
          background #091D44
          border 1px solid rgba(255, 255, 255, 0.2)
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
          background #091D44
          border 1px solid rgba(255, 255, 255, 0.2)
          overflow  hidden
          .right_title
              font-size 30px
              margin 19px auto 8px 29px
          .huifu_info
              margin auto 22px 12px 28px
              line-height 40px
              font-size 24px
              color #B5B5B5
              height 360px
              overflow hidden
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
          background #091D44
          border 1px solid rgba(255, 255, 255, 0.2)
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
              display -webkit-box
              text-overflow ellipsis
              overflow: hidden;
              display: -webkit-box;
              -webkit-line-clamp: 2;
              -webkit-box-orient: vertical;
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
          background #091D44
          border 1px solid rgba(255, 255, 255, 0.2)
          img
              height 120px
              width 175px
              margin 75px 47px
.miaoshu
  display -webkit-box
  text-overflow ellipsis
  overflow hidden
  display -webkit-box
  -webkit-line-clamp 2
  -webkit-box-orient vertical
</style>
