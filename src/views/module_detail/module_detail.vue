<template>
  <!-- 坐诊网诊测土详情 -->
  <div class="sit_detail-container">
    <Header title="坐诊详情"></Header>
    <div class="titles">{{detail.title}}</div>
    <div class="info-box">
      <div class="left">
        <div class="t">作物病情资料</div>
        <p class="p1">{{detail.crop_pattern}}</p>
        <p class="p1">{{detail.crop_position}}</p>
        <p class="p1">{{detail.showtime}}</p>
        <p class="p1">
          {{detail.content}}
        </p>
        <ul class="left-ul clearfix">
          <div class="ul-t">病情图片（4）</div>
          <li v-for="item in 4" :key="item">
            <el-image src fit="cover" class="img"></el-image>
          </li>
        </ul>
      </div>
      <div class="right">
        <div class="right-t">处方信息</div>
        <div class="text">
          {{detail.mpublic}} 官方回复<br />
          处方专家：{{detail.chufang_expert}} <br />
          看诊结果：{{detail.result}}
        </div>
      </div>
    </div>
    <div class="recipe-box">
      <div class="l">
        <div class="icon"></div>
        <p>
          处方药
          <br />（5）
        </p>
      </div>
      <div class="ul-wrap">
        <ul class="r-ul">
          <li v-for="item in 8" :key="item">
            <el-image fit="cover" class="img"></el-image>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
import Header from "@/components/headers/headers";
import { mapState } from "vuex";
export default {
  name: "module_detail",
  components: { Header },
  props: {},
  data() {
    return {
      detail: "",
      id: this.$route.query.id,
      module: this.$route.query.module,
    };
  },
  computed: {
    ...mapState(["appId"]),
  },
  watch: {},
  mounted() {
    this.getDetailData();
  },
  destroyed() {},
  methods: {
    getDetailData() {
      // 获取配方详情
      this.$axios
        .fetchPost("/Home/Treatment/GetRecipetemDetail", {
          appId: this.appId,
          Id: this.id,
          module: this.module,
        })
        .then((res) => {
          if (res.data.code === "200") {
            this.detail = res.data.data;
          }
        });
    },
  },
};
</script>
<style lang="stylus" scoped>
.sit_detail-container
  text-align left
  font-family SimHei
  .titles
    font-size 44px
    font-family SimHei
    font-weight 400
    color rgba(255, 255, 255, 1)
    text-align left
    padding-left 90px
    margin-top 20px
    margin-bottom 40px
  .info-box
    margin 0 90px
    .left
      display inline-block
      width 580px
      margin-right 30px
      box-sizing border-box
      background rgba(9, 29, 67, 0.4)
      border 1px solid rgba(255, 255, 255, 0.2)
      vertical-align top
      height 460px
      padding 20px 0 16px 30px
      .t
        font-size 30px
        color #FFFFFF
        margin-bottom 10px
      .p1
        font-size 24px
        color #B5B5B5
        margin-bottom 5px
      .left-ul
        margin-top 10px
        .ul-t
          font-size 30px
          color #FFFFFF
          margin-bottom 10px
        li
          display inline-block
          margin-right 10px
          .img
            width 110px
            height 110px
    .right
      display inline-block
      width 1115px
      box-sizing border-box
      background rgba(9, 29, 67, 0.4)
      border 1px solid rgba(255, 255, 255, 0.2)
      vertical-align top
      height 460px
      padding 20px 30px
      overflow-x auto
      .right-t
        font-size 30px
        color #FFFFFF
        margin-bottom 15px
      .text
        color #B5B5B5
        font-size 24px
        line-height 35px
  .recipe-box
    margin 40px 0 0 90px
    display flex
    .l
      background rgba(9, 29, 67, 0.4)
      border 1px solid rgba(255, 255, 255, 0.2)
      width 140px
      height 270px
      display inline-block
      vertical-align top
      text-align center
      margin-right 40px
      .icon
        width 60px
        height 70px
        background url('./24.png') center no-repeat
        margin 45px auto 0
      p
        font-size 34px
        color #fff
        line-height 34px
        margin-top 34px
    .ul-wrap
      flex 1
      min-width 0
      overflow-x auto
      height 291px
    .r-ul
      display inline-block
      vertical-align top
      height 270px
      width 3000px
      li
        display inline-block
        margin-right 15px
        .img
          width 270px
          height 270px
</style>
