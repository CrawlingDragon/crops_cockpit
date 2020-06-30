<template>
  <div>
    <Headers
      logoSrc="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1592223004241&di=e1ea4d4a1d3237e81b1ae84e5299a2b6&imgtype=0&src=http%3A%2F%2Fcdn.duitang.com%2Fuploads%2Fitem%2F201202%2F13%2F20120213114436_HxfS5.jpg
"
      title="浙江省网上庄稼医院"
    ></Headers>
    <div class="index-container">
      <div class="left">
        <ul>
          <li>
            <div class="title">
              庄稼
              <br />医院
            </div>
            <div class="text">
              <p>
                56所
                <br />
                <span class="small">
                  其中
                  <span class="num">5</span>
                  所实体店
                </span>
              </p>
            </div>
            <div class="up">
              <span class="icon"></span>
              <span class="up-num">2</span>
            </div>
          </li>
          <li>
            <div class="title">专家</div>
            <div class="text">804位</div>
            <div class="up">
              <span class="icon"></span>
              <span class="up-num">2</span>
            </div>
          </li>
          <li>
            <div class="title">会员</div>
            <div class="text">64825个</div>
            <div class="up">
              <span class="icon"></span>
              <span class="up-num">2</span>
            </div>
          </li>
          <li>
            <div class="title">三诊</div>
            <div class="text">258635次</div>
          </li>
          <li>
            <div class="title">
              测土
              <br />配方
            </div>
            <div class="text">100次</div>
          </li>
        </ul>
      </div>
      <div class="mid">
        <hospital></hospital>
      </div>
      <div class="right">
        <div class="message">
          <div class="icon"></div>
          <p class="p1">黄泽黄桃专科医院</p>
          <p class="p2">5条网诊未回复</p>
          <div class="times">2017-12-19</div>
        </div>
        <div class="expert-box">
          <expert></expert>
        </div>
      </div>
    </div>
    <div class="nav-box">
      <div class="item i1">
        <div class="icon icon01"></div>
        <p>浏览历史</p>
      </div>
      <div class="item i2">
        <div class="icon icon02"></div>
        <p>搜索</p>
      </div>
      <div class="item i3">
        <div class="icon icon03"></div>
        <p>医院本级</p>
      </div>
      <div class="item i4">
        <div class="icon icon04"></div>
        <p>医院综合排序</p>
      </div>
    </div>
    <Nav></Nav>
  </div>
</template>
<script>
import Headers from "@/components/headers/headers"
import ExpertRankingList from "@/components/expert_ranking_list/expert_ranking_list"
import HospitalList from "@/components/hospital_list/hospital_list"
import Nav from "@/components/nav_list/nav_list"
export default {
  name: "index",
  components: {
    Headers,
    expert: ExpertRankingList,
    hospital: HospitalList,
    Nav
  },
  props: {},
  data() {
    return {}
  },
  computed: {},
  watch: {},
  mounted() {},
  destroyed() {},
  methods: {}
}
</script>
<style lang="stylus" scoped>
.index-container
  display flex
  padding 0 90px
  .left
    width 409px
    margin-right 30px
    ul
      border 1px solid #eee
      height 586px
      background rgba(9, 29, 68, 1)
      border 2px solid rgba(7, 47, 101, 1)
      li
        display flex
        border 2px solid #072F65
        position relative
        .title
          width 140px
          height 113px
          display flex
          align-items center
          justify-content center
          background rgba(12, 41, 84, 0.5)
          font-size 32px
          line-height 1.1
        .text
          flex 1
          text-align left
          padding-left 24px
          display flex
          align-items center
          color #FFFDFD
          font-size 32px
          line-height 1.1
          .small
            font-size 22px
            .num
              color #FF6600
        .up
          position absolute
          right 32px
          top 45px
          color #fff
          .icon
            width 20px
            height 26px
            margin-right 10px
            display inline-block
            background url('./1.png') no-repeat
          .up-num
            font-size 28px
            font-family SimHei
            font-weight 400
  .mid
    width 409px
    margin-right 30px
  .right
    flex 1
    .message
      height 190px
      background rgba(218, 50, 102, 0.5)
      position relative
      padding-left 90px
      padding-top 44px
      text-align left
      .icon
        width 50px
        height 42px
        background url('./7.png') no-repeat
        background-position center
        background-size 100%
        position absolute
        top 44px
        left 20px
      .p1
        font-size 30px
        line-height 1.2
        margin-bottom 25px
        color #CECECE
      .p2
        font-size 30px
        color #FFFEFE
        width 100%
        overflow hidden
        text-overflow ellipsis
        word-break break-all
        white-space nowrap
      .times
        position absolute
        right 21px
        top 25px
        font-size 28px
        color #CECECE
.nav-box
  width 100%
  display flex
  padding 0 90px
  & > .item
    flex 1
    margin-right 30px
    box-sizing border-box
    height 198px
    align-items center
    display flex
    justify-content space-around
    cursor pointer
    &.i1
      background #2494DE
    &.i2
      background #DA3266
    &.i3
      background #EBB701
    &.i4
      background #7B70FA
    &:last-child
      margin-right 0
    .icon01
      width 92px
      height 70px
      background url('./5.png') no-repeat
      background-position center
      background-size 100%
    .icon02
      width 90px
      height 91px
      background url('./16.png') no-repeat
      background-position center
      background-size 100%
    .icon03
      width 75px
      height 75px
      background url('./15.png') no-repeat
      background-position center
      background-size 100%
    .icon04
      width 92px
      height 71px
      background url('./6.png') no-repeat
      background-position center
      background-size 100%
    & > p
      font-size 36px
      font-family SimHei
      font-weight 400
      color rgba(255, 255, 255, 1)
</style>
