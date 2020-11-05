<template>
  <div class="default-header-container">
    <div class="icon icon01" v-if="indexBtn"></div>
    <div class="text" v-if="indexBtn">{{indexBtn}}</div>
    <div class="icon icon02" v-if="themeBtn"></div>
    <div class="text" v-if="themeBtn">{{themeBtn}}</div>
    <div class="goBack_icon" v-if="goBackBtn" @click="goBack"></div>
    <div class="goBackBtn" v-if="goBackBtn" @click="goBack">{{goBackBtn}}</div>
    <div class="h1">{{hi}}</div>
    <div class="icon icon03"></div>
    <div class="icon icon04"></div>
    <div class="time">2018-08-08 19:59</div>
  </div>
</template>
<script>
export default {
  name: "defaultHeader",
  components: {},
  props: {
    indexBtn: {
      type: String,
      default: "首页"
    },
    themeBtn: {
      type: String,
      default: "主题看板"
    },
    hi: {
      type: String,
      default: ""
    },
    goBackBtn: {
      type: String,
      default: ""
    }
  },
  data () {
    return {
    };
  },
  computed: {},
  watch: {},
  mounted () {},
  destroyed () {},
  methods: {
    goBack() {
      this.$router.go(-1);
    }
  }
};
</script>
<style lang="stylus" scoped>
.default-header-container
  padding 45px 45px 5px
  display flex
  max-width 1900px
  margin 0 auto
  align-items center
  .icon01
    width 27px
    height 25px
  .text
    font-size: 26px;
    color #fff
    margin-left 14px
  .h1
    flex 1
    font-size: 36px;
    font-family: Source Han Sans CN;
    font-weight: 400;
    color: #FFFFFF;
  .time
    width auto
    font-size: 18px;
    font-family: Arial;
    font-weight: 400;
    color: #7FB5F1;
  .icon02
    width 27px
    height 25px
  .icon03
    width 27px
    height 25px
  .icon04
    width 27px
    height 25px
  .goBack_icon
    width 30px
    height 30px
    background: #7FB5F1;
  .goBackBtn
    color #7FB5F1
    padding-left 20px
    font-size: 30px;
    font-family: Microsoft YaHei;
    font-weight: 400;
    color: #7FB5F1;
    cursor pointer
</style>
