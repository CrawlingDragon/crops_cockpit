<template>
  <div class="jianjie">
    <Header
      :title="title"
      midTitle="测土配方详情"
      :right_show_bar="false"
      :istown="istown"
      :aId="aId"
    ></Header>
    <div class="title">
      <span>{{ cetuinfo.title }}</span>
      <div class="status">
        <div
          :class="[
            this.cetuinfo.teststatus == 1
              ? 'icon icon-ing'
              : this.cetuinfo.teststatus == 2
              ? 'icon icon-success'
              : 'icon icon-way'
          ]"
        ></div>
        <span class="status_text">{{
          cetuinfo.teststatus == 1
            ? "检测中"
            : this.cetuinfo.teststatus == 2
            ? "检测完成"
            : "已给处方"
        }}</span>
      </div>
    </div>
    <div class="content">
      <div class="con_left" @click="watchdetail('3')">
        <div class="left_title">土壤信息</div>
        <div class="cetu_number text1">
          测土单号：{{ this.cetuinfo.idnumber }}
        </div>
        <div class="weizhi text1">
          土壤位置：{{ this.$route.query.address }}
        </div>
        <div class="show_time text1">{{ this.cetuinfo.showtime }}</div>
        <div class="mushu text1">亩数：{{ this.cetuinfo.crop_position }}</div>
        <div class="charge_per text1">
          测试专家：{{ this.cetuinfo.tester_expert }}
        </div>
        <div class="cetu_result text1">
          <div class="title1">测土配方结果</div>
          <span class="zhibiao">{{ this.cetuinfo.hl_h }}</span>
          <span class="zhibiao">{{ this.cetuinfo.hl_k }}</span>
          <span class="zhibiao">{{ this.cetuinfo.hl_p }}</span>
          <span class="zhibiao">{{ this.cetuinfo.hl_ph }}</span>
          <span class="zhibiao">{{ this.cetuinfo.hl_salt }}</span>
        </div>
      </div>
      <div class="con_right" @click="watchdetail('4')">
        <div class="right_title">处方信息</div>
        <div class="huifu_info">
          {{ cetuinfo.result }}
        </div>
        <div class="no_data" v-if="this.cetuinfo.result == ''">
          医院暂时还没有回复
        </div>
      </div>
    </div>
    <div class="bottom">
      <div class="chufang">
        <img src="../../assets/24.png" alt="" />
        <div class="text2">处方药（{{ this.yao_number }}）</div>
      </div>
      <div class="swiper-container" ref="mySwiper">
        <div class="swiper-wrapper">
          <div
            class="swiper-slide yao "
            v-for="(item, index) in this.cetuinfo.products"
            :key="index"
            @click="goToDetail(item.id)"
          >
            <div class="shadow"></div>
            <img :src="item.thumb_pic" alt="" />
            <p class="yao_name">{{ item.name }}</p>
          </div>
        </div>
        <div class="swiper-scrollbar" v-if="this.yao_number != 0"></div>
      </div>
      <div class="no_yao" v-if="this.yao_number == 0">
        <img src="../../assets/65.png" alt="" />
      </div>
    </div>
    <div class="detail" ref="detail">
      <Detail
        :detailinfo="this.cetuinfo"
        :godetail="this.godetail"
        :title="this.alert_title"
      ></Detail>
    </div>
  </div>
</template>
<script>
import Detail from "../../components/zhenliao_alert/zhenliao_alert";
import Header from "@/components/online_hospital_header/online_hospital_header";
import { mapState, mapMutations } from "vuex";
import Swiper from "swiper";
export default {
  data() {
    return {
      cetuinfo: "", // 测土配方信息
      products: "", // 药物信息,
      yao_number: "", // 药物数量
      godetail: "", // 判断是从何处打开了弹窗
      alert_title: "", // 弹窗title
      title: "",
      queryAppId: this.$route.query.appId,
      istown: 0,
      aId: ""
    };
  },
  created() {
    if (this.$route.query.appId != undefined) {
      this.setAppId(this.queryAppId);
    }
    console.log("this.queryAppId :>> ", this.queryAppId);
  },
  mounted() {
    if (this.$route.query.appId != undefined) {
      this.setAppId(this.queryAppId);
      this.getcetuinfo("testingsoil", this.$route.query.id);
    } else {
      this.getcetuinfo("testingsoil", this.$route.query.id);
    }
  },
  components: {
    Detail,
    Header
  },
  computed: {
    ...mapState(["appId", "purview", "lowerHospital"])
  },
  methods: {
    ...mapMutations(["setLowerHospital", "setAppId"]),
    goToDetail(id) {
      this.$router.push({
        path: "/goods_detail",
        query: { id: id }
      });
    },
    topre() {
      this.$router.go(-1);
    },
    init(pagesize) {
      var self = this;
      var mySwiper = new Swiper(".swiper-container", {
        spaceBetween: 30,
        slidesPerView: pagesize,
        autoplay: true,
        scrollbar: {
          el: ".swiper-scrollbar",
          hide: false,
          draggable: true,
          dragSize: 20 // 设置滚动条20
        }
      });
    },
    watchdetail(godetails) {
      this.godetail = godetails;
      if (godetails == 4) {
        if (this.cetuinfo.result == "") {
          //如果处方信息为空则什么也不做
        } else {
          this.alert_title = "处方信息";
          this.$refs.detail.style = "display:block";
        }
      }
      if (godetails == 3) {
        this.alert_title = "土壤信息详情";
        this.$refs.detail.style = "display:block";
      }
    },
    getcetuinfo(frommodule, Id) {
      this.$axios
        .fetchPost("/Home/Treatment/GetRecipetemDetail", {
          appId: this.appId,
          module: frommodule,
          Id: Id
        })
        .then(res => {
          if (res.data.code == "200") {
            this.cetuinfo = res.data.data;
            this.setLowerHospital(res.data.data.mpublic);
            this.setAppId(res.data.data.appid);
            this.aId = res.data.data.appid;
            this.istown = res.data.data.istown;
            this.title =
              this.purview == 3 || this.purview == 4 || this.purview == 46
                ? res.data.data.mpublic
                : "测土配方详情";
            if (res.data.data.products == "") {
              this.yao_number = 0;
            } else {
              this.yao_number = Object.keys(res.data.data.products).length;
            }
            this.$nextTick(() => {
              this.init(5);
            });
          }
        });
    },
    watchGooddetail(item) {
      // 跳转到 商品详情页面
      this.$router.push({ path: "/goods_detail", query: { id: item.id } });
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
      .status
          float right
          font-size 30px
          line-height 32px
          color #FF6600
          .icon
              margin-right 21px
              width 40px
              height 40px
              vertical-align middle
              display inline-block
          .icon-ing
              background url('../second_tu/35.png') no-repeat
              background-position center
              background-size 40px 40px
          .icon-success
              background url('../second_tu/36.png') no-repeat
              background-position center
              background-size 100%
          .icon-way
              background url('../second_tu/27.png') no-repeat
              background-position center
              background-size 100%
          .status_text
              vertical-align middle
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
          .cetu_result
              margin-top 20px
              .title1
                  font-size 30px
                  color #FFFFFF
              .zhibiao
                  width 45%
                  margin-right 10px
                  display inline-block
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
              overflow  hidden
              text-overflow ellipsis
              display -webkit-box
              -webkit-line-clamp 9
              -webkit-box-orient vertical
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
          bbackground #091D44
          border 1px solid rgba(255, 255, 255, 0.2)
          margin-right 40px
          float left
          img
              margin 56px 40px 46px 40px
          .text2
              margin 40 auto
              font-size 30px
              line-height 40px
      .swiper-container
          .swiper-slide
            text-align center
            font-size 18px
            /* Center slide text vertically */
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
                left 25px
                right 44px
                width 270px
                text-align left
                font-size 24px
                overflow hidden
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
                width 270px
                background linear-gradient(to top,rgba(000,000,000,0.8) 5%,transparent 40%,transparent 100%)
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
  .detail
      display none
.miaoshu
  display -webkit-box
  text-overflow ellipsis
  overflow hidden
  display -webkit-box
  -webkit-line-clamp 2
  -webkit-box-orient vertical
</style>
