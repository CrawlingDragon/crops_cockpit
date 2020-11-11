<template>
  <div class="good_detail-container">
    <el-container>
      <el-header class="head">
        商品详情
        <div class="left" @click="goBack">
          <i class="el-icon-circle-close"></i>{{detail.company}}
        </div>
      </el-header>
      <el-container>
        <el-aside width="509px" class="aside">
          <el-image class="goods-img" :src="detail.product_pic" fit="cover"></el-image>
          <div class="price-title">参考单价：</div>
          <div class="price">{{detail.price}}</div>
          <div class="size">
            <div class="left">规格：</div>
            <div class="right">
              <p v-for="item in detail.spec" :key="item">{{item}}</p>

            </div>
          </div>
          <div class="kind">类别：{{detail.catname}}</div>
        </el-aside>
        <el-main>
          <div class="main-title">{{detail.name}}</div>
          <div class="container" v-html="detail.content">
          </div>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script>
import { mapState } from "vuex";

export default {
  name: "goods_detail",
  components: {},
  props: {},
  data() {
    return {
      id: this.$route.query.id,
      detail: "",
    };
  },
  computed: {
    ...mapState(["appId", "purView"]),
  },
  watch: {
    $route() {
      this.getDetail();
    },
  },
  mounted() {
    this.getDetail();
  },
  destroyed() {},
  methods: {
    getDetail() {
      // 获取商品详情
      this.$axios
        .fetchPost("/Home/Products/GetMpProDetail", {
          appId: this.appId,
          Id: this.$route.query.id,
          purview: this.purView == 4 || 5 ? 1 : 0,
        })
        .then((res) => {
          if (res.data.code == 200) {
            this.detail = res.data.data;
          }else if(res.data.code == 300){
            console.log("暂无商品信息")
          }
        });
    },
    goBack() {
      // 路由回到上一级
      this.$router.go(-1);
    },
  },
};
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
      cursor pointer
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
      word-break break-all
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
      overflow hidden
      text-overflow ellipsis
      white-space nowrap
      word-break break-all
    .container
      height 730px
      overflow auto
      text-align left
      line-height 40px
      font-size 30px
</style>
