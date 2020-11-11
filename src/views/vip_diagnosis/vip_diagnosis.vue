<template>
  <div class="vip_diagnosis-container">
    <Header title="会员：134*****7220"></Header>
    <div class="nav">
      <div class="item active">网诊</div>
      <div class="item">TA加入的医院</div>
    </div>
    <ul class="diagnosis-ul">
      <li v-for="item in 4" :key="item">
        <div class="icon"></div>
        <div class="text">
          <p class="p1">
            范冰冰的水稻提问
            <span>2017-05-27 12:00</span>
          </p>
          <p class="p2">
            机插秧田，插秧后7天，追肥尿素15斤/亩，拌除草剂苄-乙，肥尿素15斤/亩，拌除草剂苄-乙，昨肥尿素15斤/亩，拌除草剂苄-乙，昨肥尿素15斤/亩，拌除草剂苄-乙，昨肥尿素15斤/亩，拌除草剂苄-乙，昨昨天下过大雨，田间水位上升许多，今天发现水深的地方成片心叶滞长，拌除
          </p>
        </div>
        <div class="answer">
          <p class="p3">回复数：4</p>
          <el-image
            class="img"
            src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1592471253187&di=2be437364bafe9496afca32965ee9e22&imgtype=0&src=http%3A%2F%2Ft7.baidu.com%2Fit%2Fu%3D3204887199%2C3790688592%26fm%3D79%26app%3D86%26f%3DJPEG%3Fw%3D4610%26h%3D2968"
          ></el-image>
        </div>
      </li>
    </ul>
    <div class="result-num">共200个结果</div>
  </div>
</template>
<script>
import Header from "@/components/online_hospital_header/online_hospital_header";
export default {
  name: "vip_diagnosis",
  components: { Header },
  props: {},
  data() {
    return {};
  },
  computed: {},
  watch: {},
  mounted() {},
  destroyed() {},
  methods: {}
};
</script>
<style lang="stylus" scoped>
.vip_diagnosis-container
  .nav
    border-bottom 2px solid rgba(255, 255, 255, 0.2)
    margin 0 90px
    text-emphasis center
    .item
      padding 0 35px 11px
      font-size 40px
      color #C5C5C5
      display inline-block
      cursor pointer
      margin-right 40px
      &.active
        border-bottom 4px solid #FF6500
        color #fff
  .diagnosis-ul
    margin 35px 90px 0
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
        background url('./21.png') no-repeat
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
    margin-left 90px
    font-size 30px
    padding 30px 0
</style>
