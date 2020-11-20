<template>
  <div class="good_detail-container">
    <Header :title="title" :right_show_bar="false" midTitle="商品详情"></Header>
    <el-container>
      <div class="no_data" v-show="noData">暂无商品信息</div>
      <el-aside width="320px" class="aside" v-show="!noData">
        <el-image
          class="goods-img"
          :src="detail.product_pic"
          fit="cover"
        ></el-image>
        <div class="price-title">参考单价：</div>
        <div class="price">{{ detail.price }}</div>
        <div class="size">
          <div class="left">规格：</div>
          <div class="right">
            <p v-for="item in detail.spec" :key="item">{{ item }}</p>
          </div>
        </div>
        <div class="kind">类别：{{ detail.catname }}</div>
      </el-aside>
      <el-main v-show="!noData">
        <div class="main-title">{{ detail.name }}</div>
        <div class="container" v-html="detail.content"></div>
      </el-main>
    </el-container>
  </div>
</template>
<script>
import { mapState } from "vuex";
import Header from "@/components/online_hospital_header/online_hospital_header";
export default {
  name: "goods_detail",
  components: { Header },
  props: {},
  data() {
    return {
      id: this.$route.query.id,
      detail: "",
      noData: false,
      title: ""
    };
  },
  computed: {
    ...mapState(["appId", "purview"])
  },
  watch: {
    $route() {
      this.getDetail();
    }
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
          purview: 0
        })
        .then(res => {
          if (res.data.code == 200) {
            this.detail = res.data.data;
            this.title =
              this.purview == 3 || this.purview == 4
                ? res.data.data.company
                : "商品详情";
          } else if (res.data.code == 300) {
            console.log("暂无商品信息");
            this.noData = true;
          }
        });
    },
    goBack() {
      // 路由回到上一级
      this.$router.go(-1);
    }
  }
};
</script>
<style lang="stylus" scoped>
.good_detail-container
  padding-top 101px
  .el-container
    max-width 1900px
    min-width 1340px
    padding 0 40px
    margin 0 auto
  .aside
    .goods-img
      width 320px
      height 320px
      margin-bottom 44px
    .price-title
      font-size 30px
      color rgba(255, 255, 255, 1)
      text-align left
    .price
      text-align left
      font-size 24px
      color #FF6500
      word-break break-all
    .size, .kind
      text-align left
      font-size 24px
      color rgba(255, 255, 255, 1)
      display flex
      line-height 46px
      .left
        width 72px
      .right
        flex 1
        font-size 24px
  .el-main
    padding 0
    margin-left 95px
    .main-title
      font-size 50px
      color #FFFFFF
      text-align left
      margin-top -5px
      margin-bottom 30px
      // overflow hidden
      // text-overflow ellipsis
      // white-space nowrap
      // word-break break-all
    .container
      height 730px
      overflow auto
      text-align left
      line-height 40px
      font-size 30px
.no_data
  height 500px
  overflow auto
  text-align center
  line-height 500px
  font-size 50px
  color #fff
  margin 0 auto
</style>
