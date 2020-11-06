<template>
  <div class="index_second-container">
    <Header title="黄泽黄桃专科医院">
      <div class="del-icon" @click="open"></div>
    </Header>
    <div class="second-container">
      <div class="left-bar">
        <div class="swiper-box">
          <!-- <SwiperBox></SwiperBox> -->
        </div>
        <div class="mid-nav">
          <div class="item1"></div>
          <div class="item2"></div>
          <div class="item3"></div>
          <div class="item4"></div>
        </div>
        <div class="bottom-bar">
          <div class="item">
            <div class="l">
              <div class="icon icon01"></div>
              <p class="p1">专家回复</p>
              <p class="p2">排行榜</p>
            </div>
            <div class="r">
              <div class="list">
                <span class="number number1">1</span>
                <span class="name">沈斌</span>
              </div>
              <div class="list">
                <span class="number number2">2</span>
                <span class="name">沈斌</span>
              </div>
              <div class="list">
                <span class="number number3">3</span>
                <span class="name">沈斌</span>
              </div>
            </div>
          </div>
          <div class="item">
            <div class="l">
              <div class="icon icon02"></div>
              <p class="p2">新增</p>
              <p class="p2">会员</p>
            </div>
            <div class="r">
              <div class="list">
                <span class="num"></span>
                <span class="name">沈斌</span>
              </div>
              <div class="list">
                <span class="num"></span>
                <span class="name">沈斌</span>
              </div>
              <div class="list">
                <span class="num"></span>
                <span class="name">沈斌</span>
              </div>
            </div>
          </div>
        </div>

      </div>
      <div class="right-bar">
        <div class="list-wrap">
          <IndexSecondImgList></IndexSecondImgList>
        </div>
        <div class="cetu-wrap">
          <Cetu></Cetu>
        </div>
        <div class="online-wrap">
          <Online></Online>
        </div>
      </div>
    </div>
    <div class="nav-box">
      <NavList></NavList>
    </div>
  </div>
</template>
<script>
import Header from "@/components/headers/headers";
import IndexSecondImgList from "@/components/index_second_img_list/index_second_img_list";
import Cetu from "@/components/cetu_list/cetu_list";
import Online from "@/components/online_list/online_list";
import NavList from "@/components/nav_list/nav_list";
import SwiperBox from "@/components/swiper_box/swiper_box";
export default {
  name: "index_second",
  components: { Header, IndexSecondImgList, Cetu, NavList, Online, SwiperBox },
  props: {},
  data() {
    return {};
  },
  computed: {},
  watch: {},
  mounted() {},
  destroyed() {},
  methods: {
    open() {
      // alert(1);
    }
  }
};
</script>
<style lang="stylus" scoped>
.index_second-container
  .del-icon
    width 35px
    height 35px
    background url('./17.png') no-repeat
    background-size 35px 35px
    margin-right 10px
    cursor pointer
  .nav-box
    position fixed
    left 0
    bottom 0
    right 0
  .second-container
    margin 0 40px
    display flex
    .left-bar
      flex 1
      margin-right 20px
      .swiper-box
        width 100%
        height 420px
        background pink
        margin-bottom 20px
      .mid-nav
        display flex
        & > div
          flex 1
          margin-right 20px
          height 200px
          cursor pointer
          &:last-child
            margin-right 0
        .item1
          background url('./47.png') no-repeat
          background-size 100% 100%
        .item2
          background url('./48.png') no-repeat
          background-size 100% 100%
        .item3
          background url('./49.png') no-repeat
          background-size 100% 100%
        .item4
          background url('./50.png') no-repeat
          background-size 100% 100%
      .bottom-bar
        display flex
        margin-top 20px
        & > .item
          flex 1
          display flex
          padding 12px 0 19px
          background rgba(9, 29, 68, 1)
          border 2px solid rgba(7, 47, 101, 1)
          &:first-child
            margin-right 20px
          .l
            width 153px
            border-right 2px solid #072F65
            .icon
              width 29px
              height 31px
              margin 0 auto 15px
              &.icon01
                background url('./55.png') no-repeat
                background-size 29px 31px
              &.icon02
                background url('./56.png') no-repeat
                background-size 28px 27px
                margin-bottom 10px
            .p1
              font-size 24px
              line-height 1.2
            .p2
              font-size 32px
              line-height 1.2
          .r
            flex 1
            padding-left 30px
            .list
              margin-bottom 5px
              text-align left
              .number
                border-radius 50%
                width 30px
                height 30px
                text-align center
                display inline-block
                vertical-align middle
                color #fff
                line-height 30px
                font-size 24px
              .number1
                background rgba(250, 139, 0, 0.7)
              .number2
                background rgba(236, 74, 6, 0.7)
              .number3
                background rgba(169, 108, 105, 0.7)
              .name
                font-size 24px
                margin-left 30px
                display inline-block
                vertical-align middle
              .num
                width 5px
                height 5px
                background rgba(250, 139, 0, 1)
                border-radius 50%
                display inline-block
                vertical-align middle
    .right-bar
      flex 1
      display flex
      flex-wrap wrap
      .list-wrap
        margin-bottom 40px
        width 100%
      .cetu-wrap
        flex 1
        margin-right 33px
      .online-wrap
        flex 1
</style>
