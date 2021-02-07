<template>
  <div class="good_detail-container container-wrap">
    <Header
      :title="title"
      :right_show_bar="false"
      midTitle="商品详情"
      v-if="true"
      :istown="istown"
      :aId="aId"
    >
      <span
        slot="goods"
        class="jiantou el-icon-arrow-down"
        @click="proHospitalShowFlag = true"
        v-show="proHospital.length >= 2"
      ></span>
    </Header>
    <!-- <div class="company-list" v-else>
      <div class="container-wrap">
        <div class="left">
          <div class="back-icon" @click="goBack"></div>
          <span @click="clickCompany">{{ detail.company }}</span>
          <span
            class="el-icon-arrow-down"
            style="margin-left:20px"
            @click="proHospitalShowFlag = true"
            v-if="proHospitalCount !== 1"
          ></span>
        </div>
        <div class="t">商品详情</div>
      </div>
    </div> -->
    <el-container>
      <div class="no_data" v-show="noData">暂无商品信息</div>
      <el-aside width="320px" class="aside" v-show="!noData">
        <el-image class="goods-img" :src="detail.product_pic" fit="cover">
          <div slot="error" class="image-slot"></div>
          <div slot="placeholder" class="image_error"></div>
        </el-image>
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
    <div class="company-box" v-show="proHospitalShowFlag">
      <div class="container-wrap">
        <div class="header" @click="hideChooseHospitalBox">
          <div class="icon"></div>
          切换在售医院 {{ proHospitalCount }}
        </div>
        <ul>
          <li
            v-for="item in proHospital"
            :key="item.appid"
            @click="chooseHospital(item)"
          >
            <div class="p1">{{ item.company }}</div>
            <div class="p2">{{ item.name }}</div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
import { mapMutations, mapState } from "vuex";
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
      title: "",
      from: this.$route.query.from,
      goodsFrom: this.$route.query.goodsFrom, //为general 代表是管理院的商品
      proHospital: [],
      proHospitalCount: 0,
      proHospitalShowFlag: false,
      istown: 0,
      aId: 0
    };
  },
  computed: {
    ...mapState(["appId", "purview", "loginId"])
  },
  watch: {
    $route() {
      this.getDetail();
    }
  },
  mounted() {
    this.getDetail(this.$route.query.id);
    this.getProHospital(this.$route.query.id);
    this.setIsLowerHospital("true");
  },
  destroyed() {},
  methods: {
    ...mapMutations(["setIsLowerHospital", "setAppId"]),
    clickCompany() {
      // 点击选择公司
      if (this.proHospitalCount === 1) {
        this.$router.go(-1);
      } else {
        this.proHospitalShowFlag = true;
      }
    },
    getDetail(id) {
      // 获取商品详情
      this.$axios
        .fetchPost("/Home/Products/GetMpProDetail", {
          appId: this.goodsFrom === "general" ? this.loginId : this.appId,
          Id: id,
          purview: this.goodsFrom == "general" ? 1 : 0
        })
        .then(res => {
          if (res.data.code == 200) {
            this.noData = false;
            this.detail = res.data.data;
            this.title =
              this.purview == 3 || this.purview == 4 || this.purview == 46
                ? res.data.data.company
                : "商品详情";
            this.setAppId(res.data.data.userid);
            this.aId = res.data.data.userid;
          } else if (res.data.code == 300) {
            this.noData = true;
          }
        });
    },
    getProHospital(id) {
      this.$axios
        .fetchGet("/Home/products/getProHospital", {
          appId: this.goodsFrom === "general" ? this.loginId : this.appId,
          Id: id
        })
        .then(res => {
          if (res.data.code == 200) {
            this.proHospital = res.data.data;
            this.proHospitalCount = res.data.count;
            this.istown = res.data.data[0].istown;
          }
        });
    },
    goBack() {
      // 路由回到上一级
      this.$router.go(-1);
    },
    hideChooseHospitalBox() {
      this.proHospitalShowFlag = false;
    },
    chooseHospital(item) {
      this.setAppId(item.userid);
      this.getDetail(item.id);
      this.getProHospital(item.id);
      this.proHospitalShowFlag = false;
      this.title = item.company;
      this.istown = item.istown;
      this.aId = item.userid;
    }
  }
};
</script>
<style lang="stylus" scoped>
.good_detail-container
  padding-top 170px
  .jiantou
    display inline-block
    padding 0 10px
  .company-list
    position fixed
    left 0
    top 0
    right 0
    text-align center
    z-index 1
    .container-wrap
      position relative
      padding-top 30px
      background #080f3e
      .left
        position absolute
        left 40px
        top 35px
        font-size 30px
        color rgba(127, 181, 241, 1)
        display flex
        align-items center
        cursor pointer
        .back-icon
          width 30px
          height 30px
          background url('../../assets/image/back.png') no-repeat
          margin-right 20px
      .t
        font-size 34px
        color: #C5C5C5;
  .el-container
    padding 0 40px
  .aside
    .goods-img
      width 320px
      height 320px
      margin-bottom 44px
      .image-slot
        background url('../../assets/65.png') no-repeat
        background-position center center
        background-size 80%
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
.company-box
  position fixed
  left 0
  right 0
  top 0
  bottom 0
  overflow-y auto
  background #080f3e
  z-index 100
  .container-wrap
    padding 40px
    text-align left
    .header
      display flex
      color rgba(127, 181, 241, 1)
      font-size 30px
      align-items center
      cursor pointer

      .icon
        width 30px
        height 30px
        background url('../../assets/image/close.png') no-repeat
        margin-right 20px
    ul
      margin-top 90px
      font-size 0
      li
        display inline-block
        width 440px
        height 203px
        background: rgba(36, 148, 222, .5)
        margin-right 20px
        padding 34px
        cursor pointer
        margin-bottom 10px
        .p1
          font-size 34px
          color #fff
          overflow hidden
          text-overflow ellipsis
          white-space nowrap
          word-break break-all
          margin-bottom 20px
        .p2
          font-size 24px
          color: #CECECE;
          overflow hidden
          text-overflow ellipsis
          white-space nowrap
          word-break break-all
</style>
