<template>
  <div class="paihang_content">
    <div>
      这是头部
    </div>
    <div class="swiper-container" ref="mySwiper">
      <div class="swiper-wrapper">
        <div
          class="swiper-slide"
          v-for="(item, index) in this.expert_info"
          :key="index"
        >
          <img :src="item.avatar" alt="" />
        </div>
      </div>
      <div class="swiper-button-prev"></div>
      <div class="swiper-button-next"></div>
    </div>
    <div class="single_info">
      <div class="left">
        <div class="mingci text1">NO.{{ this.activeIndex + 1 }}</div>
        <div class="name text1">{{ this.realname }}</div>
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
  </div>
</template>
<script>
import Swiper from "swiper";
export default {
  data() {
    return {
      appId: localStorage.getItem("appId"), // 管理院的appId
      page: 1,
      limit: 5,
      pageShownumber: 3, // 控制轮播图显示几个一页
      expert_info: "",
      cur_level: 0,
      activeIndex: 0,
      realname: "", // 专家姓名
      paiming: "",
      position: "",
      zuowu: "",
      replycounts: ""
    };
  },
  created() {
    this.getExpertinfo(this.appId, 1, "", this.page, this.limit);
  },
  mounted() {},
  methods: {
    init(pagesize) {
      var self = this;
      var mySwiper = new Swiper(".swiper-container", {
        spaceBetween: 30,
        loop: true,
        slidesPerView: pagesize,
        centeredSlides: true,
        pagination: {
          el: ".swiper-pagination",
          clickable: true
        },
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev"
        },
        on: {
          slideChangeTransitionEnd: function() {
            console.log(this.realIndex);
            self.activeIndex = this.realIndex;
          }
          // transitionStart(){ // 开始translate之前触发
          //     // 如果是第一张
          //     if(this.activeIndex == 0){
          //         this.setTranslate(0); // 因为左边会空出一张图的距离，所以设置位移为0
          //     }
          // },
        }
      });
    },
    getExpertinfo(appId, purview, ordertag, page, limit) {
      this.$axios
        .fetchPost("/Home/Expert/GetMpExpertRank", {
          appId: appId,
          purview: purview,
          ordertag: ordertag,
          page: page,
          limit: limit
        })
        .then(res => {
          console.log(res);
          if (res.data.code == "200") {
            this.expert_info = res.data.data;
            this.realname = this.expert_info[0].realname;
            this.position = this.expert_info[0].position;
            this.zuowu = this.expert_info[0].zuowu;
            this.replycounts = this.expert_info[0].replycounts;
            if (res.data.data.length - 0 < 5) {
              this.pageShownumber = res.data.data.length - 0;
              this.$nextTick(() => {
                this.init(this.pageShownumber);
              });
            } else {
              this.$nextTick(() => {
                this.pageShownumber = 5;
                this.init(this.pageShownumber);
              });
            }
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
/deep/.swiper-pagination .swiper-pagination-bullet:focus {
           outline: none;
    }
.paihang_content
    margin 0 40px
    font-size MicrosoftYaHei
    font-weight Regular
    .swiper-container
        margin-top 218px
        width 100%
        height 350px
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
        position fixed
        top 623px
        right 40px
        height 240px
        border 1px solid rgba(255, 255, 255, 0.2)
        width 80px
        span:focus
            outline none
    .swiper-button-prev
        position fixed
        top 623px
        left 40px
        height 240px
        border 1px solid rgba(255, 255, 255, 0.2)
        width 80px
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
        .left
            width 22.6%
            height 238px
            border-right 1px solid rgba(255, 255, 255, 0.2)
            .text1
                font-size 50px
                color #FFFFFF
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
</style>
