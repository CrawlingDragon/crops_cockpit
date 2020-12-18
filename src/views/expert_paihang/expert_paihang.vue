<template>
  <div class="paihang_content">
    <Header
      :title="title"
      :right_show_bar="false"
      midTitle="专家回复排行榜"
    ></Header>
    <div class="swiper-container" v-if="this.total > 0">
      <div class="swiper-wrapper" style="height :350px;">
        <div
          class="swiper-slide"
          v-for="(item, index) in this.expert_info"
          :key="index"
          @click="goToExpertDetail(item.uid)"
        >
          <img :src="item.avatar" alt="" />
        </div>
      </div>
      <div class="swiper-button-prev" ref="prev"></div>
      <div class="swiper-button-next" ref="next"></div>
    </div>
    <div class="single_info" v-if="this.total > 0">
      <div class="left">
        <div class="mingci text1">NO.{{ this.activeIndex + 1 }}</div>
        <p class="name text2">{{ this.realname }}</p>
      </div>
      <div class="right">
        <div class="intros">
          <div class="text2">擅长作物：{{ this.zuowu }}</div>
          <div>{{ this.position }}</div>
        </div>
        <div class="huifu">
          <span class="text3">总回复</span>
          <span class="text4">{{ this.replycounts }}</span>
        </div>
      </div>
    </div>
    <div class="temporary" v-if="this.total == 0">
      暂无排行榜
    </div>
  </div>
</template>
<script>
import Header from "@/components/online_hospital_header/online_hospital_header";
import Swiper from "swiper";
import { mapState } from "vuex";
export default {
  data() {
    return {
      expert_info: "",
      cur_level: 0,
      activeIndex: 0,
      realname: "", // 专家姓名
      paiming: "",
      position: "",
      zuowu: "",
      replycounts: "",
      total: "", //获取到的数据数量
      title: ""
    };
  },
  components: { Header },
  created() {
    this.getExpertinfo(this.appId);
  },
  computed: {
    ...mapState(["appId", "purview", "lowerHospital", "isLowerHospital"])
  },
  mounted() {
    this.title =
      this.purview == 3 || this.purview == 4
        ? this.lowerHospital
        : "专家回复排行榜";
  },
  methods: {
    goToExpertDetail(uid) {
      this.$router.push({
        path: "/expert_detail",
        query: { uid: uid }
      });
    },
    init(pagesize) {
      var self = this;
      var mySwiper = new Swiper(".swiper-container", {
        spaceBetween: 30,
        slidesPerView: pagesize,
        centeredSlides: true,
        slidesPerView: 5, //可见个数2
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev"
        },
        on: {
          slideChangeTransitionEnd: function() {
            console.log(this.activeIndex);
            self.activeIndex = this.activeIndex;
          }
        }
      });
    },
    getExpertinfo(appId, purview, ordertag, page, limit) {
      this.$axios
        .fetchGet("/Home/Expert/GetMpExpertRank", {
          appId: appId,
          purview: this.purview == 46 && this.isLowerHospital == "false" ? 1 : 0
        })
        .then(res => {
          console.log(res);
          if (res.data.code == "200") {
            this.expert_info = res.data.data;
            this.realname = this.expert_info[0].realname;
            this.position = this.expert_info[0].position;
            this.zuowu = this.expert_info[0].zuowu;
            this.replycounts = this.expert_info[0].replycounts;
            this.total = res.data.data.length - 0;
            this.$nextTick(() => {
              this.init(5);
            });
          }
        });
    }
  },
  watch: {
    activeIndex(newVal) {
      this.realname = this.expert_info[newVal].realname;
      this.position = this.expert_info[newVal].position;
      this.zuowu = this.expert_info[newVal].zuowu;
      this.replycounts = this.expert_info[newVal].replycounts;
    }
  }
};
</script>
<style lang="stylus" scoped>
.paihang_content
    padding-top 100px
    margin 0 40px
    font-size MicrosoftYaHei
    font-weight Regular
    .swiper-container
        width 100%
        height 620px
        padding-bottom 20px
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
            transform scale(0.8)
            line-height 350px
            align-items center
            img
                width 250px
                height 250px
                border-radius 50%
        .swiper-slide-active
            transform scale(1)
            img
                width 320px
                height 320px
                border-radius 50%
                border 3px solid #FF6600
                box-shadow 0px 1px 26px #f60
        .swiper-slide-duplicate-active
            transform scale(1)
            border 1px solid red
            img
                width 320px
                height 320px
                border-radius 50%
                outline 3px solid #FF6600
                box-shadow 0px 1px 26px #f60
    .swiper-button-next
        position absolute
        top 383px !important
        right 0
        height 240px
        border 1px solid rgba(255, 255, 255, 0.2)
        width 80px
        outline none !important
        span:focus
          outline none
    .swiper-button-prev
        position absolute
        top 383px !important
        left 0
        height 240px
        border 1px solid rgba(255, 255, 255, 0.2)
        width 80px
        outline none !important
        span:focus
          outline none
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
        position: relative;
        top: -280px;
        .left
            width 22.6%
            height 238px
            border-right 1px solid rgba(255, 255, 255, 0.2)
            .text1
                font-size 40px
                color #FFFFFF
            .text2
                font-size 40px
                color #FFFFFF
                overflow: hidden;
                text-overflow:ellipsis;
                white-space: nowrap;
                padding-left 15px
            .mingci
                margin-top 48px
                text-align left
                margin-left 130px
                margin-bottom 20px
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
