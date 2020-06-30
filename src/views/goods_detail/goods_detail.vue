<template>
  <div class="good_detail-container">
    <el-container>
      <el-header class="head">
        商品详情
        <div class="left">
          <i class="el-icon-circle-close"></i>黄泽黄桃专科医院
        </div>
      </el-header>
      <el-container>
        <el-aside width="509px" class="aside">
          <el-image
            class="goods-img"
            src="http://attach.bbs.miui.com/forum/201407/12/191515sskuppax42aarano.jpg"
            fit="cover"
          ></el-image>
          <div class="price-title">参考单价：</div>
          <div class="price">¥12.00 - ¥15.00</div>
          <div class="size">
            <div class="left">规格：</div>
            <div class="right">
              <p>50ml（¥12.00）</p>
              <p>100ml（¥15.00）</p>
            </div>
          </div>
          <div class="kind">类别：农药-杀菌剂</div>
        </el-aside>
        <el-main>
          <div class="main-title">燕化 多禧利 香菇多糖 杀菌剂</div>
          <div class="container">
            1）产品特性：本品氯虫苯甲酰胺和高效氟氯氰菊酯的混配制剂，结合了两种作用机理，具有胃毒和触杀作用。可用于防治番茄棉铃虫和蚜虫，辣椒烟青虫和蚜虫以及苹果小卷叶蛾和桃小食心虫。
            2）使用范围及使用方法：
            作物 防治对象 制剂用药量 使用方法
            番茄 棉铃虫、蚜虫 10-20毫升/亩 喷雾
            辣椒 蚜虫、烟青虫 10-20毫升/亩 喷雾
            苹果 小卷叶蛾、桃小食心虫 3000-5000倍 喷雾
            3）使用说明：
            1、防治番茄棉铃虫和蚜虫，以及辣椒烟青虫和蚜虫，在低龄幼虫和若虫始盛期叶面喷雾使用，按照推荐剂量每亩兑水30-45升。
            2、防治苹果小卷叶蛾和桃小食心虫，在害虫发生初期，叶面喷雾使用按照推荐剂量每亩兑水200-250升。
            3、配药时需要进行二次稀释，均匀喷雾，尽量让药液覆盖到靶标害虫和作物。
            4）注意事项：
            1、一季最多施用次数2次，安全间隔期7天。
          </div>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script>
export default {
  name: "goods_detail",
  components: {},
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
.good_detail-container
  .head
    padding-top 30px
    font-size 44px
    color #B5B5B5
    height auto !important
    text-align center
    margin 0 90px 90px
    position relative
    .left
      position absolute
      left 0
      top 30px
  .aside
    padding 0 90px
    .goods-img
      width 320px
      height 320px
      margin-bottom 70px
    .price-title
      font-size 30px
      color rgba(255, 255, 255, 1)
      text-align left
    .price
      text-align left
      font-size 40px
      color #FF6500
    .size, .kind
      text-align left
      font-size 30px
      color rgba(255, 255, 255, 1)
      display flex
      line-height 46px
      .left
        width 95px
      .right
        flex 1
        font-size 24px
  .el-main
    padding 0
    margin-right 90px
    .main-title
      font-size 52px
      color #FFFFFF
      text-align left
      margin-top -5px
      margin-bottom 30px
    .container
      height 730px
      overflow auto
      text-align left
      line-height 40px
      font-size 30px
</style>
