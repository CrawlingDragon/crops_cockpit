<template>
  <div class="jianjie" v-show="codeboxFlaw">
    <div class="head" @click="topre()">
      <div class="closefn"></div>
      <div class="head-title">
        {{ isShaoxing == 1 ? "绍兴市为农服务平台" : "扫一扫下载益农宝" }}
      </div>
    </div>
    <el-image :src="url" v-if="isShaoxing == 1" class="er_wei_ma"></el-image>
    <div class="er_wei_ma" v-else></div>
  </div>
</template>
<script>
export default {
  props: ["codeboxFlaw", "url"],
  data() {
    return {
      order_id: window.sessionStorage.getItem("orderid"), // 用户的订单id
      order_info: "", // 订单的信息
      coastInt: "", // 订单金额取整
      coastFloat: "", // 订单金额取余
      isShaoxing: window.sessionStorage.getItem("isshaoxing")
    };
  },
  activated() {
    //   console.log("666")
  },
  methods: {
    topre() {
      this.$emit("changeFlaw", false);
    },
    getOrederinfo() {
      this.$axios
        .fetchPost("/Home/Order/GetMpOrderDetail", { Id: this.order_id })
        .then(res => {
          if (res.data.code == "200") {
            console.log(res);
            this.order_info = res.data.data;
            const a = res.data.data.ordercost;
            var b = a.toString().split(".");
            this.coastInt = b[0];
            this.coastFloat = b[1];
          }
        });
    },
    watchGooddetail(item) {
      console.log("去查看商品的详情页面");
    }
  }
};
</script>
<style lang="stylus" scoped>
.jianjie
  margin 0 40px
  position fixed
  left 0
  right 0
  bottom 0
  top 0
  background #080f3e
  z-index 999999
  .head
    display flex
    align-items center
    height 100px
    max-width 1900px
    min-width 1340px
    margin 0 auto
    cursor pointer
    .closefn
      height 30px
      width 30px
      background url("../../assets/61.png")
      background-size 100%
    .head-title
      margin-left 30px
      font-size 30px
      font-weight 400
      color #7FB5F1
  .er_wei_ma
      height 500px
      width 500px
      background url("./channel_scan.png") no-repeat
      background-size 100%
      position absolute
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
      margin:auto;
      background-color #C5C5C5
</style>
