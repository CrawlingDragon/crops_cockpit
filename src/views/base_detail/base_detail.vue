<template>
  <div class="base_detail-container container-wrap">
    <Header title="基地详情"></Header>
    <div class="content">
      <el-image class="left" fit="cover" :src="detail.logo">
        <div slot="error" class="image_error"></div>
        <div class="image_error" slot="placeholder"></div>
      </el-image>
      <div class="name">{{ detail.basename }}</div>
      <div class="item hospital">服务医院：{{ detail.monitor }}</div>
      <div class="item friut">主要作物：{{ detail.zwtype }}</div>
      <div class="item woner">
        基地法人：{{ detail.linkman }}<span>{{ detail.telephone }}</span>
      </div>
      <div class="item address">
        地<span style="margin-left:55px"></span>址：{{ detail.address }}
      </div>
      <div class="item">基地规模：{{ detail.guimo }}</div>
      <div class="item">供应时间：{{ detail.supplytime }}</div>
      <div class="text">{{ detail.introduce }}</div>
      <div class="info clearfix" v-if="detail.images_urls.length >= 1">
        <div class="title">基地图片</div>
        <div class="img-item" v-for="item in detail.images_urls" :key="item">
          <el-image class="img" :src="item" fit="cover"></el-image>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Header from "@/components/general_hospital_header/general_hospital_header";
export default {
  name: "base_detail",
  components: { Header },
  props: {},
  data() {
    return { detail: "", appId: this.$route.query.appId };
  },
  computed: {},
  watch: {},
  mounted() {
    this.getBaseDetail();
  },
  destroyed() {},
  methods: {
    getBaseDetail() {
      this.$axios
        .fetchGet("/Home/NationwideDatav/GetJDTDetail", { appId: this.appId })
        .then(res => {
          if (res.data.code == 200) {
            this.detail = res.data.data;
          }
        });
    }
  }
};
</script>
<style lang="stylus" scoped>
.base_detail-container
  padding-top 101px
  .content
    padding 20px 40px
    position relative
    padding-left 360px
    text-align left
    .left
      position absolute
      left 40px
      top 20px
      width 270px
      height 270px;
    .name
      font-size: 34px;
      font-family: Microsoft YaHei;
      font-weight: 400;
      color: #FFFFFF;
      margin-top -10px
      margin-bottom 20px
    .item
      font-size: 28px;
      font-family: Microsoft YaHei;
      font-weight: 400;
      color: #FAFBFB;
    .text
      font-size: 24px;
      font-family: Microsoft YaHei;
      font-weight: 400;
      color: #B5B5B5;
      line-height: 40px;
      margin-top 25px
    .info
      padding 20px 5px 25px 0

      .title
        font-size: 28px;
        font-family: Microsoft YaHei;
        font-weight: 400;
        color: #FFFFFF;
        margin-bottom 25px
      .img-item
        float left
        width 50%
        padding-right 20px
        height 320px
        margin-bottom 20px
        .img
          width 100%
          height 100%
</style>
