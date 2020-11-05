<template>
  <!-- 坐诊网诊测土详情 -->
  <div class="sit_detail-container">
    <Header title="坐诊详情"></Header>
    <div class="titles">{{ detail.title }}</div>
    <DetailInfoBox></DetailInfoBox>
    <DetailRecipeBox></DetailRecipeBox>
    <!-- <div class="info-box"> -->
    <!-- <div class="left">
        <div class="t">作物病情资料</div>
        <p class="p1">{{ detail.crop_pattern }}</p>
        <p class="p1">{{ detail.crop_position }}</p>
        <p class="p1">{{ detail.showtime }}</p>
        <p class="p1">
          {{ detail.content }}
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
          {{ detail.mpublic }} 官方回复<br />
          处方专家：{{ detail.chufang_expert }} <br />
          看诊结果：{{ detail.result }}
        </div>
      </div> -->
    <!-- </div> -->
    <!-- <div class="recipe-box">
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
    </div> -->
  </div>
</template>
<script>
import Header from "@/components/headers/headers";
import DetailInfoBox from "@/components/detail_info_box/detail_info_box";
import DetailRecipeBox from "@/components/detail_recipe_box/detail_recipe_box";
import { mapState } from "vuex";
export default {
  name: "online_detail",
  components: { Header, DetailInfoBox, DetailRecipeBox },
  props: {},
  data() {
    return {
      detail: "",
      id: this.$route.query.id,
      module: this.$route.query.module
    };
  },
  computed: {
    ...mapState(["appId"])
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
          module: this.module
        })
        .then(res => {
          if (res.data.code === "200") {
            this.detail = res.data.data;
          }
        });
    }
  }
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
</style>
